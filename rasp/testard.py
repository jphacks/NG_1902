import serial
import time
import json


def receive(ard):
    onhead = ard.read(1)
    print(onhead)
    
if __name__ == '__main__':
    ard=serial.Serial('/dev/ttyUSB0',9600)
    while 1:
        time.sleep(0.1)
        receive(ard)
