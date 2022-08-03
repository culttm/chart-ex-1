import {Chart} from "chart.js";
import {Theme} from "../theme";
import {hex2rgba} from "../utils/hex2rgba";
import {formatDate} from "../utils/format-date";
import {xPosition} from "../utils/x-position";

export class FooterPlugin {

    constructor(private theme: Theme) {
    }

    private plugin(chart: Chart): void {
        const ctx = chart.ctx;
        const x = chart.width - 12;
        const y = chart.height - 16;
        const dataSetData = chart.data.datasets[0].data;

        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = .5;
        ctx.save();
        ctx.beginPath();

        ctx.moveTo(11, y);
        ctx.lineTo(x, y);
        ctx.stroke();


        if (!chart.tooltip?.getActiveElements().length) {
            ctx.font = 'normal 10px sans-serif';
            ctx.fillStyle = hex2rgba(this.theme.footer.color);

            const firstText = `${formatDate((chart.data.labels as Date[])[0])}`;
            ctx.fillText(firstText, 10, y + 14);

            const lastText = `${formatDate(chart.data.labels?.find((_, i) => i === dataSetData.length - 1) as Date)}`;
            const partDateWidth = ctx.measureText(lastText).width;

            ctx.fillText(lastText, x - partDateWidth, y + 14);
            ctx.restore();

        } else {
            const tooltip = chart.tooltip.getActiveElements()[0];
            const x = chart.tooltip.getActiveElements()[0].element.x;

            if (!x) {
                return;
            }

            ctx.font = 'normal 10px sans-serif';
            ctx.fillStyle = hex2rgba(this.theme.footer.color);

            const text = `${formatDate(chart.data.labels?.find((_, i) => i === tooltip.index) as Date)}`;
            const width = ctx.measureText(text).width;

            ctx.fillText(text, xPosition(x, width, chart.canvas.clientWidth), y + 14);

            ctx.restore();
        }

    }

    getPlugin() {
        return {
            id: "footerPlugin",
            afterDraw: this.plugin.bind(this)
        }
    }
}
