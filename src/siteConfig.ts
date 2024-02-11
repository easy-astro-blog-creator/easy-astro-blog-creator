import { SchemeVariant, CustomThemeConfig } from '../src/utils/colorFun/src';

// General site info
export const FULL_NAME = 'Shelby Jenkins';
export const FIRST_NAME = 'Shelby';
export const SITE_TITLE = `${FIRST_NAME}'s Blog`; // Shows up in the tab bar of your browser
export const SITE_DESCRIPTION = `The personal blog of ${FULL_NAME}.`;
export const FAVICON_URL = '/favicon.png';
// image/svg+xml or image/png
// See https://www.w3.org/2005/10/howto-favicon
export const FAVICON_TYPE = 'image/png';

// Github Pages configuration
export const GITHUB_USERNAME = 'shelbyjenkins';
export const GITHUB_PAGES_URL = `https://${GITHUB_USERNAME}.github.io`; // Right now this is the only supported format

// Social media links
export const LINKEDIN_URL = 'https://www.linkedin.com/in/jshelbyj/';
export const TWITTER_URL = 'https://twitter.com/j_shelby_j';
export const GITHUB_URL = 'https://github.com/shelbyjenkins';

/* Color Palette */
/* Find a palette with https://mycolor.space/?hex=%23D4E9F8&sub=1 */
/* Another fun tool is https://huemint.com/illustration-1/ */
/* https://themes.ionevolve.com/ */
/* Generate color codes with https://uicolors.app/create */

/* Generate gradients with https://mycolor.space/gradient?ori=to+bottom&hex=%23102C41&hex2=%230F2424&sub=1 */
export const CUSTOM_THEME: CustomThemeConfig = {
	// Primary colors are use most frequently used across your UI and imparts a distinct identity to the product.
	primary: '#40a1e6',
	schemeVariant: SchemeVariant.SPLIT_COMPLEMENTARY,
	// The following are only used if `schemeVariant.CUSTOM`
	// Secondary colors highlight or complement the primary color. These are to be used sparingly to make the UI elements stand out.
	secondary: '#D07D12',
	// Tetriary or Accent Color refers to a color used to emphasize key parts of the UI, such as the active tab, focused input texts, checked boxes, etc.
	tertiary: '#003E1F',
	//  Background color is the color of the main content area. It is used to set the mood of the UI.
	neutral: '#d4e9f8',
	neutralVarient: '#E8F5F2',
};
// Meteor #D07D12 208, 125, 18
// Aqua Squeeze #E8F5F2 232, 245, 242
// Pattens Blue #d4e9f8 212, 233, 248
// Curious Blue #40a1e6 64, 161, 230
// Astronaut Blue #19405c
// Britich Racing Green #003E1F 0, 62, 31
