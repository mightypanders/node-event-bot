import bodyParser from "body-parser"
import cors from "cors"
import express from "express"
import { config } from "./configuration"

export default class Server {
	private app: express.Application
	private port: number

	public constructor(port: number) {
		this.port = port
		this.app = express()
	}
	public static init(port: number): Server {
		return new Server(port)
	}
	public start(callback: (...args: any[]) => void): void {
		this.setBodyParser()
		this.setCors()
		this.getApp().listen(this.port, callback)

	}
	public getApp(): express.Application {
		return this.app
	}
	public getPort(): number {
		return this.port
	}
	private setBodyParser(): void {
		this.getApp().use(bodyParser.urlencoded(config.server.bodyParser.urlEncodedOptions))
		this.getApp().use(bodyParser.json(config.server.bodyParser.jsonOptions))
	}
	private setCors(): void {
		this.getApp().use(cors())
	}
}
