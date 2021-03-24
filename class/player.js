class Player {
    constructor(pseudo, color, secondaryColor) {
        this.pseudo = pseudo
        this.id = +new Date()
        this.color = color
        this.secondaryColor = secondaryColor
    }
}

module.exports = Player