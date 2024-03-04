import { remark } from 'remark';
import strip from 'strip-markdown';

export const formatDescription = async (
	description: string | undefined,
	text: string,
	maxLines: number = 6
): Promise<string | undefined> => {
	if (description && description.length > 0) return description;
	if (!text || text.length === 0) return undefined;
	try {
		let bodyString = (await remark().use(strip).process(text)).toString();
		// Removes the custom markdown classes.
		bodyString = bodyString.replace(/\(class:[^)]*\)/g, '');
		// Removes excess white space
		bodyString = bodyString.replace(/\s+/g, ' ').trim();
		// Estimate the average number of characters per line.
		const avgCharsPerLine = 60; // This is a rough estimate and might vary.
		const maxChars = avgCharsPerLine * maxLines;

		return bodyString.length > maxChars ? bodyString.substring(0, maxChars) + '...' : bodyString;
	} catch (e) {
		return undefined;
	}
};
