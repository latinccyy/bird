

var log = console.log.bind(console)

function randomInt(min, max) {
    var r = Math.random() * (max - min + 1)
    return Math.floor(r) + min;
}

function imageFromPath(path) {
    var img = new Image();
    img.src = path;
    return img

}

function collide(rect1, rect2) {
    var collideX = rect1.x < rect2.x + rect2.w
            && rect1.x + rect1.w > rect2.x
    var collideY = rect1.y < rect2.y + rect2.h
            && rect1.h + rect1.y > rect2.y
    // log(rect1.x, rect2.x, rect1.y, rect2.y, collideX && collideY)
    return collideX && collideY
}

function configValue(itemName) {
    return Number(config[itemName].value)
}

function loadLevel(game, n) {
    index = n
    level = levels[index]
    bricks = []
    for (var state of level) {
        // state [ x, y, 生命值 ]
        b = new Brick(game, state)
        bricks.push(b)
    }
    return bricks
}
