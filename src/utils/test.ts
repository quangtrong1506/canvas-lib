const loadImage = (src: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.src = src;
        image.onload = () => resolve(image);
        image.onerror = reject;
    });

const drawImage = async (canvas: HTMLCanvasElement) => {
    console.log(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = await loadImage('/2.jpg');
    ctx.drawImage(img, 0, 0, 100, 100);
};
export { drawImage };
