export const name = 'guildScheduledEventUpdate'
export function execute(oldguildScheduledEvent: any,newguildScheduledEvent: any) {
	console.log(`${JSON.stringify(oldguildScheduledEvent)} has been Updated to be ${newguildScheduledEvent}`)
}
