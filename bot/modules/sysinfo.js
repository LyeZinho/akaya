const chalk = require("chalk");
const si = require('systeminformation');

async function systemInfo() {
  let date = new Date();
  const log = console.log;
  let time =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  let curdate =
    date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
  log(chalk.green(`[${time}]`) + " / " + chalk.blue(`[${curdate}]`));

  //Cpu
  si.cpu().then((data) => {
    const log = console.log;
    let speed = data.speed;
    let cores = data.cores;
    log(
      chalk.green(`[${time}]`) +
        " CPU: " +
        chalk.yellow(`${speed}`) +
        " MHz " +
        chalk.green(`(${cores} cores)`)
    );
  });

  //Ram
  si.mem().then((data) => {
    const log = console.log;
    let total = data.total;
    let free = data.free;
    log(
      chalk.green(`[${time}]`) +
        " RAM: " +
        chalk.yellow(`${free}`) +
        " MB " +
        chalk.green(`(${total} MB)`)
    );
  });
  console.log();

  //Network
  si.networkInterfaces().then((data) => {
    const log = console.log;
    let speed = data[0].speed;
    let ip = data[0].ipv4;
    let mac = data[0].mac;
    let gateway = data[0].gateway;
    let subnet = data[0].subnet;
    let dns = data[0].dns;
    log(
      chalk.green(`[${time}]`) +
        " Network: " +
        chalk.yellow(`${ip}`) +
        " " +
        chalk.green(`(${mac})`) +
        " " +
        chalk.green(`(${gateway})`) +
        " " +
        chalk.green(`(${subnet})`) +
        " " +
        chalk.green(`(${dns})`)
    );
    log(
      chalk.green(`[${time}]`) +
        " Network: " +
        chalk.yellow(`${speed}`) +
        " Mbps"
    );
  });

    //Disk
    si.fsSize().then((data) => {
        const log = console.log;
        let total = data[0].size;
        let free = data[0].free;
        log(
            chalk.green(`[${time}]`) +
                " Disk: " +
                chalk.yellow(`${free}`) +
                " MB " +
                chalk.green(`(${total} MB)`)
        );
    });
}

module.exports = {
    systemInfo
}
