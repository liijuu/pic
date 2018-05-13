$(function () {
    window.onerror = (err) => {
        console.log(err)
    }
	let width = $(window).width()
	let height = $(window).height()
	let can = $('#canvas')[0]
	can.width = width
	can.height = height
	let c2d = can.getContext('2d')
	let img = new Image()
    // let imgs = ['sjw7.png', 'sjw10.png', 'sjw4.png', 'sjw5.png','sjw6.png','sjw9.png','sjw8.png']
    // ggggg = 0
	img.src = 'sjw7.png'
    let flag = false


    img.onload = function () {
    	window.$width = img.width
    	window.$height = img.height
        let scale = $height * (width / $width)
    	
    	c2d.drawImage(img, 0, 0, $width, $height, 0, 0, width, height )
    	let datas = c2d.getImageData(0, 0, width, height).data
    	let data = []
    	let fill = ''
      	for (let i = 0; i < width; i += 1) {
        	for (let j = 0; j < height; j += 1) {
        		let index = ((j) * width + (i)) * 4
                if (datas[index + 0] > 240) {
                    continue
                }
                if (Math.random() > 94) {
                    continue
                }
                fill = `rgba(${datas[index + 0]}, ${datas[index + 1]}, ${datas[index + 2]}, ${datas[index + 3]})`
        		data.push({
	              x0: width/2,
                  y0: height,
	              X: 0 + i + (Math.random() - 0.5) * 1, // 终点x坐标
	              Y: 0 + j + (Math.random() - 0.5) * 1, // 终点y坐标
	              // count: 0,
	              delay: j < 450? j/6 : 450/6, // 每一行开始延时，进去之后才能触发里面的函数
	              fill: fill,
	              duration: 16, // 动画持续时间
	              interval: parseInt(Math.random() * 10 * 3), // 粒子自带动画延时
	              currTime: 0 // 开始了多久了
	            })
        	}
        }
        pic()
        function pic () {
            c2d.clearRect(0, 0, width, height);
            setTimeout(function () {
                $('#imgg').addClass('bounceOutDown')
                setTimeout(function () {
                    flag = true
                    draw()
                }, 1000)
            }, 1000)
        }
        function draw () {
        	c2d.clearRect(0, 0, width, height)
        	let currX = 0 // 粒子位置x
        	let currY = 0 // 粒子位置y
        	for (var i = 0; i < data.length; i ++) {
        		var dur = data[i].duration
        		var val = data[i].interval
        		var dal = data[i].delay
        		var cur = data[i].currTime
        		c2d.fillStyle = data[i].fill
                if (data[data.length - 1].delay + data[data.length - 1].duration < data[data.length - 1].currTime) {
                    console.log('jiesu')
                    cancelAnimationFrame(window.gg)
                    end()
                    return
                }
                if (cur > dal) {
                    if (cur < dal + dur) {
                        currX = Math.easeInOutQuad(cur - dal, data[i].x0, data[i].X - data[i].x0, dur)
                        currY = Math.easeInOutQuad(cur - dal, data[i].y0, data[i].Y - data[i].y0, dur)
                        c2d.fillRect(currX, currY, 1, 1)
                        data[i].currTime += Math.random() + 1
                    } else {
                        c2d.fillRect(data[i].X, data[i].Y, 1, 1)
                    }

                } else {
                    data[i].currTime += Math.random() + 1
                }
        	}
        	window.gg = requestAnimationFrame(draw)
        }
        function end () {
            c2d.clearRect(0, 0, width, height)
            for (var i = 0; i < data.length; i ++) {
                c2d.fillStyle = data[i].fill
                c2d.fillRect(data[i].X, data[i].Y, 1, 1)
            }
        }
    }
})
Math.easeInOutQuad = function (e, a, g, f) {
	e /= f / 2
	if (e < 1) {
	  return g / 2 * e * e + a
	}
	e--
	return -g / 2 * (e * (e - 2) - 1) + a
}