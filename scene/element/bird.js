class Bird extends Entity {
    constructor(game, name) {
        super(game, name)
        this.init()
    }

    init() {
        this.x = 100
        this.y = 150
        this.h = 40
        this.w = 40
        this.flying = true
        this.dropSpeed = 5
        this.jumpSpeed = -15
    }

    update() {
        this.drop()
    }

    drop() {
        this.rotation = 45
        this.flying = this.y < window.height - this.h
        if (this.flying) {
            this.y += this.dropSpeed
        }
    }

    jump() {
        this.rotation = -45
        if (this.y > 0) {
            this.y += this.jumpSpeed
        }
    }





}
