var song;

var garden;
var sofa;
var lamp;

var amp;
var w;


var people = [];

function preload() {
  song = loadSound('./assets/friends.mp3');

  garden = loadImage('./assets/garden.jpg');
  sofa = loadImage('./assets/sofa.png');
  lamp = loadImage('./assets/lamp.png');
  logo = loadImage('./assets/friends_logo.png');


}

function setup() {
  createCanvas(windowWidth, windowHeight);
  song.play();
  background(0);
  frameRate(60);

  amp = new p5.Amplitude();

fft = new p5.FFT (0.7,512);

w = width / 150;


  for (var i = 0; i < 6; i++) {
    var myPerson = new Person(random(width / 2 - 200, width / 2 + 200), random(height / 2, height / 2 + 50), random(40, 60), random(60, 80));

    people.push(myPerson);

  }
}

function draw() {
  imageMode(CENTER);

var spectrum = fft.analyze();



  var garden_alpha = map(song.currentTime(), 0, 3, -100, 255);
  var logo_alpha = map(song.currentTime(), 0, 3, 255, -100);

  push();
  tint(garden_alpha, 255);
  image(garden, windowWidth / 2, windowHeight / 2, windowWidth, windowHeight);
  pop();

  push();
  tint(255, logo_alpha);
  image(logo, windowWidth / 2, windowHeight / 2, windowWidth * 0.7, windowHeight * 0.4);
  pop();

  if (song.currentTime() >= 3.3) {
    image(sofa, windowWidth / 2, windowHeight / 2 + 100, windowWidth * 0.4, windowHeight * 0.4);
    image(lamp, windowWidth / 2 + 250, windowHeight / 2, windowWidth * 0.3, windowHeight * 0.5);
  }

  var vol = map(amp.getLevel(), 0, 100, random(width / 2 - 100, width / 2 - 50), random(height / 2 - 50, height / 2));
  //console.log(vol);

  if (song.currentTime() >= 6) {

    people[0].display();
  }

  if (song.currentTime() >= 6.5) {
    people[1].display();
  }

  if (song.currentTime() >= 7) {
    people[2].display();
  }

  if (song.currentTime() >= 7.5) {
    people[3].display();
  }

  if (song.currentTime() >= 8) {
    people[4].display();
  }

  if (song.currentTime() >= 8.5) {
    people[5].display();
  }

  if (song.currentTime() >= 10) {
    people[0].move(vol);
    people[1].move(vol);
    people[2].move(vol);
    people[3].move(vol);
    people[4].move(vol);
    people[5].move(vol);

  }

  for (var i = 0; i < 250; i++){
    var mp = spectrum[i];
    var y = map(mp,0,width,height,0);
    var rR = random (100, 255);
    var gR = random (100, 255);
    var bR = random (100, 255);
    fill(rR, gR, bR);
    noStroke();
    rect(i*w, y, w - 2, height - y);
    rect(i*w, height - y, w - 2, y - height);
  }



}

function Person(_x, _y, _diameter1, _diameter2) {
  // Properties defined by constructor
  this.size1 = _diameter1;
  this.size2 = _diameter2;
  this.x = _x;
  this.y = _y;
  // Hardcoded properties
  this.fillcolor = 'Bisque';
  this.strokecolor = 'DarkSalmon'




  // Methods
  this.move = function(_volume) {
    this.y = _volume - 200;
    //console.log(this.y);

  }

  this.display = function() {


    fill(this.fillcolor);
    strokeWeight(2);
    stroke(this.strokecolor);
    ellipse(this.x, this.y, this.size1, this.size2);



  }
}


function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
};
