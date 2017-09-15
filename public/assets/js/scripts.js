var numSquares = 6;
var pickedColor;
var colors = [];
var squares = document.querySelectorAll(".square");
var rgbDisplay = document.querySelector("#rgbDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetBtn = document.querySelector("#reset");
var modeBtn = document.querySelectorAll(".mode");

init();

function init(){
  setupModeBtns();
  setupSquares();
  reset();
}


function setupModeBtns() {
  //mode btns event listener
  for (var i = 0; i < modeBtn.length; i++) {
    modeBtn[i].addEventListener("click", function() {
      modeBtn[0].classList.remove("selected");
      modeBtn[1].classList.remove("selected");
      console.log(this);
      this.classList.add("selected");
      this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
     reset();
    });
  }
}


function setupSquares() {
    for(var i = 0; i<squares.length; i++){
    // add click listener to squares
    squares[i].addEventListener("click", function(){
    // grab color of clicked squares
     var clickedColor = this.style.backgroundColor;
    // compare to pickedColor
    if (clickedColor === pickedColor){
    messageDisplay.textContent = "You Got It";
    changeColors(clickedColor);
    resetBtn.textContent = "Play Agian!";
    h1.style.backgroundColor = clickedColor;

    }else{
    this.style.backgroundColor = "rgb(0, 0, 0)";
    messageDisplay.textContent = "Try Agian";
      }
    });
  }
  reset();
}



function reset() {
  // generate all new colors
  colors = generateRandomColors(numSquares);
  // pick a new random color from array
  pickedColor = pickColor();
  //change coloDisplay to match picked color
  rgbDisplay.textContent = pickedColor;
  messageDisplay.textContent = "";
  resetBtn.textContent = "New Colors";
  // change colors of squares
  for (var i = 0; i < squares.length; i++) {
  if(colors[i]){
    squares[i].style.display = "block";
    squares[i].style.backgroundColor = colors[i];
  }else{
    squares[i].style.display = "none";
      }

    }
    h1.style.backgroundColor = "rgb(0, 0, 0)";
  }

// easyBtn.addEventListener("click", function() {
//   easyBtn.classList.add("selected");
//   hardBtn.classList.remove("selected");
//   numSquares = 3;
//   colors = generateRandomColors(numSquares);
//   pickedColor = pickColor();
//   rgbDisplay.textContent = pickedColor;
//   for (var i = 0; i < squares.length; i++) {
//     if(colors[i]){
//       squares[i].style.backgroundColor = colors[i];
//     }else{
//       squares[i].style.display = "none";
//     }
//   }
//
// });
//
// hardBtn.addEventListener("click", function() {
//   easyBtn.classList.remove("selected");
//   hardBtn.classList.add("selected");
//   numSquares = 6;
//   colors = generateRandomColors(numSquares);
//   pickedColor = pickColor();
//   rgbDisplay.textContent = pickedColor;
//   for (var i = 0; i < squares.length; i++) {
//       squares[i].style.backgroundColor = colors[i];
//       squares[i].style.display = "block";
//
//   }
//
//
// });


// rgbDisplay.textContent = pickedColor;

// // generate all new colors
// colors = generateRandomColors(numSquares);
// // pick a new random color from array
// pickedColor = pickColor();
// //change coloDisplay to match picked color
// rgbDisplay.textContent = pickedColor;
// messageDisplay.textContent = "";
// this.textContent = "New Colors";
// // change colors of squares
// for (var i = 0; i < squares.length; i++) {
//   squares[i].style.backgroundColor = colors[i];
// }
// h1.style.backgroundColor = "rgb(0, 0, 0)";

resetBtn.addEventListener("click", function(){
  reset();
});



function changeColors(color){
  //loop through all squares
  for(var i = 0; i < squares.length; i++){
    // change each square to match goven color
    squares[i].style.backgroundColor = color;
  }
}

function pickColor(){
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num){
  // make array
  var arr = [];
  // repeat num times
  for (var i = 0; i < num; i++) {
    // get random color and push into arry
    arr.push(randomColor());
  }
  // return that array
  return arr;
}

function randomColor(){
  //red 0-255
  var r = Math.floor(Math.random() * 256);
  //green 0-255
  var g = Math.floor(Math.random() * 256);
  //blue 0-255
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}
