$(function () {
	let width = $(window).width()
	let height = $(window).height()
	let can = $('#canvas')[0]
	can.width = width
	can.height = height
	let c2d = can.getContext('2d')
	let img = new Image()
    img.crossOrigin = "Anonymous"
	img.src = 'wly.png'

	// data定义宽高，居中放置
	// var data = {
 //      dx: img.width,
 //      dy: img.height,
 //      ds: parseInt(($(window).width() - img.width) / 2)
 //    }
    img.onload = function () {
    	window.$width = img.width
    	window.$height = img.height
    	// console.log(data.dx, data.dy, img.width, img.height)
    	c2d.drawImage(img, 0, 0, $width, $height, parseInt(($(window).width() - $width) / 2), 0, $width, $height)
    	let datas = c2d.getImageData(parseInt(($(window).width() - $width) / 2), 0, $width, $height).data
    	let data = []
    	let fill = '#fff'
      	for (let i = 1; i < $width; i += 1) {
        	for (let j = 1; j < $height; j += 1) {
        		let index = ((j - 1) * $width + (i - 1)) * 4
        		if (datas[index + 0] <= 255 && datas[index + 0] > 245) {
        			fill = '#d6d6d6'
                    continue
        		} else if (datas[index + 0] < 245 && datas[index + 0] > 230) {
                    fill = '#d6d6d6'
                } else if (datas[index + 0] < 230 && datas[index + 0] > 220) {
                    fill = '#e0e0e0'
                } else if (datas[index + 0] < 220 && datas[index + 0] > 80) {
        			fill = '#d5d5d5'
        		} else if (datas[index + 0] < 220 && datas[index + 0] > 160) {
        			fill = '#9e9e9e'
        		} else if (datas[index + 0] < 160 && datas[index + 0] > 140) {
        			fill = '#919191'
        		} else if (datas[index + 0] < 140 && datas[index + 0] > 120) {
        			fill = '#727272'
        		} else if (datas[index + 0] < 120 && datas[index + 0] > 80) {
        			fill = '#6f6f6f'
        		} else if (datas[index + 0] < 80 && datas[index + 0] > 50) {
        			fill = '#1d1d1d'
        		} else {
        			fill = '#000'
        		}
        		data.push({
	              x0: parseInt(width / 2),
	              y0: height,
	              X: parseInt((width - $width) / 2) + i + (Math.random() - 0.5) * 1, // 终点x坐标
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
            }, 1500)
          }, 1000)  
        }
        // draw()
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
        		if (cur > dal) { // 当前时间大于延迟，开始
        			if (data[data.length - 1].delay + data[data.length - 1].duration < data[data.length - 1].currTime) {
                        console.log('jiesu')
        				cancelAnimationFrame(window.gg)
                        end()
        				return
        			} else {
        				if (cur < dur + dal) {
        					currX = Math.easeInOutQuad(cur - dal, data[i].x0, data[i].X - data[i].x0, dur)
			                currY = Math.easeInOutQuad(cur - dal, data[i].y0, data[i].Y - data[i].y0, dur)
			                c2d.fillRect(currX, currY, 1, 1)
                            data[i].currTime += Math.random() + 2
        				} else {
        					c2d.fillRect(data[i].X, data[i].Y, 1, 1)
        				}
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