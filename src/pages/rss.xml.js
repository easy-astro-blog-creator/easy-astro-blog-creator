import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { easyConfig } from '@utils/easyConfig';

export async function GET(context) {
	const posts = await getCollection('blog');
	return rss({
		title: easyConfig.siteTitle,
		description: easyConfig.siteDescription,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `/blog/${post.slug}/`,
		})),
	});
}
