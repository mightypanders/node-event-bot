import express, { Application } from "express"
import { config } from "./server/configuration"
import DiscordAdapter from "./server/discordAdapter"
import Routes from "./server/routes"
import Server from "./server/server"

const server = Server.init(config.port)

server.start(() => {
	console.log(`Server running on port ${server.getPort()}`)
	new Routes().setRoutes(server.getApp())
	const discordAdapter = new DiscordAdapter()
})
