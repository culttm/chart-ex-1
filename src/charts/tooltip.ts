import {Chart, TooltipItem, TooltipModel} from "chart.js";

export const TooltipTpl = (tooltipItem: TooltipItem<any>, data: any): string => {
    const currentElement = data.find(({ value }: any) => tooltipItem.parsed.y === value);
    return `
        <div class="custom-tooltip">
            <div>
                <b class="mr-1">$${currentElement?.value}</b>
                2 июн.
            </div>
        </div>
    `
}


export const TooltipExternal = (context: { chart: Chart; tooltip: TooltipModel<any> }) => {
    const tId = 'custom-tooltip';
    let tooltipEl = document?.querySelector(`#${tId}`) as HTMLDivElement;
    const position = context.chart.canvas.getBoundingClientRect();
    const tooltipModel = context.tooltip;

    const showTooltip = () => {
        tooltipEl.style.opacity = '1';
        tooltipEl.style.visibility = 'visible';
    }

    const hideTooltip = () => {
        tooltipEl.style.opacity = '0';
        tooltipEl.style.visibility = 'hidden';
    }

    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.id = tId;
        tooltipEl.innerHTML += '<div data-tooltop-root></div>';
        document.body.appendChild(tooltipEl);
    }

    if (tooltipModel.opacity === 0) {
        hideTooltip();
        return;
    }

    if (tooltipModel.body) {
        let innerHtml = '';
        const titleLines = tooltipModel.title || [];
        const bodyLines = tooltipModel.body.map((bodyItem) => bodyItem?.lines ?? '');
        titleLines.forEach((title) => innerHtml += title);
        bodyLines.forEach((body) => innerHtml += body);
        let tooltipRoot = tooltipEl.querySelector('[data-tooltop-root]') as HTMLDivElement;
        tooltipRoot.innerHTML = innerHtml;
    }

    showTooltip();

    tooltipEl.querySelector('.price')?.addEventListener('click', alert)

    tooltipEl.style.opacity = '1';
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.left = position.left + window.scrollX + tooltipModel.caretX + 'px';
    tooltipEl.style.top = position.top + window.scrollY + tooltipModel.caretY + 'px';
    tooltipEl.style.pointerEvents = 'none';
}

export const TooltipExternalTop = (context: { chart: Chart; tooltip: TooltipModel<any> }) => {
    const tId = 'data-custom-tooltip';

    const appChart = context.chart.canvas.closest('[data-chart]');
    const canvasChart = context.chart.canvas.closest('[data-canvas-root]');
    const tooltipRoot = appChart?.querySelector('[data-tooltip]') as HTMLDivElement;
    const tooltipModel = context.tooltip;

    let tooltipEl = tooltipRoot?.querySelector(`[${tId}]`) as HTMLDivElement;
    let corner = tooltipRoot?.querySelector('[data-tooltip-corner]') as HTMLDivElement;
    let line = corner?.querySelector('.line') as HTMLDivElement;
    let point = canvasChart?.querySelector('.point') as HTMLDivElement;


    const showTooltip = () => {
        tooltipEl.style.opacity = '1';
        tooltipEl.style.visibility = 'visible';
        corner.style.opacity = '1';
        corner.style.visibility = 'visible';
        point.style.opacity = '1';
        point.style.visibility = 'visible';
    }

    const hideTooltip = () => {
        tooltipEl.style.opacity = '0';
        tooltipEl.style.visibility = 'hidden';
        corner.style.opacity = '0';
        corner.style.visibility = 'hidden';
        point.style.opacity = '0';
        point.style.visibility = 'hidden';
    }

    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.dataset['customTooltip'] = '';

        tooltipEl.innerHTML += '<div data-tooltop-root></div>';
        tooltipRoot.appendChild(tooltipEl);

        point = document.createElement('div');

        point.classList.add('point')

        point.style.left = '0';
        point.style.top = '0';
        point.style.transform = `translate3d(${~~tooltipModel.caretX - 2}px, ${~~tooltipModel.caretY - 2}px, 0)`;
        canvasChart?.appendChild(point);

        corner = document.createElement('div');
        corner.dataset['tooltipCorner'] = ''
        corner.innerHTML += '<div class="line"></div>';
        tooltipRoot.appendChild(corner);
        line = corner?.querySelector('.line') as HTMLDivElement;
        appChart?.addEventListener('mouseleave', hideTooltip.bind(this));
    }


    if (tooltipModel.opacity === 0) {
        return;
    }

    if (tooltipModel.body) {
        let innerHtml = '';
        const titleLines = tooltipModel.title || [];
        const bodyLines = tooltipModel.body.map((bodyItem) => bodyItem?.lines ?? '');
        titleLines.forEach((title) => innerHtml += title);
        bodyLines.forEach((body) => innerHtml += body);
        let tooltipRoot = tooltipEl.querySelector('[data-tooltop-root]') as HTMLDivElement;
        tooltipRoot.innerHTML = innerHtml;
    }

    showTooltip();

    const width = tooltipEl.getBoundingClientRect().width;
    const x = tooltipModel.caretX;
    const y = tooltipModel.caretY;

    let left = (x - (width / 2)) + 'px';

    if (x < (width / 2)) {
        left = '-8px';
    } else if ((x + width) > (context.chart.canvas.width - x)) {
        left = ((context.chart.width - width) + 8) + 'px'
    }

    point.style.transform = `translate3d(${x - 2}px, ${y - 2}px, 0)`;
    line.style.height = context.chart.height - (context.chart.height - y) + 'px';
    corner.style.left = x + 'px';
    tooltipEl.style.left = left;
}
