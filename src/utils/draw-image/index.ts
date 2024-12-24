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
        if (!ctx) {
            resolve({ success: false, drawTime: 0, message: 'Invalid canvas context' });
            return;
        }

        const img = new Image();
        const startTime = performance.now();

        img.onload = () => {
            let { width, height, aspectRatio, borderRadius, filter, opacity, rotation } = imageConfig;

            // Xử lý kích thước ảnh
            width = width === 'auto' ? img.width : width || img.width;
            height = height === 'auto' ? img.height : height || img.height;
            if (width > 0 && aspectRatio) height = width / aspectRatio;

            // Tạo canvas áo để xử lý toàn bộ ảnh
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d')!;
            tempCanvas.width = width;
            tempCanvas.height = height;

            // Tính toán tỷ lệ co giãn và cắt ảnh
            const scale = Math.max(width / img.width, height / img.height);
            const scaledWidth = img.width * scale;
            const scaledHeight = img.height * scale;
            const offsetX = (scaledWidth - width) / 2;
            const offsetY = (scaledHeight - height) / 2;

            // Vẽ ảnh co giãn lên canvas áo
            tempCtx.drawImage(img, -offsetX, -offsetY, scaledWidth, scaledHeight);

            // Áp dụng filter và opacity
            if (filter) tempCtx.filter = filter;
            if (opacity !== undefined) tempCtx.globalAlpha = opacity;

            // Xử lý bo góc nếu có
            if (borderRadius) {
                const radius =
                    typeof borderRadius === 'string' && borderRadius.includes('%')
                        ? (parseFloat(borderRadius) * Math.min(width, height)) / 100
                        : parseFloat(`${borderRadius}`);

                tempCtx.globalCompositeOperation = 'destination-in';
                if (radius >= Math.min(width, height) / 2) {
                    // Vẽ hình tròn nếu borderRadius >= 50%
                    const centerX = width / 2;
                    const centerY = height / 2;
                    const circleRadius = Math.min(width, height) / 2;

                    tempCtx.beginPath();
                    tempCtx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2);
                    tempCtx.closePath();
                    tempCtx.fill();
                } else {
                    // Vẽ hình chữ nhật bo góc
                    tempCtx.beginPath();
                    tempCtx.moveTo(radius, 0);
                    tempCtx.lineTo(width - radius, 0);
                    tempCtx.quadraticCurveTo(width, 0, width, radius);
                    tempCtx.lineTo(width, height - radius);
                    tempCtx.quadraticCurveTo(width, height, width - radius, height);
                    tempCtx.lineTo(radius, height);
                    tempCtx.quadraticCurveTo(0, height, 0, height - radius);
                    tempCtx.lineTo(0, radius);
                    tempCtx.quadraticCurveTo(0, 0, radius, 0);
                    tempCtx.closePath();
                    tempCtx.fill();
                }
            }

            // Xoay ảnh nếu cần
            if (rotation) {
                ctx.save();
                ctx.translate(x + width / 2, y + height / 2);
                ctx.rotate((rotation * Math.PI) / 180);
                ctx.drawImage(tempCanvas, -width / 2, -height / 2);
                ctx.restore();
            } else {
                ctx.drawImage(tempCanvas, x, y);
            }

            const endTime = performance.now();
            resolve({ success: true, drawTime: endTime - startTime });
        };

        // Xử lý hình ảnh đầu vào
        if (image instanceof File) {
            const reader = new FileReader();
            reader.onload = () => (img.src = reader.result as string);
            reader.readAsDataURL(image);
        } else {
            img.src = image;
        }
    });
};
