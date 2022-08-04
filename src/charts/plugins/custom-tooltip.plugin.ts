import { Chart } from "chart.js";
import { roundedRect } from "../utils/rouned-rect";
import { rectCorner } from "../utils/rect-corner";
import { Theme } from "../theme";
import { hex2rgba } from "../utils/hex2rgba";
import { xPosition } from "../utils/x-position";

export class CustomTooltipPlugin {
    constructor(private theme: Theme, private placeholder: string) {}

    private getFormattedValue(value: string): string {
        return this.placeholder.replace("__VALUE__", value);
    }

    private plugin(chart: Chart) {
        const yAxis = chart.scales["y"];
        const ctx = chart.ctx;
        const cornerSize = 6;

        if (!chart.tooltip?.getActiveElements().length) {
            const dataSet = chart.getDatasetMeta(0).data;
            const firstPoint = dataSet[0] as any;
            const lastPoint = dataSet[dataSet.length - 1] as any;

            if (!firstPoint || !lastPoint) {
                return;
            }

            ctx.font = "normal 9px sans-serif";
            const firstDataText = this.getFormattedValue(firstPoint.$context.raw);
            const firstDataTextWidth = ctx.measureText(firstDataText).width + 10;

            const lastDataText = this.getFormattedValue(lastPoint.$context.raw);
            const lastDataTextWidth = ctx.measureText(lastDataText).width + 10;

            ctx.fillStyle = hex2rgba(this.theme.tooltip.initial.bg);
            ctx.fill(rectCorner(firstPoint.x - cornerSize / 2, firstPoint.y - 9, cornerSize));
            ctx.fill(roundedRect(firstPoint.x - 8, firstPoint.y - 28, firstDataTextWidth, 20, 4));
            ctx.fillStyle = hex2rgba(this.theme.tooltip.initial.color);
            ctx.fillText(firstDataText, firstPoint.x - 3, firstPoint.y - 15);

            ctx.fillStyle = hex2rgba(this.theme.tooltip.initial.bg);
            ctx.fill(rectCorner(lastPoint.x - cornerSize / 2, lastPoint.y - 9, cornerSize));
            ctx.fill(roundedRect(lastPoint.x + 8 - lastDataTextWidth, lastPoint.y - 28, lastDataTextWidth, 20, 4));
            ctx.fillStyle = hex2rgba(this.theme.tooltip.initial.color);
            ctx.fillText(lastDataText, lastPoint.x - lastDataTextWidth + 13, lastPoint.y - 15);

            ctx.restore();
        } else {
            const tooltip = chart.tooltip.getActiveElements()[0];
            const x = chart.tooltip.getActiveElements()[0].element.x;

            if (!x) {
                return;
            }

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const priceText = this.getFormattedValue(chart.data.datasets[0].data[tooltip.index] as string);
            const partPriceWidth = ctx.measureText(priceText).width;

            ctx.font = "normal 10px sans-serif";
            const height = 24;
            const width = partPriceWidth + 16;

            const left = xPosition(x, width, chart.canvas.clientWidth);
            const pontLeft = x;

            ctx.save();
            ctx.beginPath();

            // Box
            ctx.fillStyle = hex2rgba(this.theme.tooltip.dynamic.bg);
            ctx.fill(roundedRect(left, 0, width, height, 4));
            ctx.fill(rectCorner(pontLeft - cornerSize / 2, height, cornerSize));

            //Text
            ctx.fillStyle = hex2rgba(this.theme.tooltip.dynamic.color);
            ctx.fillText(`${priceText}`, left + 7, 16);

            //Line
            ctx.moveTo(x, yAxis.top - 14);
            ctx.lineTo(x, yAxis.bottom + 8);
            ctx.lineWidth = 1;
            ctx.strokeStyle = hex2rgba(this.theme.baseColor);
            ctx.stroke();

            ctx.restore();
        }
    }

    getPlugin() {
        return {
            id: "drawCustomTooltip",
            afterDraw: this.plugin.bind(this),
        };
    }
}
