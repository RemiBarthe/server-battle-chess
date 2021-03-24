class Player {
    constructor(pseudo, color) {
        this.pseudo = pseudo
        this.id = +new Date()
        this.color = color
    }
}

module.exports = Player