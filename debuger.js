

function template(key, item) {
    var t = `
        <div>
            <label>
                <input class='controler_input' type="range"
                     id='${key}' value='${item.value}'
                     max='${item.max}'>
                ${item.comment}:
                <span class='value'>${item.value}</span>
            </label>
        </div>
    `
    return t
}

function insertConfigHtml() {
    var div = document.querySelector('.controler')
    var keys = Object.keys(config)
    for (var k of keys) {
        var item = config[k]
        var html = template(k, item)
        div.insertAdjacentHTML('beforeend', html)
    }
}

function bindEvents(selector, eventName, callback) {
    var es = document.querySelectorAll(selector)
    for (let e of es) {
        e.addEventListener(eventName, function(event) {
            callback(event)
        })
    }
}

function bindControler() {
    bindEvents('.controler_input', 'input', function(event) {
        var input = event.target
        var v = input.value
        config[input.id].value = v
        var label = input.closest('label').querySelector('.value')
        label.innerText = v
    })
}

function setControler() {
    insertConfigHtml()
    bindControler()
}


function debugMode(game, enable) {
    if (!enable) {
        return
    }
    listenPause()
    listenLoadLevel(game)
    listenDragBall(game)
    listenEndScene(game)
}

function listenEndScene(game) {
    window.addEventListener('keydown', function(event) {
        if (event.key == 'o') {
            game.gameOver()
        }
    })

}

function listenLoadLevel(game) {
    window.addEventListener('keydown', function(event) {
        if ('0123456'.includes(event.key)) {
            var level = event.key
            var bricks = loadLevel(game, level)
            game.scene.bricks = bricks
        }
    })
}

function listenPause() {
    pause = false
    window.addEventListener('keydown', function(event) {
        if (event.key == 'p') {
            pause = !pause
        }
    })
}

function listenDragBall(game) {
    var canMove = false
    window.addEventListener('mousedown', function(event) {
        var b = game.scene.ball
        if (b && b.hasPoint(event.offsetX, event.offsetY)) {
            canMove = true
        }
    })

    window.addEventListener('mousemove', function(event) {
        if (canMove) {
            b = game.scene.ball
            b.x = event.offsetX
            b.y = event.offsetY
        }
    })

    window.addEventListener('mouseup', function(event) {
        canMove = false
    })
}
