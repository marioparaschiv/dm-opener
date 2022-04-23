import config from './config.json' assert { type: 'json' };

import { readdirSync, readFileSync } from 'fs';
import fetch from 'node-fetch';
import { join } from 'path';

const files = readdirSync(process.argv[2]);
for (const file of files) {
   if (file === 'index.json') continue;

   try {
      const path = join(process.argv[2], file, 'channel.json');
      const contents = readFileSync(path);
      const data = JSON.parse(contents);

      const recipients = [(data.recipients ?? []).filter(r => r !== config.userid)].filter(Boolean);
      if (recipients.length) {
         const res = await fetch('https://canary.discordapp.com/api/v9/users/@me/channels', {
            method: 'POST',
            body: JSON.stringify({ recipients }),
            headers: {
               'authorization': config.token,
               'User-Agent': config.agent,
               'Content-Type': 'application/json'
            }
         }).then(r => r.json());

         console.log(`Opened DM with ${res.recipients[0].username}#${res.recipients[0].discriminator}`);
      }
   } catch {
      continue;
   }
}
