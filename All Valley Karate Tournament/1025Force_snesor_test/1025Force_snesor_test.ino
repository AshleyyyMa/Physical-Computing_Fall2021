const int SensorPin_1 = A0;      // sensor to control red color

const int SensorPin_2 = A1;    // sensor to control green color

const int SensorPin_3 = A2;     // sensor to control blue color

void setup() {

  Serial.begin(9600);
}

void loop() {

  Serial.print(analogRead(SensorPin_1));

  Serial.print(",");

  Serial.print(analogRead(SensorPin_2));

  Serial.print(",");

  Serial.println(analogRead(SensorPin_3));

  //delay(200);
}
