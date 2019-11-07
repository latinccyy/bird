

class Game {
    constructor(runCallback) {
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')
        this.context.font = '20px serif';
        this.context.fillStyle = "blue"
        this.actions = {}
        this.keydowns = {}
        this.images = {}
        this.scene = null

        this.addListener()
        this.loadImages(runCallback)


    }

    loadImages(runCallback) {
        var images = this.getImagePath()
        var names = Object.keys(images)
        var load = 0
        for (var i = 0; i < names.length; i++) {
            let name = names[i]
            var path = images[name]
            let img = new Image()
            img.src = path
            img.onload = () => {
                this.images[name] = img
                load += 1
                var loadAll = load == names.length
                if (loadAll) {
                    this.__start(runCallback)
                }
            }
        }
    }

    getImagePath() {
        var images = {
            'ball':         'image/ball.png',
            'brick':        'image/brick.png',
            'paddle':       'image/paddle.png',
            'background':   'image/background.jpg',
            'bird':         'image/bird.jpg',
            'ground':       'image/ground.png',
            'pipe':         'image/pipe.png',
        }
        return images
    }

    __start(runCallback) {
        runCallback()
    }

    newGame() {
        var s = new MainScene(this)
        this.changeScene(s)
    }

    imageByName(name) {
        return this.images[name]
    }

    run() {
        setTimeout(() => {
            this.runLoop()
            this.run()
        }, this.getFps())
    }

    runLoop() {
        if (!pause) {
            this.update()
        }
        this.clear()
        this.draw()
    }

    getFps() {
        var fps = config['fps'].value
        return 1000/Number(fps)
    }

    gameOver() {
        var s = new EndScene(this)
        this.changeScene(s)
    }

    addListener() {
        window.addEventListener('keydown', event => {
            this.keydowns[event.key] = true
        })

        window.addEventListener('keyup', event => {
            this.keydowns[event.key] = false
        })

    }

    registerAction(key, callback) {
        this.actions[key] = callback
    }

    deregisterAction(key, callback) {
        delete this.actions[key]
    }

    changeScene(newScene) {
        var clearOk = this.scene.clear()
        this.scene = newScene
    }

    update() {
        this.scene.update()
        for (var k in this.actions) {
            if (this.keydowns[k]) {
                this.actions[k]()
            }
        }
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    draw () {
        var bg = new BackGround(this, 'background')
        bg.draw()
        this.scene.draw()
    }

    drawImage(image, rotation) {
        // log('drawImage', image)
        var ctx = this.context
        var withoutRotate = rotation == null
        if (withoutRotate) {
            ctx.drawImage(image.image, image.x, image.y, image.w, image.h)
        } else {
            ctx.save()
            var r = rotation * Math.PI / 180
            var w = image.w / 2
            var h = image.h / 2
            ctx.translate(image.x + w, image.y + h)
            ctx.rotate(r)
            ctx.translate(-w, -h)
            ctx.drawImage(image.image, 0, 0, image.w, image.h)
            ctx.restore()
        }
    }

    drawText(text, x, y) {
        this.context.fillText(text, x, y)
    }
}
