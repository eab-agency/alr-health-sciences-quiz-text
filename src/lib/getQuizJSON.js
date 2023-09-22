import path from 'path';
import { promises as fs } from 'fs';

export default async function getQuizJSON() {
    // Find the absolute path of the data directory
    const dataDirectory = path.join(process.cwd(), 'src/data');
    // Read the json data file data.json
    const fileContents = await fs.readFile(
        `${dataDirectory}/quiz.json`,
        'utf8'
    );
    // Parse the JSON string into an object and extract the questions array
    const data = JSON.parse(fileContents);
    const { results } = data;

    return results;
}
