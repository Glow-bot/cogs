import type {Client} from "discord.js"
module.exports = {
    execute:(client:Client)=>{
        console.log(client.user?.tag)
    }
}