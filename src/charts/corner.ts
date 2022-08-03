import {roundedRect} from "./rouned-rect";
import {rectCorner} from "./rect-corner";

export class Corner {
    private readonly ctx: CanvasRenderingContext2D;

    x = 0;
    y = 0;

    constructor(private el: HTMLCanvasElement) {
        this.ctx = this.el.getContext('2d') as CanvasRenderingContext2D;

        if (window.devicePixelRatio > 1) {
            const canvasWidth = this.el.width;
            const canvasHeight = this.el.height;
            this.el.width = canvasWidth * window.devicePixelRatio;
            this.el.height = canvasHeight * window.devicePixelRatio;
            this.el.style.width = canvasWidth + "px";
            this.el.style.height = canvasHeight + "px";
            this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }

        this.el.onmousemove = (ev: MouseEvent) => {
            this.x = ev.offsetX;
            this.y = ev.offsetY;
            this.ctx.restore()
            this.draw();
        }
    }

    draw(): void {
        this.ctx.beginPath()
        this.drawRect(this.x, this.y, 100, 50);
        this.drawCorner((this.x + 50) - 3, this.y + 50, 6);

        // this.drawRect(200, 0, 200, 100);
        // this.drawCorner(300 - 3, 100, 6);
    }

    private drawRect(x = 0, y = 0, width = 100, height = 50): void {
        this.ctx.fillStyle = '#ccc';
        const path = roundedRect(x, y, width, height, 4);
        this.ctx.fill(path);
        this.ctx.restore();
    }

    private drawCorner(x = 0, y = 0, size = 6): void {
        this.ctx.fillStyle = 'red';
        const path = rectCorner(x, y, size);
        this.ctx.fill(path);
        this.ctx.restore();
    }
}
