'use strict';


// globals, rounds, products array
let productArr = [];
let votingRounds = 25;
let indexArr = [];

//dom windows
let productContainer = document.getElementById('product-container');
let prodOne = document.getElementById('product-one');
let prodTwo = document.getElementById('product-two');
let prodThree = document.getElementById('product-three');
let resultsBtn = document.getElementById('results-btn');
let resultsList = document.getElementById('results-container');



//** Canvas Element */

let canvasElement = document.getElementById('chart');



// constructor function args:name, file-path / properties: name, file-path, views, votes,
function Product(name, imgExtension = 'jpg') {
  this.name = name;
  this.img = `img/${name}.${imgExtension}`;
  this.votes = 0;
  this.views = 0;
}


function randomizer() {
  return Math.floor(Math.random() * productArr.length);
}

function renderChart() {
  // build out chart obj
  let productNames = [];
  let productVotes = [];
  let productViews = [];
  
  for (let i = 0; i < productArr.length; i++) {
    productNames.push(productArr[i].name);
    productVotes.push(productArr[i].votes);
    productViews.push(productArr[i].views);
  }
  
  
  let chartObj = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets:
      [
        {
          label: '# of Votes',
          data: productVotes,
          borderWidth: 1
        },
        {
          label: '# of Views',
          data: productViews,
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  // use chart constructor to pass in canvas elem and chartObj with data
  new Chart(canvasElement, chartObj);
}

function render() {
  
  
  // while (productOneIndex === productTwoIndex || productTwoIndex === productThreeIndex || productOneIndex === productThreeIndex) {
    //   productOneIndex = randomizer();
    //   productTwoIndex = randomizer();
    
    while(indexArr.length < 6){
      let randomNum = randomizer();
      if(!indexArr.includes(randomNum)){
        indexArr.push(randomNum);
      }
    }
    // assign index arry to each product
    let productOneIndex = indexArr.shift();
    let productTwoIndex = indexArr.shift();
    let productThreeIndex = indexArr.shift();
    
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
  function handleClick(e) {
    let imgClicked = e.target.title;
    
    for (let i = 0; i < productArr.length; i++) {
      if (imgClicked === productArr[i].name) {
        productArr[i].votes++;
      }
    }
    votingRounds--;
    render();
    if (votingRounds === 0) {
      productContainer.removeEventListener('click', handleClick);
      
      // local storage step 1 stringify data 
      let stringifiedProducts = JSON.stringify(productArr);
      console.log('stringified Products', stringifiedProducts);
      
      //step two set to local storage
      localStorage.setItem('products', stringifiedProducts);
    }
    
  };
  
  function handleShowResults() {
    // TODO: Display the results once the there are no more votes
    if (votingRounds === 0) {
      // call chart helper funciton
      renderChart();
      
      // for(let i = 0; i < productArr.length; i++){
        //   let liElem = document.createElement('li');
        //   liElem.textContent = `${productArr[i].name} - views: ${productArr[i].views} & votes: ${productArr[i].votes}`;
        //   resultsList.appendChild(liElem);
        // }
        // resultsBtn.removeEventListener('click', handleShowResults);
      }
      
    }
    
    //executable code
    
    // step3 pull data from local storage
    
    let retrievedProducts = localStorage.getItem('products');
    console.log('retrieved products', retrievedProducts);
    
    // step 4 parse local storage data
    
    let parsedProducts = JSON.parse(retrievedProducts);
    
    console.log('parsed products', parsedProducts);
    
    if(retrievedProducts){
      productArr = parsedProducts;
    } else{
    
    
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
    }
    
    render();
    
    productContainer.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleShowResults);