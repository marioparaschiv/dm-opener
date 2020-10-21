const config = require('./config.json');
const fetch = require('node-fetch');
const fs = require('fs');

(async function () {
   let files = await readDir(process.argv[2]);
   for (const file of files) {
      if (file === 'index.json') return;
      let data = await readFile(`${process.argv[2]}\\${file}\\channel.json`);
      data = JSON.parse(data);
      let body = {
         recipients: [data.recipients ? data.recipients.filter((r) => r !== config.userid)[0] : '']
      };
      if (body.recipients[0] !== '') {
         let response = await fetch('https://canary.discordapp.com/api/v6/users/@me/channels', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
               'authorization': config.token,
               'User-Agent': config.agent,
               'Content-Type': 'application/json'
            }
         });
         let res = await response.json();
         console.log(`Opened DM with ${res.recipients[0].username}#${res.recipients[0].discriminator}`);
      }
   }
})();

async function readFile(path) {
   return new Promise((resolve, reject) => {
      fs.readFile(path, function (err, data) {
         if (err) {
            reject(err);
         }
         resolve(data);
      });
   });
}

async function readDir(path) {
   return new Promise((resolve, reject) => {
      fs.readdir(path, function (err, data) {
         if (err) {
            reject(err);
         }
         resolve(data);
      });
   });
}
