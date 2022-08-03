import {Chart} from "chart.js";
import {Theme} from "./theme";
import {hex2rgba} from "./hex2rgba";


const formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    return `${d} ${m} ${y}`;
}

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
            const tooltipDataFirst = {
                label: formatDate((chart.data.labels as Date[])[0])
            };

            const tooltipDataLast = {
                label: formatDate(chart.data.labels?.find((_, i) => i === dataSetData.length - 1) as Date)
            };

            ctx.font = 'normal 10px sans-serif';
            ctx.fillStyle = hex2rgba(this.theme.footer.color);

            const firstText = `${tooltipDataFirst.label}`;
            ctx.fillText(firstText, 10, y + 14);

            const lastText = `${tooltipDataLast.label}`;
            const partDateWidth = ctx.measureText(lastText).width;

            ctx.fillText(lastText, x - partDateWidth, y + 14);
            ctx.restore();

        } else {
            const tooltip = chart.tooltip.getActiveElements()[0];
            const x = chart.tooltip.getActiveElements()[0].element.x;

            if (!x) {
                return;
            }

            const tooltipData = {
                label: formatDate(chart.data.labels?.find((_, i) => i === tooltip.index) as Date)
            };

            ctx.font = 'normal 10px sans-serif';
            ctx.fillStyle = hex2rgba(this.theme.footer.color);

            const text = `${tooltipData.label}`;
            const width = ctx.measureText(text).width;

            let left = x - (width / 2);

            if (x < (width / 2)) {
                left = 0;
            } else if ((x + width) > ((chart.canvas.clientWidth * 2) - x)) {
                left = chart.canvas.clientWidth - width
            }

            ctx.fillText(text, left, y + 14);

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
