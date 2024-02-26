import { execSync } from 'child_process';

export const postModifiedDate = (filepath: string, pubDate: Date, updatedDate: Date | undefined): Date | undefined => {
	if (!updatedDate || isNaN(updatedDate.getTime())) {
		try {
			const result: Buffer = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);
			const dateString: string = result.toString().split('T')[0];
			updatedDate = new Date(dateString);
			if (isNaN(updatedDate.getTime())) {
				return undefined;
			}
		} catch (error) {
			console.log(`Error getting the last modified date for ${filepath}.`);
			return undefined;
		}
	}
	// If the specified date is the same day as the pubDate
	if (pubDate.getTime() === updatedDate.getTime()) {
		updatedDate = undefined;
	}
	// If the specified date is before the pubDate, throw an error
	else if (updatedDate.getTime() < pubDate.getTime()) {
		throw new Error(`The specified updatedDate: ${updatedDate} is before the publication date ${pubDate}.`);
	}
	return updatedDate;
};
