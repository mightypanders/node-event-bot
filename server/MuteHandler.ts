import RegistrationHandler from "./RegistrationHandler"

export default class MuteHandler {
	public mute(player: string): boolean {
		const register = RegistrationHandler.Instance
		const binding = register.getNameRegisteredForSteamUser(player)
		console.log(`Performing mute wizardry on ${player}, ${JSON.stringify(binding)}`)


		return true
	}
	public unmute(player: string): boolean {
		const register = RegistrationHandler.Instance
		const binding = register.getNameRegisteredForSteamUser(player)
		console.log(`Performing unmute wizardry on ${player}`)
		return true
	}
	public unmuteAll(): boolean {
		const register = RegistrationHandler.Instance
		const binding = register.getAllMappings()

		console.log(`Performing unmute wizardry on all players`)
		return true
	}
}
