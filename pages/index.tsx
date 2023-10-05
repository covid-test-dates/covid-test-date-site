import Head from 'next/head';
import { GetStaticProps } from 'next';
import { C19TestData as C19TestData, getSortedTestsData, TestBrandName, TestManufacturer } from '@/lib/covidTests';
import { Button, Container, Divider, Flex, Group, Image, MantineColorScheme, Modal, SegmentedControl, Select, Space, useMantineColorScheme } from '@mantine/core';
import { Dispatch, SetStateAction, useState } from 'react';
import { ColorSchemeScript } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Script from 'next/script';


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
  return (
    <>
      {/* Cloudflare Web Analytics */}
      <Script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "305c7a9894eb4427bc8e952460b4b9d5"}' />
      {/* End Cloudflare Web Analytics */}
      <Head>
        <ColorSchemeScript defaultColorScheme="auto" />
        <title>TurboTest 🚀🧪</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Check your updated COVID test expiration dates here!"
        />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://covid.alangerber.us/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="TurboTest 🚀🧪" />
        <meta
          property="og:description"
          content="Check your updated COVID test expiration dates here!"
        />
        <meta
          property="og:image"
          content="https://storage.googleapis.com/cookieboi.com/covid-test/turbotest-name.jpg"
        />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="covid.alangerber.us" />
        <meta property="twitter:url" content="https://covid.alangerber.us/" />
        <meta name="twitter:title" content="TurboTest 🚀🧪" />
        <meta
          name="twitter:description"
          content="Check your updated COVID test expiration dates here!"
        />
        <meta
          name="twitter:image"
          content="https://storage.googleapis.com/cookieboi.com/covid-test/turbotest-name.jpg"
        />

        {/* <!-- Meta Tags Generated via https://www.opengraph.xyz --> */}
      </Head>
      {/* Create a Flex Box that is vertical that takes up the whole screen. */}
      <Flex direction="column" wrap="nowrap" mih="100vh">
        {/* Tell the main container to take up as much space as it can. This will shove the footer to the bottom. */}
        <Container styles={{ root: { flex: 1 } }}>
          <section>
            <h1>TurboTest 🚀🧪</h1>
            <Group justify="center">
              <Image
                alt="TurboTest Header Image"
                radius="md"
                h="200"
                w="auto"
                fit="contain"
                src="https://storage.googleapis.com/cookieboi.com/covid-test/turbotest-name.jpg"
              />
            </Group>
            <h2>COVID Test expiration date checker</h2>
            <p>This site allows you to check updated COVID test expiration dates.</p>
            <p>If box expiration date lists just a month and year, use the last day of the month listed (e.g. a test with an expiration date December 2023 on the box has an expiration date 2023-12-31 on this tool).</p>
            <p>If a particular test or lot number is not listed, then use the expiration date listed on the box of the test.</p>
          </section>
          <section>
            <C19TestSelector
              label="COVID Test Manufacturer"
              data={manufacturers}
              value={manufacturer}
              disabled={false}
              onChange={(x) => { setManufacturer(x); setTestBrand(null); setLotNumber(null); setExpiration(null) }} />
            <C19TestSelector
              label="COVID Test Brand Name"
              data={Array.from(new Set(c19TestData.filter((row) => row[0] === manufacturer).map((row) => row[1])))}
              value={testBrand}
              disabled={manufacturer === null}
              onChange={(x) => { setTestBrand(x); setLotNumber(null); setExpiration(null); }} />
            <C19TestSelector
              label="Original Expiration Date"
              data={Array.from(new Set(c19TestData.filter((row) => (row[0] === manufacturer && row[1] === testBrand)).map((row) => row[2])))}
              value={expiration}
              onChange={(x) => { setExpiration(x); setLotNumber(null); }}
              disabled={manufacturer === null || testBrand === null}
            />
            <C19TestSelector
              label="Lot number"
              data={Array.from(new Set(c19TestData.filter((row) => (row[0] === manufacturer && row[1] === testBrand && row[2] === expiration)).map((row) => row[3])))}
              value={lotNumber}
              onChange={setLotNumber}
              disabled={manufacturer === null || testBrand === null || expiration === null}
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
          </section>
        </Container>
        {/* Tell the footer container that it needs to be at least 200px tall and 80% of the screen wide. */}
        <Container miw="80%" mih="200">
          <Divider my="xl" />
          <ColorSchemeToggle />
          <Group justify="center" mt="sm">
            <Button onClick={open} variant="filled">
              About this tool
            </Button>
          </Group>
        </Container>
        <Modal centered opened={opened} onClose={close} title="About this tool">
          <p>Data source: <a href="https://www.fda.gov/medical-devices/coronavirus-covid-19-and-medical-devices/home-otc-covid-19-diagnostic-tests#list">Authorized At-Home OTC COVID-19 Diagnostic Tests and Expiration Dates
            on fda.gov</a></p>
          <p>Data retrieved 9/25/2023 by <a href="https://www.linkedin.com/in/jesse-erin-lang/">Jesse Lang, MPA in Health Care Policy</a></p>
          <p>Code by <a href="https://www.alangerber.us">Alan Gerber</a> and <a href="https://cookieboi.com/">Samir Lavingia</a>.</p>
          <p>Illustrations by <a href="https://lizdenys.com/">Liz Denys</a>.</p>
          <p>Source code is <a href="https://github.com/covid-test-dates/covid-test-date-site">available on Github</a>.</p>
        </Modal>
      </Flex>
    </>
  );
}

interface C19TestProps {
  label: string,
  disabled: boolean,
  data: string[],
  value: string | null,
  onChange: Dispatch<SetStateAction<string | null>>
}

function C19TestSelector<T>({ label, disabled, data, value, onChange }: C19TestProps) {
  return (
    <Select
      label={label}
      placeholder="Pick value"
      data={data}
      value={value}
      onChange={onChange}
      disabled={disabled}
      searchable
      clearable
      nothingFoundMessage="Nothing found..."
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
