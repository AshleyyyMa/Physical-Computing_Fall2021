let serial;                                 // variable for the serial object
let portName = '/dev/tty.usbserial-1110'; // fill in your serial port name here

let waterValue = 0;                          // for color of background
let iceValue = 0;
let fireValue = 0;
let forceValue = "waiting for data"; 

let player;
let enemy;
let playerShot = [];
let enemyShot = [];
let playerHP;
let enemyHP;
let type = ["water", "ice", "fire"];
let enemyType = "";
let playerImg;
let madImg;
let enemyImg;
let deadImg;


function preload(){
  playerImg = loadImage('Hugging Emoji.png');
  madImg = loadImage('New Mad Emoji.png');
  enemyImg = loadImage('Devil Emoji.png');
  deadImg = loadImage('Skull Emoji.png');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Player();
  enemy = new Enemy();
  playerHP = 100;
  enemyHP = 100;
  enemyType = random(type);

  imageMode(CENTER);

  serial = new p5.SerialPort();         // make a new instance of the serialport library
  serial.on("list", printList);         // set a callback function for the serialport list event
  serial.on("connected", serverConnected); // callback for connecting to the server
  serial.on("open", portOpen);         // callback for the port opening
  serial.on("data", serialEvent);       // callback for when new data arrives
  serial.on("error", serialError);       // callback for errors
  serial.on("close", portClose);         // callback for the port closing

  serial.list(); // list the serial ports
  serial.open(portName);
}

// serialEvent method is run automatically whenever data is received
function serialEvent() {
  // read the serial buffer up to the linefeed:
  let myString = serial.readLine(); // store the data in a variable
  trim(myString);                   // get rid of whitespace
  
  if (!myString) return;            // if there's nothing in there, exit the function

  // split the string at the separator (commas), convert the segments into integers,
  // then organize into an aray:
  forceValue = split(myString, ",");
  
  // print out the values you got in the console, for debugging:
  //console.log(forceValue);
 
  // if the array has at least three elements, you know you got the whole packet
  if (forceValue.length >= 3) {
    waterValue = map(forceValue[0], 400, 1000, 0, 10);
    iceValue = map(forceValue[1], 400, 1000, 0, 10);
    fireValue =  map(forceValue[2], 400, 1000, 0, 10);
  }
}

function printList(portList) {
  print("List of Serial Ports:");
  // theList is an array of their names
  for (let i = 0; i < portList.length; i++) {
    // Display in the console
    print("[" + i + "] " + portList[i]);
  }
}

function serverConnected() {
  console.log("Connected to server.");
}

function portOpen() {
  // if there's a port open, close it:
  //if (serial.serialport != null) {
  //  serial.close();
  //}
  console.log("Serial port opened.");
  serial.clear(); // clears the buffer of any outstanding data
  serial.write("A"); // send a byte to the Arduino
}

function serialError(err) {
  console.log("Serial port error: " + err);
}

function portClose() {
  console.log("Serial port closed.");
}

function keyPressed(){
  if (key == ' '){
    player.jump();
  }
  if (key == 'a'){
    player.setDir(-1);
  }else if (key == 'd'){
    player.setDir(1);
  }
}

function keyReleased(){
  player.setDir(0);
}

function draw() {
  background(0);

  if (enemyHP > 0 && enemyShot.length < 1 && random(1) < 0.02){
    enemyShot.push(new Shot(enemy.x, enemy.y, enemyType, false));
  }

  for (let i = 0; i < enemyShot.length; i++){
    enemyShot[i].show();
    enemyShot[i].move();
    // if (enemyShot[i].hit(player)){
    //   player.showHit();
    // }else{
    //   player.show();
    // }
    if (enemyShot[i].done()){
      enemyShot.splice(0, 1);
    }
  }

  if (waterValue > 0 && playerShot.length < 1){
    playerShot.push(new Shot(player.x, player.y, "water", true));
  }
  if (iceValue > 0 && playerShot.length < 1){
    playerShot.push(new Shot(player.x, player.y, "ice", true));
  }
  if (fireValue > 0 && playerShot.length < 1){
    playerShot.push(new Shot(player.x, player.y, "fire", true));
  }

  player.show();

  for (let i = 0 ; i < playerShot.length; i++){
    background(0);
    player.showHit();
    playerShot[i].show();
    playerShot[i].move();

    if (playerShot[i].hit(enemy)){
      //console.log("1");
      if (playerShot[i].type === "water"){
        enemyHP -= waterValue * 2
      }else if (playerShot[i].type === "ice"){
        enemyHP -= iceValue * 3
      }else if (playerShot[i].type === "fire"){
        enemyHP -= fireValue * 4
      }
      console.log(enemyHP);
    }else{
      console.log("0");
    }
    if (playerShot[i].done()){
      playerShot.splice(0, 1);
    }
  }

  enemy.show();

  //player.show();
  player.move();

}