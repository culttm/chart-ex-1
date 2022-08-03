export function roundedRect(x: number, y: number, width: number, height: number, radius: number): Path2D {

    let path = new Path2D();
    path.moveTo(x + radius, y);

    path.lineTo(x + width - radius, y);
    path.quadraticCurveTo(x + width, y, x + width, y + radius);

    path.lineTo(x + width, y + height - radius);
    path.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);

    // Create bottom corner
    // path.lineTo(cornerCenterX + cornerSize, y + height)
    // path.lineTo(cornerCenterX, y + height + cornerSize)
    // path.lineTo(cornerCenterX - cornerSize, y + height)

    path.lineTo(x + radius, y + height);
    path.quadraticCurveTo(x, y + height, x, y + height - radius);

    path.lineTo(x, y + radius);
    path.quadraticCurveTo(x, y, x + radius, y);

    path.closePath();
    return path;
}
