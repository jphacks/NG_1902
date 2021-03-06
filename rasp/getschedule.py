import urllib.request #do with python3
import json

def getsched(token):
    url= 'https://us-central1-come-in-pillow.cloudfunctions.net/getSchedule?token={}'.format(token)
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req) as res:
        body=res.read()
    return(body.decode())

if __name__ == '__main__':
    f = open("reference.json",'r')
    ref = json.load(f)
    f.close()
    print(getsched(ref["token"]))
