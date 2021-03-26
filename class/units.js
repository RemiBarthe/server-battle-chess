const Unit = require('./unit')

class Units {
    constructor(id, idPlayer) {
        this.units = []
    }

    newUnit(unitId, playerId, color, x, y) {
        this.units.push(new Unit(unitId, playerId, color, x, y))
    }

    newPlayerUnits(playerId, number, color, x) {
        let y = 120
        for (let i = 0; i < number; i++) {
            const unitId = parseInt(i + '' + playerId)
            this.newUnit(unitId, playerId, color, x, y)
            y += 240
        }
    }

    getUnits() {
        return this.units
    }

    removeUnitsOfPlayer(playerId) {
        this.units = this.units.filter(unit => {
            return unit.playerId != playerId
        })
    }

    unselectPlayer(playerId) {
        this.units.forEach(unit => {
            if (unit.selected === playerId) unit.selected = false
        })
    }
}

module.exports = Units