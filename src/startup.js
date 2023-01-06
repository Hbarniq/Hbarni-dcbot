require("dotenv").config();
const { dbToken } = process.env;
const fs = require("fs");
const { connect, set } = require("mongoose");
module.exports = (client) => {
  client.startup = async () => {
    const ffs = fs.readdirSync(`./src/functions`);
    for (const folder of ffs) {
      const files = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((files) => files.endsWith(".js"));
      for (const file of files)
        require(`./functions/${folder}/${file}`)(client);
    }

    client.handleEvents();
    client.handleCommands();
    client.handleComponents();
    client.connect()
    set("strictQuery", false);
    await connect(dbToken, { dbName: "data" }).catch(console.error);
  };
};
