import { remark } from 'remark';
import strip from 'strip-markdown';

export const formatDescription = async (
	description: string | undefined,
	bodyText: string,
	maxLines: number = 4,
	charsPerLine: number = 45
): Promise<string | undefined> => {
	if (description && description.length > 0) return handleDescription(description, maxLines, charsPerLine);

	return handleDescription(bodyText, maxLines, charsPerLine);
};
export const titleLineCountIsOne = (titleText: string): boolean => {
	const avgCharsPerLineTitle = 50;
	const titleString = titleText.replace(/\s+/g, ' ').trim().toString();
	if (titleString.length / avgCharsPerLineTitle < 1) {
		return true;
	} else {
		return false;
	}
};
async function handleDescription(descriptionText: string, maxLines: number, charsPerLine: number): Promise<string> {
	let descriptionString = (await remark().use(strip).process(descriptionText)).toString();
	// Removes the custom markdown classes.
	descriptionString = descriptionString.replace(/\(class:[^)]*\)/g, '');
	// Removes excess white space
	descriptionString = descriptionString.replace(/\s+/g, ' ').trim();

	// These are rough estimates based on default font sizes!!!
	const maxChars = charsPerLine * maxLines;

	if (descriptionString.length <= maxChars) {
		return descriptionString;
	} else {
		return descriptionString.substring(0, maxChars) + '...';
	}
}
