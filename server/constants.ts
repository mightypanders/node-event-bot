import { localized_string } from "./interfaces"

export const reactions = {
	troll_grin: "U+1F92A",
	angry_face: "U+1F621",
	ok: "U+1F44C"
}
export const commands = {
	LIST_COMMAND: "list",
	REGISTER_COMMAND: "register",
	REMOVE_COMMAND: "remove",
	SHOW_FOR_STEAM_COMMAND: "forsteam",
	SHOW_COMMAND: "show"
}
export const msg_strings: localized_string = {
	greeting: {
		german: "Ich wurde neugestartet. Bitte registriert euch erneut, falls ihr automatisch gemutet werden wollt :)",
		english: "I have been restarted. Please register again if you want to be muted automatically :)"
	},
	fmt_registered_user: {
		german: "Habe den Steamname {steam_name} mit dem Discordnamen {discord_name} verknüpft.",
		english: "Registered the steam name {steam_name} for the discord name {discord_name}."
	},
	fmt_registered_for_steam: {
		german: "Aktuell registriert für User {steam_name}: {discord_name}",
		english: "Currently registered for user {steam_name}: {discord_name}"
	},
	fmt_registered_for_discord: {
		german: "Aktuell registriert für User {discord_name}: {steam_name}",
		english: "Currently registered for user {discord_name}: {steam_name}"
	},
	user_was_not_registered: {
		german: "Du warst gar nicht registriert.",
		english: "You weren't even registered.",
	},
	user_has_been_removed: {
		german: "Du wurdest aus der Liste entfernt.",
		english: "You were removed from the list.",
	},
	currently_registered: {
		german: "Aktuell registriert: \n {playerlist}",
		english: "Currently registered: \n {playerlist}"
	},
	troll_rejection: {
		german: "Nöööö, du nicht...",
		english: "Naaaah, not you..."
	},
	troll_rejection_second_part: {
		german: "Spaß, hab dich registriert: :P",
		english: "Just kidding, you are registered: :P"
	}
}
