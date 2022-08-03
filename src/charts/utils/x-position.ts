export const xPosition = (x: number, width: number, canvasWidth: number): number => {
    let left = x - (width / 2);
    if (x < (width / 2)) {
        left = 0;
    } else if ((x + width) > ((canvasWidth * 2) - x)) {
        left = canvasWidth - width
    }

    return left;
}
