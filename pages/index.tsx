import Head from 'next/head';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { getSortedTestsData } from '@/lib/covid-tests';
import { Select } from '@mantine/core';
import { useState } from 'react';
import { DatePicker } from '@mantine/dates';


export default function Home({
  allPostsData,
}: {
  allPostsData: {
    date: string;
    title: string;
    id: string;
  }[];
}) {
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
        <TestManufacturerSelector />
        <h2>Original Expiration Date</h2>
        <OriginalExpirationDate />
      </section>
    </>
  );
}


function TestManufacturerSelector() {
  return (
    <Select
      label="COVID Test Manufacturer"
      placeholder="Pick value"
      data={['Abbott', 'Someone else']}
      searchable
    />
  );
}

function OriginalExpirationDate() {
  const [value, setValue] = useState<Date | null>(null);
  return <DatePicker value={value} onChange={setValue} />;
}



export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedTestsData();
  return {
    props: {
      allPostsData,
    },
  };
};