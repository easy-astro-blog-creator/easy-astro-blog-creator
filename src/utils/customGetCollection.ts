import { type ContentCollectionKey, getCollection } from 'astro:content';
import { postModifiedDate } from './postModifiedDate';
import { getReadingTime } from './postReadingTime';

export async function customGetCollection(collectionName: ContentCollectionKey, extraPath?: string) {
	const posts = await getCollection(collectionName);
	const postPromises = posts.map((post) => {
		// This in the case for nested paths such as the case of easy/blog
		// This allows for both standalone markdown files in the collections root folder
		// Or for folders to be added to collections root folder with markdown inside them
		let newSlug: string;
		let filePath: string;
		let slugSplits = post.slug.split('/');
		if (slugSplits.length === 1) {
			newSlug = `${post.slug}`;
			throw new Error('This is an error');
		} else {
			newSlug = `${slugSplits.pop()}`;
		}
		filePath = `src/content/${collectionName}/${post.id}`;
		post.data.updatedDate = postModifiedDate(filePath, post.data.pubDate, post.data.updatedDate);
		post.data.readingTime = getReadingTime(post.body);

		// Due to how static paths are generated, we need to create a new slug for links to the post
		let htmlSlug: string;
		if (extraPath) {
			// Appends the extra path to the slug for example 'blog' from 'easy/blog'
			htmlSlug = `${extraPath}/${newSlug}`;
		} else {
			// If there is no extra path, then the slug is the collection name
			htmlSlug = `${collectionName}/${newSlug}`;
		}

		return {
			params: { slug: newSlug, htmlSlug: htmlSlug },
			props: post,
		};
	});
	const paths = await Promise.all(postPromises);

	return paths;
}
