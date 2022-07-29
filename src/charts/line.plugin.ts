import {Chart} from "chart.js";

export class LinePlugin {

    constructor(private color: string) {
    }

    private plugin(chart: Chart) {
        if (!chart.tooltip?.getActiveElements().length) {
            return;
        }
        const x = chart.tooltip.getActiveElements()[0].element.x;

        if (!x) {
            return;
        }

        const yAxis = chart.scales.y;
        const ctx = chart.ctx;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, yAxis.top);
        ctx.lineTo(x, yAxis.bottom);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba('+ this.color +', 0.40)';
        ctx.stroke();
        ctx.restore();
    }

    getPlugin() {
        return {
            id: "drawLineVertical",
            beforeDraw: this.plugin.bind(this)
        }
    }
}
