import Head from 'next/head';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { C19TestData as C19TestData, getSortedTestsData, TestBrandName, TestManufacturer } from '@/lib/covidTests';
import { AppShell, Button, Container, Group, MantineColorScheme, SegmentedControl, Select, useMantineColorScheme } from '@mantine/core';
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
  const [expiration, setExpiration] = useState<string | null>(null);
  const [lotNumber, setLotNumber] = useState<string | null>(null);
  const newExpirationDate = Array.from(
    new Set(
      c19TestData
        .filter(
          (row) =>
            row[0] === manufacturer &&
            row[1] === testBrand &&
            row[2] === lotNumber &&
            row[3] == expiration
        )
        .map((row) => row[4])
    )
  );
  console.log(newExpirationDate);
  return (
    <>
      <Head>
        <ColorSchemeScript defaultColorScheme="auto" />
        <title>COVID tests updated expiration checker</title>
      </Head>
      <AppShell padding="lg">
        <AppShell.Main>
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
              setValue={(x) => { setManufacturer(x); setTestBrand(null); setLotNumber(null); setExpiration(null) }} />
            <C19TestSelector
              label="COVID Test Brand Name"
              options={Array.from(new Set(c19TestData.filter((row) => row[0] === manufacturer).map((row) => row[1])))}
              value={testBrand}
              disabled={manufacturer === null}
              setValue={(x) => { setTestBrand(x); setLotNumber(null); setExpiration(null); }} />
            <Select
              label="Lot number"
              placeholder="Pick value"
              data={Array.from(new Set(c19TestData.filter((row) => (row[0] === manufacturer && row[1] === testBrand)).map((row) => row[2])))}
              value={lotNumber}
              onChange={(x) => { setLotNumber(x); setExpiration(null); }}
              disabled={manufacturer === null || testBrand === null}
              searchable
            />
            <Select
              label="Original Expiration Date"
              placeholder="Pick value"
              data={Array.from(new Set(c19TestData.filter((row) => (row[0] === manufacturer && row[1] === testBrand && row[2] === lotNumber)).map((row) => row[3])))}
              value={expiration}
              onChange={setExpiration}
              disabled={manufacturer === null || testBrand === null || lotNumber === null}
              searchable
            />
          </section>
          <section>
            {manufacturer ? <p>The selected manufacturer is {manufacturer}</p> : null}
            {testBrand ? <p>The selected test brand is {testBrand}</p> : null}
            {lotNumber ? <p>The selected lot number is {lotNumber}</p> : null}
            {expiration ? <p>The selected date is {expiration.toLocaleString()}</p> : null}
          </section>
          <section>
            {newExpirationDate.length ? (
              <h2>The new expiration date is {newExpirationDate}</h2>
            ) : (
              <h2>
                Fill out the fields above to get the updated expiration date for
                your test
              </h2>
            )}
          </section>
        </AppShell.Main>
        <AppShell.Footer>
          <ColorSchemeToggle />
        </AppShell.Footer>

      </AppShell>
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
      label={label}
      placeholder="Pick value"
      data={options}
      value={value}
      onChange={setValue}
      disabled={disabled}
      searchable
    />
  );
}

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();

  return (
    <Group justify="center" mt="xl">
      <SegmentedControl data={["auto", "light", "dark"]} onChange={(value: MantineColorScheme) => setColorScheme(value)}/>
    </Group>
  );
}


export const getStaticProps: GetStaticProps = async () => {
  const c19TestData = getSortedTestsData();
  const manufacturers: TestManufacturer[] = Array.from(new Set(c19TestData.map((row) => row[0])))
  const testBrands: TestBrandName[] = Array.from(new Set(c19TestData.map((row) => row[1])))
  return {
    props: {
      c19TestData,
      manufacturers,
      testBrands
    },
  };
};