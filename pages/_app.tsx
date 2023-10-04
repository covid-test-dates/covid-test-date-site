// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import type { AppProps } from 'next/app';
import { MantineProvider, createTheme, MantineColorsTuple } from '@mantine/core';

const myColor: MantineColorsTuple = [
  '#f7f2fb',
  '#e7e3ec',
  '#cbc4d4',
  '#afa5bd',
  '#9789a9',
  '#88779d',
  '#806f97',
  '#6f5d84',
  '#625277',
  '#56466b'
];

const theme = createTheme({
  colors: {
    myColor,
  }
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <MantineProvider defaultColorScheme="auto" theme={theme}>
            <Component {...pageProps} />
        </MantineProvider>
    );
}
