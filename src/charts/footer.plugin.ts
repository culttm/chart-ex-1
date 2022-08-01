import {Chart} from "chart.js";


export class FooterPlugin {

    constructor(private sign: string) {
    }

    private plugin(chart: Chart): void {
        const ctx = chart.ctx;

        const tooltipDataFirst = {
            value: chart.data.datasets[0].data[0],
            label: new Date((chart.data.labels as Date[])[0]).toLocaleDateString()
        };

        const tooltipDataLast = {
            value: chart.data.datasets[0].data[chart.data.datasets[0].data.length - 1],
            label: new Date(chart.data.labels?.find((_, i) => i === chart.data.datasets[0].data.length - 1) as Date).toLocaleDateString()
        };

        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = .5;
        const x = chart.width - 12;
        const y = chart.height - 16;

        ctx.save();
        ctx.beginPath();

        ctx.moveTo(11, y);
        ctx.lineTo(x, y);
        ctx.stroke();

        ctx.font = 'normal 10px sans-serif';
        ctx.fillStyle = 'rgba(160, 160, 160, 1)'

        const firstText = `${this.sign}${tooltipDataFirst.value} (${tooltipDataFirst.label})`;
        ctx.fillText(firstText, 10, y + 14);

        const lastText = `${this.sign}${tooltipDataLast.value} (${tooltipDataLast.label})`;
        const partDateWidth = ctx.measureText(lastText).width;
        ctx.fillText(lastText, x - partDateWidth, y + 14);

        ctx.restore();

    }

    getPlugin() {
        return {
            id: "footerPlugin",
            afterDraw: this.plugin.bind(this)
        }
    }
}
