/**
 * Cấu hình cho ảnh khi vẽ lên canvas.
 *
 * _Image configuration for drawing on canvas._
 */
export interface ImageConfig {
    /**
     * Chiều rộng của hình ảnh.
     *
     * _The width of the image._
     */
    width?: number | 'auto';

    /**
     * Chiều cao của hình ảnh.
     *
     * _The height of the image._
     */
    height?: number | 'auto';

    /**
     * Bán kính bo góc của hình ảnh (ví dụ: '50%' hoặc '10px').
     *
     * _The border radius of the image (e.g., '50%' or '10px')._
     */
    borderRadius?: string | number;

    /**
     * Mức độ mờ của hình ảnh, giá trị từ 0 đến 1 (0 là trong suốt, 1 là không mờ).
     *
     * _The opacity of the image, ranging from 0 to 1 (0 is transparent, 1 is fully opaque)._
     */
    opacity?: number;

    /**
     * Góc xoay của hình ảnh (tính theo độ).
     *
     * _The rotation angle of the image (in degrees)._
     */
    rotation?: number;

    /**
     * Bộ lọc CSS áp dụng cho hình ảnh (ví dụ: 'blur(5px)', 'grayscale(100%)').
     *
     * _The CSS filter applied to the image (e.g., 'blur(5px)', 'grayscale(100%)._
     */
    filter?: string;

    /**
     * Aspect ratio của hình ảnh, ví dụ: 16/9 hoặc 4/3.
     *
     * _The aspect ratio of the image, e.g., 16/9 or 4/3._
     */
    aspectRatio?: number;
}

/**
 * Cấu hình cho văn bản trên canvas.
 */
export interface TextConfig {
    /**
     * Kích thước chữ.
     *
     * _Font size of the text._
     */
    fontSize?: number;
    /**
     * Phông chữ của văn bản.
     *
     * _Font family of the text._
     */
    fontFamily?: string;
    /**
     * Màu chữ.
     *
     * _Color of the text._
     */
    color?: string;
    /**
     * Căn chỉnh văn bản theo chiều ngang ('left', 'center', 'right').
     *
     * _Horizontal text alignment ('left', 'center', 'right')._
     */
    textAlign?: 'left' | 'center' | 'right';
    /**
     * Chiều cao dòng (line height) của văn bản.
     *
     * _Line height of the text._
     */
    lineHeight?: number;
    /**
     * Khoảng cách giữa các chữ trong văn bản.
     *
     * _Letter spacing of the text._
     */
    letterSpacing?: number;
    /**
     * Độ đậm của chữ (normal, bold, bolder, lighter).
     *
     * _Font weight of the text ('normal', 'bold', 'bolder', 'lighter')._
     */
    fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter';
    /**
     * Kiểu chữ (normal hoặc italic).
     *
     * _Font style of the text ('normal', 'italic')._
     */
    fontStyle?: 'normal' | 'italic';
}

/**
 * Mô tả một đối tượng trên canvas (có thể là hình ảnh hoặc văn bản).
 */
export interface CanvasItem {
    /**
     * ID của đối tượng canvas, có thể là số hoặc chuỗi.
     *
     * _The ID of the canvas item, which can be a number or a string._
     */
    id: number | string;
    /**
     * Loại đối tượng, có thể là 'image' (hình ảnh) hoặc 'text' (văn bản).
     *
     * _The type of the item, either 'image' (for images) or 'text' (for text)._
     */
    type: 'image' | 'text';
    /**
     * Chỉ số zIndex của đối tượng (quyết định thứ tự xếp chồng).
     *
     * _The z-index of the item, determining its stacking order._
     */
    zIndex?: number;
    /**
     * Tọa độ x (trái) của đối tượng trên canvas.
     *
     * _The x-coordinate (horizontal position) of the item on the canvas._
     */
    x?: number;
    /**
     * Tọa độ y (trên) của đối tượng trên canvas.
     *
     * _The y-coordinate (vertical position) of the item on the canvas._
     */
    y?: number;
    /**
     * Nội dung văn bản (chỉ có khi type là 'text').
     *
     * _The text content (only used when the type is 'text')._
     */
    text?: string;
    /**
     * Dữ liệu hình ảnh, có thể là tệp hoặc chuỗi base64 (chỉ có khi type là 'image').
     *
     * _The image data, which can be a file or a base64 string (only used when the type is 'image')._
     */
    image?: File | Base64URLString;
    /**
     * Cấu hình hình ảnh (chỉ có khi type là 'image').
     *
     * _The image configuration (only used when the type is 'image')._
     */
    image_config?: ImageConfig;
    /**
     * Cấu hình văn bản (chỉ có khi type là 'text').
     *
     * _The text configuration (only used when the type is 'text')._
     */
    text_config?: TextConfig;
}

/**
 * Thuộc tính của canvas được tạo thêm
 */
export interface CanvasProps {
    /**
     * ID của canvas.
     *
     * _The ID of the canvas._
     */
    id: string;
    /**
     * Danh sách các đối tượng (canvas item) cần hiển thị trên canvas.
     *
     * _A list of canvas items to be displayed on the canvas._
     */
    items: CanvasItem[];
}
