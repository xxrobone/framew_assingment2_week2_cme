import chalk from 'chalk';
import fs from 'fs'; // create file system

const name = 'Robert';
const lastname = 'Wägar';
const dateNow = new Date();

const fullName = `${name} ${lastname}`;

console.log(
  chalk.hex('#f47a60')(
    `This console log is done by ${fullName}! ` +
      chalk.hex('#FFC0CB').underline.bold('with a pink substring') +
      chalk.hex('#7fefdc')(` on ${dateNow}`)
  )
);
console.log(chalk.blue('The skies are blue!'));
console.log(chalk.red('Red could show warning or Error'));
console.log(chalk.yellow('Yellow - Usually shows to wait!'));

// writing files

fs.writeFile(
  './files/assignment2_1.md',
  `This file is written by ${fullName} on date: ${dateNow}`,
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

/* 
function logVersion() {

  exec('git --version', (error, stdout) => {
    if (error) {
      console.error(`Error getting Git version: ${error}`);
    } else {
      console.log(`Git version: ${stdout.trim()}`);
    }
  });

  exec('npm -v', (error, stdout) => {
    if (error) {
      console.error(`Error getting npm version: ${error}`);
    } else {
      console.log(`npm version: ${stdout.trim()}`);
    }
  });

  exec('node -v', (error, stdout) => {
    if (error) {
      console.error(`Error getting Node.js version: ${error}`);
    } else {
      console.log(`Node.js version: ${stdout.trim()}`);
    }
  });
} */

// check dates between when course started and today
let startDate = new Date('01/31/2023');
let todaysDate = new Date();

// past time difference, if going forward would be changing pos of start and todays or use and other variable like endDate or similar
const days = (startDate, todaysDate) => {
  let difference = todaysDate.getTime() - startDate.getTime();
  let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
  return TotalDays;
};
console.log(
  chalk.hex('#4203c9')(days(startDate, todaysDate) +
    ' days - since course started'
));

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
