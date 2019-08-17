const fs = require('fs');

const blockInfoFile = './server/res/block_info.json'

class BlockInfo {
	constructor() {
		let json = JSON.parse(fs.readFileSync(blockInfoFile, 'utf8'))
		this.info = json.Info
		this.nameIdMap = {}
		for (let i = 0; i < this.info.length; i++) {
			if (this.info[i] && this.info[i].name) {
				this.nameIdMap[this.info[i].name] = i
			}
			for (const [key, value] of Object.entries(json.Default)) {
				if (this.info[i][key] === undefined) {
					this.info[i][key] = value
				}
			}
		}
	}

	getIdByName(name) {
		return this.nameIdMap[name]
	}

	getInfoById(id) {
		return this.info[id]
	}

	getInfoByName(name) {
		return this.getInfoById(this.getIdByName(name))
	}

	get(id) {
		return this.getInfoById(id)
	}
}

module.exports = new BlockInfo()
