import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedTestsData() {
    // Load all COVID test data from CSV files in /tests
    // TODO: adapt code below
    // const fileNames = fs.readdirSync(postsDirectory);
    // const allPostsData = fileNames.map((fileName) => {
    //     // Remove ".md" from file name to get id
    //     const id = fileName.replace(/\.md$/, '');

    //     // Read markdown file as string
    //     const fullPath = path.join(postsDirectory, fileName);
    //     const fileContents = fs.readFileSync(fullPath, 'utf8');

    //     // Combine the data with the id
    //     return {
    //         id
    //     };
    // });
    // // Sort posts by date
    // return allPostsData.sort((a, b) => {
    //     if (a.date < b.date) {
    //         return 1;
    //     } else {
    //         return -1;
    //     }
    // });
    return {};
}