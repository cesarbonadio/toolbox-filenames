import { 
    fetchFilesList, 
    fetchFileContentByName 
} from '../models/filesFormaterModel.js'
import { getLinesFromContent } from '../utils/formater.js'

/**
 * Retrieves and formats the content of files.
 * 
 * This function fetches the list of files, retrieves their content, formats the lines of each file, 
 * and returns a list of formatted files with their corresponding lines.
 * 
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of formatted files and their lines.
 */
export const getFormats = async () => {
    try {
      const files = await fetchFilesList()
      const formattedFilesPromises = files.map(async (file) => {
        try {
          const fileContent = await fetchFileContentByName(file); // Fetch the content of each file
          const formattedLines = getLinesFromContent(fileContent); // Extract lines from the file content
  
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
      console.error('Error retrieving formats:', error)
      throw error
    }
}