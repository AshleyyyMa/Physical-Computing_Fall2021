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
let playerHP, enemyHP;
let type = ["water", "ice", "fire"];
let enemyType = "";
let playerImg;
let playerFightImg;
let enemyImg;
let enemyFightImg;
let startImg,deadImg;
let bgImg1, bgImg2, bgImg3;
let blueImg, redImg, yellowImg, blueImg1, redImg1, yellowImg1;
let startBtn;
let myFont;
let isStart;
let counter = 0;
let timeleft = 3;


function preload(){
  playerImg = loadImage('Girl_not fight.png');
  playerFightImg = loadImage('Girl_fight.png');
  enemyImg = loadImage('Pink_not fight.png');
  enemyFightImg = loadImage('Pink_fight.png');
  bgImg1 = loadImage('Squeeze game back1.png');
  bgImg2 = loadImage('Squeeze game back2.png');
  bgImg3 = loadImage('Squeeze game back3.png');
  startImg = loadImage('start_fix.png');
  deadImg = loadImage('game_over.png');
  blueImg = loadImage('blue_attack.png');
  redImg = loadImage('red_attack.png');
  yellowImg = loadImage('yellow_attack.png');
  blueImg1 = loadImage('blue_attack1.png');
  redImg1 = loadImage('red_attack1.png');
  yellowImg1 = loadImage('yellow_attack1.png');
  myFont = loadFont('Game Of Squids.otf');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(startImg);
  player = new Player();
  enemy = new Enemy();
  playerHP = 100;
  enemyHP = 100;
  enemyType = random(type);
  fill(255);
  textSize(100);
  isStart = false;
  // startBtn = createButton('Start');
  // startBtn.position(width/2, height/2);
  // startBtn.mousePressed(startGame);

  //imageMode(CENTER);

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
    waterValue = floor(map(forceValue[0], 300, 1000, 0, 6));
    iceValue = floor(map(forceValue[1], 300, 1000, 0, 6));
    fireValue = floor(map(forceValue[2], 300, 1000, 0, 6));
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

function mousePressed(){
  isStart = true;
  removeElements();

  // let timer = select('#timer');
  // timer.html(timeleft - counter);
  // setInterval(timeIt, 1000);
}

// function timeIt(){
//   counter++;
//   timer.html(timeleft - counter);
//   text(timeleft - counter, width/2, height/2);
// }

function draw() {
  if(isStart){
    background(bgImg2);
    waterValue = constrain(waterValue, 0, 6);
    iceValue = constrain(iceValue, 0, 6);
    fireValue = constrain(fireValue, 0, 6);

    if (enemyHP > 0 && enemyShot.length < 1 && random(1) < 0.015){
      enemyShot.push(new Shot(enemy.x, enemy.y, enemy.w, enemy.h, enemyType, false));
    }

    for (let i = 0; i < enemyShot.length; i++){
      enemyShot[i].show();
      enemyShot[i].move();
      if (enemyShot[i].hit(player)){
        playerHP -= 2;
        noStroke();
        fill(255, 0, 0);
        textSize(50);
        text("-10", 100, 100);
      }else{
        //console.log("1");
      } 
      if (enemyShot[i].done()){
        enemyShot.splice(0, 1);
      }
    }

    if (playerHP > 0 && waterValue > 0 && playerShot.length < 1){
      playerShot.push(new Shot(player.x, player.y, player.w, player.h, "water", true));
    }
    if (playerHP > 0 && iceValue > 0 && playerShot.length < 1){
      playerShot.push(new Shot(player.x, player.y, player.w, player.h, "ice", true));
    }
    if (playerHP > 0 && fireValue > 0 && playerShot.length < 1){
      playerShot.push(new Shot(player.x, player.y, player.w, player.h, "fire", true));
    }


    for (let i = playerShot.length - 1; i >= 0; i--){
      playerShot[i].show();
      playerShot[i].move();
      console.log("water:" + waterValue);
      console.log("ice:" + iceValue);
      console.log("fire:" + fireValue);
      if (playerShot[i].hit(enemy)){
        //console.log("1");
        noStroke();
        fill(255, 0, 0);
        textSize(50);
        if (enemyType === "water"){
          if (playerShot[i].type === "water"){
            enemyHP -= waterValue * 0.2;
            text("-" + waterValue * 2, width - 100, 100);
          }else if (playerShot[i].type === "ice"){
            enemyHP -= iceValue * 0.4;
            text("-" + iceValue * 4, width - 100, 100);
          }else if (playerShot[i].type === "fire"){
            enemyHP -= fireValue * 0.1;
            text("-" + fireValue, width - 100, 100);
          }
        }else if (enemyType === "ice"){
          if (playerShot[i].type === "water"){
            enemyHP -= waterValue * 0.1;
            text("-" + waterValue, width - 100, 100);
          }else if (playerShot[i].type === "ice"){
            enemyHP -= iceValue * 0.2;
            text("-" + iceValue * 2, width - 100, 100);
          }else if (playerShot[i].type === "fire"){
            enemyHP -= fireValue * 0.4;
            text("-" + fireValue * 4, width - 100, 100);
          }
        }else if (enemyType === "fire"){
          if (playerShot[i].type === "water"){
            enemyHP -= waterValue * 0.4;
            text("-" + waterValue * 4, width - 100, 100);
          }else if (playerShot[i].type === "ice"){
            enemyHP -= iceValue * 0.1;
            text("-" + iceValue, width - 100, 100);
          }else if (playerShot[i].type === "fire"){
            enemyHP -= fireValue * 0.2;
            text("-" + fireValue * 2, width - 100, 100);
          }
        }


        //console.log("enemy: " + enemyHP);
      }else{
        console.log("0");
      }
      if (playerShot[i].done()){
        playerShot.splice(i, 1);
      }
    }

    if (playerShot.length === 0){
      player.show();
    }else{
      player.showFight();
    }

    if (enemyShot.length === 0){
      enemy.show();
    }else{
      enemy.showFight();
    }

    // text(playerHP, 33, 65);
    // text(enemyHP, 700, 65);
    playerHP = constrain(playerHP, 0, 100);
    enemyHP = constrain(enemyHP, 0, 100);

    console.log("enemy: " + enemyHP);
    console.log("player: " + playerHP);

    noStroke();
    if (playerHP > 20){
      fill(255);
    }else{
      fill(255, 0, 0);
    }
    rect(20, 20, playerHP*2, 25);
    if (enemyHP > 20){
      fill(255);
    }else{
      fill(255, 0, 0);
    }
    rect(width - 20 - enemyHP*2, 20, enemyHP*2, 25);
    stroke(0);
    strokeWeight(5);
    noFill();
    rect(20, 20, 200, 25);
    rect(width - 220, 20, 200, 25);
    
    player.move();

    if (enemyHP <= 0){
      background(bgImg1);
      imageMode(CENTER);
      textAlign(CENTER, CENTER);
      noStroke();
      fill(255, 0, 0, 150);
      //text("YOU WIN!", width/2, height/2 + 200);
      image(playerImg, width/2, height/2 + 100);

      noLoop();
    }
    if (playerHP <= 0){
      background(deadImg);
      noLoop();
    }
  }else{
    background(startImg);
    // startBtn = createButton('Start');
    // startBtn.position(width/2, height/2);
    // startBtn.size(400, 250);
    // startBtn.style('font-size', '18px');
    // startBtn.style('font-family', 'Lucida Console');
    // startBtn.mousePressed(startGame);
    textFont(myFont);
    textSize(30);
    textAlign(CENTER, CENTER);
    fill(255);
    text("Read the instruction on the box,", width/2, height/2 + 125);
    textSize(40);
    fill(235, 55, 125);
    text("and Click to start!", width/2, height/2 + 200);
  }
}