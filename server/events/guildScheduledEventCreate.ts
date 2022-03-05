import { GuildScheduledEvent } from 'discord.js'
export const name = 'guildScheduledEventCreate'
export function execute(guildScheduledEvent: GuildScheduledEvent) {
	try{
	console.log(`${JSON.stringify(guildScheduledEvent)} has been created.`)
	}catch(error) {
		console.error(error)
	}
}
