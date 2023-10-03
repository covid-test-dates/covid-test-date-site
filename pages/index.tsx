import Head from 'next/head';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { C19TestData as C19TestData, getSortedTestsData, TestBrandName, TestManufacturer } from '@/lib/covidTests';
import { Container, Select } from '@mantine/core';
import { Dispatch, SetStateAction, useState } from 'react';
import { DatePicker } from '@mantine/dates';
import { ColorSchemeScript } from '@mantine/core';


export default function Home({
  c19TestData,
  manufacturers,
  testBrands,
}:
  {
    c19TestData: C19TestData[];
    manufacturers: TestManufacturer[];
    testBrands: TestBrandName[];
  }
) {
  const [manufacturer, setManufacturer] = useState<TestManufacturer | null>(null);
  const [testBrand, setTestBrand] = useState<TestBrandName | null>(null);
  const [expiration, setExpiration] = useState<Date | null>(null);
  return (
    <>
      <Head>
        <ColorSchemeScript defaultColorScheme="auto" />
        <title>COVID tests updated expiration checker</title>
      </Head>
      <Container>
        <section>
          <h1>COVID Test expiration date checker</h1>
          <p>
            This site allows you to check updated COVID test expiration dates.
          </p>
        </section>
        <section>
          <C19TestSelector
            label="COVID Test Manufacturer"
            options={manufacturers}
            value={manufacturer}
            disabled={false}
            setValue={(x) => { setManufacturer(x); setTestBrand(null); }} />
          {manufacturer ? <p>The selected manufacturer is {manufacturer}</p> : null}
          <C19TestSelector
            label="COVID Test Brand Name"
            options={Array.from(new Set(c19TestData.filter((row) => row[0] === manufacturer).map((row) => row[1])))}
            value={testBrand}
            disabled={manufacturer === null}
            setValue={setTestBrand} />
          {manufacturer ? <p>The selected test brand is {testBrand}</p> : null}
          <h2>Original Expiration Date</h2>
          <OriginalExpirationDate value={expiration} setValue={setExpiration} />
          {expiration ? <p>The selected date is {expiration.toLocaleString()}</p> : null}
        </section>
      </Container>
    </>
  );
}

interface C19TestProps {
  label: string,
  disabled: boolean,
  options: string[],
  value: string | null,
  setValue: Dispatch<SetStateAction<string | null>>
}

function C19TestSelector<T>({ label, disabled, options, value, setValue }: C19TestProps) {
  return (
    <Select
      label="COVID Test Manufacturer"
      placeholder="Pick value"
      data={options}
      value={value}
      onChange={setValue}
      disabled={disabled}
      searchable
    />
  );
}

function OriginalExpirationDate({ value, setValue }: { value: Date | null, setValue: Dispatch<SetStateAction<Date | null>> }) {
  return <DatePicker value={value} onChange={setValue} />;
}



export const getStaticProps: GetStaticProps = async () => {
  const c19TestData = getSortedTestsData();
  const manufacturers: TestManufacturer[] = Array.from(new Set(c19TestData.map((row) => row[0])))
  const testBrands: TestBrandName[] = Array.from(new Set(c19TestData.map((row) => row[1])))
  const testBrandsByManufacturer: TestBrandName[] = Array.from(new Set(c19TestData.map((row) => row[1])))
  return {
    props: {
      c19TestData,
      manufacturers,
      testBrands
    },
  };
};