const fastcsv = require('fast-csv');  
const fs = require('fs');  

const randomInt = (min,max) => {
  return Math.floor(Math.random()*(max-min+1)+min);
}

const generateData = () => {
  const arr = []
  for (let i = 0; i < 10000000; i++) {
    let data = {
      id: i,
      price: randomInt(634000, 1700000)
    }
    arr.push(data)
  }
  return arr
}

let data = generateData()

const ws = fs.createWriteStream("out.csv");  
fastcsv  
  .write(data, { headers: true })
  .pipe(ws);