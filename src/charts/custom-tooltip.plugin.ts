import {Chart} from "chart.js";
import {roundedRect} from "./rouned-rect";
import {rectCorner} from "./rect-corner";

export class CustomTooltipPlugin {

    constructor(private color: string, private sign: string) {
    }

    private plugin(chart: Chart) {
        const yAxis = chart.scales.y;
        const ctx = chart.ctx;
        const cornerSize = 6;

        if (!chart.tooltip?.getActiveElements().length) {
            const dataSet = chart.getDatasetMeta(0).data;
            const firstPoint = dataSet[0] as any;
            const lastPoint = dataSet[dataSet.length - 1] as any;

            ctx.font = 'normal 9px sans-serif';
            const firstDataText = `$${firstPoint.$context.raw}`;
            const firstDataTextWidth = ctx.measureText(firstDataText).width + 10;

            const lastDataText = `$${lastPoint.$context.raw}`;
            const lastDataTextWidth = ctx.measureText(lastDataText).width + 10;

            ctx.fillStyle = 'rgba(101, 101, 101, 1)';
            ctx.fill(rectCorner(firstPoint.x - cornerSize / 2, firstPoint.y - 9, cornerSize))
            ctx.fill(roundedRect(firstPoint.x - 8, firstPoint.y - 28, firstDataTextWidth, 20, 4));
            ctx.fillStyle = '#fff';
            ctx.fillText(firstDataText, firstPoint.x - 3, firstPoint.y - 15);

            ctx.fillStyle = 'rgba(101, 101, 101, 1)';
            ctx.fill(rectCorner(lastPoint.x - cornerSize / 2, lastPoint.y - 9, cornerSize))
            ctx.fill(roundedRect((lastPoint.x + 8) - lastDataTextWidth, lastPoint.y - 28, lastDataTextWidth, 20, 4));
            ctx.fillStyle = '#fff';
            ctx.fillText(lastDataText, (lastPoint.x - lastDataTextWidth) + 13, lastPoint.y - 15);

            ctx.restore();
        } else {

            const tooltip = chart.tooltip.getActiveElements()[0];
            const x = chart.tooltip.getActiveElements()[0].element.x;

            if (!x) {
                return;
            }

            const tooltipData = {
                tooltip: tooltip.index,
                value: chart.data.datasets[0].data[tooltip.index],
                label: new Date(chart.data.labels?.find((_, i) => i === tooltip.index) as Date).toLocaleDateString()
            };

            const priceText = `${this.sign}${tooltipData.value}`;
            const partPriceWidth = ctx.measureText(priceText).width;

            ctx.font = 'normal 11px sans-serif';
            // const dateText = `(${tooltipData.label})`;
            // const partDateWidth = ctx.measureText(dateText).width;


            const height = 24;
            // const width = (partPriceWidth + partDateWidth) + 16;
            const width = partPriceWidth + 16;


            let left = x - (width / 2);
            let pontLeft = (left + width / 2);

            if (x < (width / 2)) {
                left = 0;
            } else if ((x + width) > ((chart.canvas.clientWidth * 2) - x)) {
                left = chart.canvas.clientWidth - width
            }

            ctx.save();
            ctx.beginPath();

            // Box
            ctx.fillStyle = 'rgba(101, 101, 101, 1)';
            ctx.fill(roundedRect(left, 0, width, height, 4))
            ctx.fill(rectCorner(pontLeft - cornerSize / 2, height, cornerSize))

            //Text
            ctx.fillStyle = '#fff';
            // ctx.font = 'bold 11px sans-serif';
            ctx.fillText(`${priceText}`, left + 8, 16);
            // ctx.font = 'normal 11px sans-serif';
            // ctx.fillText(`${dateText}`, left + partPriceWidth + 10, 16);

            //Line
            ctx.moveTo(x, yAxis.top - 14);
            ctx.lineTo(x, yAxis.bottom + 8);
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(' + this.color + ', .9)';
            ctx.stroke();

            ctx.restore();

        }
    }

    getPlugin() {
        return {
            id: "drawCustomTooltip",
            afterDraw: this.plugin.bind(this)
        }
    }
}
