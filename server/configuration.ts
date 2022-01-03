import dotenv from "dotenv"
dotenv.config()

export const config = {
	server: {
		bodyParser: {
			urlEncodedOptions: {
				inflate: true,
				limit: '5mb',
				type: 'application/x-www-form-urlencoded',
				extended: true,
				parameterLimit: 1000
			},
			jsonOptions: {
				inflate: true,
				limit: '5mb',
				type: 'application/json',
				strict: true
			}
		}
	},
	debug: true,
	port: 1234,
	token: process.env.BOT_TOKEN ?? "",
	guild_id: process.env.GUILD_ID ?? "",
	client_id: process.env.CLIENT_ID ?? ""
}
