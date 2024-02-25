import { SchemeVariant, CustomThemeConfig } from '../src/utils/colorFun/src';

// General site info
const FULL_NAME = 'shelby jenkins';
const FIRST_NAME = 'shelby';

const capitalized_first_name = capitalizeName(FIRST_NAME);
const capitalized_full_name = capitalizeName(FULL_NAME);

const SITE_TITLE = `${capitalized_first_name}'s Blog`; // Shows up in the tab bar of your browser
const SITE_DESCRIPTION = `The personal blog of ${capitalized_full_name}.`;
const FAVICON_URL = '/favicon.png';
// image/svg+xml or image/png
// See https://www.w3.org/2005/10/howto-favicon
const FAVICON_TYPE = 'image/png';

// Github Pages configuration
const GITHUB_USERNAME = 'shelbyjenkins';
const GITHUB_PAGES_URL = `https://${GITHUB_USERNAME}.github.io`; // Right now this is the only supported format

// Social media links
const LINKEDIN_URL = 'https://www.linkedin.com/in/jshelbyj/';
const TWITTER_URL = 'https://twitter.com/j_shelby_j';
const GITHUB_URL = 'https://github.com/shelbyjenkins';

export const easyConfig = {
	first_name: capitalized_first_name,
	full_name: capitalized_full_name,
	site_title: SITE_TITLE,
	site_description: SITE_DESCRIPTION,
	favicon_url: FAVICON_URL,
	favicon_type: FAVICON_TYPE,
	github_username: GITHUB_USERNAME,
	github_pages_url: GITHUB_PAGES_URL,
	linkedin_url: LINKEDIN_URL,
	twitter_url: TWITTER_URL,
	github_url: GITHUB_URL,
};

/* Color Palette */
/* Find a palette with https://mycolor.space/?hex=%23D4E9F8&sub=1 */
/* Another fun tool is https://huemint.com/illustration-1/ */
/* https://themes.ionevolve.com/ */
/* Generate color codes with https://uicolors.app/create */
/* Generate gradients with https://mycolor.space/gradient?ori=to+bottom&hex=%23102C41&hex2=%230F2424&sub=1 */

export const CUSTOM_THEME: CustomThemeConfig = {
	// Primary colors are use most frequently used across your UI and imparts a distinct identity to the product.
	primary: '#40a1e6', // Curious Blue #40a1e6 64, 161, 230
	schemeVariant: SchemeVariant.SPLIT_COMPLEMENTARY,
	// The following are only used if `schemeVariant.CUSTOM`
	// Secondary colors highlight or complement the primary color. These are to be used sparingly to make the UI elements stand out.
	// Tetriary or Accent Color refers to a color used to emphasize key parts of the UI, such as the active tab, focused input texts, checked boxes, etc.
	//  Background color is the color of the main content area. It is used to set the mood of the UI.
};

// Meteor #D07D12 208, 125, 18
// Aqua Squeeze #E8F5F2 232, 245, 242
// Pattens Blue #d4e9f8 212, 233, 248
// Astronaut Blue #19405c
// Britich Racing Green #003E1F 0, 62, 31

// Function to capitalize the first letter of each word
function capitalizeName(name) {
	return name
		.split(' ') // Split the name into parts
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()) // Capitalize the first letter of each part
		.join(' '); // Join the parts back together
}
