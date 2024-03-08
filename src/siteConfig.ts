import { SchemeVariant, CustomThemeConfig } from '../src/utils/colorFun/src';

// General site info
const FULL_NAME = 'shelby jenkins';
const FIRST_NAME = 'shelby';

// Github Pages configuration
const GITHUB_USERNAME = 'shelbyjenkins';

const PRIMARY_COLOR = '#40a1e6'; // Curious Blue ! #40a1e6 64, 161, 230
const THEME_VARIANT = SchemeVariant.COMPLEMENTARY;

// Social media links - leave blank if you don't want to display a link
const LINKEDIN_URL = 'https://www.linkedin.com/in/jshelbyj/';
const TWITTER_URL = 'https://twitter.com/j_shelby_j';
const GITHUB_URL = 'https://github.com/shelbyjenkins';
const YOUTUBE_URL = '';
const FACEBOOK_URL = '';
const INSTAGRAM_URL = '';
const SNAPCHAT_URL = '';
const MASTODON_URL = '';
const DISCORD_URL = '';
const TWITCH_URL = '';

const FAVICON_URL = '/favicon.png';
// See https://www.w3.org/2005/10/howto-favicon
// image/svg+xml or image/png
const FAVICON_TYPE = 'image/png';

// Build and deploy with the EasyABC section of the site included. Disable for personal blogs.
const EASYABC_ENABLED = true;

// Feel free to edit the following, but it's optional.
export const easyConfig = {
	first_name: capitalizeName(FIRST_NAME),
	full_name: capitalizeName(FULL_NAME),
	site_title: `${capitalizeName(FIRST_NAME)}'s Blog`,
	site_description: `The personal blog of ${capitalizeName(FULL_NAME)}.`,
	favicon_url: FAVICON_URL,
	favicon_type: FAVICON_TYPE,
	github_username: GITHUB_USERNAME,
	github_pages_url: `https://${GITHUB_USERNAME}.github.io`, // Right now this is the only supported format,
	social_media: {
		linkedin: LINKEDIN_URL,
		twitter: TWITTER_URL,
		github: GITHUB_URL,
		youtube: YOUTUBE_URL,
		facebook: FACEBOOK_URL,
		instagram: INSTAGRAM_URL,
		snapchat: SNAPCHAT_URL,
		mastodon: MASTODON_URL,
		discord: DISCORD_URL,
		twitch: TWITCH_URL,
	},
	easyabc_enabled: EASYABC_ENABLED,
};

/* Color Palette */
/* Find a palette with https://mycolor.space/?hex=%23D4E9F8&sub=1 */
/* Another fun tool is https://huemint.com/illustration-1/ */
/* https://themes.ionevolve.com/ */
/* Generate color codes with https://uicolors.app/create */
/* Generate gradients with https://mycolor.space/gradient?ori=to+bottom&hex=%23102C41&hex2=%230F2424&sub=1 */

export const CUSTOM_THEME: CustomThemeConfig = {
	// Primary colors are use most frequently used across your UI and imparts a distinct identity to the product.
	primary: PRIMARY_COLOR, // Curious Blue #40a1e6 64, 161, 230
	schemeVariant: THEME_VARIANT,
	// The following are only used if `schemeVariant.CUSTOM`
	// Secondary colors highlight or complement the primary color. These are to be used sparingly to make the UI elements stand out.
	// Tetriary or Accent Color refers to a color used to emphasize key parts of the UI, such as the active tab, focused input texts, checked boxes, etc.
	//  Background color is the color of the main content area. It is used to set the mood of the UI.
};

// Function to capitalize the first letter of each word
function capitalizeName(name: string): string {
	return name
		.split(' ') // Split the name into parts
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()) // Capitalize the first letter of each part
		.join(' '); // Join the parts back together
}
