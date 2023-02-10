import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import chalk from 'chalk';
import fs from 'fs'; // create file system
import { exec } from 'child_process';
import util from 'util';
import pkg from 'date-fns';

import { Command } from 'commander';

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
const fullName = `${name} ${lastname}`;

// ========================= START OF DATE-FNS =================== //


const formatDistanceToNow = pkg.formatDistanceToNow;
const parse = pkg.parse;
const set = pkg.set;
const isToday = pkg.isToday;
const isAfter = pkg.isAfter;
const isBefore = pkg.isBefore;

const startOfCourse = new Date(2023, 0, 31);
const endOfCourse = new Date(2023, 4, 8);
console.log(formatDistanceToNow(startOfCourse));

const argumentParser = new Command();
argumentParser.option('--date');
argumentParser.parse();

/* const dateStringSentAsArgument = argumentParser.args[0]; */
/* const dateSentAsArgument = parse(
  dateStringSentAsArgument,
  'yyyy-MM-dd',
  new Date()
); */
const currDate = set(new Date(), {
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
});

// I know loooooooongest function name :D LooooL
const isDatePastPresentOrFuture = (dateSentAsArgument, currDate) => {
  let difference;
  let text;
  let compDate = new Date(dateSentAsArgument);
  // check if date is past or present
  if (currDate > compDate) {
    difference = currDate.getTime() - compDate.getTime();
    text = ' is in the past ';
    console.log('isBefore', isBefore(dateSentAsArgument, currDate));
    console.log(chalk.hex('#888')(text));
  } else if (compDate > currDate) {
    difference = compDate.getTime() - currDate.getTime();
    text = ' is in the future ';
    console.log('isAfter', isAfter(dateSentAsArgument, currDate));
    console.log(chalk.hex('#888')(text));
  } else {
    difference = 0;
    console.log('isToday', isToday(dateSentAsArgument));
    text = 'is today';
    console.log(chalk.hex('#888')(text));
  }

  // getting days using this calculation
  let dayDifference = Math.ceil(difference / (1000 * 3600 * 24));
  return dayDifference;
};
isDatePastPresentOrFuture(startOfCourse, currDate);
isDatePastPresentOrFuture(endOfCourse, currDate);

// ========================= END OF DATE-FNS =================== //

// === DATES WITHOUT LIBRARY === USING JS DATE METHOD ///
// using this in my index.html file //
const dateNow = new Date();

const hrs = dateNow.getHours();
const min = dateNow.getMinutes();
// if using seconds const sec = dateNow.getSeconds();

// check dates between when course started and today
let startDate = new Date('01/31/2023');
let endDate = new Date('04/08/2023');
let currentDate = new Date();

let text;
// past time difference, if going forward would be changing pos of start and todays or use and other variable like endDate or similar
const compareDates = (comparisonDate = '01/31/2022', currentDate) => {
  let difference;

  let compDate = new Date(comparisonDate);
  // check if date is past or present
  if (currentDate > compDate) {
    difference = currentDate.getTime() - compDate.getTime();
    text = ' days since ';
  } else if (compDate > currentDate) {
    difference = compDate.getTime() - currentDate.getTime();
    text = ' days left until ';
  } else {
    difference = 0;
  }

  // getting days using this calculation
  let dayDifference = Math.ceil(difference / (1000 * 3600 * 24));
  return dayDifference;
};

// END DATE SECTION //

console.log(
  chalk.hex('#4203c9')(
    compareDates(startDate, currentDate) + ' ' + text + ' course started \n'
  )
);
console.log(
  chalk.hex('#4203c9')(
    compareDates(endDate, currentDate) + ' ' + text + ' Funkcamp'
  )
);

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

// on this Using date-fns on the md file /
const data = `
# Assignment 2
### at cme - course frameworks <br> 
- Name: ${fullName} <br> 
- Date: ${currDate} and is it really today ? ${isToday(currDate)} <br> 
- ${formatDistanceToNow(
  startOfCourse
)} since course started and ${formatDistanceToNow(
  endOfCourse
)} until course ends
- Npm & node: ${process.env.npm_config_user_agent} <br> 
- Git version: ${stdout}
`;

await fs.promises.writeFile('./files/index.md', data);

// in this file we keep date and time in local time
fs.writeFile(
  './files/assignment2_1.md',
  `This file is written by who ever started the program on this date: ${dateNow.toLocaleString()}... YEAH BUDDY!`,
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

// html "data" :<span>${sec}</span> if I want to put in seconds
const time = `
 / Time:
<span>${hrs}</span>:<span>${min}</span> 
`;

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
    <h4>Todays date: ${dateNow.toLocaleString().split(',')[0]} ${time}</h4>
    <p>This is an node assisgnment on the frontend app developer education at CME, couse is about frameworks, and we are learning React, and this week about Node and Git</p>

    <h2>Versions</h2>
    <p>
    - Npm & node: ${process.env.npm_config_user_agent} </br> 
    - Git version: ${stdout}
    </p>

    <h2>Dates</h2>
    <p>
    It's ${compareDates('01/31/2023', currentDate)} ${text} course started
    & ${compareDates(endDate, currentDate)} ${text} course ends </Br></br>
    So you can choose if you wanna set in a date like so '01/02/23' in the days function or if you do an variable like so const thisDate = new Date('04/08/2023')
    </br>
    Example 1: <span> days('01/31/2023',currentDate ) </span> 
    </br>
    Example 2: <span> days(endDate, currentDate)</span>
    </br>
    </br>
    Dates can really be a mess and there is few libraries to use I tried out date-fns too
    
    </p>
    <h2>Express server</h2>
    <p>
    To use write
    <span>npm run dev</span>
    Server is hosted on port ${PORT}
    </p>

    <h2>Testing with Chai and Mocha</h2>
    <p>
      This test can be run by writing <span>npm run test</span> in the console, it will test a server that is pulled from the  server file
      on port 6000 and a object result, I did it separetly, because i tried 2 other libraries and decided I go with Mocha and Chai. 
      Will try more testing with React, Testing Library, Jest & Cypress 
      I also read about differences between TDD and BDD. 
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

span {
  background-color: black;
  color: white;
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

/* 
const tick = () => {
  const dateNow = new Date();

  const hrs = dateNow.getHours();

  const min = dateNow.getMinutes();

  const sec = dateNow.getSeconds();

  console.log(`${hrs} : ${min} : ${sec}`);
};
setInterval(tick, 1000);
 */
app.listen(PORT);
