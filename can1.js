$(function () {
	let width = $(window).width()
	let height = $(window).height()
    console.log(width, height)
	let can = $('#canvas')[0]
	can.width = width
	can.height = height
	let c2d = can.getContext('2d')
	let img = new Image()
    img.crossOrigin = "Anonymous"
	img.src = 'sjw4.png'

    img.onload = function () {
    	window.$width = img.width
    	window.$height = img.height
        let scale = $height * (width / $width)
    	
    	c2d.drawImage(img, 0, 0, $width, $height, 0, 0, width, height )
    	let datas = c2d.getImageData(0, 0, width, height).data
    	let data = []
    	let fill = '#fff'
      	for (let i = 0; i < width; i += 1) {
        	for (let j = 0; j < height; j += 1) {
        		let index = ((j) * width + (i)) * 4
                if (datas[index + 0] <= 255 && datas[index + 0] > 249) {
                    fill = '#d6d6d6'
                    continue
                } else if (datas[index + 0] < 249 && datas[index + 0] > 245) {
        			fill = '#d8d8d8'
        		} else if (datas[index + 0] < 245 && datas[index + 0] > 230) {
                    fill = '#d6d6d6'
                } else if (datas[index + 0] < 230 && datas[index + 0] > 220) {
                    fill = '#e0e0e0'
                } else if (datas[index + 0] < 220 && datas[index + 0] > 195) {
        			fill = '#d9d9d9'
        		} else if (datas[index + 0] < 195 && datas[index + 0] > 180) {
        			fill = '#b8b8b8'
        		} else if (datas[index + 0] < 180 && datas[index + 0] > 160) {
                    fill = '#9e9e9e'
                } else if (datas[index + 0] < 160 && datas[index + 0] > 140) {
        			fill = '#919191'
        		} else if (datas[index + 0] < 140 && datas[index + 0] > 120) {
        			fill = '#727272'
        		} else if (datas[index + 0] < 120 && datas[index + 0] > 100) {
        			fill = '#6f6f6f'
        		}  else if (datas[index + 0] < 100 && datas[index + 0] > 80) {
                    fill = '#575757'
                }  else if (datas[index + 0] < 80 && datas[index + 0] > 50) {
        			fill = '#1d1d1d'
        		} else {
        			fill = '#000'
        		}
        		data.push({
	              x0: parseInt(width / 2),
	              y0: height,
	              X: 0 + i + (Math.random() - 0.5) * 1, // 终点x坐标
	              Y: 0 + j + (Math.random() - 0.5) * 1, // 终点y坐标
	              // count: 0,
	              delay: j / 6, // 每一行开始延时，进去之后才能触发里面的函数
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
            $('#imgg').addClass('bounceOutDown');
            setTimeout(function () {
                draw()
            }, 1200)
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
                        data[i].currTime += Math.random() + 2
                    } else {
                        c2d.fillRect(data[i].X, data[i].Y, 1, 1)
                    }

                } else {
                    data[i].currTime += Math.random() + 2
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