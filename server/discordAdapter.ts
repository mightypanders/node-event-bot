import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { config } from './configuration'
import { Client, Collection, CommandInteraction, GuildMember, GuildScheduledEvent, GuildScheduledEventManager, Intents, Snowflake } from 'discord.js'
import RegistrationHandler from './RegistrationHandler'
import { discordCommand } from './interfaces'
import eventHandler from './eventHandler'

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
	public async showNext(interaction: CommandInteraction): Promise<void> {
		const guild = interaction.guild
		if (!guild) {
			console.log(`There is no guild here`)
			return
		}

		const output = new eventHandler().getNextEvent(guild)
		await interaction.reply(output)
		return
	}
	public async listEvents(interaction: CommandInteraction): Promise<void> {
		const guild = interaction.guild
		if (!guild) {
			console.log(`There is no guild here`)
			return
		}

		const output = new eventHandler().listAllEvents(guild)
		await interaction.reply(output)
	}

	public commandList: discordCommand[] = [
		{
			name: "shownext",
			description: "Shows next Events",
			performCommand: this.showNext
		},
		{
			name: "listevents",
			description: "Lists all Events",
			performCommand: this.listEvents
		}
	]
}
