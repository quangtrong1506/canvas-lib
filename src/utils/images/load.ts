/**
 * Hàm load một hình ảnh từ File hoặc URL.
 * @param {File | string} src - Nguồn của hình ảnh, có thể là File hoặc URL.
 * @returns {Promise<HTMLImageElement | null>} - Promise trả về hình ảnh nếu thành công, hoặc null nếu có lỗi.
 */
export const loadImage = (src: File | string): Promise<HTMLImageElement | null> =>
    new Promise((resolve) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => resolve(null);
        if (src instanceof File) image.src = URL.createObjectURL(src);
        else image.src = src;
    });
