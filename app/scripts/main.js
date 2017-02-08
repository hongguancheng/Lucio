;(function (window) {
  function Lucio (canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.lucioWidth = 300
    this.lucioHeight = 200
    this.LucioRotateDirection = 1
    this.LucioRotateMaxAngle = .035
    this.LucioRotateAngle = 0
    this.init()
    
    this.lucioImg = new Image()
    this.lucioImg.src = '../images/lu1.png'
    this.loop()
  }

  Lucio.prototype.init = function () {
    this.dpr = window.devicePixelRatio || 1
    this.width = this.canvas.width = document.body.clientWidth * this.dpr
    this.height = this.canvas.height = document.body.clientHeight * this.dpr
    this.canvas.style.width = document.body.clientWidth + 'px'
    this.canvas.style.height = document.body.clientHeight + 'px'
    this.lucioWidth = this.lucioWidth * this.dpr
    this.lucioHeight = this.lucioHeight * this.dpr
  }

  Lucio.prototype.loop = function () {
    // console.log(this)
    this.ctx.clearRect(0, 0, document.body.clientWidth * this.dpr, document.body.clientHeight * this.dpr)
    this.drawLucio()
    window.requestAnimationFrame(this.loop.bind(this))
  }

  // draw lucio
  Lucio.prototype.drawLucio = function () {
    this.ctx.save()
    this.ctx.translate(this.width / 2, this.height / 2 + this.lucioHeight / 2)
    this.LucioRotateDirection > 0 ? this.LucioRotateAngle += .002 : this.LucioRotateAngle -= .002
    if (this.LucioRotateAngle > this.LucioRotateMaxAngle) {
      this.LucioRotateDirection = -1
    }
    if (this.LucioRotateAngle < -this.LucioRotateMaxAngle) {
      this.LucioRotateDirection = 1
    }
    this.ctx.rotate(this.LucioRotateAngle)
    // this.ctx.globalAlpha = 0.4
    // this.ctx.filter = 'opacity(.5)'
    this.ctx.drawImage(this.lucioImg, -this.lucioWidth / 2, -this.lucioHeight - Math.abs(this.LucioRotateAngle) * 220, this.lucioWidth, this.lucioHeight + Math.abs(this.LucioRotateAngle) * 120)
    this.ctx.restore()
  }

  Lucio.prototype.drawHeadphone = function () {
    
  }

  var lucio = new Lucio(window.document.getElementById('canvas'))
})(window)
