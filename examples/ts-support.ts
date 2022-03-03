import { Cog } from "@glowbot/cogs";
import { Client } from "discord.js";
declare module "discord.js" {
	interface Client {
		commands: Cog;
		events: Cog;
	}
}
const client = new Client({
	intents: [
		/*Some intents*/
	],
});
const commands = new Cog("./commands").loadAll();
client.commands = commands;
const events = new Cog("./events")
	.setLoader((module) => {
		if (module.once) return client.once(module.name, ()=>module.execute(client));
		return client.on(module.name, module.execute);
	})
	.loadAll();
client.events = events;

client.login("");
