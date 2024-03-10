import fs from 'fs';
import path from 'path';

/**
 * Checks if the provided path points to a valid image file and returns either the specified image path or a fallback.
 *
 * @param imagePath - The path to the image file.
 * @returns A promise that resolves with a string containing the path to the image file.
 */
export async function checkLoadDefaultImages(user_path: string, fallback_path: string): Promise<string> {
	if (await checkForImage(user_path)) {
		return removePublicPath(user_path);
	} else {
		console.error(
			`The provided path for the image is not valid: ${user_path} \nUsing the fallback path: ${fallback_path} instead.`
		);
	}
	if (await checkForImage(fallback_path)) {
		return removePublicPath(fallback_path);
	}
	throw new Error(`Failed to load the default image from the provided path: ${user_path} or the fallback path: ${fallback_path}`);
}

async function checkForImage(imagePath: string): Promise<boolean> {
	return new Promise((resolve) => {
		// Ensure the path is absolute
		const absolutePath = path.resolve(ensurePublicPath(imagePath));

		fs.stat(absolutePath, (err, stats) => {
			if (err) {
				resolve(false);
				return;
			}

			// Check if the file is not a directory
			if (stats.isFile()) {
				// Optionally, check for specific image file extensions
				const validImageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp', '.svg'];
				const extension = path.extname(absolutePath).toLowerCase();
				resolve(validImageExtensions.includes(extension));
			} else {
				resolve(false);
			}
		});
	});
}
function ensurePublicPath(path: string): string {
	if (path.startsWith('/public/')) {
		return path.slice(1);
	}

	if (path.startsWith('public/')) {
		return `${path}`;
	}

	if (path.startsWith('/')) {
		return `public${path}`;
	}
	return `public/${path}`;
}

function removePublicPath(path: string): string {
	if (path.startsWith('/public/')) {
		return path.slice(7);
	}
	if (path.startsWith('public/')) {
		return path.slice(6);
	}
	if (!path.startsWith('/')) {
		return `/${path}`;
	}
	return path;
}
