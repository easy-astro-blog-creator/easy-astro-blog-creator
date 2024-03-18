import { execSync } from 'child_process';

export const postModifiedDate = (filepath: string, pubDate: Date, modifiedDate: Date | undefined): Date | undefined => {
	if (!modifiedDate || isNaN(modifiedDate.getTime())) {
		try {
			const result: Buffer = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);
			const dateString: string = result.toString().split('T')[0];
			modifiedDate = new Date(dateString);
			if (isNaN(modifiedDate.getTime())) {
				return undefined;
			}
		} catch (error) {
			console.log(`Error getting the last modified date for ${filepath}.`);
			return undefined;
		}
	}
	// If the specified date is the same day as the pubDate
	if (pubDate.getTime() === modifiedDate.getTime()) {
		modifiedDate = undefined;
	}
	// If the specified date is before the pubDate, throw an error
	else if (modifiedDate.getTime() < pubDate.getTime()) {
		throw new Error(`The specified modifiedDate: ${modifiedDate} is before the publication date ${pubDate}.`);
	}
	return modifiedDate;
};
