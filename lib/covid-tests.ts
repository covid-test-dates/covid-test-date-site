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
}