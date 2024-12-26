export type Base64URLString = string; // Giả sử Base64URLString là kiểu chuỗi

export interface CanvasItemBase {
    /**
     * ID của đối tượng canvas, có thể là số hoặc chuỗi.
     */
    id?: number | string;
    /**
     * Loại đối tượng, có thể là 'image' (hình ảnh) hoặc 'text' (văn bản).
     */
    type: 'image' | 'text';
    /**
     * Chỉ số zIndex của đối tượng.
     */
    zIndex?: number;
    /**
     * Tọa độ x của đối tượng trên canvas.
     */
    x?: number;
    /**
     * Tọa độ y của đối tượng trên canvas.
     */
    y?: number;
}

export interface CanvasItemImage extends CanvasItemBase {
    type: 'image';
    /**
     * Dữ liệu hình ảnh, có thể là tệp hoặc chuỗi base64.
     */
    image: File | Base64URLString;
    /**
     * Chiều rộng của hình ảnh.
     */
    width?: number | 'auto';
    /**
     * Chiều cao của hình ảnh.
     */
    height?: number | 'auto';
    /**
     * Bán kính bo góc của hình ảnh (ví dụ: '50%' hoặc '10px').
     */
    borderRadius?: string | number;
    /**
     * Mức độ mờ của hình ảnh, giá trị từ 0 đến 1 (0 là trong suốt, 1 là không mờ).
     */
    opacity?: number;
    /**
     * Góc xoay của hình ảnh (tính theo độ).
     */
    rotation?: number;
    /**
     * Bộ lọc CSS áp dụng cho hình ảnh (ví dụ: 'blur(5px)', 'grayscale(100%)').
     */
    filter?: string;
    /**
     * Aspect ratio của hình ảnh, ví dụ: 16/9 hoặc 4/3.
     */
    aspectRatio?: number;
}

export interface CanvasItemText extends CanvasItemBase {
    type: 'text';
    /**
     * Nội dung văn bản.
     */
    text: string;
    /**
     * Kích thước chữ.
     */
    fontSize?: number;
    /**
     * Phông chữ của văn bản.
     */
    fontFamily?: string;
    /**
     * Màu chữ.
     */
    color?: string;
    /**
     * Căn chỉnh văn bản theo chiều ngang ('left', 'center', 'right').
     */
    textAlign?: 'left' | 'center' | 'right';
    /**
     * Chiều cao dòng (line height) của văn bản.
     */

    fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter';
    /**
     * Kiểu chữ (normal hoặc italic).
     */
    fontStyle?: 'normal' | 'italic';

    /**
     * Chiều dài của văn bản (tính bằnng pixel).
     */
    width?: number;
    /**
     * Độ cong của văn bản 0-50
     */
    curveStrength?: number;
}

// CanvasItem có thể là CanvasItemImage hoặc CanvasItemText
export type CanvasItem = CanvasItemImage | CanvasItemText;
export type DrawImageOptions = Omit<CanvasItemImage, 'type' | 'image' | 'id' | 'zIndex' | 'x' | 'y'>;
/**
 * Thuộc tính của canvas được tạo thêm.
 *
 * _Properties for additional canvas configuration._
 */
export interface CanvasProps {
    /**
     * ID của canvas.
     *
     * _The unique identifier of the canvas._
     */
    id?: string;

    /**
     * Danh sách các đối tượng (canvas item) cần hiển thị trên canvas.
     *
     * _A collection of items to be rendered on the canvas._
     */
    items?: CanvasItem[];

    /**
     * Tỉ lệ zoom của canvas.
     *
     * _The zoom scale of the canvas._
     */
    scale?: number;

    /**
     * Chiều rộng của canvas (tính bằng pixel).
     *
     * _The width of the canvas in pixels._
     */
    width?: number;

    /**
     * Chiều cao của canvas (tính bằng pixel).
     *
     * _The height of the canvas in pixels._
     */
    height?: number;
    /**
     * Classname CSS tùy chỉnh cho canvas.
     *
     * _Custom CSS classname for the canvas._
     */
    className?: string;

    /**
     * Style inline tùy chỉnh cho canvas.
     *
     * _Custom inline styles for the canvas._
     */
    style?: React.CSSProperties;
}

export type DrawTextOptions = Omit<CanvasItemText, 'type' | 'text' | 'id' | 'zIndex' | 'x' | 'y'>;
