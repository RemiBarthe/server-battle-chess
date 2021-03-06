const Express = require('express')()
const Http = require('http').Server(Express)
const Socketio = require('socket.io')(Http, {
    cors: {
        origin: 'http://localhost:8081',
        methods: ['GET', 'POST']
    }
})

const Player = require('./class/player')
const Wall = require('./class/wall')
const Units = require('./class/units')

const COLOR_PLAYER_1 = "#1E9AE1"
const COLOR_SECONDARY_PLAYER_1 = "#4BAEE7"
const COLOR_PLAYER_2 = "#E1651E"
const COLOR_SECONDARY_PLAYER_2 = "#E7844B"


let players = []
let units = new Units()
let playerTurn = ""

function getWalls(number) {
    let walls = []

    for (let i = 0; i < number; i++) {
        const wall = new Wall(i)
        wall.setRandomXY()
        walls.push(wall)
    }

    return walls
}

const walls = getWalls(20)


Socketio.on('connection', socket => {
    const isSecondPlayer = socket.handshake.query.secondPlayer === 'true'

    Socketio.emit('walls', walls)

    let player = null
    if (players.length < 2) {

        let color = COLOR_PLAYER_1
        let secondaryColor = COLOR_SECONDARY_PLAYER_1
        let pseudo = "Patrice"
        let x = 40

        if (isSecondPlayer) {
            color = COLOR_PLAYER_2
            secondaryColor = COLOR_SECONDARY_PLAYER_2
            pseudo = "Frank"
            x = 1120
        }

        player = new Player(pseudo, color, secondaryColor)
        players.push(player)
        units.newPlayerUnits(player.id, 3, color, x)
        playerTurn = player

        socket.emit('currentPlayer', player)
        Socketio.emit('players', players)
        Socketio.emit('playerTurn', playerTurn)
    }
    else {
        socket.emit('players', players)
    }

    Socketio.emit('units', units.getUnits())

    socket.on('playerTurn', player => {
        playerTurn = player
        Socketio.emit('playerTurn', playerTurn)

        units.resetActionPoint()
        Socketio.emit('units', units.getUnits())
    })

    socket.on('moveUnit', (unitSelectedId, x, y) => {
        units.unselectPlayer(player.id)
        const unit = units.getUnits().find(unit => unit.id === unitSelectedId)
        unit.move(x, y)
        unit.selected = player.id
        socket.emit('selectedUnit', unit)
        socket.broadcast.emit('opponentSelectedUnit', unit)
        Socketio.emit('units', units.getUnits())
    })

    socket.on('selectUnit', unitSelectedId => {
        units.unselectPlayer(player.id)
        const unit = units.getUnits().find(unit => unit.id === unitSelectedId)
        unit.selected = player.id
        socket.emit('selectedUnit', unit)
        socket.broadcast.emit('opponentSelectedUnit', unit)
        Socketio.emit('units', units.getUnits())
    })

    socket.on('disconnect', () => {
        if (player) {
            players = players.filter((value) => {
                return value.id !== player.id
            })

            units.removeUnitsOfPlayer(player.id)

            Socketio.emit('players', players)
            Socketio.emit('units', units.getUnits())
        }
    })
})

Http.listen(3000, () => {
    console.log('Listening at :3000')
})