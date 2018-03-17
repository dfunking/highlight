require("./StructureExtender");
const Client = require("./lib/HighlightClient");
const config = require("../config.json");

const client = new Client({
        prefix: 'h!'
	cmdEditing: true,
	cmdLogging: true,
	disableEveryone: true,
	fetchAllMembers: true,
	disabledEvents: [
		"TYPING_START",
		"MESSAGE_REACTION_ADD",
		"MESSAGE_REACTION_REMOVE",
		"MESSAGE_REACTION_REMOVE_ALL",
		"VOICE_STATE_UPDATE",
		"CHANNEL_PINS_UPDATE",
	],
	pieceDefaults: {
		commands: { deletable: true },
	},
	presence: {
		activity: {
			name: "for words",
			type: "WATCHING",
		},
	},
});

client.gateways.register("members", {
	words: {
		type: "string",
		default: [],
		min: null,
		max: null,
		array: true,
		configurable: true,
		sql: "TEXT",
	},
	blacklistedUsers: {
		type: "user",
		default: [],
		min: null,
		max: null,
		array: true,
		configurable: true,
		sql: "TEXT",
	},
	blacklistedChannels: {
		type: "textchannel",
		default: [],
		min: null,
		max: null,
		array: true,
		configurable: true,
		sql: "TEXT",
	},
}, { provider: "json" });

client.login(config.token);
