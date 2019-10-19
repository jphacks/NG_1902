const functions = require('firebase-functions');
const fs = require('fs')
const readline = require('readline');
const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const TOKEN_PATH = 'token.json';

// const content = fs.readFile('credentials.json', (err, content) => {
//     if (err) return console.log('Error loading client secret file:', err);

//     return content;
// });

// const credentials = JSON.parse(content);
// const { client_secret, client_id, redirect_uris } = credentials.installed;
// const oAuth2Client = new google.auth.OAuth2(
//     client_id, client_secret, redirect_uris[0]
// );

// oAuth2Client.setCredentials({
//     refresh_token: "ya29.Il-iB18dlym9fMJhCYI_rFMG564H3PNkFNDIMmC-zneSLrpPuB5byU2ZALbucr2t1ZEAv_P434Xc9jMI31dtubHBUYJSDoYI1bNbiUgfeCedeVNJoXWVGw-22RJYAdjx0Q", "refresh_token": "1//0eu77X0wcThNfCgYIARAAGA4SNwF-L9Irl4HBYxi3Tl6-XSwsFhcChpB0gwsdBv_emUduNniuy5nV1cP7MW6wSf1FwkHeMw07BhQ",
// });

// county = listEvents(oAuth2Client);

function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]
    );

    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback);
        //oAuth2Client.setCredentials(JSON.parse(token));
        // oAuth2Client.setCredentials({
        //     refresh_token: "ya29.Il-iB18dlym9fMJhCYI_rFMG564H3PNkFNDIMmC-zneSLrpPuB5byU2ZALbucr2t1ZEAv_P434Xc9jMI31dtubHBUYJSDoYI1bNbiUgfeCedeVNJoXWVGw-22RJYAdjx0Q", "refresh_token": "1//0eu77X0wcThNfCgYIARAAGA4SNwF-L9Irl4HBYxi3Tl6-XSwsFhcChpB0gwsdBv_emUduNniuy5nV1cP7MW6wSf1FwkHeMw07BhQ",
        // });
        callback(oAuth2Client);
    });
}

function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

function listEvents(auth, response) {
    const calendar = google.calendar({ version: 'v3', auth });

    let county = -1;

    calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
    }, (err, res) => {
        if (err) return console.log('The API returned and error: ' + err);
        const events = res.data.items;
        if (events.length) {
            console.log('Upcoming 10 events:');
            event = events[0];
            const start = event.start.dateTime || event.start.date;
            console.log(`${start} - ${event.summary}`);
            response.send(`${start} - ${event.summary}`);
        } else {
            console.log('No upcoming events found.');
            response.send('No upcoming events found.');
        }
        response.send("Hello from Firebase!" + county);
    });


}


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    // const content = fs.readFile('credentials.json', (err, content) => {
    //     if (err) return console.log('Error loading client secret file:', err);

    //     return content;
    // });
    content = '{ "installed": { "client_id": "300192154540-lrltomptp7a9grt0mlkh82k9r6uvk58f.apps.googleusercontent.com", "project_id": "quickstart-1571461748196", "auth_uri": "https://accounts.google.com/o/oauth2/auth", "token_uri": "https://oauth2.googleapis.com/token", "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs", "redirect_uris": ["urn:ietf:wg:oauth:2.0:oob", "http://localhost"] } }'
    const credentials = JSON.parse(content);
    const { client_id, redirect_uris } = credentials.installed;
    const client_secret = functions.config().calendar.content;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]
    );

    oAuth2Client.setCredentials({
        refresh_token: functions.config().calendar.token,
    });

    listEvents(oAuth2Client, response);

    // response.send("Hello from Firebase!" + county);
});
