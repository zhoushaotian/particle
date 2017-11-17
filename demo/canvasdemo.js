let ctx;
const viewWidth = document.getElementById('canvas-wrapper').clientWidth;
const viewHeigth = document.getElementById('canvas-wrapper').clientHeight;;
const randomPoint = [];
class Circle {
    constructor(opts) {
        this.x = opts.x || 10;
        this.y = opts.y || 10;
        this.radius = opts.radius || 1;
        this.color = opts.color || 'rgba(0,0,0,0.3)';
        this.speedX = opts.speedX;
        this.speedY = opts.speedY;
        this._ctx = opts.ctx;
    }
    _randomColor() {
        this._ctx.fillStyle = `rgba(255,255,255,${Math.random()})`
    }
    draw() {
        this._ctx.fillStyle = this.color;
        this._ctx.beginPath();
        this._ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this._ctx.fill();
    }
    run() {
        // 每秒运动的函数 改变圆心的坐标
        //随机运动的方向 当圆与边界相切的时候调整运动的方向
        this._chooseToward();
        this.x += this.speedX;
        this.y += this.speedY;
    }
    _chooseToward() { //选择方向
        let maxX = document.getElementById('canvas').clientWidth;
        let maxY = document.getElementById('canvas').clientHeight;
        if(this.x >= (maxX - this.radius) || this.x <= this.radius) {
            this.speedX = - this.speedX;
        }
        if(this.y >= (maxY - this.radius) || this.y <= this.radius) {
            this.speedY = - this.speedY;
        }
    }
}

function drawLine(srcPoint, tarPoint, ctx, color) {
    ctx.strokeStyle = color || 'rgba(0,0,0,0.1)';
    ctx.beginPath();
    ctx.moveTo(srcPoint.x, srcPoint.y);
    ctx.lineTo(tarPoint.x, tarPoint.y);
    ctx.stroke();
}
function init() {
    document.getElementById('canvas').setAttribute('width', viewWidth);
    document.getElementById('canvas').setAttribute('height', viewHeigth);
    ctx = document.getElementById('canvas').getContext('2d');
    for(let i = 0; i < 5; i++ ) {
        randomPoint.push(new Circle({
            x: Math.floor(Math.random() * viewWidth),
            y: Math.floor(Math.random() * viewHeigth),
            radius: Math.floor(Math.random() * 5) + 3,
            ctx: ctx,
            speedX: Math.random(),
            speedY: Math.random(),
            maxX: 300,
            maxY: 150,

        }));
    }
}
function mainDraw() {
    let width = document.getElementById('canvas').clientWidth;
    let height = document.getElementById('canvas').clientHeight;
    ctx.clearRect(0,0,width,height);
    randomPoint.forEach(function(circle) {
        circle.draw();
    });
    for(let i=0;i<5;i++) {
        randomPoint.forEach(function(point) {
            drawLine(randomPoint[i], point, ctx);
        })
    }
    // 一帧结束 圆开始运动
    randomPoint.forEach(function(circle) {
        circle.run();
    });
    requestAnimationFrame(mainDraw);
}
init();
requestAnimationFrame(mainDraw);






