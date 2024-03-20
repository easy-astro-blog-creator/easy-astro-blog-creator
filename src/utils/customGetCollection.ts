import { type ContentCollectionKey, getCollection } from 'astro:content';
import { postModifiedDate } from './postModifiedDate';
import { getReadingTime } from './postReadingTime';

export async function customGetCollection(collectionName: ContentCollectionKey, basePath: string) {
	const posts = await getCollection(collectionName);
	const postPromises = posts.map((post) => {
		// This allows for both standalone markdown files in the collections root folder
		// Or for folders to be added to collections root folder with markdown inside them
		let newSlug: string;
		let filePath: string;
		let slugSplits = post.slug.split('/');
		if (slugSplits.length === 1) {
			newSlug = `${post.slug}`;
		} else {
			newSlug = `${slugSplits.pop()}`;
		}
		if (collectionName === 'blog') {
			filePath = `public/personal-blog/blog/${post.id}`;
		} else if (collectionName === 'easy') {
			filePath = `src/content/easy/${post.id}`;
		} else {
			throw new Error(`Collection ${collectionName} not supported.`);
		}

		post.data.modifiedDate = postModifiedDate(filePath, post.data.pubDate, post.data.modifiedDate);
		post.data.readingTime = getReadingTime(post.body);

		return {
			params: { slug: `${newSlug}`, htmlSlug: `/${basePath}/${newSlug}/` },
			props: post,
		};
	});
	const paths = await Promise.all(postPromises);

	return paths;
}
