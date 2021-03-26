class Unit {
    constructor(id, playerId, color, x, y) {
        this.id = id
        this.playerId = playerId
        this.color = color
        this.x = x
        this.y = y
        this.w = 40
        this.h = 40
        this.selected = false
        this.hovered = false
        this.movement = 100
        this.maxLife = 50
        this.life = 50
        this.actionPoint = 4
    }
}

module.exports = Unit