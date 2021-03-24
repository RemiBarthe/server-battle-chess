class Wall {
    constructor(id) {
        this.id = id
        this.x = 200
        this.y = 80
        this.w = 40
        this.h = 40
    }

    setRandomXY() {
        this.x = Math.floor(Math.random() * 30) * 40
        this.y = Math.floor(Math.random() * 20) * 40
    }
}

module.exports = Wall