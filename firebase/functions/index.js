const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require("./serviceKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    atabaseURL: "https://come-in-pillow.firebaseio.com"
});
const firestore = admin.firestore();

const pushMessage = (fcmToken, plan, timeString) => ({
    notification: {
        title: "起きてください",
        body: timeString + "後に" + plan + "があります"
    },
    token: fcmToken
})

const { google } = require('googleapis');


function listEvents(auth, response) {
    const calendar = google.calendar({ version: 'v3', auth });

    let county = -1;

    calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
        timeZone: "Asia/Tokyo"
    }, (err, res) => {
        if (err) return console.log('The API returned and error: ' + err);
        const event_list = res.data.items;
        const events = event_list.filter(event => event.start.dateTime !== undefined);
        if (events.length !== 0) {
            event = events[0];
            console.log(event);
            const start = event.start.dateTime;
            const parsetime = new Date(start);
            console.log(typeof (parsetime));
            const year = parsetime.getFullYear();
            const month = ('0' + (parsetime.getMonth() + 1)).slice(-2);
            const day = ('0' + parsetime.getDate()).slice(-2);
            const hour = ('0' + parsetime.getHours()).slice(-2);
            const minute = ('0' + parsetime.getMinutes()).slice(-2);
            const fmttime = year + month + day + hour + minute;
            console.log(`${start} - ${event.summary}`);
            response.send(`${fmttime}`);
        } else {
            console.log('No upcoming events found.');
            response.send('nothing');
        }
    });
}

function pushNotification(auth, uid, response) {
    const calendar = google.calendar({ version: 'v3', auth });

    let county = -1;

    calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
        timeZone: "Asia/Tokyo"
    }, (err, res) => {
        if (err) return console.log('The API returned and error: ' + err);
        const event_list = res.data.items;
        const events = event_list.filter(event => event.start.dateTime !== undefined);
        if (events.length !== 0) {
            event = events[0];
            console.log(event);

            const title = event.summary;
            const start = event.start.dateTime;
            const datetime = new Date(start);
            let now = new Date();
            now.setSeconds(0);
            now.setMilliseconds(0);
            console.log(now);
            const diffTime = datetime - now;
            const hour = Math.floor(diffTime / (1000 * 60 * 60));
            const minute = Math.floor(diffTime / (1000 * 60)) - hour * 60;
            const timeString = hour + "時間" + (minute === 0 ? "" : minute + "分");
            console.log(timeString);

            const userRef = firestore.collection('users').doc(uid);
            userRef.get().then((user) => {
                const userData = user.data();
                response.send(pushMessage(userData.fcmToken, title, timeString));
                // admin.messaging().send(pushMessage(userData.fcmToken, title, timeString))
                //     .then((response) => {
                //         console.log('Successfully sent message:', response);
                //     })
                //     .catch((e) => {
                //         console.log('Error sending message:', e);
                //     });
                return;
            }).catch((e) => console.log(e));
        }


    });
}

const content = '{ "installed": { "client_id": "300192154540-lrltomptp7a9grt0mlkh82k9r6uvk58f.apps.googleusercontent.com", "project_id": "quickstart-1571461748196", "auth_uri": "https://accounts.google.com/o/oauth2/auth", "token_uri": "https://oauth2.googleapis.com/token", "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs", "redirect_uris": ["urn:ietf:wg:oauth:2.0:oob", "http://localhost"] } }'

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.getSchedule = functions.https.onRequest((request, response) => {

    const credentials = JSON.parse(content);
    const { client_id, redirect_uris } = credentials.installed;
    const client_secret = functions.config().calendar.content;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]
    );

    let refresh_token = ""
    if (request.query.token !== undefined) {
        refresh_token = request.query.token
    } else {
        //refresh_token = functions.config().calendar.token
        response.send("token not found");
    }

    oAuth2Client.setCredentials({
        refresh_token: refresh_token,
    });

    listEvents(oAuth2Client, response);
});

exports.alarm = functions.https.onRequest((request, response) => {
    const credentials = JSON.parse(content);
    const { client_id, redirect_uris } = credentials.installed;
    const client_secret = functions.config().calendar.content;
    const uid = request.query.uid;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]
    );

    let refresh_token = ""
    if (request.query.token !== undefined) {
        refresh_token = request.query.token
    } else {
        //refresh_token = functions.config().calendar.token
        response.send("token not found");
    }

    oAuth2Client.setCredentials({
        refresh_token: refresh_token,
    });

    pushNotification(oAuth2Client, uid, response);

    //response.status(200).send("OK");
});