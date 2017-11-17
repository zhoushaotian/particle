/**
 * x: 圆心的x坐标
 * y: 圆心的y坐标
 * ctx: 绘画上下文
 * @class circle
 */
class Circle {
    constructor(opts) {
        this.x = opts.x || 10;
        this.y = opts.y || 10;
        this.radius = opts.radius || 1;
        this.color = opts.color || 'black';
        this._ctx = opts.ctx;
    }
    _init() { //初始化函数
        // 进行上下文的初始化 
        this._ctx.fillStyle = this.color;
    }
    draw() {
        this._init();
        this._ctx.beginPath();
        this._ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this._ctx.fill();
    }
}
