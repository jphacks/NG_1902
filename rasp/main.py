import time,json, serial
from connard import send, receive
from getschedule import getsched
from sendpushnotice import sendpush
from datetime import datetime


def notsleep(ard,ref):
    if receive(ard)==0:
        return {"state":0,"t":0}
    else:
        #sched=getsched(ref["token"])
        t=ref["waittime"]
        '''
        if sched=="nothing":
            t=ref["waittime"]
        else:
            sched=datetime.strptime(sched,'%Y%m%d%H%M')
            gr=int((sched-datetime.now()).total_seconds()/60-ref["getuptime"])
            t=ref["waittime"] if gr > ref["waittime"] else gr'''
        return {"state":1,"t":t*600} 

def sleeping(ard,ref,t):
    if receive(ard)==0:
        return {"state":0,"t":0}
    else:
        if t>0:
            return {"state":1,"t":t-1}
        else:
            send(ard)
            #sendpush(ref["uid"],ref["token"])
            return {"state":2,"t":0}

def ring(ard):
    if receive(ard)==0:
        return {"state":0,"t":0}
    else:
        return {"state":2,"t":0}

def updateref():
    f = open("reference.json",'r')
    ref = json.load(f)
    f.close()
    return ref

if __name__ == '__main__':
    ard=serial.Serial('/dev/ttyUSB0',9600)
    state={"state":0,"t":0}
    while 1:
        ref=updateref()
        print(state)
        if state["state"]==0:
            state=notsleep(ard,ref)
        elif state["state"]==1:
            state=sleeping(ard,ref,state["t"])
        else:
            state=ring(ard)
        time.sleep(0.1)
        
        
