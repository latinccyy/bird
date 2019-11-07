class Scene {
    constructor(game) {
        this.game = game
        this.elements = []
        this.addListener()
    }

    update() {}

    draw() {}

    addListener() {}

    addElement(image) {
        this.elements.push(image)
    }

    removeElement(image) {
        var index = this.elements.indexOf(image);
        if (index > -1) {
            this.elements.splice(index, 1);
        }
    }

}
