

function __main() {
    // 初始化控制器控制器，用于在运行时更新config中的变量
    setControler()

    window.width = 400
    window.height = 300
    var g = new Game(function() {
        // var s = new StartScene(g)
        var s = new MainScene(g)
        g.scene = s
        g.run()
    })

    // 方便场景切换、移动图像等操作
    debugMode(g, true)

}


__main()
