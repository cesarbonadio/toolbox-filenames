import * as filesFormaterModel from '../models/filesFormaterModel.js'
import { getLinesFromContent } from '../utils/formater.js'

/**
 * Retrieves and formats the content of files.
 * 
 * This function fetches the list of files, retrieves their content, formats the lines of each file, 
 * and returns a list of formatted files with their corresponding lines.
 * 
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of formatted files and their lines.
 */
export const getFormats = async(specificFile = null) => {
  try {
    let files = await filesFormaterModel.fetchFilesList()
    if (specificFile) files = files.filter(file => file === specificFile)
    const formattedFilesPromises = files.map(async (file) => {
      try {
        const fileContent = await filesFormaterModel.fetchFileContentByName(file); // Fetch the content of each file
        const formattedLines = getLinesFromContent(fileContent, file); // Extract lines from the file content

        if (formattedLines.length > 0) {
          return { file, lines: formattedLines }
        }
        return null
      } catch (error) {
        console.error(`Error fetching or formatting file "${file}":`, error)
        return null
      }
    })

    // Wait for all the promises to resolve, filter out any null results (files with errors)
    const formattedFiles = (await Promise.all(formattedFilesPromises)).filter(Boolean)

    return formattedFiles
  } catch (error) {
    console.error('Error formating files at service level: ', error.message)
    throw error.message
  }
}

/**
 * Fetches the total list of files from the data source.
 *
 * This function interacts with the `filesFormaterModel` to retrieve the list of files.
 * It wraps the result in an object and handles potential errors by logging and re-throwing them.
 *
 * @async
 * @function getTotalFilesList
 * @returns {Promise<{files: Array<any>}>} A promise that resolves with an object containing the files list.
 * @throws {Error} Throws an error if the file fetching operation fails.
 */
export const getTotalFilesList = async () => {
  try {
    const files = await filesFormaterModel.fetchFilesList()
    return { files }
  } catch (error) {
    console.error('Error fetching file names at service level: ', error.message)
    throw error.message
  }
}