import { readdirSync, readFileSync, existsSync } from 'fs';
import fetch from 'node-fetch';
import { join } from 'path';

const config = JSON.parse(readFileSync(new URL('./config.json', import.meta.url)));
const sleep = (time) => new Promise(r => setTimeout(r, time));

if (!process.argv[2]) {
   console.error('Please provide a file path pointing to the "messages" folder in your data package.');
   process.exit(-1);
}

if (!existsSync(process.argv[2])) {
   console.error('The path you provided is not valid or doesn\'t exist.');
   process.exit(-1);
}

try {
   run();
} catch (e) {
   console.log('Failed to open all your DMs: ', e.message);
}

async function run() {
   const files = readdirSync(process.argv[2]);
   for (const file of files) {
      if (file === 'index.json') continue;

      try {
         const path = join(process.argv[2], file, 'channel.json');
         const contents = readFileSync(path);
         const data = JSON.parse(contents);

         const recipients = (data.recipients ?? []).filter(r => r !== config.userid);
         if (recipients.length) {
            const res = await fetch('https://canary.discordapp.com/api/v6/users/@me/channels', {
               method: 'POST',
               body: JSON.stringify({ recipients }),
               headers: {
                  'authorization': config.token,
                  'User-Agent': config.agent,
                  'Content-Type': 'application/json'
               }
            }).then(r => r.json());

            const { username, discriminator } = res.recipients[0];
            console.log(`Opened DM with ${username}#${discriminator}`);
            await sleep(250);
         }
      } catch (e) {
         console.error('Failed to open DM', e.message);
         continue;
      }
   }
}