/**
 * Chuyển đổi borderRadius thành các giá trị pixel theo góc.
 * @param borderRadius Giá trị bo góc (px, %, hoặc số)
 * @param dw Chiều rộng hình ảnh
 * @param dh Chiều cao hình ảnh
 */
export const parseBorderRadius = (borderRadius: string | number, dw: number, dh: number) => {
    const parseValue = (value: string | number, size: number) => {
        if (typeof value === 'number') return value;
        if (value.includes('%')) return (parseFloat(value) / 100) * size;
        if (value.includes('px')) return parseFloat(value);
        return 0; // Mặc định nếu không rõ giá trị
    };
    const radius = parseValue(borderRadius, Math.min(dw, dh));
    return { tl: radius, tr: radius, br: radius, bl: radius };
};
