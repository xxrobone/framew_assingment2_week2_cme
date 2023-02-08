import chalk from 'chalk';
import fs from 'fs'; // create file system
import { exec } from 'child_process';
import util from 'util';

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

// writing files and adding data

const { stdout, stderr } = await asyncExec('git --version');
console.log(`git version: ${stdout}`);

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

// check dates between when course started and today
let startDate = new Date('01/31/2023');
let endDate = new Date('03/03/2023');
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
