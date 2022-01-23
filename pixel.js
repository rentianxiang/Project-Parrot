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
        this.updateCanvas()
    }

    #initData() {
        this.data = [
            ["#8dd3ec", "#8dd3ec", "#8dd3ec", "#8cd2eb", "#8dd3ea", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3ea", "#8dd3eb", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3eb", "#8dd3ea", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#8cd2eb", "#8dd3ea", "#8dd3ec", "#8dd3ec", "#8dd3ec"], ["#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3eb", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd2ec", "#8dd3eb", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd2ec", "#8dd3ec", "#8dd3eb", "#8dd3ec", "#8dd3ec", "#8dd2ec", "#8dd3ec", "#8dd3eb", "#8dd3ec", "#8dd3ec", "#8dd2ec"], ["#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3ec"], ["#8dd3ec", "#8dd2ec", "#8dd2ec", "#8dd3ec", "#8cd2eb", "#8dd3ec", "#8dd3ec", "#8dd2ec", "#8dd3ec", "#8cd2eb", "#8dd2eb", "#8dd3ec", "#8dd2ec", "#8dd3ec", "#8dd2eb", "#8cd2eb", "#8dd3ec", "#8dd2eb", "#8dd3ec", "#8dd3ec", "#8cd2eb", "#8dd3ec", "#8dd2eb", "#8dd3ec"], ["#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3ea", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#20222a", "#1f222b", "#1f222b", "#20212b", "#20212b", "#1f222b", "#1f222b", "#1f222b", "#8dd3ea", "#8dd3ec", "#8dd3ec", "#8dd3ea", "#8dd3ec", "#8dd3ec", "#8dd3ec"], ["#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd2eb", "#8dd3ea", "#8dd3ec", "#8dd3ec", "#8fd2eb", "#20202a", "#df4134", "#f26836", "#ef6a34", "#ef6937", "#ee6836", "#ee6934", "#ee6933", "#f06936", "#22212a", "#8fd2eb", "#8dd2eb", "#8dd3ea", "#8dd3ec", "#8dd3ec", "#8dd3ec"], ["#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3ea", "#8dd3ec", "#8dd3ec", "#21212c", "#dd4235", "#f26836", "#f26836", "#e4bc93", "#e4bc93", "#e4bc93", "#e4bc93", "#e4bc93", "#f06936", "#da4533", "#21212c", "#8dd3ec", "#8dd3ea", "#8dd3ec", "#8dd3ec", "#8dd2ec"], ["#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#21212c", "#dd4235", "#dd4238", "#f16934", "#f18936", "#e4bc93", "#dad7cf", "#2e3034", "#bbbca8", "#dad7cf", "#f36835", "#20222a", "#d8ceb6", "#21212c", "#21212e", "#21212e", "#8cd3ee", "#8dd3ec"], ["#8dd3ec", "#8dd3ec", "#8cd2eb", "#8dd3ec", "#8cd2eb", "#8dd3ec", "#21212c", "#dd4235", "#f26836", "#f16934", "#f18936", "#e4bc93", "#dad7cf", "#2d2f33", "#2c3033", "#dad7cf", "#21212c", "#d8ceb6", "#d8ceb6", "#dee2cf", "#dee2cf", "#dee2cf", "#21212a", "#8dd2ec"], ["#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#8fd2eb", "#21212c", "#dd4235", "#f26836", "#f26836", "#f16834", "#f18936", "#e5bd94", "#dbd7d0", "#dad7cf", "#dad7cf", "#dad7cf", "#21212c", "#d8ceb6", "#d8ceb6", "#dee2cf", "#dee2cf", "#dee2cf", "#21212a", "#8dd3ec"], ["#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#8bd5e5", "#24202a", "#dd4235", "#f26836", "#f26836", "#f16834", "#f18936", "#e4bc93", "#e0e1dc", "#e0e1dc", "#e0e1dc", "#e0e1da", "#20212c", "#daccb8", "#daccb8", "#dee2ce", "#dee2cf", "#dee2cf", "#21212a", "#8dd3ec"], ["#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#24202c", "#dd4235", "#dd4235", "#f26836", "#f26836", "#f16834", "#f18936", "#e4bc93", "#e0e1dc", "#e0e1dc", "#e0e1db", "#21212c", "#29373e", "#21212c", "#21212c", "#20212b", "#20212b", "#dee2cf", "#21212a", "#8dd2ec"], ["#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#241f2d", "#dd4235", "#dd4235", "#f26836", "#f26836", "#f16934", "#f28a36", "#e4bc93", "#e0e1da", "#e0e1da", "#e0e1dc", "#22212a", "#28363d", "#29373c", "#424240", "#21212e", "#21212e", "#21212c", "#8dd3ec", "#8dd3ec"], ["#8dd3ec", "#8dd3ec", "#8cd2eb", "#8dd3ec", "#241f2d", "#dd4235", "#dd4235", "#f26836", "#f26836", "#f16934", "#f18936", "#e8bc91", "#e7bc90", "#e7bb8f", "#e7bb8f", "#e7bb8f", "#202226", "#28373d", "#1c2227", "#8dd3ec", "#8cd2eb", "#8dd3ec", "#8dd3ec", "#8dd2ec"], ["#8dd3ec", "#8dd2eb", "#8dd3ec", "#8dd3ec", "#241f2d", "#dd4235", "#dd4235", "#f26836", "#f26836", "#f16934", "#f18936", "#f18936", "#f18936", "#f18936", "#f18936", "#f18936", "#e4bc93", "#1f2228", "#8dd3ec", "#8dd3ec", "#8cd2eb", "#8dd3ec", "#8cd2eb", "#8dd3ec"], ["#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#24202c", "#dd4235", "#dd4235", "#f26836", "#f26836", "#f06938", "#f08a36", "#f08a36", "#f08a36", "#f08a36", "#f28936", "#f18936", "#e7bb92", "#202229", "#8dd3ea", "#8dd3ec", "#8dd3ea", "#8dd3ec", "#8dd3ec", "#8dd3ec"], ["#8dd3ec", "#8dd3ec", "#8dd3ec", "#8cd2eb", "#24202c", "#dd4235", "#dd4235", "#f26836", "#f26836", "#f26836", "#f26836", "#f06936", "#f26836", "#f26836", "#f26836", "#f18936", "#f18936", "#e7ba95", "#21212c", "#8cd2eb", "#8dd3ea", "#8dd3ec", "#8dd3ec", "#8dd3ec"], ["#8dd3ec", "#91d2eb", "#8fd2ec", "#20212a", "#964a3c", "#20212a", "#20212a", "#dc4335", "#f26836", "#f26836", "#f26836", "#f26836", "#f26836", "#f26836", "#f66634", "#f08a35", "#f18936", "#e2bd96", "#22212a", "#8fd2ec", "#8dd3ec", "#8dd3ec", "#8dd3ec", "#8dd3ec"], ["#8dd3ec", "#8fd2ec", "#21212c", "#97493b", "#964a3b", "#b25d4a", "#b25d4a", "#222127", "#db4337", "#f26838", "#f26838", "#f26838", "#f26836", "#f26836", "#f26836", "#f26836", "#f18939", "#f08a39", "#e4bc93", "#1e2229", "#8ed2ed", "#8dd3ec", "#8dd3ec", "#8dd3ec"], ["#8dd3ec", "#8ed1eb", "#21212c", "#97493b", "#b25d4a", "#b25d4a", "#b25d4a", "#eb6b3b", "#21212c", "#dd4235", "#dd4235", "#dd4235", "#f26836", "#f26836", "#f26836", "#f26836", "#f26836", "#f18936", "#f18936", "#e4bc93", "#21212c", "#8dd3ec", "#8cd2eb", "#8dd3ec"], ["#8dd3e9", "#1f222c", "#97493b", "#b25d4a", "#b25d4a", "#b25d4a", "#eb6b3b", "#eb6b3b", "#21212c", "#dd4235", "#dd4235", "#dd4235", "#f26836", "#f26836", "#f26836", "#f26836", "#f06936", "#f06936", "#f18936", "#f18936", "#e4bc93", "#21212c", "#8dd3ec", "#8dd3ec"], ["#21212c", "#97493b", "#97493b", "#b25d4a", "#b25d4a", "#b25d4a", "#eb6b3b", "#ec6b3b", "#21212c", "#dd4235", "#dd4235", "#dd4235", "#f26836", "#f26836", "#f26836", "#f26836", "#f06936", "#f06936", "#f18936", "#f18936", "#e4bc93", "#21212c", "#8dd3ec", "#8dd3ec"], ["#20222a", "#b25d4a", "#b25d4a", "#b25d4a", "#b25d4a", "#b25d4a", "#eb6b3b", "#eb6b3b", "#21212c", "#dd4235", "#dd4235", "#dd4235", "#f26836", "#f26836", "#f26836", "#f26836", "#f16836", "#f26836", "#f26836", "#f18936", "#f18936", "#e4bc93", "#21212a", "#8dd2ec"], ["#974a3c", "#b15e4a", "#b15e4a", "#b15e4a", "#b15e4a", "#b15e4a", "#eb6b3d", "#eb6b3d", "#20212b", "#dc4237", "#dc4237", "#dc4237", "#ef6938", "#ef6938", "#ef6938", "#ef6938", "#ef6938", "#ef6938", "#ef6938", "#f18a37", "#f18a37", "#e2bd95", "#23202b", "#8ed3ea"]
        ]
        this.dataNull = new Array(this.gridNum).fill(null).map(() => new Array(this.gridNum).fill(null))
    }

    #initColorPicker() {
        document.getElementById('color-picker').addEventListener('change', event => {
            this.color = event.target.value
        })
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

    importData() {
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

    importImage() {
        const input = document.getElementById('input-file')
        input.click()
        input.addEventListener('input', event => {
            const file = event?.target?.files?.[0]
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = e => {
                const base64 = e.target.result
                const context = this.context
                const image = new Image()
                image.src = base64
                image.onload = () => {
                    context.drawImage(image, 0, 0, this.canvasLength, this.canvasLength)
                    this.image2data()
                    this.updateCanvas()
                }
            }
        })
    }

    exportData(filename = 'pixel-image-data.json') {
        const element = document.createElement('a')
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.data)));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    exportImage(filename = 'pixel-image.png') {
        const element = document.createElement('a')
        element.download = filename
        element.href = document.getElementById('canvas').toDataURL()
        element.click()
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

    rgb2hex(rgb) {
        rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (rgb && rgb.length === 4) ? "#" +
            ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
    }

    image2data() {
        const context = this.context
        const { data: imageData } = context.getImageData(0, 0, this.canvasLength, this.canvasLength)
        const imageRgbData = []
        for (let i = 0; i < imageData.length; i++) {
            if (i % 4 === 0) {
                imageRgbData.push(`rgb(${imageData[i]},${imageData[i + 1]},${imageData[i + 2]},255)`)
            }
        }
        const rawLength = Math.sqrt(imageRgbData.length)
        const matrix = []
        let line = -1
        for (let i = 0; i < imageRgbData.length; i++) {
            if (i % rawLength === 0) {
                line++
                matrix[line] = []
            }
            matrix[line].push(imageRgbData[i])
        }
        const data = []
        const skipNum = rawLength / this.gridNum
        for (let i = 0; i < matrix.length; i++) {
            if (i % skipNum) { continue }
            const x = Math.floor(i / skipNum)
            data[x] = []
            for (let j = 0; j < matrix[i].length; j++) {
                if (j % skipNum) { continue }
                const y = Math.floor(j / skipNum)
                data[x][y] = this.rgb2hex(matrix[i + skipNum / 2][j + skipNum / 2])
            }
        }
        this.data = data
    }

    showData() {
        console.log(this.data)
    }

}