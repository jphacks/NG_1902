import serial
import time

def main():
    s=serial.Serial('/dev/ttyUSB0',9600)
    time.sleep(2)
    while 1:
        s.write(b'1')
        time.sleep(1)
        print("1")
        s.write(b'0')
        time.sleep(3)
        print("0")

if __name__ == '__main__':
    main()
