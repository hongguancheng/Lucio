;(function (window) {
  var canvas = window.document.getElementById('canvas')
  var ctx = canvas.getContext('2d')
  // var HEIGHT = document.body.clientHeight
  // var WIDTH = document.body.clientWidth
  // canvas.height = HEIGHT
  // canvas.width = WIDTH

  var dpr = window.devicePixelRatio || 1

  canvas.width = document.body.clientWidth * dpr
  canvas.height = document.body.clientHeight * dpr
  canvas.style.width = document.body.clientWidth + 'px'
  canvas.style.height = document.body.clientHeight + 'px'

  var img = new Image()
  var IMGHEIGHT = 412
  var IMGWIDTH = 600
  img.onload = () => {
    ctx.save()
    ctx.translate(200 + IMGWIDTH / 2, 200 + IMGHEIGHT / 2)
    ctx.rotate(-Math.PI * 1 / 48)
    ctx.drawImage(img, -IMGWIDTH / 2, -IMGHEIGHT, IMGWIDTH, IMGHEIGHT)
    ctx.restore()
  }
  img.src = '../images/lu1.png'
})(window)
