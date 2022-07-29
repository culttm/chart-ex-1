import {Chart, TooltipItem, TooltipModel} from "chart.js";

export const TooltipTpl = (tooltipItem: TooltipItem<any>, data: any): string => {
    const currentElement = data.find(({ value }: any) => tooltipItem.parsed.y === value);
    return `
        <div class="custom-tooltip">
            <div class="price">
                $${currentElement?.value}
            </div>
            <div class="date">
                ${(currentElement?.date as Date).toLocaleDateString()}
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
    const appChart = context.chart.canvas.closest('[data-chart]');
    const tooltipRoot = appChart?.querySelector('[data-tooltip]') as HTMLDivElement;
    const tId = 'data-custom-tooltip';
    let tooltipEl = tooltipRoot?.querySelector(`[${tId}]`) as HTMLDivElement;
    let corner = tooltipRoot?.querySelector('[data-tooltip-corner]') as HTMLDivElement;
    const tooltipModel = context.tooltip;

    const showTooltip = () => {
        tooltipEl.style.opacity = '1';
        tooltipEl.style.visibility = 'visible';
        corner.style.opacity = '1';
        corner.style.visibility = 'visible';
    }

    const hideTooltip = () => {
        tooltipEl.style.width = 'unset';
        tooltipEl.style.opacity = '0';
        tooltipEl.style.visibility = 'hidden';
        corner.style.opacity = '0';
        corner.style.visibility = 'hidden';

        tooltipRoot.removeChild(tooltipEl)
        tooltipRoot.removeChild(corner)
    }

    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.dataset['customTooltip'] = ''
        tooltipEl.innerHTML += '<div data-tooltop-root></div>';
        tooltipRoot.appendChild(tooltipEl);
        corner = document.createElement('div');
        corner.dataset['tooltipCorner'] = ''
        tooltipRoot.appendChild(corner);
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

    tooltipEl.style.opacity = '1';
    tooltipEl.style.position = 'absolute';

    const width = ~~tooltipEl.getBoundingClientRect().width;
    const x = ~~tooltipModel.caretX;


    let left = (x - (width / 2)) + 'px';

    corner.style.left = x + 'px';
    tooltipEl.style.left = left;
    tooltipEl.style.right = 'unset';

    if (x < (width / 2)) {
        left = '-8px';
        tooltipEl.style.left = left;
    } else if ((x + ((width))) > (context.chart.canvas.width - x)) {
        tooltipEl.style.left = 'unset';
        tooltipEl.style.right = '-8px';
    }

}
