int r, headCheck = 0,interval = 1000, timer, del = 100;
byte bt;
bool head, wakeUp;

//int score[][2]={{6,8},{5,8},{8,8},{9,4},{6,8},{8,8},{10,4},{11,8},{12,8},{13,4},{10,8},{}
void setup() {
  // put your setup code here, to run once:
  pinMode(9,OUTPUT);
  pinMode(8,OUTPUT);
  //pinMode(11,INPUT);
  Serial.begin(9600);
}

void loop() {
  digitalWrite(8,HIGH);
  headCheck = 0;
  timer = 20000;
while(!head){
  r = analogRead(1) - analogRead(0);
  if(r > 4){
      headCheck += 100;
      head = headCheck > interval;
  }else if(headCheck > 10){
     headCheck -= 10;
    }
    delay(del);
//    Serial.println(char(r));
Serial.println(head);
}
for (int i=1; i<3;i++){
  tone(9,2000);
  delay(del);
  noTone(9);
  }



  //-----------------------------------------------寝てるぜ
 X:
  timer -= del;
  r = analogRead(1) - analogRead(0);
  bt = Serial.read() - 48;
  if (bt == 1) timer = -1;
  if(r > 4 && headCheck < 1000){
      headCheck += 100;
      head = headCheck > interval;
  }else if(headCheck > 3){
     headCheck -= 10;
    }
    head = headCheck > 10;
    delay(del);
  //Serial.println(headCheck);  
  Serial.println(head);
  if (timer < 0) goto Y;  
  if (head) goto X; 

    for (int i=1; i<3;i++){
  tone(9,1000);
  delay(del);
  noTone(9);
  } 
  //if (!head) goto Z;
  
    Y:
  
  
    for (int i=1; i<3;i++){
  tone(9,4000);
  delay(del);
  noTone(9);
  } 
  head = false;
  
  // put your main code here, to run repeatedly:
  
//r = 1023 - analogRead(0);

//Serial.println(r);
//delay(500);
//if((1023 - analogRead(0)) > 3){
  
//}else{

  //noTone(9);
}
