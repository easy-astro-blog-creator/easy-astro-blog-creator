import { CustomThemeConfig } from './colorFun/src';
import { checkLoadDefaultImages } from './checkLoadDefaultImages';
import { easyAbcUserConfig } from '../../public/easyAbcUserConfig';

// Feel free to edit the following, but it's optional.
export const easyConfig = {
	firstName: capitalizeName(easyAbcUserConfig.firstName),
	fullName: capitalizeName(easyAbcUserConfig.fullName),
	siteTitle: `${capitalizeName(easyAbcUserConfig.firstName)}'s Blog`,
	siteDescription: `The personal blog of ${capitalizeName(easyAbcUserConfig.fullName)}.`,
	get headshotPath() {
		return checkLoadDefaultImages(easyAbcUserConfig.headShotPath, 'easy-abc/headshot.png');
	},
	headshotAlt: easyAbcUserConfig.headshotAlt,
	aboutMe: easyAbcUserConfig.aboutMe,
	get defaultSocialImage() {
		return checkLoadDefaultImages(easyAbcUserConfig.defaultSocialImage, 'easy-abc/easyHero.png');
	},
	get faviconPath() {
		return checkLoadDefaultImages(easyAbcUserConfig.faviconPath, 'easy-abc/favicon.png');
	},
	faviconType: easyAbcUserConfig.faviconType,
	githubUsername: easyAbcUserConfig.githubUsername,
	githubPagesUrl: `https://${easyAbcUserConfig.githubUsername}.github.io`, // Right now this is the only supported format,
	socialMedia: {
		linkedin: easyAbcUserConfig.socialMedia.linkedin,
		twitter: easyAbcUserConfig.socialMedia.twitter,
		github: easyAbcUserConfig.socialMedia.github,
		youtube: easyAbcUserConfig.socialMedia.youtube,
		facebook: easyAbcUserConfig.socialMedia.facebook,
		instagram: easyAbcUserConfig.socialMedia.instagram,
		snapchat: easyAbcUserConfig.socialMedia.snapchat,
		mastodon: easyAbcUserConfig.socialMedia.mastodon,
		discord: easyAbcUserConfig.socialMedia.discord,
		twitch: easyAbcUserConfig.socialMedia.twitch,
	},
	easyAbcEnabled: easyAbcUserConfig.easyAbcEnabled,
};

/* Color Palette */
/* Find a palette with https://mycolor.space/?hex=%23D4E9F8&sub=1 */
/* Another fun tool is https://huemint.com/illustration-1/ */
/* https://themes.ionevolve.com/ */
/* Generate color codes with https://uicolors.app/create */
/* Generate gradients with https://mycolor.space/gradient?ori=to+bottom&hex=%23102C41&hex2=%230F2424&sub=1 */

export const CUSTOM_THEME: CustomThemeConfig = {
	// Primary colors are use most frequently used across your UI and imparts a distinct identity to the product.
	primary: easyAbcUserConfig.primaryColor,
	schemeVariant: easyAbcUserConfig.themeVariant,
	// Secondary colors highlight or complement the primary color. These are to be used sparingly to make the UI elements stand out.
	// Tetriary or Accent Color refers to a color used to emphasize key parts of the UI, such as the active tab, focused input texts, checked boxes, etc.
};

// Function to capitalize the first letter of each word
function capitalizeName(name: string): string {
	return name
		.split(' ') // Split the name into parts
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()) // Capitalize the first letter of each part
		.join(' '); // Join the parts back together
}
