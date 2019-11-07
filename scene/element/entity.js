class Entity {
    constructor(game, name) {
        this.game = game
        this.image = game.imageByName(name)
        this.rotation = 0
    }

    draw() {
        this.game.drawImage(this, this.rotation)
    }

    debug() {

    }


}

class EntityGroup {
    constructor(game) {
        this.game = game
        this.elements = []
    }

    getElements() {
        alert('必须继承getElements')
    }

    update() {
        alert('必须继承update')
    }

    draw() {
        for (var e of this.elements) {
            e.draw()
        }
    }

    debug() {

    }

}
