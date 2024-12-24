import React, { forwardRef } from 'react';
import { CanvasProps } from '../types';

/**
 * Canvas
 */
const Canvas = forwardRef<HTMLCanvasElement, React.CanvasHTMLAttributes<HTMLCanvasElement> & CanvasProps>(
    (props, ref) => {
        return <canvas ref={ref} {...props} />;
    }
);

export { Canvas };
