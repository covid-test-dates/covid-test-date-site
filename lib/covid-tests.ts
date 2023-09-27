import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

const c19_tests_file = path.join(process.cwd(), 'covid-tests', 'c19_test_spreadsheet_export.csv');

export type TestManufacturer = string
export type TestBrandName = string
export type LotNumber = String
export type OriginalExpiration = Date
export type NewExpiration = Date

export type C19TestData = [TestManufacturer, TestBrandName, LotNumber, OriginalExpiration, NewExpiration]

export function getSortedTestsData(): C19TestData[] {
    // Load all COVID test data from CSV files in /tests
    const result: C19TestData[] = [];
    const c19_test_data_raw = fs.readFileSync(c19_tests_file);
    const c19_test_data = parse(c19_test_data_raw, { delimiter: ",", from_line: 2 });
    return c19_test_data;


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
}