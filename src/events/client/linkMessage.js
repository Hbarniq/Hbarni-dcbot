const { Colors } = require("../../extra/colors");
<<<<<<< HEAD
const { fetch } = require("undici")
=======
const fetch = import("node-fetch")
>>>>>>> 5e33bc02d9a5ec58b82cad2a15091b43ba29d709
module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    if (message.author.bot) return;
    // known issue: link has to be first argument or the first in new line
    let url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/gm.exec(message.content)
    if (!url) return;
    url = url[0]

    // for searching through specific urls and replying with results
    if (url.includes("https://quizlet.com")) {
        const args = url.split("/")
        const res = await (await fetch(`https://quizlet.com/webapi/3.9/sets/${args[3]}`)).json(); if (!res) return;
        const data = res.responses[0].models.set[0]
        message.channel.createMessage({
            embeds: [{
                title: data.title,
                description: `
description: ${data.description != "" ? data.description : "No description set.."}
terms: ${data.numTerms}
last modified: <t:${data.lastModified}:R>
images: ${data.hasImages}
translation: from \`${data.wordLang}\` to \`${data.defLang}\`
                `,
                footer: {
                    text: `id: ${data.id}`
                },
                color: Colors.Neutral
            }],
            messageReference: { messageID: message.id }
        })
    }

  },
};
