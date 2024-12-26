/**
 * Reset the canvas to its default state
 * @param canvas HTMLCanvasElement cần reset
 * @param option Tùy chọn về chiều rộng và chiều cao để reset
 * @throws Error nếu không thể lấy context hoặc xảy ra lỗi trong quá trình reset
 */
export const resetCanvas = (canvas: HTMLCanvasElement, option?: { width?: number; height?: number }): void => {
    try {
        const context = canvas.getContext('2d');
        if (!context) throw new Error('Canvas context not available');
        context.clearRect(0, 0, option?.width ?? canvas.width, option?.height ?? canvas.height);
    } catch (error) {
        throw new Error(`Reset failed: ${(error as Error).message}`);
    }
};
