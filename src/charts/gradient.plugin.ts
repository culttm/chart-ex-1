import {Chart} from "chart.js";

export class GradientPlugin {

    constructor(private color: string) {}

    private plugin(chart: Chart) {
        const scales = chart.scales;
        const color = chart.ctx.createLinearGradient(0, scales["y"].top,0, scales["y"].bottom);
        color.addColorStop(0.8, "rgba(" + this.color + ", 0.1)");
        color.addColorStop(1, "rgba(" + this.color + ", 0)");
        chart.data.datasets[0].backgroundColor = color;
    }

    getPlugin() {
        return {
            id: "responsiveGradient",
            afterLayout: this.plugin.bind(this)
        }
    }
}
