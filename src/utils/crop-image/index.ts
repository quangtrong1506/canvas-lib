const cropImageToFile = (
    img: HTMLImageElement,
    width: number,
    height: number,
    fileName: string
): Promise<File | null> => {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(null);
        canvas.width = width;
        canvas.height = height;
        let x = 0;
        let y = 0;
        ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
        canvas.toBlob((blob) => {
            if (!blob) return resolve(null);
            const file = new File([blob], fileName, { type: blob.type });
            resolve(file);
        }, 'image/png');
    });
};
