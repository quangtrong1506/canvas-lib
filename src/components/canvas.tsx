'use client';
import { forwardRef, useEffect, useRef } from 'react';
import { CanvasProps } from '../types';
import { resetCanvas } from '../utils';

/**
 * Canvas
 */
const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(({ items, ...props }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const time = useRef<number>(0);
    useEffect(() => {
        const draw = async () => {
            time.current = performance.now();
            const canvas = (ref as React.RefObject<HTMLCanvasElement>)?.current || canvasRef.current;
            if (!canvas) return;
            await resetCanvas(canvas);
            if (!items) return;
            const sortedItems = items.sort((a, b) => (a.zIndex ?? 0) - (b.zIndex ?? 0));
            for (const item of sortedItems) {
                console.log(item);
                if (item.type === 'image') {
                }
            }
        };
        draw();
    }, [ref, items]);

    return <canvas ref={ref || canvasRef} {...props} />;
});

export { Canvas };
