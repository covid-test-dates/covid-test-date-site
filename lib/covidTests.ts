import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

const c19TestsFile = path.join(process.cwd(), 'covid-tests', 'c19TestSpreadsheetExport.csv');

export type TestManufacturer = string
export type TestBrandName = string
export type OriginalExpiration = string
export type LotNumber = string
export type NewExpiration = string

export type C19TestData = [TestManufacturer, TestBrandName, OriginalExpiration, LotNumber, NewExpiration]

export function getSortedTestsData(): C19TestData[] {
    // Load all COVID test data from CSV files in /tests
    const result: C19TestData[] = [];
    const c19TestDataRaw = fs.readFileSync(c19TestsFile);
    const c19TestData = parse(c19TestDataRaw, { delimiter: ",", from_line: 2 });
    return c19TestData;
}