import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import chalk from 'chalk';
import fs from 'fs'; // create file system
import { exec } from 'child_process';
import util from 'util';

const app = express();
const PORT = '5000';
app.set('port', PORT);

// dident get it work first with __dirname found a sollution here
// https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

const asyncExec = util.promisify(exec);

const name = 'Robert';
const lastname = 'Wägar';
const dateNow = new Date();
/* 
let day = dateNow.getDay();
let month = dateNow.getMonth() + 1;
let year = dateNow.getYear();
 */
/* const newDate = year + '/' + month + '/' + day; */

// check dates between when course started and today
let startDate = new Date('01/31/2023');
let endDate = new Date('04/08/2023');
let currentDate = new Date();
let text;

// past time difference, if going forward would be changing pos of start and todays or use and other variable like endDate or similar
const days = (comparisonDate, currentDate) => {
  let difference;
  // check if date is past or present
  if (currentDate > comparisonDate) {
    difference = currentDate.getTime() - comparisonDate.getTime();
    text = ' days since ';
  } else if (comparisonDate > currentDate) {
    difference = comparisonDate.getTime() - currentDate.getTime();
    text = ' days left until ';
  } else {
    difference = 0;
  }

  // getting days using this calculation
  let dayDifference = Math.ceil(difference / (1000 * 3600 * 24));
  return dayDifference;
};

console.log(
  chalk.hex('#4203c9')(
    days(startDate, currentDate) + ' ' + text + ' course started \n'
  )
);
console.log(
  chalk.hex('#4203c9')(days(endDate, currentDate) + ' ' + text + ' Funkcamp')
);

const fullName = `${name} ${lastname}`;

// this date we remove the time
console.log(
  chalk.hex('#f47a60')(
    `This console log is done by ${fullName}! ` +
      chalk.hex('#FFC0CB').underline.bold('with a pink substring') +
      chalk.hex('#7fefdc')(` on ${dateNow.toLocaleString().split(',')[0]}`)
  )
);
console.log(chalk.blue('The skies are blue!'));
console.log(chalk.red('Red could show warning or Error'));
console.log(chalk.yellow('Yellow - Usually shows to wait!'));

const { stdout, stderr } = await asyncExec('git --version');
console.log(`git version: ${stdout}`);

// writing files and adding data
// create folder dir

/* const folderName = 'files'
fs.mkdir(`/${folderName}`, { recursive: true }, (err) => {
  if (err) throw err;
}); */

// on this dateNow. toIsostring replacing - with /
const data = `
# Assignment 2
### at cme - course frameworks <br> 
- Name: ${fullName} <br> 
- Date: ${dateNow
  .toISOString()
  .replace('-', '/')
  .split('T')[0]
  .replace('-', '/')} <br> 
- Npm & node: ${process.env.npm_config_user_agent} <br> 
- Git version: ${stdout}
`;

await fs.promises.writeFile('./files/index.md', data);

// in this file we keep date and time in local time
fs.writeFile(
  './files/assignment2_1.md',
  `This file is written by ${fullName} on date: ${dateNow.toLocaleString()}`,
  (err, data) => {
    console.log('file succesfully written');
  }
);

fs.writeFile(
  './files/assignment2_2.md',
  'Here is and other file...',
  (err, data) => {
    console.log('file succesfully written');
  }
);

// create folder public
/* fs.mkdir('/public', { recursive: true }, (err) => {
  if (err) throw err;
}); */

// with promise would be like this
// fs.promises.mkdir('/tmp/a/apple', { recursive: true }).catch(console.error);

// html "data"

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./style.css">
    <title>Frameworks - Assignment 2</title>
</head>
<body>
<main>
    <h1>Node Assigment at CME educations</h1>
    <h2>Project by ${fullName}</h2>
    <h4>Date: ${dateNow.toLocaleString().split(',')[0]}</h4>
    <p>This is an node assisgnment on the frontend app developer education at CME, couse is about frameworks, and we are learning React, and this week about Node and Git</p>

    <h2>Versions</h2>
    <p>
    - Npm & node: ${process.env.npm_config_user_agent} </br> 
    - Git version: ${stdout}
    </p>

    <h2>Dates</h2>
    <p>
    It's ${days(startDate, currentDate)} ${text} course started
    & ${days(endDate, currentDate)} ${text} course ends
    </p>
    <h2>Express server</h2>
    <p>
    server is hosted on port ${PORT}
    </p>

    <h2>Testing with Chai and Mocha</h2>
    <p>
      This I have only tried once before, and it took awhile, I also tested 
      Jest and read about SuperTest for use testing http get, post, put, delete.
      I know compenies want you to have knowledge of testing so will try it out with
      react too, do some project using TDD, also read about BDD
    </p>
</main>
</body>
</html>
`;

await fs.promises.writeFile('./public/index.html', html);

const css = `
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  width: 100%;
  height: 100%;
  color: #fafafa;
  background-color: #181818;
  overflow-x: hidden;
}

main {
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
  width: 90%;
  background-color: transparent;
}

h1 {
  margin: 1rem 0;
  font-size: clamp(2rem, 2vw, 2.5rem);
  letter-spacing: 3px;
}

h2 {
  margin: 1rem 0;
  font-size: clamp(1.5rem, 2vw, 2.5rem);
  font-weight: 400;
  letter-spacing: 2px;
}

p,
h4 {
  margin: 0.5rem 0;
  padding: 1rem;   
  font-size: clamp(1rem, 1.5vw, 1.5rem);
  color: #888;
  background-color: #121212;
  font-weight: 200;
  letter-spacing: 2px;
  line-height: 1.5;
}

@media screen and (min-width: 768px) {    
  main {
      width: 60%;
  }
}   
`;

await fs.promises.writeFile('./public/style.css', css);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/'));
});

app.get('/test', (req, res) => {
  res.send('just checking so this works, could add files or what ever');
});

// if used as html template literal to show on screen ?
/* 

  const html = `
  <p class="text">
  Your local time is </p>
  <span>${hrs}</span> :
  <span>${min}</span> :
  <span>${sec}</span> 
  `;
  clock.innerHTML = html;
};
*/

/* 
const tick = () => {
  const now = new Date();

  const hrs = now.getHours();

  const min = now.getMinutes();

  const sec = now.getSeconds();

  console.log(`${hrs} : ${min} : ${sec}`);
};
setInterval(tick, 1000);
 */

app.listen(PORT);
