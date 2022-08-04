export const xPosition = (x: number, width: number, canvasWidth: number, offset = 0): number => {
    let left = x - width / 2;
    if (x < width / 2) {
        left = offset;
    } else if (x + width > canvasWidth * 2 - x) {
        left = canvasWidth - width - offset;
    }

    return left;
};
