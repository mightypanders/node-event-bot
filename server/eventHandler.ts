import { Collection, Guild, GuildScheduledEvent, Snowflake } from "discord.js";

export default class eventHandler {

	public constructor() {
		console.log('constructed')
	}
	public listAllEvents(guild: Guild): string {

		const eventManager = guild.scheduledEvents
		const events: Collection<Snowflake, GuildScheduledEvent> = eventManager.cache
		const entries = events.values()
		let output = ""

		for (const e of entries) {
			console.log(e)
			output += e.toString()
		}
		console.log(output)
		return output
	}
}
