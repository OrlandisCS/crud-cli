require("colors");
const chalk = require("chalk");
const figlet = require("figlet");
const msn = (msn) => {
  console.log(
    "\n",
    chalk.bold.cyan("\n",
      figlet.textSync(msn.toUpperCase(), {
        font: "ANSI Shadow",
        horizontalLayout: "default",
        verticalLayout: "default",
      }),
     )
  );
};
module.exports = msn;
