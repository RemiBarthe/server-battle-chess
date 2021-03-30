class Unit {
    constructor(id, playerId, color, x, y) {
        this.id = id
        this.playerId = playerId
        this.color = color
        this.x = x
        this.y = y
        this.w = 40
        this.h = 40
        this.movement = 100
        this.maxActionPoint = 4
        this.actionPoint = 4
        this.maxLife = 50
        this.life = 50
        this.attackDistance = 60
        this.selected = false
        this.hovered = false
    }

    move(x, y) {
        this.x = x
        this.y = y
        this.actionPoint--
    }
}

module.exports = Unit