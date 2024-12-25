export const cropImage = (
    input: File | string | HTMLImageElement,
    options: {
        width: number;
        height: number;
        fileName?: string;
        outputType?: 'file' | 'base64';
    }
): Promise<{
    type?: 'File' | 'Base64' | 'HTMLImageElement' | null;
    data?: File | string | null;
}> => {
    const { width, height, fileName = 'image', outputType = 'file' } = options;

    return new Promise((resolve) => {
        const img = new Image();

        // Xử lý đầu vào
        if (input instanceof HTMLImageElement) {
            img.src = input.src;
        } else if (typeof input === 'string') {
            img.src = input;
        } else if (input instanceof File) {
            const objectURL = URL.createObjectURL(input);
            img.src = objectURL;
            img.onload = () => URL.revokeObjectURL(objectURL); // Giải phóng URL
        } else {
            return resolve({ type: null, data: null });
        }

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
            } else {
                const base64 = canvas.toDataURL('image/png');
                resolve({ type: 'Base64', data: base64 });
            }
        };

        img.onerror = () => resolve({ type: null, data: null });
    });
};
