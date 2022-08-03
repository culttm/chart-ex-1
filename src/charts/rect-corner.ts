export function rectCorner(x: number, y: number, size: number): Path2D {
    const path = new Path2D();
    path.moveTo(x, y);
    path.lineTo(x + size, y);
    path.lineTo(x + size / 2, y + size / 2);
    path.closePath()
    return path;
}
