import { CommandInteraction, GuildMember } from "discord.js"
import RegistrationHandler from "./RegistrationHandler"

export type Maybe<T> = T | undefined
export interface Player {
	name: string
}
export type supported_languages = "german" | "english"
export interface localized_string {
	[k: string]: {
		german: string,
		english: string
	}
}
export interface userNameBinding {
	Steam: string,
	DiscordUser: GuildMember
}
export interface discordCommand {
	name: string,
	description: string
	options?: any[]
	performCommand(interaction: CommandInteraction, registration: RegistrationHandler): Promise<void>
}
