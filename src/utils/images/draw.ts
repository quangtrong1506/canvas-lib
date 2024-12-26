import { DrawImageOptions } from '../../types';
import { autoImage } from './auto';
import { parseBorderRadius } from './helpers';
import { loadImage } from './load';

/**
 * Vẽ hình ảnh lên canvas.
 * @param {HTMLCanvasElement} canvas - Canvas để vẽ hình ảnh.
 * @param {HTMLImageElement | File | string} image - Hình ảnh cần vẽ (có thể là thẻ img, file hoặc URL).
 * @param {number} x - Tọa độ x để vẽ hình ảnh.
 * @param {number} y - Tọa độ y để vẽ hình ảnh.
 * @param {number | 'auto'} [width] - Chiều rộng của hình ảnh (hoặc 'auto' để giữ nguyên).
 * @param {number | 'auto'} [height] - Chiều cao của hình ảnh (hoặc 'auto' để giữ nguyên).
 * @returns {Promise<{status: 'success' | 'error', message?: string, drawTime?: number}>} Trả về một Promise với thông tin trạng thái và thời gian vẽ.
 */

export const drawImage = (
    canvas: HTMLCanvasElement,
    image: HTMLImageElement | File | string,
    x: number,
    y: number,
    options?: DrawImageOptions
): Promise<{ status: 'success' | 'error'; message?: string; drawTime?: number }> => {
    return new Promise(async (resolve) => {
        const { width, height, borderRadius, opacity, rotation, filter, aspectRatio } = options || {};

        const startTime = performance.now(); // Bắt đầu đo thời gian
        try {
            const ctx = canvas.getContext('2d');
            if (!ctx) return resolve({ status: 'error', message: 'Canvas context is not available' });

            const imgTag = await loadImage(image);
            if (!imgTag) return resolve({ status: 'error', message: 'Failed to load image' });

            let ar = 0;
            let dw = 0;
            let dh = 0;
            if (aspectRatio && width === 'auto' && height === 'auto') {
                ar = aspectRatio;
                if (imgTag.width < imgTag.height) {
                    if (aspectRatio > 1) {
                        dw = imgTag.width;
                        dh = imgTag.width / aspectRatio;
                    } else {
                        dh = imgTag.height;
                        dw = imgTag.height * aspectRatio;
                    }
                } else {
                    if (aspectRatio > 1) {
                        dh = imgTag.height;
                        dw = imgTag.height * aspectRatio;
                    } else {
                        dw = imgTag.width;
                        dh = imgTag.width / aspectRatio;
                    }
                }
            } else if (typeof width === 'number' && typeof height === 'number') {
                ar = width / height;
                dw = width;
                dh = height;
            } else if (typeof width === 'number') {
                const scale = width / imgTag.width;
                ar = aspectRatio ?? width / (imgTag.height * scale);
                dw = width;
                dh = aspectRatio ? width / aspectRatio : imgTag.height * scale;
            } else if (typeof height === 'number') {
                const scale = height / imgTag.height;
                ar = aspectRatio ?? (imgTag.width * scale) / height;
                dw = aspectRatio ? height * aspectRatio : imgTag.width * scale;
                dh = height;
            } else {
                ar = imgTag.naturalWidth / imgTag.naturalHeight;
                dw = imgTag.naturalWidth;
                dh = imgTag.naturalHeight;
            }

            const imageC = await autoImage(imgTag, ar);
            if (!imageC) return resolve({ status: 'error', message: 'Failed to resize image' });
            // Thiết lập filter
            if (filter) ctx.filter = filter;

            ctx.save();

            // Xử lý opacity
            if (typeof opacity === 'number') ctx.globalAlpha = opacity;

            // Xử lý rotation
            if (typeof rotation === 'number' && rotation !== 0) {
                ctx.translate(x + dw / 2, y + dh / 2);
                ctx.rotate((rotation * Math.PI) / 180);
                ctx.translate(-(x + dw / 2), -(y + dh / 2));
            }

            // Xử lý borderRadius
            if (borderRadius) {
                const radius = parseBorderRadius(borderRadius, dw, dh);
                ctx.beginPath();
                ctx.moveTo(x + radius.tl, y);
                ctx.arcTo(x + dw, y, x + dw, y + dh, radius.tr);
                ctx.arcTo(x + dw, y + dh, x, y + dh, radius.br);
                ctx.arcTo(x, y + dh, x, y, radius.bl);
                ctx.arcTo(x, y, x + dw, y, radius.tl);
                ctx.closePath();
                ctx.clip();
            }
            ctx.drawImage(imageC, x, y, dw, dh);
            ctx.restore();

            const endTime = performance.now();
            resolve({
                status: 'success',
                drawTime: endTime - startTime,
            });
        } catch (error) {
            const endTime = performance.now();
            resolve({
                status: 'error',
                message: (error as Error).message,
                drawTime: endTime - startTime,
            });
        }
    });
};
