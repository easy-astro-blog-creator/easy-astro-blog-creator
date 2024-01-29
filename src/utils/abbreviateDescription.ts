import {remark} from 'remark';
import strip from 'strip-markdown';

export const formatDescription = async (description: string | undefined, text: string, maxLines: number = 4): Promise<string | undefined> => {
  if (description && description.length > 0) return description;
  if (!text || text.length === 0) return undefined;
  try {
    const bodyString = (await remark().use(strip).process(text)).toString();

    // Estimate the average number of characters per line.
    const avgCharsPerLine = 55; // This is a rough estimate and might vary.
    const maxChars = avgCharsPerLine * maxLines;

    return bodyString.length > maxChars ? bodyString.substring(0, maxChars) + '...' : bodyString;

  } catch (e) {
    return undefined;
  }
};
