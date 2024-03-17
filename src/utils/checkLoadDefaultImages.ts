import fs from 'fs';
import path from 'path';

/**
 * Checks if the provided path points to a valid image file and returns either the specified image path or a fallback.
 *
 * @param userPath - The path to the image file specified by the user.
 * @param defaultPath - The easy-abc default path to the image file.
 * @returns A promise that resolves with a string containing the path to the image file.
 */
export async function checkLoadDefaultImages(userPath: string, defaultPath: string): Promise<string> {
	if (await checkForImage('personal-blog', userPath)) {
		return removePublicPath('personal-blog', userPath);
	} else {
		console.error(
			`The provided path for the image is not valid: ${userPath} \nUsing the default easy-abc path: ${defaultPath} instead.`
		);
	}
	if (await checkForImage('easy-abc', defaultPath)) {
		return removePublicPath('easy-abc', defaultPath);
	}
	throw new Error(`Failed to load the default image the default easy-abc path: ${defaultPath}`);
}

async function checkForImage(base: string, imagePath: string): Promise<boolean> {
	return new Promise((resolve) => {
		// Ensure the path is absolute
		const absolutePath = path.resolve(ensurePath(base, imagePath));

		fs.stat(absolutePath, (err, stats) => {
			if (err) {
				resolve(false);
				return;
			}

			// Check if the file is not a directory
			if (stats.isFile()) {
				// Optionally, check for specific image file extensions
				const validImageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp', '.svg', '.gif'];
				const extension = path.extname(absolutePath).toLowerCase();
				resolve(validImageExtensions.includes(extension));
			} else {
				resolve(false);
			}
		});
	});
}
function ensurePath(base: string, path: string): string {
	if (path.startsWith(`/${base}/`)) {
		return ensurePublicPath(path.slice(1));
	}
	if (path.startsWith(`${base}/`)) {
		return ensurePublicPath(path);
	}
	if (path.startsWith(`/`)) {
		return ensurePublicPath(`${base}${path}`);
	}

	return ensurePublicPath(`${base}/${path}`);
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

function removePublicPath(base: string, path: string): string {
	const ensuredPath = ensurePath(base, path);
	if (ensuredPath.startsWith('/public/')) {
		return ensuredPath.slice(7);
	}
	if (ensuredPath.startsWith('public/')) {
		return ensuredPath.slice(6);
	}
	if (!ensuredPath.startsWith('/')) {
		return `/${ensuredPath}`;
	}
	return ensuredPath;
}
