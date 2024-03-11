import { remark } from 'remark';
import strip from 'strip-markdown';

export const formatDescription = async (
	type: string,
	description: string | undefined,
	bodyText: string,
	titleText: string
): Promise<string | undefined> => {
	if (description && description.length > 0) return handleTitle(type, description, titleText);

	return handleTitle(type, bodyText, titleText);
};
async function handleTitle(type: string, descriptionText: string, titleText: string): Promise<string | undefined> {
	let descriptionString = (await remark().use(strip).process(descriptionText)).toString();
	let titleString = (await remark().use(strip).process(titleText)).toString();
	// Removes the custom markdown classes.
	descriptionString = descriptionString.replace(/\(class:[^)]*\)/g, '');
	// Removes excess white space
	descriptionString = descriptionString.replace(/\s+/g, ' ').trim();

	// These are rough estimates based on default font sizes!!!
	let maxChars = 0;
	if (type === 'desktop') {
		const maxLines: number = 5;
		const avgCharsPerLineDescription = 75;
		const avgCharsPerLineTitle = 45;
		if (titleString.length / avgCharsPerLineTitle < 1) {
			maxChars = avgCharsPerLineDescription * maxLines;
		} else {
			maxChars = avgCharsPerLineDescription * (maxLines - 1);
		}
	} else if (type === 'mobile') {
		const maxLines: number = 5;
		const avgCharsPerLineDescription = 40;
		const avgCharsPerLineTitle = 20;
		if (Math.ceil(titleString.length / avgCharsPerLineTitle) > maxLines) {
			return undefined;
		}
		if (titleString.length / avgCharsPerLineTitle < 1) {
			maxChars = avgCharsPerLineDescription * maxLines;
		} else {
			maxChars = avgCharsPerLineDescription * (maxLines - Math.ceil(titleString.length / avgCharsPerLineTitle));
		}
	}
	if (descriptionString.length <= maxChars) {
		return descriptionString;
	} else {
		return descriptionString.substring(0, maxChars) + '...';
	}
}
