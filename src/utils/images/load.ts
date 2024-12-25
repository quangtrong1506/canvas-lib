/**
 * Hàm load một hình ảnh từ File, URL, hoặc đối tượng HTMLImageElement.
 * @param {File | string | HTMLImageElement} src - Nguồn của hình ảnh, có thể là File, URL, hoặc HTMLImageElement.
 * @returns {Promise<HTMLImageElement | null>} - Promise trả về hình ảnh nếu thành công, hoặc null nếu có lỗi.
 */
export const loadImage = (src: File | string | HTMLImageElement): Promise<HTMLImageElement | null> =>
    new Promise((resolve) => {
        const image = src instanceof HTMLImageElement ? src : new Image();
        image.onload = () => resolve(image);
        image.onerror = () => resolve(null);
        if (src instanceof File) image.src = URL.createObjectURL(src);
        else if (typeof src === 'string') image.src = src;
    });
