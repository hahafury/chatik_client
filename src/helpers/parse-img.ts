import {ICustomFile} from "../types/app";


export interface ParsedImageReturn extends ICustomFile {
	originalFilePath: string;
}

type ParseImageReturnType<T> = T extends string ? ParsedImageReturn : ParsedImageReturn[];

/**
 * Parse images
 *
 * @param filePaths - file paths to be parsed
 * @param onParseFinished - callback, when parsing is done
 * @returns
 *
 */
const parseImage = async <T extends string | string[], R extends ParseImageReturnType<T>>(filePaths: T, onParseFinished: (result: R) => void): Promise<void> => {
	if (typeof filePaths === 'string') {
		const matchedFilenames = filePaths.match(/(\w+)(\.\w+)+(?!.*(\w+)(\.\w+)+)/);
		if (!matchedFilenames) {
			return;
		}
		const imageResponse = await fetch(filePaths);
		const blobResponse = await imageResponse.blob();
		const filename = matchedFilenames[0];

		// @ts-ignore
		onParseFinished({
			filename,
			originalFilePath: filePaths,
			file: blobResponse
		})
	}

	if (Array.isArray(filePaths)) {
		const parsedFiles: ParsedImageReturn[] = []
		for (const filePath of filePaths) {
			const matchedFilenames = filePath.match(/(\w+)(\.\w+)+(?!.*(\w+)(\.\w+)+)/);
			if (!matchedFilenames) {
				return;
			}
			const imageResponse = await fetch(filePath);
			const blobResponse = await imageResponse.blob();
			const filename = matchedFilenames[0];
			parsedFiles.push({
				filename,
				file: blobResponse,
				originalFilePath: filePath,
			})
			// @ts-ignore
			onParseFinished(parsedFiles)
		}
	}
}

export default parseImage;