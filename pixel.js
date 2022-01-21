class PixelImage {

    constructor (gridNum = 24, gridSize = 30) {
        this.gridNum = gridNum
        this.gridSize = gridSize
        this.canvasLength = gridNum * gridSize
        this.color = '#000000'
        this.colorBackground = '#eeeeee'
        this.#initData()
        this.#initColorPicker()
        this.#initWrapper()
        this.#initCanvas()
        this.#initGridLine()
        this.#initCanvasLayer()
    }

    #initData() {
        this.data = new Array(this.gridNum).fill(null).map(() => new Array(this.gridNum).fill(null))
        this.dataNull = new Array(this.gridNum).fill(null).map(() => new Array(this.gridNum).fill(null))
    }

    #initColorPicker() {
        document.getElementById('color-picker').addEventListener('change', event => this.color = event.target.value)
    }

    #initWrapper() {
        const element = document.getElementById('canvas-wrapper')
        element.style.width = this.canvasLength + 'px'
        element.style.height = this.canvasLength + 'px'
        element.style.backgroundColor = this.colorBackground
    }

    #initCanvas() {
        const canvas = document.getElementById('canvas')
        canvas.width = this.canvasLength
        canvas.height = this.canvasLength
        this.context = canvas.getContext('2d')
        const gridSize = this.gridSize
        // left click
        canvas.addEventListener('click', event => {
            const { x, y } = findDrawGridValue(event)
            this.#drawGrid(x, y, this.color)
            this.#updateData(x, y, this.color)

        })
        // right click
        canvas.addEventListener('contextmenu', event => {
            event.preventDefault()
            const { x, y } = findDrawGridValue(event)
            this.#drawGrid(x, y)
            this.#updateData(x, y)
        })
        // mouse drags
        let mouseLeftDown = false
        let mouseRightDown = false
        canvas.addEventListener('mousedown', event => {
            const button = event.which
            if (button === 1) {
                mouseLeftDown = true
            } else if (button === 3) {
                mouseRightDown = true
            }
        })
        canvas.addEventListener('mouseup', () => {
            mouseLeftDown = false
            mouseRightDown = false
        })
        canvas.addEventListener('mousemove', event => {
            if (mouseLeftDown) {
                const { x, y } = findDrawGridValue(event)
                this.#drawGrid(x, y, this.color)
                this.#updateData(x, y, this.color)
            } else if (mouseRightDown) {
                const { x, y } = findDrawGridValue(event)
                this.#drawGrid(x, y)
                this.#updateData(x, y)
            }
        })
        function findDrawGridValue(event) {
            const { offsetX, offsetY } = event
            const x = Math.floor(offsetX / gridSize)
            const y = Math.floor(offsetY / gridSize)
            return { x, y }
        }
    }

    #initGridLine() {
        const element = document.getElementById('canvas-gridline')
        element.style.width = this.canvasLength + 'px'
        element.style.height = this.canvasLength + 'px'
        for (let i = 0; i < this.gridNum ** 2; i++) {
            const box = document.createElement('div')
            box.style.width = this.gridSize + 'px'
            box.style.height = this.gridSize + 'px'
            box.style.boxSizing = 'border-box'
            box.style.border = '1px solid black'
            element.appendChild(box)
        }
    }

    #initCanvasLayer() {
        const element = document.getElementById('canvas-layer')
        element.style.width = this.canvasLength + 'px'
        element.style.height = this.canvasLength + 'px'
        for (let i = 0; i < this.gridNum ** 2; i++) {
            const box = document.createElement('div')
            box.style.width = this.gridSize + 'px'
            box.style.height = this.gridSize + 'px'
            box.style.boxSizing = 'border-box'
            element.appendChild(box)
        }
    }

    #drawGrid(x, y, color = null) {
        const context = this.context
        const gridSize = this.gridSize
        if (color) {
            context.fillStyle = color
            context.fillRect(x * gridSize, y * gridSize, gridSize, gridSize)
        } else {
            context.clearRect(x * gridSize, y * gridSize, gridSize, gridSize)
        }
    }

    #updateData(x, y, color = null) {
        // Not setting data if there is a layer on top of it
        if (this.dataLayer?.[y]?.[x]) { return }
        this.data[y][x] = color
    }

    import() {
        this.dispose()
        const element = document.getElementById('input-file')
        element.click()
        element.addEventListener('input', event => {
            const file = event?.target?.files?.[0]
            const fileReader = new FileReader()
            fileReader.readAsText(file)
            fileReader.onload = e => {
                try {
                    const result = JSON.parse(e.target.result)
                    this.data = result
                    this.updateCanvas()
                } catch (err) {
                    alert('Incorrect data')
                }
            }
        })
    }

    importLayer() {
        this.dispose()
        const input = document.getElementById('input-file')
        input.click()
        input.addEventListener('input', event => {
            const file = event?.target?.files?.[0]
            const fileReader = new FileReader()
            fileReader.readAsText(file)
            fileReader.onload = e => {
                const result = JSON.parse(e.target.result)
                this.dataLayer = result
                const arr = result.flat(Infinity)
                for (let i = 0; i < arr.length; i++) {
                    document.getElementById('canvas-layer').childNodes.item(i).style.backgroundColor = arr[i]
                }
            }
        })
    }

    export(filename = 'pixel-image-data.json') {
        const element = document.createElement('a')
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.data)));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    updateCanvas() {
        const gridNum = this.gridNum
        for (let x = 0; x < gridNum; x++) {
            for (let y = 0; y < gridNum; y++) {
                this.#drawGrid(x, y, this.data[y][x])
            }
        }
    }

    toggleGridLine() {
        const element = document.getElementById('canvas-gridline')
        if (!element.style.visibility || element.style.visibility === 'visible') {
            element.style.visibility = 'hidden'
        } else {
            element.style.visibility = 'visible'
        }
    }

    dispose() {
        this.data = this.dataNull
        this.dataLayer = this.dataNull
        this.updateCanvas()
    }

}