let serial; // variable for the serial object
let latestData = "waiting for data"; // variable to hold the data
let fireworks = [];
let gravity;
let fireworkSound1;
let fireworkSound2;
let pics = [];

function preload(){
  fireworkSound1 = loadSound("Firework-Whistle.mp3");
  fireworkSound2 = loadSound("Fireworks-Crackling.mp3");
  pics[0] = loadImage('pic_1.jpg');
  pics[1] = loadImage('pic_2.jpg');
  pics[2] = loadImage('pic_3.jpg');
  pics[3] = loadImage('pic_4.jpg');
  pics[4] = loadImage('pic_5.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  gravity = createVector(0, 0.1);
  stroke(255);
  strokeWeight(4);
  background(0);
  //bgImage = random(pic); 

  // serial constructor
  serial = new p5.SerialPort();
  // get a list of all connected serial devices
  serial.list();
  // serial port to use - you'll need to change this
  serial.open('/dev/tty.usbserial-1140');
  // callback for when the sketchs connects to the server
  serial.on('connected', serverConnected);
  // callback to print the list of serial devices
  serial.on('list', gotList);
  // what to do when we get serial data
  serial.on('data', gotData);
  // what to do when there's an error
  serial.on('error', gotError);
  // when to do when the serial port opens
  serial.on('open', gotOpen);
  // what to do when the port closes
  serial.on('close', gotClose);
}

function serverConnected() {
  print("Connected to Server");
}

// list the ports
function gotList(thelist) {
  print("List of Serial Ports:");

  for (let i = 0; i < thelist.length; i++) {
    print(i + " " + thelist[i]);
  }
}

function gotOpen() {
  print("Serial Port is Open");
}

function gotClose() {
  print("Serial Port is Closed");
  latestData = "Serial Port is Closed";
}

function gotError(theerror) {
  print(theerror);
}

// when data is received in the serial buffer

function gotData() {
  let currentString = serial.readLine(); // store the data in a variable
  trim(currentString); // get rid of whitespace
  if (!currentString) return; // if there's nothing in there, ignore it
  console.log(currentString); // print it out
  latestData = currentString; // save it to the global variable
}


function draw() {
  mapLocation = map(latestData, 0, 1023, 0, width);
  mapColor = map(latestData, 0, 1023, 0, 360);

  imageMode(CENTER);
  colorMode(RGB);
  
  randomImage = random(pics);
  background(0, 0, 0, 20); //show the trails

  if (random(1) < 0.05 && latestData > 0){
    fireworks.push(new Firework(mapLocation, mapColor)); //launch fireworks randomly
    if (!fireworkSound1.isPlaying()){
      fireworkSound1.play();
      //randomImage = random(pic);
      image(randomImage, width / 2, height / 2, windowWidth, windowHeight);
    }
  }

  for (let i = fireworks.length - 1; i >= 0; i--){ //?
    fireworks[i].update();
    fireworks[i].show();
    if (fireworks[i].done()){
      fireworks.splice(i, 1);
    }
  }
}