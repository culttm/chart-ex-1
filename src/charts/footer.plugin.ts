import {Chart} from "chart.js";


const formatDate = (date: Date) => {
    const dateArray = date.toLocaleDateString().split('/');
    return `${dateArray[0]}/${dateArray[1]}`;
}

export class FooterPlugin {

    constructor() {
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

        const tooltipDataFirst = {
            label: formatDate((chart.data.labels as Date[])[0])
        };

        const tooltipDataLast = {
            label: formatDate(chart.data.labels?.find((_, i) => i === dataSetData.length - 1) as Date)
        };

        ctx.font = 'normal 10px sans-serif';
        ctx.fillStyle = '#333';

        const firstText = `${tooltipDataFirst.label}`;
        ctx.fillText(firstText, 10, y + 14);

        const lastText = `${tooltipDataLast.label}`;
        const partDateWidth = ctx.measureText(lastText).width;

        ctx.fillText(lastText, x - partDateWidth, y + 14);
        ctx.restore();

        // if (!chart.tooltip?.getActiveElements().length) {
        //
        //
        // }

        // else {
        //     const tooltip = chart.tooltip.getActiveElements()[0];
        //     const x = chart.tooltip.getActiveElements()[0].element.x;
        //
        //     if (!x) {
        //         return;
        //     }
        //
        //     const tooltipData = {
        //         label: formatDate(chart.data.labels?.find((_, i) => i === tooltip.index) as Date)
        //     };
        //
        //     console.log({
        //         x,
        //         label: tooltipData.label
        //     });
        //
        //
        //     ctx.font = 'normal 10px sans-serif';
        //     ctx.fillStyle = '#333';
        //
        //     const firstText = `${tooltipData.label}`;
        //     const w = ctx.measureText(firstText).width;
        //     ctx.fillText(firstText, x - w / 2, y + 14);
        //
        //     ctx.restore();
        // }


    }

    getPlugin() {
        return {
            id: "footerPlugin",
            afterDraw: this.plugin.bind(this)
        }
    }
}
