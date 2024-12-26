import { cropImage } from './crop';

/**
 * Hàm tự động cắt hình ảnh theo tỷ lệ khung hình (aspect ratio).
 *
 * @param {HTMLImageElement} image - Hình ảnh cần cắt.
 * @param {number} aspectRatio - Tỷ lệ khung hình mong muốn.
 * @throws {Error} Nếu aspectRatio nhỏ hơn hoặc bằng 0.
 * @returns {Promise<HTMLImageElement | null>} Trả về hình ảnh đã cắt hoặc null nếu có lỗi hoặc không có dữ liệu.
 */
export const autoImage = (image: HTMLImageElement, aspectRatio: number): Promise<HTMLImageElement | null> =>
    new Promise(async (resolve) => {
        if (aspectRatio <= 0) return resolve(null);

        const originalWidth = image.naturalWidth || image.width;
        const originalHeight = image.naturalHeight || image.height;
        let width = originalWidth;
        let height = originalHeight;

        if (originalWidth / originalHeight > aspectRatio) {
            width = originalHeight * aspectRatio;
            height = originalHeight;
        } else {
            height = originalWidth / aspectRatio;
            width = originalWidth;
        }

        try {
            const result = await cropImage(image, {
                width: Math.round(width),
                height: Math.round(height),
                outputType: 'htmlImageElement',
            });
            resolve(result.data ? (result.data as HTMLImageElement) : null);
        } catch {
            resolve(null);
        }
    });
