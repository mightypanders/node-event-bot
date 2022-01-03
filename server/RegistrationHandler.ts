import { GuildMember } from "discord.js"
import { Maybe, userNameBinding } from "./interfaces"

export default class RegistrationHandler {
	private userRegister: userNameBinding[] = []
	private static _instance: RegistrationHandler
	public constructor() {
		console.log('Setup RegistrationHandler')
	}
	public static get Instance() {
		return this._instance || (this._instance = new this())
	}

	public register(discordUser: GuildMember, steamname: string): boolean {
		try {

			const binding: userNameBinding = {
				Steam: steamname,
				DiscordUser: discordUser
			}
			console.log(`Trying to register ${JSON.stringify(binding)}`)
			let alreadyPresentBinding = this.userRegister.find(x => x.DiscordUser.user.username == binding.DiscordUser.user.username)
			if (alreadyPresentBinding) {
				console.log(`Binding already present: ${JSON.stringify(alreadyPresentBinding)}, overwriting.`)
				alreadyPresentBinding = binding
			}
			else {
				this.userRegister.push(binding)
				console.log(`Binding successfully added.`)
			}
		} catch (error) {
			console.error(error)
			return false
		}
		return true
	}
	public getAllMappings(): userNameBinding[] {
		return this.userRegister
	}
	public removeUser(discordUser: GuildMember): void {
		this.userRegister = this.userRegister.filter(x => x.DiscordUser.user.id !== discordUser.user.id)
	}
	public getNameRegisteredForDiscordUser(discordUser: GuildMember): Maybe<userNameBinding> {
		return this.userRegister.find(x => x.DiscordUser.user.id == discordUser.user.id)
	}
	public getNameRegisteredForSteamUser(steamUser: string): Maybe<userNameBinding> {
		return this.userRegister.find(x => x.Steam == steamUser)
	}
	public listRegisteredMembers(): string {
		const output = this.userRegister.map(x => `${x.DiscordUser.user.username} : ${x.Steam}\n`)
		return output.join()
	}
	private printHelpText(): string { return "" }
	private buildHelpText(): string { return "" }
}
