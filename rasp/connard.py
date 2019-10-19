import serial
import time
import json

def send(ard):
    ard.write(b'1')

def receive(ard):
    str = ard.read(1)
    print(str)
    return int(str.decode())
    
if __name__ == '__main__':
    f = open("reference.json",'r')
    ref = json.load(f)
    f.close()
    ard=serial.Serial('/dev/ttyUSB0',9600)
    t=0
    
    while 1:
        time.sleep(2)
        onhead=receive(ard)
        t=0
        if onhead==1:
            if t==0:
                t=ref["waittime"]
                print("reset")
            elif t==1:
                senf(ard)
                print("ring")
            else:
                t-=1
                print(str(t))
        else:
            t==0
