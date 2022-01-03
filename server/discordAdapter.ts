import { REST } from '@discordjs/rest'
import { SlashCommandBuilder } from '@discordjs/builders'
import { commands } from './constants'
import { Routes } from 'discord-api-types/v9'
import { config } from './configuration'
import { Client, CommandInteraction, GuildMember, Intents, Interaction } from 'discord.js'
import RegistrationHandler from './RegistrationHandler'
import { discordCommand } from './interfaces'

export default class DiscordAdapter {
	private rest: REST
	private client: Client
	private registration: RegistrationHandler
	public constructor() {
		this.rest = new REST({ version: '9' }).setToken(config.token)
		this.client = new Client({ intents: [Intents.FLAGS.GUILDS] })
		this.registration = RegistrationHandler.Instance
		this.setupCallbacks(this.client)
		this.client.login(config.token)
		this.registerCommands(this.commandList)
	}
	public async registerCommands(pCommands: discordCommand[]) {
		try {
			console.log('Refreshing slash commands')
			await this.rest.put(Routes.applicationGuildCommands(config.client_id, config.guild_id), { body: pCommands })
			console.log('Successfully refreshed slash commands')
		} catch (error) {
			console.log(`Error refreshing slash commands: ${error}`)
		}
	}
	private setupCallbacks(c: Client) {
		c.on('ready', () => {
			console.log(`Logged in as ${c.user?.tag}`)
		})
		c.on('interactionCreate', async interaction => {
			if (!interaction.isCommand()) return
			const interactionCommand = this.commandList.find(x => x.name == interaction.commandName)
			if (interactionCommand)
				interactionCommand.performCommand(interaction, this.registration)
		})
	}
	public async echoes(interaction: CommandInteraction, registration: RegistrationHandler): Promise<void> {
		const value = interaction.options.getString('input')
		const member: GuildMember = <GuildMember>interaction.member
		try {
			console.log(`Member ${member.user.username} mute state: ${member.voice.mute}`)
			member.voice.setMute(!member.voice.mute, "test")
		} catch (error) {
			console.error(error)
		}
		await interaction.reply(`This should be an echo: ${value}`)
	}
	public async listUsers(interaction: CommandInteraction, registration: RegistrationHandler): Promise<void> {
		const result = registration.listRegisteredMembers()
		await interaction.reply(result)
	}
	public async removeUser(interaction: CommandInteraction, registration: RegistrationHandler): Promise<void> {
		const discordUser: GuildMember = <GuildMember>interaction.member
		registration.removeUser(discordUser)
		await interaction.reply(`User has been removed`)
		return
	}
	public async registerUser(interaction: CommandInteraction, registration: RegistrationHandler): Promise<void> {
		const discordUser: GuildMember = <GuildMember>interaction.member
		const steamNameToRegister = interaction.options.getString('steamname')
		console.dir(discordUser)
		if (!steamNameToRegister) {
			await interaction.reply(`No steam name supplied, can't register`)
		}
		else {
			registration.register(discordUser, steamNameToRegister)
			await interaction.reply(`This should register user ${discordUser.user.username} with id ${discordUser.user.id} to use steamname: ${steamNameToRegister}`)
		}
		return
	}
	public async showForSteam(interaction: CommandInteraction, registration: RegistrationHandler): Promise<void> {
		const steamName = interaction.options.getString('steamname')
		if (!steamName) {
			await interaction.reply(`No steam name supplied, can't search`)
		} else {
			const result = registration.getNameRegisteredForSteamUser(steamName)
			await interaction.reply(JSON.stringify(result, null, 2))
		}
		return
	}
	public async show(interaction: CommandInteraction, registration: RegistrationHandler): Promise<void> {
		const discordUser: GuildMember = <GuildMember>interaction.member
		const result = registration.getNameRegisteredForDiscordUser(discordUser)
		await interaction.reply(JSON.stringify(result, null, 2))
		return
	}

	public commandList: discordCommand[] = [
		{
			name: "echo",
			description: "Echoes a string",
			performCommand: this.echoes,
			options: [
				{
					name: 'input',
					description: 'The input that should be echoed',
					required: true,
					type: 3
				}
			]
		},
		{
			name: commands.LIST_COMMAND,
			description: "Lists all registerd users",
			performCommand: this.listUsers
		},
		{
			name: commands.REMOVE_COMMAND,
			description: "Remove the mapping for this discord user",
			performCommand: this.removeUser
		},
		{
			name: commands.REGISTER_COMMAND,
			description: "Register the senders discord name for a supplied steam name",
			options: [
				{
					name: 'steamname',
					description: 'The steamname that should be registered',
					required: true,
					type: 3
				}
			],
			performCommand: this.registerUser
		},
		{
			name: commands.SHOW_FOR_STEAM_COMMAND,
			description: "Show the discord that's registered for a steam name",
			performCommand: this.showForSteam,
			options: [
				{
					name: 'steamname',
					description: 'The steamname that should be searched',
					required: true,
					type: 3
				}
			],
		},
		{
			name: commands.SHOW_COMMAND,
			description: "Show the Steamname that's registered for this discord name",
			performCommand: this.show
		}
	]
}
