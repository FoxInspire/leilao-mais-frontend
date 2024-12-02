import fs from 'fs/promises'
import path from 'path'

/**
 * Transforms a path with @ alias to an absolute file system path and reads the file
 * @param filePath - Path using @ alias (e.g. '@/src/features/path/to/file.json' or '@/features/path/to/file.json')
 * @returns Promise with the parsed JSON data
 * @throws Error if file cannot be read or parsed
 */
export async function readJSONFile<T>(filePath: string): Promise<T> {
   const absolutePath = transformPathToAbsolute(filePath)

   try {
      const fileContent = await fs.readFile(absolutePath)
      return JSON.parse(fileContent.toString()) as T
   } catch (error) {
      if (error instanceof Error) {
         throw new Error(
            `Failed to read or parse JSON file at ${filePath}: ${error.message}`
         )
      }
      throw error
   }
}

/**
 * Transforms a path with @ alias to an absolute file system path
 * @param filePath - Path using @ alias (e.g. '@/src/features/path/to/file.json' or '@/features/path/to/file.json')
 * @returns Absolute path that can be used with fs
 */
export function transformPathToAbsolute(filePath: string): string {
   // Remove @ from the start of the path
   const pathWithoutAlias = filePath.replace(/^@\//, '')

   // If path doesn't start with 'src/', add it
   const pathWithSrc = pathWithoutAlias.startsWith('src/')
      ? pathWithoutAlias
      : `src/${pathWithoutAlias}`

   // Join with process.cwd() to get absolute path
   return path.join(process.cwd(), pathWithSrc)
}

/**
 * Reads multiple JSON files concurrently and returns their parsed contents
 * @param filePaths - Array of paths using @ alias
 * @returns Promise with array of parsed JSON data
 * @throws Error if any file cannot be read or parsed
 */
export async function readMultipleJSONFiles<T>(
   filePaths: string[]
): Promise<T[]> {
   try {
      const results = await Promise.all(
         filePaths.map((filePath) => readJSONFile<T>(filePath))
      )
      return results
   } catch (error) {
      if (error instanceof Error) {
         throw new Error(`Failed to read multiple JSON files: ${error.message}`)
      }
      throw error
   }
}
