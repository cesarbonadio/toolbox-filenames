/**
 * Extracts specific data from each line of the provided content.
 *
 * This function processes the input `content` by splitting it into lines and filtering out lines
 * that match a specific regex pattern. It extracts and returns an array of objects containing
 * the matched data (text, number, and hex values) for each valid line.
 *
 * @function
 * @param {string} content - The content string to process, where each line is expected to contain data in a specific format.
 * @param {string} expectedFileName - The expected file name to discard not valid lines
 * @returns {Array<Object>} An array of objects, each containing `text`, `number`, and `hex` properties extracted from valid lines.
 * @example
 * const content = 'file1.txt,abc,123,456xyz\nfile2.txt,def,456,789abc';
 * const result = getLinesFromContent(content);
 * console.log(result);
 * // Output: [{ text: 'abc', number: '123', hex: '456xyz' }, { text: 'def', number: '456', hex: '789abc' }]
 */
export const getLinesFromContent = (content, expectedFileName) => {
    const [firstLine, ...restLines] = content.trim().split('\n')

    if (!firstLine) return []

    return firstLine.startsWith('file,text,number,hex')
        ? restLines
            .map(line => {
                const match = line.match(/([a-zA-Z0-9]+\.[a-zA-Z0-9]+),([a-zA-Z]+),(\d+),([a-fA-F0-9]{32})$/)
                if (!match) return null
                let [, filename, text, number, hex] = match
                number = Number(number)
                return { filename, text, number, hex }
            })
            .filter(Boolean)
            .filter(({ filename }) => filename === expectedFileName)
            .map(({ text, number, hex }) => ({ text, number, hex }))
        : (() => {
            throw new Error('Invalid first line format')
        })()
}