import Head from 'next/head';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { C19TestData as C19TestData, getSortedTestsData, TestBrandName, TestManufacturer } from '@/lib/covidTests';
import { AppShell, Button, Container, Divider, Group, MantineColorScheme, Modal, SegmentedControl, Select, Space, useMantineColorScheme } from '@mantine/core';
import { Dispatch, SetStateAction, useState } from 'react';
import { DatePicker } from '@mantine/dates';
import { ColorSchemeScript } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';


export default function Home({
  c19TestData,
  manufacturers,
}:
  {
    c19TestData: C19TestData[];
    manufacturers: TestManufacturer[];
  }
) {
  const [manufacturer, setManufacturer] = useState<TestManufacturer | null>(null);
  const [testBrand, setTestBrand] = useState<TestBrandName | null>(null);
  const [expiration, setExpiration] = useState<string | null>(null);
  const [lotNumber, setLotNumber] = useState<string | null>(null);
  const [opened, { open, close }] = useDisclosure(false);


  const newExpirationDate = Array.from(
    new Set(
      c19TestData
        .filter(
          (row) =>
            row[0] === manufacturer &&
            row[1] === testBrand &&
            row[2] == expiration &&
            row[3] === lotNumber
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
          <Container>
            <section>
              <h1>COVID Test expiration date checker</h1>
              <p>This site allows you to check updated COVID test expiration dates.</p>
              <p>If box expiration date lists just a month and year, use the last day of the month listed (e.g. a test with an expiration date December 2023 on the box has an expiration date 2023-12-31 on this tool).</p>
              <p>If a particular test or lot number is not listed, then use the expiration date listed on the box of the test.</p>
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
                label="Original Expiration Date"
                placeholder="Pick value"
                data={Array.from(new Set(c19TestData.filter((row) => (row[0] === manufacturer && row[1] === testBrand)).map((row) => row[2])))}
                value={expiration}
                onChange={(x) => { setExpiration(x); setLotNumber(null); }}
                disabled={manufacturer === null || testBrand === null}
                searchable
              />
              <Select
                label="Lot number"
                placeholder="Pick value"
                data={Array.from(new Set(c19TestData.filter((row) => (row[0] === manufacturer && row[1] === testBrand && row[2] === expiration)).map((row) => row[3])))}
                value={lotNumber}
                onChange={setLotNumber}
                disabled={manufacturer === null || testBrand === null || expiration === null}
                searchable
              />
              {manufacturer === "Celltrion USA, Inc." ?
                <>
                  <h3>Note for Celltrion DiaTrust COVID-19 Ag Home Test</h3>
                  <p>For lot numbers with (*), if your test has this lot number followed by additional letters, the expiration dates listed also apply.</p>
                  <p> For example, a test with lot number COVSA1001, would have the same manufacture date as lot numbers COVSA1001-A or COVSA1001-HF. Lot numbers COVSA1001-A or COVSA1001-HF would have the same extended expiration date as COVSA1001 in the table above.</p>
                  <Divider />
                </>
                : null}
            </section>
            <section>
              {manufacturer ? <p>The selected manufacturer is {manufacturer}</p> : null}
              {testBrand ? <p>The selected test brand is {testBrand}</p> : null}
              {expiration ? <p>The selected date is {expiration.toLocaleString()}</p> : null}
              {lotNumber ? <p>The selected lot number is {lotNumber}</p> : null}
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
              <Space h="xl" />
              <Space h="xl" />
              <Space h="xl" />
              <Space h="xl" />
            </section>
          </Container>
        </AppShell.Main>
        <AppShell.Footer>
          <ColorSchemeToggle />
          <Group justify="center" mt="sm">
            <Button onClick={open} variant="filled" color="grape">
              About this tool
            </Button>
          </Group>
          <Space h="sm" />
        </AppShell.Footer>

        <Modal opened={opened} onClose={close} title="About this tool">
          <p>Data source: <a href="https://www.fda.gov/medical-devices/coronavirus-covid-19-and-medical-devices/home-otc-covid-19-diagnostic-tests#list">Authorized At-Home OTC COVID-19 Diagnostic Tests and Expiration Dates
            on fda.gov</a></p>
          <p>Data retrieved 9/25/2023 by <a href="https://www.linkedin.com/in/jesse-erin-lang/">Jesse Lang, MPA in Health Care Policy</a></p>
          <p>Code by <a href="http://www.alangerber.us">Alan Gerber</a> and <a href="https://cookieboi.com/">Samir Lavingia</a>.</p>
          <p>Source code is <a href="https://github.com/covid-test-dates/covid-test-date-site">available on Github</a>.</p>
        </Modal>
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
    <Group justify="center" mt="sm">
      <SegmentedControl data={["auto", "light", "dark"]} onChange={(value: MantineColorScheme) => setColorScheme(value)} />
    </Group>
  );
}


export const getStaticProps: GetStaticProps = async () => {
  const c19TestData = getSortedTestsData();
  const manufacturers: TestManufacturer[] = Array.from(new Set(c19TestData.map((row) => row[0])))
  return {
    props: {
      c19TestData,
      manufacturers
    },
  };
};