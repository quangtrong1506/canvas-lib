import { ImageConfig } from '../../types';

export const handleSize = (
    image: HTMLImageElement,
    {width: number,
        height: number,
        aspect: ImageConfig['aspectRatio']}
) => {

    ctx.drawImage(image, 10, 56.5, 200, 200, 5, 5, 200, 200);
};
