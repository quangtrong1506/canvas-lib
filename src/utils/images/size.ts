/**
 * Interface đại diện cho các tham số dùng trong phương thức `ctx.drawImage`.
 *
 * Interface representing the parameters used in the `ctx.drawImage` method.
 */
interface Result {
    /**
     * Tọa độ x trên nguồn ảnh cần vẽ.
     *
     * X-coordinate on the source image to draw from.
     *
     * X POSITION ON SOURCE IMAGE
     */
    sx: number;

    /**
     * Tọa độ y trên nguồn ảnh cần vẽ.
     *
     * Y-coordinate on the source image to draw from.
     *
     * Y POSITION ON SOURCE IMAGE
     */
    sy: number;

    /**
     * Chiều rộng của vùng cần vẽ trên nguồn ảnh.
     *
     * Width of the source image region to draw.
     *
     * SOURCE IMAGE WIDTH
     */
    sWidth: number;

    /**
     * Chiều cao của vùng cần vẽ trên nguồn ảnh.
     *
     * Height of the source image region to draw.
     *
     * SOURCE IMAGE HEIGHT
     */

    sHeight: number;
    /**
     * Chiều rộng của ảnh trên canvas.
     *
     * Width of the image on the canvas.
     *
     * IMAGE WIDTH ON CANVAS
     */
    dWidth: number;

    /**
     * Chiều cao của ảnh trên canvas.
     *
     * Height of the image on the canvas.
     *
     * IMAGE HEIGHT ON CANVAS
     */
    dHeight: number;
}
interface Props {
    image: HTMLImageElement;
    width: number | 'auto';
    height: number | 'auto';
    aspect?: number;
}
export const handleImageSize = (props: Props) => {
    const { width, height, image, aspect } = props;

    // Khởi tạo giá trị mặc định cho kết quả
    const result: Result = {
        sx: 0, // Tọa độ bắt đầu cắt theo trục x
        sy: 0, // Tọa độ bắt đầu cắt theo trục y
        sWidth: image.width, // Chiều rộng vùng cắt
        sHeight: image.height, // Chiều cao vùng cắt
        dWidth: image.width, // Chiều rộng vùng hiển thị
        dHeight: image.height, // Chiều cao vùng hiển thị
    };

    // Trường hợp cả width và height đều là 'auto', dùng aspect để cắt ảnh
    if (width === 'auto' && height === 'auto' && aspect) {
        const imageRatio = image.width / image.height; // Tính tỷ lệ của ảnh gốc

        if (imageRatio > aspect) {
            // Ảnh quá rộng so với khung -> Cắt chiều ngang
            const targetWidth = image.height * aspect; // Chiều rộng cần thiết để giữ đúng tỷ lệ
            result.sx = (image.width - targetWidth) / 2; // Cắt từ giữa
            result.sWidth = targetWidth; // Thiết lập chiều rộng vùng cắt
            result.dWidth = targetWidth; // Hiển thị đúng chiều rộng
            result.dHeight = image.height; // Hiển thị chiều cao không đổi
        } else {
            // Ảnh quá cao so với khung -> Cắt chiều dọc
            const targetHeight = image.width / aspect; // Chiều cao cần thiết để giữ đúng tỷ lệ
            result.sy = (image.height - targetHeight) / 2; // Cắt từ giữa
            result.sHeight = targetHeight; // Thiết lập chiều cao vùng cắt
            result.dWidth = image.width; // Hiển thị chiều rộng không đổi
            result.dHeight = targetHeight; // Hiển thị đúng chiều cao
        }
    }

    // Trường hợp width có giá trị, height = 'auto', sử dụng aspect
    else if (typeof width === 'number' && height === 'auto' && aspect) {
        result.dWidth = width; // Chiều rộng hiển thị theo giá trị width
        result.dHeight = width / aspect; // Tính chiều cao hiển thị dựa trên aspect

        const targetWidth = image.height * aspect; // Chiều rộng cần thiết để giữ tỷ lệ
        if (image.width > targetWidth) {
            // Ảnh quá rộng -> Cắt chiều ngang
            result.sx = (image.width - targetWidth) / 2; // Cắt từ giữa
            result.sWidth = targetWidth; // Thiết lập chiều rộng vùng cắt
        } else {
            // Ảnh quá hẹp -> Cắt chiều dọc
            const targetHeight = image.width / aspect; // Chiều cao cần thiết để giữ tỷ lệ
            result.sy = (image.height - targetHeight) / 2; // Cắt từ giữa
            result.sHeight = targetHeight; // Thiết lập chiều cao vùng cắt
        }
    }

    // Trường hợp height có giá trị, width = 'auto', sử dụng aspect
    else if (typeof height === 'number' && width === 'auto' && aspect) {
        result.dHeight = height; // Chiều cao hiển thị theo giá trị height
        result.dWidth = height * aspect; // Tính chiều rộng hiển thị dựa trên aspect

        const targetHeight = image.width / aspect; // Chiều cao cần thiết để giữ tỷ lệ
        if (image.height > targetHeight) {
            // Ảnh quá cao -> Cắt chiều dọc
            result.sy = (image.height - targetHeight) / 2; // Cắt từ giữa
            result.sHeight = targetHeight; // Thiết lập chiều cao vùng cắt
        } else {
            // Ảnh quá hẹp -> Cắt chiều ngang
            const targetWidth = image.height * aspect; // Chiều rộng cần thiết để giữ tỷ lệ
            result.sx = (image.width - targetWidth) / 2; // Cắt từ giữa
            result.sWidth = targetWidth; // Thiết lập chiều rộng vùng cắt
        }
    }

    // Trường hợp cả width và height đều có giá trị, bỏ qua aspect
    else if (typeof width === 'number' && typeof height === 'number') {
        result.dWidth = width; // Sử dụng chiều rộng đã được cung cấp
        result.dHeight = height; // Sử dụng chiều cao đã được cung cấp

        const targetWidth = width; // Chiều rộng khung mục tiêu
        const targetHeight = height; // Chiều cao khung mục tiêu

        if (image.width / image.height > targetWidth / targetHeight) {
            // Ảnh quá rộng -> Cắt chiều ngang
            const adjustedWidth = image.height * (targetWidth / targetHeight); // Chiều rộng cần thiết để giữ đúng tỷ lệ khung
            result.sx = (image.width - adjustedWidth) / 2; // Cắt từ giữa
            result.sWidth = adjustedWidth; // Thiết lập chiều rộng vùng cắt
        } else {
            // Ảnh quá cao -> Cắt chiều dọc
            const adjustedHeight = image.width / (targetWidth / targetHeight); // Chiều cao cần thiết để giữ đúng tỷ lệ khung
            result.sy = (image.height - adjustedHeight) / 2; // Cắt từ giữa
            result.sHeight = adjustedHeight; // Thiết lập chiều cao vùng cắt
        }
    }

    return result; // Trả về kết quả xử lý
};
