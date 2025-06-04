document.body.insertAdjacentHTML("afterbegin", "<canvas id='Scren' style='background-color: #aaaaaa; display: block; margin-left: auto; margin-right: auto; z-index: 100;' width='500' height='250'></canvas><button onclick='Press()' onmousedown='Down()' onmouseup='Up()' type='button' style='background-color: #000000; color: #FFD700; display: block; margin-left: auto; margin-right: auto; z-index: 100; vertical-align: middle; align-content: center; width: 500px; height: 100px; border: 2px solid #FFD700;-webkit-user-select: none;-ms-user-select: none;user-select: none;' id='Actvt'></button>");
var stl = document.createElement("STYLE");
stl.innerHTML =`
body {
-webkit-user-select: none;-ms-user-select: none;user-select: none; 
}
`
var scrpt = document.createElement("SCRIPT");
scrpt.innerHTML = `
var points = 0
var mode = 0
var player = {x: 5, y: 125, vy:0,ay:0.075,update:function(){
this.vy+= this.ay
this.y+= this.vy
this.y = ((this.y%250)+250)%250
Scren.context.fillStyle = ["#00ff00", "#ff0000", "#0000ff", "#ffffff"][mode]
Scren.context.fillRect(this.x,this.y,10,10)
Scren.context.fillRect(this.x,this.y-250,10,10)
Scren.context.fillRect(this.x,this.y+250,10,10)
Scren.context.fillStyle = "#000000"
}};
function Press() {
switch (mode) {
case 0:
player.vy=-2
break;
}
}
function Down() {
switch (mode) {
case 1:
player.ay=-0.05
break;
case 2:
player.vy=-2
break;
}
}
function Up() {
switch (mode) {
case 1:
player.ay=0.05
break;
case 2: 
player.vy=2
break;
}
}
var pipes = [];
var prtl = [];
Scren.context=Scren.getContext('2d');
Scren.context.font = "20px Arial";
setInterval(FlappyBirdScren,16);
var PS = setInterval(PipeSpwn,3000)
function PipeSpwn() {
let pipe = new Pipe(Math.ceil(Math.random()*190)+20);
pipes.push(pipe);
if (Math.random() <0.25) {
let prt = new Portal(pipes.length-1,Math.floor(Math.random()*3))
prtl.push(prt)
}
}
function FlappyBirdScren() {
Scren.context.clearRect(0,0,Scren.width,Scren.height);
Scren.context.fillText(["Flap","Ship","Wave"][mode],0,20)
Scren.context.fillText(points,0,40)
if (mode === 1) {
player.vy = Math.max(-2, Math.min(2, player.vy));
}
player.update()
for (let i =0;i<pipes.length;i++) {
if (pipes[i].update()){
i--
}
}
for (let i =0;i<prtl.length;i++) {
if (prtl[i].update()){
i--
}
}
}
function Pipe(y) {
this.x=500;
this.topY=y-20
this.bottomY=y+20
this.update=function() {
this.x -= 1.25
Scren.context.fillRect(this.x, 0, 10,this.topY)
Scren.context.fillRect(this.x, this.bottomY, 10, Scren.height - this.bottomY)
if (this.collides(player)){
player = {x: 5, y: 125, vy:0,ay:0.075,update:function(){
this.vy+= this.ay
this.y+= this.vy
this.y = ((this.y%250)+250)%250
Scren.context.fillStyle = ["#00ff00", "#ff0000", "#0000ff", "#ffffff"][mode]
Scren.context.fillRect(this.x,this.y,10,10)
Scren.context.fillStyle = "#000000"
}};
clearInterval(PS)
PS = setInterval(PipeSpwn,3000)
mode = 0;
player.vy = 0;
player.ay = 0.075;
points = 0;
pipes.splice(0)
prtl.splice(0)
}
if(this.x < -10) {
if (prtl[0] && prtl[0].id === this){
prtl.splice(0,1);
}
pipes.splice(0,1)
points++
return true
}
return false
}
this.collides = function(obj){
return (obj.x < this.x+10 && obj.x+10 > this.x && !(obj.y > this.topY && obj.y+10 < this.bottomY))
}
}
function Portal(Id, type) {
this.x = pipes[Id].x
this.id = pipes[Id]
this.type = type
this.y = pipes[Id].topY
this.update=function() {
this.x = this.id.x
Scren.context.fillStyle = ["#00ff00", "#ff0000", "#0000ff", "#ffffff"][this.type]
Scren.context.fillRect(this.x, this.y, 10,40)
Scren.context.fillStyle = "#000000"
if (this.collides(player) && this.type != mode){
mode = this.type;
switch (mode) {
case 0:
player.vy = 0;
player.ay = 0.075;
break;
case 1:
player.vy = 0;
player.ay = 0.05;
break;
case 2:
player.vy = 2;
player.ay = 0;
break;
}
prtl.splice(0,1);
pipes.splice(0,1);
points++
return true
} else if (this.collides(player) && this.type === mode){
prtl.splice(0,1);
pipes.splice(0,1);
points+=2
return true
}
if(this.x < -10) {
prtl.splice(0,1);
return true
}
return false
}
this.collides = function(obj){
return (obj.x < this.x+10 && obj.x+10 > this.x && obj.y > this.y && obj.y+10 < this.y+40)
}
}
`;
document.body.appendChild(scrpt);
