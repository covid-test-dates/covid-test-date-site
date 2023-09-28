import Head from 'next/head';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { C19TestData, getSortedTestsData, TestManufacturer } from '@/lib/covidTests';
import { Container, Select } from '@mantine/core';
import { Dispatch, SetStateAction, useState } from 'react';
import { DatePicker } from '@mantine/dates';
import { ColorSchemeScript } from '@mantine/core';


export default function Home({
  c19TestData,
  manufacturers,
}:
  {
    c19TestData: C19TestData;
    manufacturers: TestManufacturer[];
  }
) {
  const [value, setValue] = useState<Date | null>(null);
  console.log(c19TestData);
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
          <TestManufacturerSelector manufacturers={manufacturers} />
          <h2>Original Expiration Date</h2>
          <OriginalExpirationDate value={value} setValue={setValue} />
          {value ? <p>The selected date is {value.toLocaleString()}</p> : null}
        </section>
      </Container>
    </>
  );
}

interface TestManufacturers {
  manufacturers: TestManufacturer[]
}

function TestManufacturerSelector({ manufacturers }: TestManufacturers) {
  return (
    <Select
      label="COVID Test Manufacturer"
      placeholder="Pick value"
      data={manufacturers}
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
  return {
    props: {
      c19TestData,
      manufacturers,
    },
  };
};