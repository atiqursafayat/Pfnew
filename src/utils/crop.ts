export function createImage(url: string): Promise<HTMLImageElement> {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.addEventListener('load', () => resolve(image));
		image.addEventListener('error', (error) => reject(error));
		image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
		image.src = url;
	});
}

export function getRadianAngle(degreeValue: number) {
	return (degreeValue * Math.PI) / 180;
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width: number, height: number, rotation: number) {
	const rotRad = getRadianAngle(rotation);

	return {
		width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
		height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height)
	};
}

/**
 * Resize image data to a new width and height
 */
export async function resizeImageData(imageData: ImageData, width: number, height: number) {
	const resizeWidth = width;
	const resizeHeight = height;
	console.log(imageData.width, imageData.height);
	const ibm = await window.createImageBitmap(imageData, 0, 0, imageData.width, imageData.height);
	const canvas = document.createElement('canvas');
	canvas.width = resizeWidth;
	canvas.height = resizeHeight;
	const ctx = canvas.getContext('2d');

	if (!ctx) {
		return null;
	}

	ctx.drawImage(ibm, 0, 0, resizeWidth, resizeHeight);
	return ctx.getImageData(0, 0, resizeWidth, resizeHeight);
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
export default async function getCroppedImg(
	imageSrc: string,
	pixelCrop: { x: number; y: number; width: number; height: number },
	rotation = 0,
	flip = { horizontal: false, vertical: false },
	desiredSize = { width: 400, height: 400 }
): Promise<string | null> {
	const image = await createImage(imageSrc);
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	if (!ctx) {
		return null;
	}

	const rotRad = getRadianAngle(rotation);

	// calculate bounding box of the rotated image
	const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rotation);

	// set canvas size to match the bounding box
	canvas.width = bBoxWidth;
	canvas.height = bBoxHeight;

	// translate canvas context to a central location to allow rotating and flipping around the center
	ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
	ctx.rotate(rotRad);
	ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
	ctx.translate(-image.width / 2, -image.height / 2);

	// draw rotated image
	ctx.drawImage(image, 0, 0);

	// croppedAreaPixels values are bounding box relative
	// extract the cropped image using these values
	const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height);

	// Scale image data to desired size
	const resizedData = await resizeImageData(data, desiredSize.width, desiredSize.height);
	if (!resizedData) {
		return null;
	}

	// set canvas width to final desired crop size - this will clear existing context
	canvas.width = desiredSize.width;
	canvas.height = desiredSize.height;
	// paste generated rotate image at the top left corner
	ctx.putImageData(resizedData, 0, 0);

	// const imgUrl = new URL('./assets/content.png', import.meta.url).href;
	// console.log(imgUrl);

	// As Base64 string
	// return canvas.toDataURL('image/jpeg');

	// As a blob
	return new Promise((resolve, reject) => {
		canvas.toBlob((file) => {
			if (!file) {
				reject(new Error('Canvas is empty'));
				return;
			}
			resolve(URL.createObjectURL(file));
		}, 'image/jpeg');
	});
}
