import { ImageConfig } from '../../types';

/**
 * Vẽ hình ảnh lên canvas với cấu hình tùy chỉnh và trả về kết quả.
 *
 * _Draws an image on a canvas with custom configuration and returns the result._
 *
 * @param canvas - Canvas HTML nơi sẽ vẽ hình ảnh.
 * _The HTML canvas element where the image will be drawn._
 * @param image - Hình ảnh nguồn có thể là file hoặc chuỗi URL base64.
 * _The image source, which can be a File or a base64 string URL._
 * @param x - Tọa độ X của hình ảnh trên canvas.
 * _The X coordinate of the image on the canvas._
 * @param y - Tọa độ Y của hình ảnh trên canvas.
 * _The Y coordinate of the image on the canvas._
 * @param imageConfig - Cấu hình của hình ảnh cần vẽ.
 * _The configuration of the image to draw._
 * @returns Promise trả về kết quả vẽ ảnh, bao gồm trạng thái thành công, thời gian vẽ và thông báo (nếu có).
 * _Returns a promise with the result of the drawing operation, including success status, drawing time, and message (if any)._
 */
export const drawImageOnCanvas = (
    canvas: HTMLCanvasElement,
    image: File | string,
    x: number,
    y: number,
    imageConfig: ImageConfig
): Promise<{ success: boolean; drawTime: number; message?: string }> => {
    return new Promise((resolve) => {
        const ctx = canvas.getContext('2d');
        if (!ctx || !imageConfig) {
            resolve({ success: false, drawTime: 0, message: 'Invalid canvas context or image configuration' });
            return;
        }

        const img = new Image();
        const startTime = performance.now(); // Lưu thời gian bắt đầu vẽ ảnh

        img.onload = () => {
            let width = imageConfig.width === 'auto' ? img.width : imageConfig.width || 0;
            let height = imageConfig.height === 'auto' ? img.height : imageConfig.height || 0;

            // Tính toán tỷ lệ co giãn sao cho ảnh lấp đầy toàn bộ khung
            let scale = 1;

            if (width > 0 && img.width < width) {
                // Nếu width của ảnh nhỏ hơn width của canvas, tính tỷ lệ
                scale = width / img.width;
                width = width;
                height = img.height * scale;
            } else if (height > 0 && img.height < height) {
                // Nếu height của ảnh nhỏ hơn height của canvas, tính tỷ lệ
                scale = height / img.height;
                height = height;
                width = img.width * scale;
            } else {
                // Nếu ảnh lớn hơn canvas, co giãn ảnh để vừa khung
                if (img.width > width) {
                    scale = width / img.width;
                    width = width;
                    height = img.height * scale;
                }
                if (img.height > height) {
                    scale = height / img.height;
                    height = height;
                    width = img.width * scale;
                }
            }

            // Xử lý bo góc nếu có
            if (imageConfig.borderRadius) {
                const borderRadius =
                    typeof imageConfig.borderRadius === 'string' && imageConfig.borderRadius.includes('%')
                        ? (parseFloat(imageConfig.borderRadius) * Math.min(width, height)) / 100
                        : parseFloat((imageConfig.borderRadius as string) || `${imageConfig.borderRadius}`);
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x + borderRadius, y);
                ctx.lineTo(x + width - borderRadius, y);
                ctx.quadraticCurveTo(x + width, y, x + width, y + borderRadius);
                ctx.lineTo(x + width, y + height - borderRadius);
                ctx.quadraticCurveTo(x + width, y + height, x + width - borderRadius, y + height);
                ctx.lineTo(x + borderRadius, y + height);
                ctx.quadraticCurveTo(x, y + height, x, y + height - borderRadius);
                ctx.lineTo(x, y + borderRadius);
                ctx.quadraticCurveTo(x, y, x + borderRadius, y);
                ctx.clip(); // Cắt theo borderRadius
            }

            // Cắt ảnh sao cho phần dư được bỏ đi
            const cropX = (img.width - width) / 2;
            const cropY = (img.height - height) / 2;

            // Áp dụng các bộ lọc, độ mờ và xoay
            if (imageConfig.filter) ctx.filter = imageConfig.filter;
            if (imageConfig.opacity !== undefined) ctx.globalAlpha = imageConfig.opacity;
            if (imageConfig.rotation) ctx.rotate((imageConfig.rotation * Math.PI) / 180);

            // Vẽ ảnh lên canvas
            ctx.drawImage(img, cropX, cropY, img.width - cropX * 2, img.height - cropY * 2, x, y, width, height);

            // Quay lại trạng thái ban đầu sau khi vẽ ảnh
            ctx.filter = 'none';
            ctx.globalAlpha = 1;
            if (imageConfig.rotation) ctx.rotate(-(imageConfig.rotation * Math.PI) / 180);

            if (imageConfig.borderRadius) {
                ctx.restore(); // Khôi phục lại trạng thái canvas sau khi vẽ bo góc
            }

            const endTime = performance.now();
            const drawTime = endTime - startTime;
            resolve({ success: true, drawTime });
        };

        // Xử lý hình ảnh đầu vào là File hoặc URL (string)
        if (image instanceof File) {
            const reader = new FileReader();
            reader.onload = () => {
                img.src = reader.result as string;
            };
            reader.readAsDataURL(image);
        } else {
            img.src = image; // Nếu là URL, gán trực tiếp
        }
    });
};
