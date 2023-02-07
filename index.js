import chalk from 'chalk';

console.log(
  chalk.green(
    'Green light means go! ' +
      chalk.hex('#FFC0CB').underline.bold('with a pink substring')
  )
);
console.log(chalk.blue('The skies are blue!'));
console.log(chalk.red('Red could show warning or Error'));
console.log(chalk.yellow('Usually shows to wait!'));
