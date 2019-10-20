int r, headCheck = 0,interval = 1000, timer, del = 100,altimer,dif = 900;
byte bt;
bool head, wakeUp, remain = 500;
float herz[]={698.4,783};

//int score[][2]={{6,8},{5,8},{8,8},{9,4},{6,8},{8,8},{10,4},{11,8},{12,8},{13,4},{10,8},{}
void setup() {
  // put your setup code here, to run once:
  pinMode(9,OUTPUT);
  pinMode(8,OUTPUT);
  Serial.begin(9600);
}

void loop() {

for(int i=1;i < 10; i++){
  tone(9,i * 100);
    delay(100);
  }
  noTone(9);
/*digitalWrite(8,HIGH);
delay(500);
//dif = analogRead(1) - analogRead(0);
for(int i=1;i < 10; i++){
  r = analogRead(1) - analogRead(0);
  if (dif < r) dif = r;
  Serial.println(r);
  tone(9,i * 100);
  delay(100);
  }
  noTone(9);
  dif *= 0.8;
  Serial.println(dif);

*/
  A:
  digitalWrite(8,HIGH);
  headCheck = 0;
  timer = 20000;
  altimer = 0;
while(!head){
  r = analogRead(0);
  if(r > dif){
      headCheck += 100;
      head = headCheck > interval;
  }else if(headCheck > 10){
     headCheck -= 30;
    }
    delay(del);
//    Serial.println(char(r));
//Serial.println(r);
Serial.print(head);
}
for (int i=1; i<3;i++){
  tone(9,2000);
  delay(del);
  noTone(9);
  }



  //-----------------------------------------------寝てるぜ
 X:
  //timer -= del;
  r = analogRead(0);
  bt = Serial.read() - 48;
  if (bt == 1) timer = -1;
  if(r > dif && headCheck < 1000){
      headCheck += 100;
      head = headCheck > interval;
  }else if(headCheck > 3){
     headCheck -= 10;
    }
    head = headCheck > 10;
    delay(del);
  //Serial.println(headCheck);  
  Serial.print(head);
  if (timer < 0) goto Y;  
  if (head) goto X; else goto Z; 

   /* for (int i=1; i<3;i++){
  tone(9,1000);
  delay(del);
  noTone(9);
  } 
  //if (!head) goto Z;
  */
  Y: 
  
  while(head){
/*
    tone(9,herz[1]);
    delay(250);
    tone(9,herz[0]);
    delay(250);
    tone(9,herz[1]);
    delay(250);
    noTone(9);
    delay(250);
    */
    potato(altimer);
    delay(50);
    altimer = (altimer + 50) % 1000;
    r = analogRead(0);
    if(r > dif && headCheck < 1000){
      headCheck += 100;
      head = headCheck > interval;
  }else if(headCheck > 50){
     headCheck -= 50;
    }
    head = headCheck > 50;
    Serial.print(head);
    }

  
    Z:
  
  
    for (int i=1; i<3;i++){
  tone(9,4000);
  delay(del);
  noTone(9);
  } 
  head = false;
  
  // put your main code here, to run repeatedly:


      goto A;
}

void potato(int altimer){
  if(altimer < 250){
    tone(9,herz[1]);
    }else if(altimer < 500){
      tone(9,herz[0]);
      }else if(altimer < 750){
   tone(9,herz[1]);
        }else{
          noTone(9);
          }

  }
