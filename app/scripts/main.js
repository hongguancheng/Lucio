;(function (window) {
  const DPR = window.devicePixelRatio || 1

  function Lucio (canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.lucioWidth = document.body.clientWidth / 3
    this.lucioHeight = this.lucioWidth / 3 * 2
    this.LucioRotateDirection = 1
    this.LucioRotateMaxAngle = .015
    this.LucioRotateAngle = 0
    this.rate = 0
    this.init()

    this.lucioImg = new Image()
    this.lucioImg.src = '../images/lu1.png'
    this.headphones = []
  // this.loop()
  }

  Lucio.prototype.init = function () {
    this.width = this.canvas.width = document.body.clientWidth * DPR
    this.height = this.canvas.height = document.body.clientHeight * DPR
    this.canvas.style.width = document.body.clientWidth + 'px'
    this.canvas.style.height = document.body.clientHeight + 'px'
    this.lucioWidth = this.lucioWidth * DPR
    this.lucioHeight = this.lucioHeight * DPR
  }

  Lucio.prototype.loop = function () {
    // console.log(this)
    this.ctx.clearRect(0, 0, document.body.clientWidth * DPR, document.body.clientHeight * DPR)
    this.drawLucio()
    this.headphones = this.headphones.filter((h) => {
      return h.draw()
    })
  // this.drawHeadphone()
  // window.requestAnimationFrame(this.loop.bind(this))
  }

  // draw lucio
  Lucio.prototype.drawLucio = function () {
    this.ctx.save()
    this.ctx.translate(this.width / 2, this.height / 2 + this.lucioHeight / 2)
    this.LucioRotateDirection > 0 ? this.LucioRotateAngle += .001 : this.LucioRotateAngle -= .001
    if (this.LucioRotateAngle > this.LucioRotateMaxAngle) {
      this.LucioRotateDirection = -1
      var h = new Headphone(this.ctx, 1.4, this)
      this.headphones.push(h)
    }
    if (this.LucioRotateAngle < -this.LucioRotateMaxAngle) {
      this.LucioRotateDirection = 1
      var h = new Headphone(this.ctx, 1.3, this)
      this.headphones.push(h)
    }
    this.rate = Math.abs(this.LucioRotateAngle) / this.LucioRotateMaxAngle
    this.ctx.rotate(this.LucioRotateAngle)
    this.ctx.drawImage(this.lucioImg, -this.lucioWidth / 2, -this.lucioHeight - Math.abs(this.LucioRotateAngle) * 220, this.lucioWidth, this.lucioHeight + Math.abs(this.LucioRotateAngle) * 120)
    this.ctx.restore()
  }

  function Headphone (ctx, strength, lucio) {
    this.ctx = ctx
    // 扩散强度 倍率
    this.strength = strength
    this.lucio = lucio
    this.w = this.lucio.lucioWidth
    this.h = this.lucio.lucioHeight
    this.maxW = this.lucio.lucioWidth * this.strength
    this.maxH = this.lucio.lucioHeight * this.strength
    this.HeadphoneImg = new Image()
    this.HeadphoneImg.src = '../images/lu2.png'
    this.speed = 30
  }

  Headphone.prototype.draw = function () {
    this.ctx.save()
    this.w = this.w + (this.maxW - this.lucio.lucioWidth) / this.speed
    this.h = this.h + (this.maxH - this.lucio.lucioHeight) / this.speed
    if (this.w > this.maxW) {
      return false
    }
    var r = (this.maxW - this.w) / (this.maxW - this.lucio.lucioWidth)
    this.ctx.globalAlpha = .6 * Math.abs(Math.abs(r - 1 / 2) * 2 - 1)
    // console.log(this.ctx.globalAlpha)
    this.ctx.filter = 'blur(10px)'
    this.ctx.translate(this.lucio.width / 2, this.lucio.height / 2 + this.h / 2)
    this.ctx.rotate(this.lucio.LucioRotateAngle)
    this.ctx.drawImage(this.HeadphoneImg, -this.w / 2, -this.h - Math.abs(this.lucio.LucioRotateAngle) * 220, this.w, this.h)
    this.ctx.restore()
    return true
  }

  var lucio = new Lucio(window.document.getElementById('canvas'))
  var visualizer = new MusicVisualizer({
    size: 16,
    onended: function () {},
    visualizer: function (del, ave) {
      console.log(del, ave)
      lucio.ctx.clearRect(0, 0, document.body.clientWidth * DPR, document.body.clientHeight * DPR)
      lucio.drawLucio()
      lucio.headphones = lucio.headphones.filter((h) => {
        return h.draw()
      })
    }
  })

  // visualizer.play('../music/1.mp3', false)
})(window)
