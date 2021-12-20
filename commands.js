const loadCommands = (client) => {
    const fs = require("fs");
    
    const folders = fs.readdirSync("./commands");
    for (const folder of folders){
        const files = fs.readdirSync(`./commands/${folder}`).filter((file) => file.endsWith(".js"));
        for (const file of files){
            const command = require(`./commands/${folder}/${file}`);
            if(command.name) client.commands.set(command.name, command);
            else console.log("Command has no valid name.");
        }
    }
};

module.exports = {loadCommands};