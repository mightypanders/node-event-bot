import { GuildMember } from "discord.js"
import RegistrationHandler from "../server/RegistrationHandler"

const guildMember: GuildMember = <GuildMember><unknown>{
	guild: {
		id: 'guild_id',
		name: 'Bot Playground',
		icon: null,
		features: [],
		commands: { permissions: [], guild: [] },
		members: { guild: [] },
		channels: { guild: [] },
		bans: { guild: [] },
		roles: { guild: [] },
		presences: {},
		voiceStates: { guild: [] },
		stageInstances: { guild: [] },
		invites: { guild: [] },
		deleted: false,
		available: true,
		shardId: 0,
		splash: null,
		banner: null,
		description: null,
		verificationLevel: 'NONE',
		vanityURLCode: null,
		nsfwLevel: 'DEFAULT',
		discoverySplash: null,
		memberCount: 2,
		large: false,
		applicationId: null,
		afkTimeout: 300,
		afkChannelId: null,
		systemChannelId: 'channel_id',
		premiumTier: 'NONE',
		premiumSubscriptionCount: 0,
		explicitContentFilter: 'DISABLED',
		mfaLevel: 'NONE',
		joinedTimestamp: 1636540056755,
		defaultMessageNotifications: 'ALL_MESSAGES',
		systemChannelFlags: { bitfield: 0 },
		maximumMembers: 250000,
		maximumPresences: null,
		approximateMemberCount: null,
		approximatePresenceCount: null,
		vanityURLUses: null,
		rulesChannelId: null,
		publicUpdatesChannelId: null,
		preferredLocale: 'en-US',
		ownerId: 'ownerID',
		emojis: { guild: [] },
		stickers: { guild: [] }
	},
	joinedTimestamp: 1636539420924,
	premiumSinceTimestamp: null,
	deleted: false,
	nickname: null,
	pending: false,
	_roles: [],
	user: {
		id: 'user_id',
		bot: false,
		system: false,
		flags: { bitfield: 256 },
		username: 'username',
		discriminator: '0965',
		avatar: 'avatar_string',
		banner: undefined,
		accentColor: undefined
	},
	avatar: null
}

const registeredUser = {
	"Steam": "abc",
	"DiscordUser": guildMember
}


test(`Instances`, () => {
	const register = RegistrationHandler.Instance
	expect(register).toBeDefined()
})
test(`Registration works`, () => {
	const register = RegistrationHandler.Instance
	register.register(<GuildMember>guildMember, "abc")
	const result = register.getAllMappings()
	console.log(JSON.stringify(result))
	expect(result).toBeDefined()
	expect(result).toEqual([registeredUser])
})
