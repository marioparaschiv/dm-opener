<div align="center">
  <h3>DM Opener</h3>
  <a href="https://www.codefactor.io/repository/github/localip/open-all-dms">
    <img src="https://www.codefactor.io/repository/github/localip/open-all-dms/badge" />
  </a>
  <a href="https://github.com/localip/open-all-dms/issues">
    <img src="https://img.shields.io/github/issues/localip/open-all-dms?style=flat" />
  </a>
  <a href="https://github.com/localip/open-all-dms/stargazers">
    <img src="https://img.shields.io/github/stars/localip/open-all-dms?style=flat" />
  </a>
  <a href="https://discord.gg/HQ5N7Rcajc">
    <img src="https://img.shields.io/discord/887015827134632057" />
  </a>
</div>

---

<div align="center">
  Small script to extract private message channels from a @discord data package & open them on a certain account.
</div>

---

### How do i use it?
First, you'll need your data package. You can get this by going to Settings > Privacy & Safety and clicking the Request Data button at the bottom.
<br /><br />![image](https://user-images.githubusercontent.com/98427312/176322082-57a3d3c3-7034-483e-ac21-baee2b7f3777.png)

### I have my data package, now what?
- Make sure you have [NodeJS](https://nodejs.org/en/) installed
- Once you have your data package, extract it and make sure you have the messages folder inside.
- Open a Command Prompt/Terminal in this projects directory.
- Run `npm install` and wait for it to finish.
- Edit the `config.json` file with your token and User ID.
- Run `node . "C:\Users\USERNAME\Downloads\package\messages"`. (Replace the path with the path of your messages folder inside your package)
- Wait for all your DMs to open.
