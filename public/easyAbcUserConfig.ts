import { SchemeVariant } from '../src/utils/colorFun/src';

// General site info
const FULL_NAME = 'shelby jenkins';
const FIRST_NAME = 'shelby';

// Github Pages configuration
const GITHUB_USERNAME = 'shelbyjenkins';

// A hex color value. This is used to set the primary color of the site.
// Checkout https://shelbyjenkins.github.io/easy/theme/ for live demo
const PRIMARY_COLOR = '#40a1e6'; // Curious Blue #40a1e6 64, 161, 230
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

// About me config
// A photo of you. It will be displayed in the about me section of the blog.
const HEADSHOT_PATH = 'personal-blog/images/headshot.png';
const HEADSHOT_ALT = 'A photo of Shelby Jenkins';
// Limited to three lines. Either one long line that breaks automatically or seperate with a newline.
const ABOUT_ME = `Professional GTD'er\nAmateur software developer\nDreamer of Big Things`;

// The default social image is what is used to generate the preview cards for Twitter, Facebook, etc.
// This is used in the case your blog post does not include a hero image.
// If not provided it defaults to the EasyABC logo.
const DEFAULT_SOCIAL_IMAGE_PATH = 'personal-blog/images/defaultSocialImage.png';

const FAVICON_PATH = 'personal-blog/favicon.png';
// See https://www.w3.org/2005/10/howto-favicon
// image/svg+xml or image/png
const FAVICON_TYPE = 'image/png';

// Build and deploy with the EasyABC section of the site included. Disable for personal blogs.
const EASYABC_ENABLED = true;

// Feel free to edit the following, but it's optional.
export const easyAbcUserConfig = {
	firstName: FIRST_NAME,
	fullName: FULL_NAME,
	siteTitle: `${FIRST_NAME}'s Blog`,
	siteDescription: `The personal blog of ${FULL_NAME}.`,
	headShotPath: HEADSHOT_PATH,
	headshotAlt: HEADSHOT_ALT,
	aboutMe: ABOUT_ME,
	defaultSocialImage: DEFAULT_SOCIAL_IMAGE_PATH,
	faviconPath: FAVICON_PATH,
	faviconType: FAVICON_TYPE,
	githubUsername: GITHUB_USERNAME,
	githubPagesUrl: `https://${GITHUB_USERNAME}.github.io`, // Right now this is the only supported format,
	socialMedia: {
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
	easyAbcEnabled: EASYABC_ENABLED,
	primaryColor: PRIMARY_COLOR,
	themeVariant: THEME_VARIANT,
};
