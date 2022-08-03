import {Chart} from "chart.js";
import {Theme} from "./theme";
import {hex2rgba} from "./hex2rgba";

export class GradientPlugin {

    constructor(private theme: Theme) {}

    private plugin(chart: Chart) {
        const scales = chart.scales;
        const color = chart.ctx.createLinearGradient(0, scales["y"].top,0, scales["y"].bottom);
        color.addColorStop(0.4, hex2rgba(this.theme.baseColor, .1));
        color.addColorStop(1, hex2rgba(this.theme.baseColor, 0));
        chart.data.datasets[0].backgroundColor = color;
    }

    getPlugin() {
        return {
            id: "responsiveGradient",
            afterLayout: this.plugin.bind(this)
        }
    }
}
