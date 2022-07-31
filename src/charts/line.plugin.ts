import {Chart} from "chart.js";


function roundedRect(x: number, y: number, width: number, height: number, radius: number, cornerCenterX: number, cornerSize: number) {
    let path = new Path2D();
    path.moveTo(x + radius, y);

    path.lineTo(x + width - radius, y);
    path.quadraticCurveTo(x + width, y, x + width, y + radius);

    path.lineTo(x + width, y + height - radius);
    path.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);

    // Create bottom corner
    path.lineTo(cornerCenterX + cornerSize, y + height)
    path.lineTo(cornerCenterX, y + height + cornerSize)
    path.lineTo(cornerCenterX - cornerSize, y + height)

    path.lineTo(x + radius, y + height);
    path.quadraticCurveTo(x, y + height, x, y + height - radius);

    path.lineTo(x, y + radius);
    path.quadraticCurveTo(x, y, x + radius, y);

    path.closePath();
    return path;
}

export class LinePlugin {

    constructor(private color: string) {
    }

    private plugin(chart: Chart) {
        if (!chart.tooltip?.getActiveElements().length) {
            return;
        }
        const tooltip = chart.tooltip.getActiveElements()[0];
        const x = chart.tooltip.getActiveElements()[0].element.x;

        if (!x) {
            return;
        }

        const yAxis = chart.scales.y;
        const ctx = chart.ctx;

        const tooltipData = {
            tooltip: tooltip.index,
            value: chart.data.datasets[0].data[tooltip.index],
            label: new Date(chart.data.labels?.find((_, i) => i === tooltip.index) as Date).toLocaleDateString()
        };


        const priceText = `$${tooltipData.value}`;
        const partPriceWidth = ctx.measureText(priceText).width;

        ctx.font = 'normal 10px sans-serif';
        const dateText = `(${tooltipData.label})`;
        const partDateWidth = ctx.measureText(dateText).width;


        const width = (partPriceWidth + partDateWidth) + 14;


        const height = 24;

        let left = x - (width / 2);
        let pontLeft = (left + width / 2);

        if (x < (width / 2)) {
            left = 0;
        } else if ((x + width) > (chart.canvas.width - x)) {
            left = chart.width - width
        }

        ctx.save();
        ctx.beginPath();

        // Box
        ctx.fillStyle ='rgba(101, 101, 101, 1)';
        ctx.fill(roundedRect(left, 0, width, height, 4, pontLeft, 4))

        //Text
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 10px sans-serif';
        ctx.fillText(`${priceText}`, left + 6, 16);
        ctx.font = 'normal 10px sans-serif';
        ctx.fillText(`${dateText}`, left + partPriceWidth + 8, 16);

        //Line
        ctx.moveTo(x, yAxis.top - 16);
        ctx.lineTo(x, yAxis.bottom);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba('+ this.color +', 0.40)';
        ctx.stroke();

        ctx.restore();
    }

    getPlugin() {
        return {
            id: "drawLineVertical",
            afterDraw: this.plugin.bind(this)
        }
    }
}
