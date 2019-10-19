import urllib.request #do with python3

def getsched():
    url= 'https://us-central1-come-in-pillow.cloudfunctions.net/helloWorld'
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req) as res:
        body=res.read()
    print(body)

if __name__ == '__main__':
    getsched()
