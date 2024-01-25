import { defineCollection, z } from 'astro:content';

export const nestedImages = import.meta.glob<{ default: ImageMetadata }>(
	"/src/content/blog/**/*.{png,jpg,jpeg,webp}",
)
export const easyAbcImages = import.meta.glob<{ default: ImageMetadata }>(
	"/src/content/easyAbc/**/*.{png,jpg,jpeg,webp}",
)
export const blogRootImages = import.meta.glob<{ default: ImageMetadata }>(
	"/src/content/blog/*.{png,jpg,jpeg,webp}",
)
export const easyAbcRootImages = import.meta.glob<{ default: ImageMetadata }>(
	"/src/content/blog/*.{png,jpg,jpeg,webp}",
)
const rootImages = { ...blogRootImages, ...easyAbcRootImages };

const resolveNestedImagePath = (folderName: String | undefined, imageName: String) => {
	if (folderName) {
		for (const path of Object.keys(nestedImages)) {
			if (path.toLowerCase().endsWith(`${folderName}/${imageName}`.toLowerCase())) {
				return path;
			}
		}
		for (const path of Object.keys(easyAbcImages)) {
			if (path.toLowerCase().endsWith(`${folderName}/${imageName}`.toLowerCase())) {
				return path;
			}
		}
	}
};
const resolveRootImagePath = (imageName: String) => {
    for (const path of Object.keys(rootImages)) {
        if (path.toLowerCase().endsWith(imageName.toLowerCase())) {
            return path;
        }
    }
};

const blogSchema = z.object({
	title: z.string(),
	description: z.string(),
	pubDate: z.coerce.date(),
	updatedDate: z.coerce.date().optional(),
	heroImage: z.string().optional(),
	heroAlt: z.string().optional(),	
});

const transformedBlogSchema = blogSchema.transform((blog, ctx) => {
	const { heroImage } = blog;
	if (!heroImage) {
		return blog;
	}
	const parts = heroImage.split('/');
	if (parts.length > 2) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: `Hero image path is invalid: ${heroImage}. Use format <folder>/<image> if using nested images.`,
		});
		
	} else if (parts.length === 2) {
		const imagePath = resolveNestedImagePath(parts[0], parts[1]);
		if (imagePath) {
			blog.heroImage = imagePath;
			return blog;
		}
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: `Hero image not found in the specified path: ${heroImage}`,
		});
	} else if (parts.length < 2) {
		const imagePath = resolveRootImagePath(parts[0])
		if (imagePath) {
			blog.heroImage = imagePath;
			return blog;
		}
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: `Hero image not found in the specified path: ${heroImage}. Use format <image> if using images in root folder.`,
		});
	}
	return blog; 
});

const blogCollection = defineCollection({
	type: 'content',
	schema: transformedBlogSchema});

const easyAbcCollection = defineCollection({
	type: 'content',
	schema: transformedBlogSchema});

export const collections = { blog: blogCollection, easyAbc: easyAbcCollection};
