const Unit = require('./unit')

class Units {
    constructor(id, idPlayer) {
        this.units = []
    }

    newUnit(unitId, playerId, color) {
        this.units.push(new Unit(unitId, playerId, color))
    }

    newPlayerUnits(playerId, number, color) {
        for (let i = 0; i < number; i++) {
            const unitId = parseInt(i + '' + playerId)
            this.newUnit(unitId, playerId, color)
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
            if (unit.playerId === playerId) unit.selected = false
        })
    }
}

module.exports = Units