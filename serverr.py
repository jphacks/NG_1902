from flask import Flask,render_template,request
import json
import os

app = Flask(__name__)

@app.route('/')
def index():
    mins = request.args.get("mins")
    os.chdir('./rasp')
    f=open("reference.json",'r')
    data=json.load(f)
    f.close()
    data["waittime"]=int(mins)
    f=open("reference.json",'w')
    json.dump(data,f,indent=4)
    f.close()
    os.chdir('../')
    return render_template("index.html",mins=mins)

app.run(host='0.0.0.0')
