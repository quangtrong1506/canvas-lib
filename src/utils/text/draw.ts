import { DrawTextOptions } from '../../types';

export const drawCurvedText = (
    canvas: HTMLCanvasElement,
    text: string,
    x: number,
    y: number,
    options: DrawTextOptions = {}
) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const {
        fontSize = 16,
        fontFamily = 'Arial',
        color = 'black',
        textAlign = 'center',
        fontWeight = 'normal',
        fontStyle = 'normal',
        curveStrength = 0, // Độ cong, 0 là thẳng, 50 là tròn
    } = options;

    // Thiết lập các thuộc tính văn bản
    ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textAlign = textAlign;

    // Tính bán kính và góc cho đường cong
    const radius = (canvas.width / 2) * (curveStrength / 50); // Bán kính của đường cong
    const totalArc = (curveStrength / 100) * Math.PI; // Tổng góc đường cong

    // Đo chiều rộng của từng ký tự
    const textWidths = text.split('').map((char) => ctx.measureText(char).width);
    const totalTextWidth = textWidths.reduce((sum, w) => sum + w, 0);

    const scaleFactor = totalArc / totalTextWidth; // Tỷ lệ giữa góc và chiều rộng văn bản

    let currentAngle = -totalArc / 2; // Bắt đầu từ giữa cung tròn

    text.split('').forEach((char, i) => {
        const charWidth = textWidths[i];
        const charAngle = charWidth * scaleFactor; // Góc dành cho ký tự hiện tại

        // Tính toán vị trí của ký tự
        const charX = x + Math.sin(currentAngle + charAngle / 2) * radius;
        const charY = y + Math.cos(currentAngle + charAngle / 2) * radius;

        ctx.save();
        ctx.translate(charX, charY);
        ctx.rotate(-(currentAngle + charAngle / 2)); // Xoay ký tự theo cung
        ctx.fillText(char, 0, 0);
        ctx.restore();

        currentAngle += charAngle; // Cập nhật góc cho ký tự tiếp theo
    });
};
