import Head from 'next/head';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { C19TestData, getSortedTestsData, TestManufacturer } from '@/lib/covid-tests';
import { Select } from '@mantine/core';
import { useState } from 'react';
import { DatePicker } from '@mantine/dates';


export default function Home({
  c19TestData,
  manufacturers
}: {
  C19Tests: {
    testData: C19TestData;
    manufacturers: TestManfacturers[];
  }[];
}) {
  console.log(c19TestData);
  console.log(manufacturers);
  return (
    <>
      <Head>
        <title>COVID tests updated expiration checker</title>
      </Head>
      <section>
        <h1>COVID Test expiration date checker</h1>
        <p>This site allows you to check updated COVID test expiration dates.</p>
      </section>
      <section>
        <TestManufacturerSelector
          manufacturers={manufacturers} />
        <h2>Original Expiration Date</h2>
        <OriginalExpirationDate />
      </section>
    </>
  );
}

interface TestManfacturers {
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


function OriginalExpirationDate() {
  const [value, setValue] = useState<Date | null>(null);
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