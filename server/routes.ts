import express from "express";
import MuteHandler from "./MuteHandler";

export default class Routes {
	public constructor(
		private muteHandler = new MuteHandler()
	) { }

	public setRoutes(app: express.Application): void {
		app.route('').get(this.landingPage.bind(this))
		app.route('/').get(this.landingPage.bind(this))
		app.route('/mute').post(this.mutePlayer.bind(this))
		app.route('/unmute/all').post(this.unmuteAll.bind(this))
		app.route('/unmute/:id').post(this.unmutePlayer.bind(this))
	}
	private async mutePlayer(req: express.Request, res: express.Response): Promise<void> {
		const playerName = req.body.name
		console.log(`Muting player ${playerName}`)
		this.muteHandler.mute(playerName)
		res.status(200).json()
	}
	private async unmuteAll(_: express.Request, res: express.Response): Promise<void> {
		console.log(`Unmuting all players`)
		this.muteHandler.unmuteAll()
		res.status(200).json()
	}
	private async unmutePlayer(req: express.Request, res: express.Response): Promise<void> {
		const playerName = req.body.name
		console.log(`Unmuting player ${playerName}`)
		this.muteHandler.unmute(playerName)
		res.status(200).json()
	}
	private async landingPage(_: express.Request, res: express.Response): Promise<void> {
		res.send('Hello World')
	}
}
