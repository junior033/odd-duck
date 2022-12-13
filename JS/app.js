'use strict';


// globals, rounds, products array
let productArr = [];
let votingRounds = 25;

//dom windows
let productContainer = document.getElementById('product-container');
let prodOne = document.getElementById('product-one');
let prodTwo = document.getElementById('product-two');
let prodThree = document.getElementById('product-three');
let resultsBtn = document.getElementById('results-btn');
let resultsList = document.getElementById('results-container');

// constructor function args:name, file-path / properties: name, file-path, views, votes,
function Product(name, imgExtension = 'jpg'){
  this.name = name;
  this.img = `img/${name}.${imgExtension}`;
  this.votes = 0;
  this.views = 0;
}


let bag = new Product('bag');
let banana = new Product('banana');
let bathroom = new Product('bathroom');
let boots = new Product('boots');
let breakfast = new Product('breakfast');
let bubblegum = new Product('bubblegum');
let chair = new Product('chair');
let cthulhu = new Product('cthulhu');
let dogDuck = new Product('dog-duck');
let dragon = new Product('dragon');
let pen = new Product('pen');
let petSweep = new Product('pet-sweep');
let scissors = new Product('scissors');
let shark = new Product('shark');
let tauntaun = new Product('tauntaun');
let unicorn = new Product('unicorn');
let waterCan = new Product('water-can');
let wineGlass = new Product('wine-glass');

productArr.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, tauntaun, unicorn, waterCan, wineGlass);
// img randomizer function and render function

function randomizer(){
  return Math.floor(Math.random() * productArr.length);
}


function render(){
  let productOneIndex = randomizer();
  let productTwoIndex = randomizer();
  let productThreeIndex = randomizer();
  console.log(productOneIndex);
  console.log(productTwoIndex);
  console.log(productThreeIndex);

  while(productOneIndex === productTwoIndex || productTwoIndex === productThreeIndex || productOneIndex === productThreeIndex){
    productOneIndex = randomizer();
    productTwoIndex = randomizer();
  }

  prodOne.src = productArr[productOneIndex].img;
  prodTwo.src = productArr[productTwoIndex].img;
  prodThree.src = productArr[productThreeIndex].img;
  prodOne.title = productArr[productOneIndex].name;
  prodTwo.title = productArr[productTwoIndex].name;
  prodThree.title = productArr[productThreeIndex].name;
  prodOne.alt = `this is an image of ${productArr[productOneIndex].name}`;
  prodTwo.alt = `this is an image of ${productArr[productTwoIndex].name}`;
  prodThree.alt = `this is an image of ${productArr[productThreeIndex].name}`;

  productArr[productOneIndex].views++;
  productArr[productTwoIndex].views++;
  productArr[productThreeIndex].views++;

}

// event handlers: image clicks rendering random img
function handleClick(e){
  let imgClicked = e.target.title;

  for(let i = 0; i < productArr.length; i++){
    if(imgClicked === productArr[i].name){
      productArr[i].votes++;
    }
  }
  votingRounds--;
  render(); 
  if(votingRounds === 0){
    productContainer.removeEventListener('click', handleClick);
  }

};

function handleShowResults(){
  // TODO: Display the results once the there are no more votes
  if(votingRounds === 0){
    for(let i = 0; i < productArr.length; i++){
      let liElem = document.createElement('li');
      liElem.textContent = `${productArr[i].name} - views: ${productArr[i].views} & votes: ${productArr[i].votes}`;
      resultsList.appendChild(liElem);
    }
    resultsBtn.removeEventListener('click', handleShowResults);
  }

}

//executable code



render();

productContainer.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleShowResults);