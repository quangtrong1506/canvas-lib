/**
 * Cắt hình ảnh theo kích thước cho trước và trả về kết quả dưới dạng file, base64 hoặc HTMLImageElement.
 *
 * @param {File | string | HTMLImageElement} input Đầu vào có thể là một File, đường dẫn URL hình ảnh (string) hoặc một HTMLImageElement.
 * @param {Object} options Các tùy chọn cấu hình:
 * @param {number} options.width Chiều rộng của hình ảnh sau khi cắt.
 * @param {number} options.height Chiều cao của hình ảnh sau khi cắt.
 * @param {string} [options.fileName='image'] Tên file của hình ảnh sau khi cắt, chỉ áp dụng khi outputType là 'file'.
 * @param {'file' | 'base64' | 'htmlImageElement'} [options.outputType='file'] Loại dữ liệu đầu ra. Có thể là 'file' (File), 'base64' (Chuỗi base64) hoặc 'htmlImageElement' (HTMLImageElement).
 *
 * @returns {Promise<{type?: 'File' | 'Base64' | 'HTMLImageElement' | null, data?: File | string | HTMLImageElement | null}>} Trả về một Promise với kết quả cắt hình ảnh.
 *  - type: Kiểu dữ liệu trả về, có thể là 'File', 'Base64', hoặc 'HTMLImageElement'.
 *  - data: Dữ liệu trả về, có thể là một File, chuỗi base64, hoặc một HTMLImageElement.
 */
export const cropImage = (
    input: File | string | HTMLImageElement,
    options: {
        width: number;
        height: number;
        fileName?: string;
        outputType?: 'file' | 'base64' | 'htmlImageElement';
    }
): Promise<{
    type?: 'File' | 'Base64' | 'HTMLImageElement' | null;
    data?: File | string | HTMLImageElement | null;
}> => {
    const { width, height, fileName = 'image', outputType = 'file' } = options;

    return new Promise((resolve) => {
        const img = new Image();

        // Xử lý đầu vào
        if (input instanceof HTMLImageElement) {
            img.src = input.src;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) return resolve({ type: 'HTMLImageElement', data: input });

                canvas.width = width;
                canvas.height = height;

                const x = (img.width - width) / 2;
                const y = (img.height - height) / 2;

                ctx.drawImage(img, x, y, width, height, 0, 0, width, height);

                if (outputType === 'file') {
                    canvas.toBlob((blob) => {
                        if (!blob) return resolve({ type: null, data: null });
                        const file = new File([blob], fileName, { type: blob.type });
                        resolve({ type: 'File', data: file });
                    }, 'image/png');
                } else if (outputType === 'base64') {
                    const base64 = canvas.toDataURL('image/png');
                    resolve({ type: 'Base64', data: base64 });
                } else if (outputType === 'htmlImageElement') {
                    const croppedImg = new Image();
                    croppedImg.src = canvas.toDataURL('image/png');
                    resolve({ type: 'HTMLImageElement', data: croppedImg });
                }
            };
        } else if (typeof input === 'string') {
            img.src = input;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) return resolve({ type: null, data: null });

                canvas.width = width;
                canvas.height = height;

                const x = (img.width - width) / 2;
                const y = (img.height - height) / 2;

                ctx.drawImage(img, x, y, width, height, 0, 0, width, height);

                if (outputType === 'file') {
                    canvas.toBlob((blob) => {
                        if (!blob) return resolve({ type: null, data: null });
                        const file = new File([blob], fileName, { type: blob.type });
                        resolve({ type: 'File', data: file });
                    }, 'image/png');
                } else if (outputType === 'base64') {
                    const base64 = canvas.toDataURL('image/png');
                    resolve({ type: 'Base64', data: base64 });
                } else if (outputType === 'htmlImageElement') {
                    const croppedImg = new Image();
                    croppedImg.src = canvas.toDataURL('image/png');
                    resolve({ type: 'HTMLImageElement', data: croppedImg });
                }
            };
        } else if (input instanceof File) {
            const objectURL = URL.createObjectURL(input);
            img.src = objectURL;
            img.onload = () => {
                URL.revokeObjectURL(objectURL); // Giải phóng URL
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) return resolve({ type: null, data: null });

                canvas.width = width;
                canvas.height = height;

                const x = (img.width - width) / 2;
                const y = (img.height - height) / 2;

                ctx.drawImage(img, x, y, width, height, 0, 0, width, height);

                if (outputType === 'file') {
                    canvas.toBlob((blob) => {
                        if (!blob) return resolve({ type: null, data: null });
                        const file = new File([blob], fileName, { type: blob.type });
                        resolve({ type: 'File', data: file });
                    }, 'image/png');
                } else if (outputType === 'base64') {
                    const base64 = canvas.toDataURL('image/png');
                    resolve({ type: 'Base64', data: base64 });
                } else if (outputType === 'htmlImageElement') {
                    const croppedImg = new Image();
                    croppedImg.src = canvas.toDataURL('image/png');
                    resolve({ type: 'HTMLImageElement', data: croppedImg });
                }
            };
        } else {
            resolve({ type: null, data: null });
        }

        img.onerror = () => resolve({ type: null, data: null });
    });
};
