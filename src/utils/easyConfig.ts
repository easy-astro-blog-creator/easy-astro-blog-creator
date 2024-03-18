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
		linkedin: easyAbcUserConfig.socialMedia.linkedinUsername && {
			username: easyAbcUserConfig.socialMedia.linkedinUsername,
			url: `https://www.linkedin.com/in/${ensureNoAtSymbol(easyAbcUserConfig.socialMedia.linkedinUsername)}/`,
		},
		twitter: easyAbcUserConfig.socialMedia.twitterUsername && {
			username: ensureAtSymbol(easyAbcUserConfig.socialMedia.twitterUsername),
			url: `https://twitter.com/${ensureNoAtSymbol(easyAbcUserConfig.socialMedia.twitterUsername)}`,
		},
		github: easyAbcUserConfig.socialMedia.githubUsername && {
			username: easyAbcUserConfig.socialMedia.githubUsername,
			url: `https://github.com/${ensureNoAtSymbol(easyAbcUserConfig.socialMedia.githubUsername)}`,
		},
		youtube: easyAbcUserConfig.socialMedia.youtubeUsername && {
			username: easyAbcUserConfig.socialMedia.youtubeUsername,
			url: `https://www.youtube.com/channel/${ensureNoAtSymbol(easyAbcUserConfig.socialMedia.youtubeUsername)}`,
		},
		facebook: easyAbcUserConfig.socialMedia.facebookUsername && {
			username: easyAbcUserConfig.socialMedia.facebookUsername,
			url: `https://www.facebook.com/${ensureNoAtSymbol(easyAbcUserConfig.socialMedia.facebookUsername)}`,
		},
		instagram: easyAbcUserConfig.socialMedia.instagramUsername && {
			username: ensureAtSymbol(easyAbcUserConfig.socialMedia.instagramUsername),
			url: `https://www.instagram.com/${ensureNoAtSymbol(easyAbcUserConfig.socialMedia.instagramUsername)}`,
		},
		snapchat: easyAbcUserConfig.socialMedia.snapchatUsername && {
			username: easyAbcUserConfig.socialMedia.snapchatUsername,
			url: `https://www.snapchat.com/add/${ensureNoAtSymbol(easyAbcUserConfig.socialMedia.snapchatUsername)}`,
		},
		mastodon: easyAbcUserConfig.socialMedia.mastodonUsername && {
			username: ensureAtSymbol(easyAbcUserConfig.socialMedia.mastodonUsername),
			url: `https://mastodon.social/${ensureAtSymbol(easyAbcUserConfig.socialMedia.mastodonUsername)}`,
		},
		discord: easyAbcUserConfig.socialMedia.discordUsername && {
			username: easyAbcUserConfig.socialMedia.discordUsername,
			url: `https://discord.com/users/${ensureNoAtSymbol(easyAbcUserConfig.socialMedia.discordUsername)}`,
		},
		twitch: easyAbcUserConfig.socialMedia.twitchUsername && {
			username: easyAbcUserConfig.socialMedia.twitchUsername,
			url: `https://www.twitch.tv/${ensureNoAtSymbol(easyAbcUserConfig.socialMedia.twitchUsername)}`,
		},
		telegram: easyAbcUserConfig.socialMedia.telegramUsername && {
			username: ensureAtSymbol(easyAbcUserConfig.socialMedia.telegramUsername),
			url: `https://t.me/${ensureNoAtSymbol(easyAbcUserConfig.socialMedia.telegramUsername)}`,
		},
		whatsapp: easyAbcUserConfig.socialMedia.whatsappUsername && {
			username: ensureNoAtSymbol(easyAbcUserConfig.socialMedia.whatsappUsername),
			url: `https://wa.me/${ensureNoAtSymbol(easyAbcUserConfig.socialMedia.whatsappUsername)}`,
		},
		linktree: easyAbcUserConfig.socialMedia.linktreeUsername && {
			username: easyAbcUserConfig.socialMedia.linktreeUsername,
			url: `https://linktr.ee/${ensureNoAtSymbol(easyAbcUserConfig.socialMedia.linktreeUsername)}`,
		},
		discordServer: easyAbcUserConfig.socialMedia.discordServerInvite && {
			url: `https://discord.gg/${ensureNoAtSymbol(easyAbcUserConfig.socialMedia.discordServerInvite)}`,
		},
	},
	easyAbcEnabled: easyAbcUserConfig.easyAbcEnabled,
};

/* Color Palette */
/* Find a palette with https://mycolor.space/?hex=%23D4E9F8&sub=1 */
/* Another fun tool is https://huemint.com/illustration-1/ */
/* https://themes.ionevolve.com/ */
/* Generate color codes with https://uicolors.app/create */
/* Generate gradients with https://mycolor.space/gradient?ori=to+bottom&hex=%23102C41&hex2=%230F2424&sub=1 */

export const customTheme: CustomThemeConfig = {
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

function ensureAtSymbol(username: string): string {
	if (username && username.charAt(0) !== '@') {
		return '@' + username;
	}
	return username;
}

function ensureNoAtSymbol(username: string): string {
	if (username && username.charAt(0) === '@') {
		return username.slice(1);
	}
	return username;
}
