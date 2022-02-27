import { Collection, Guild, GuildScheduledEvent, Snowflake } from "discord.js";

export default class eventHandler {

	public constructor() {
		console.log('constructed')
	}
	public getNextEvent(guild: Guild): string {
		const eventManager = guild.scheduledEvents
		const events = eventManager.cache
		const sortedEvents = events.sort(function(a, b) { return Number(a.scheduledStartAt) - Number(b.scheduledStartAt) })

		console.log(JSON.stringify(events))
		console.log(JSON.stringify(sortedEvents))

		return sortedEvents.first()?.toString() ?? ""
	}
	public listAllEvents(guild: Guild): string {

		const eventManager = guild.scheduledEvents
		const events: Collection<Snowflake, GuildScheduledEvent> = eventManager.cache
		const entries = events.values()
		let output = ""

		for (const e of entries) {
			console.log(e)
			output += "\n"
			output += e.toString()
		}
		console.log(output)
		return output
	}
}
