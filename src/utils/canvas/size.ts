/**
 * Thay đổi kích thước của thẻ canvas.
 *
 * @param canvas Thẻ canvas cần thay đổi kích thước.
 * @param width Chiều rộng mới của canvas.
 * @param height Chiều cao mới của canvas.
 */
export const resizeCanvas = (canvas: HTMLCanvasElement, width: number, height: number) => {
    canvas.width = width;
    canvas.height = height;
};

/**
 * Lấy kích thước của canvas
 * @param canvas HTMLCanvasElement cần lấy kích thước
 * @returns { width: number; height: number } Kích thước của canvas
 */
export const getSize = (canvas: HTMLCanvasElement): { width: number; height: number } => {
    return { width: canvas.width, height: canvas.height };
};
