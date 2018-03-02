const { Client } = require("klasa");

module.exports = class HighlightClient extends Client {
	async login (token) {
		// Same Jacz
		await Promise.all(this.pieceStores.map(store => store.loadAll())).catch(err => {
			console.error(err);
			process.exit(-1);
		});
		await this.providers.init();
		await this.gateways.add("members", {
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
		}, { provider: "json" }, false);
		return super.login(token);
	}
};