class Wall {
    constructor(id) {
        this.id = id
        this.x = 0
        this.y = 0
        this.w = 40
        this.h = 40
    }

    setRandomXY() {
        const xNotAvailable = [40, 1120]
        this.x = Math.floor(Math.random() * 30) * 40

        this.y = Math.floor(Math.random() * 20) * 40

        if (xNotAvailable.includes(this.x)) {
            this.setRandomXY()
        }
    }
}

module.exports = Wall