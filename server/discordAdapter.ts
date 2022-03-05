import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { config } from './configuration'
import { Client, CommandInteraction, Intents, } from 'discord.js'
import { discordCommand } from './interfaces'
import eventHandler from './eventHandler'
import fs from 'fs'

export default class DiscordAdapter {
	private rest: REST
	private client: Client
	private eventFilePath = `${__dirname}/events`

	public constructor() {
		this.rest = new REST({ version: '9' }).setToken(config.token)
		this.client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_SCHEDULED_EVENTS] })
		this.registerEventCallback().then(() => {
			this.client.login(config.token)
		})
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
	private async importFile(filepath: string): Promise<any> {
		console.debug(`Importing ${filepath}`)
		const imported = await import(filepath)
		console.debug(`Imported ${JSON.stringify(imported)}`)
		return imported
	}
	public async registerEventCallback() {
		try {
			const eventFiles = fs.readdirSync(this.eventFilePath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));
			for (const file of eventFiles) {
				const filePath = `${this.eventFilePath}/${file}`
				const event = await this.importFile(filePath)
				if (event.once) {
					console.log(`Registering once ${file}`)
					this.client.once(event.name, (...args: any[]) => event.execute(...args))
				}
				else {
					console.log(`Registering on ${file}`)
					this.client.on(event.name, (...args: any[]) => event.execute(...args))
				}
			}
			console.log(this.client.eventNames())
		} catch (error) {
			console.error(error)
		}
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
