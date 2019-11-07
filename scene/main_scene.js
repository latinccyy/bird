class MainScene extends Scene{
    constructor(game) {
        super(game)
        this.init()
    }

    init() {
        this.gameOver = false
        this.bird = new Bird(this.game, 'bird')
        this.grounds = new Grounds(this.game, 'ground')
        this.pipes = new Pipes(this.game, 'pipe')
        this.addElement(this.bird)
        this.addElement(this.grounds)
        this.addElement(this.pipes)
    }

    draw() {
        for (var e of this.elements) {
            e.draw()
        }
    }

    update() {
        if (this.gameOver) {
            this.gameOverUpdate()
        } else {
            for (var e of this.elements) {
                e.debug()
                e.update()
            }
            // this.updateGameState()
        }
    }

    updateGameState() {
        for (var p of this.pipes.elements) {
            if (collide(this.bird, p)) {
                this.gameOver = true
                this.clear()
                return
            }
        }
    }

    gameOverUpdate() {
        if (this.bird.flying) {
            this.bird.update()
        } else {
            this.game.gameOver()
        }
    }

    addListener() {
        this.game.registerAction('j', () => {
            this.bird.jump()
        })
    }

    clear() {
        this.game.deregisterAction('j')
    }

}
