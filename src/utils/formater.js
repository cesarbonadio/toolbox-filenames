/**
 * Extracts specific data from each line of the provided content.
 *
 * This function processes the input `content` by splitting it into lines and filtering out lines
 * that match a specific regex pattern. It extracts and returns an array of objects containing
 * the matched data (text, number, and hex values) for each valid line.
 *
 * @function
 * @param {string} content - The content string to process, where each line is expected to contain data in a specific format.
 * @returns {Array<Object>} An array of objects, each containing `text`, `number`, and `hex` properties extracted from valid lines.
 * @example
 * const content = 'file1.txt,abc,123,456xyz\nfile2.txt,def,456,789abc';
 * const result = getLinesFromContent(content);
 * console.log(result);
 * // Output: [{ text: 'abc', number: '123', hex: '456xyz' }, { text: 'def', number: '456', hex: '789abc' }]
 */
export const getLinesFromContent = (content) => content
    .split('\n')
    .slice(1)
    .map(line => {
        const match = line.match(/([a-zA-Z0-9]+\.[a-zA-Z0-9]+),([a-zA-Z]+),(\d+),([a-zA-Z0-9]+)$/)
        if (!match) return null
        const [, , text, number, hex] = match
        return { text, number, hex }
    })
    .filter(Boolean)