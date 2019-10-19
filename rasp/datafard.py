import serial
import time

def main():
    con = serial.Serial('/dev/ttyUSB0',9600)
    time.sleep(2)
    print(con.portstr)
    while 1:
        str=con.read(4)
        print(str)

if __name__ == '__main__':
    main()
