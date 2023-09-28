// __tests__/index.test.js

import { screen } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';
import Home from '../pages/index';
import '@testing-library/jest-dom';
import { Container, Select } from '@mantine/core';
import { render } from '@/test-utils';


describe('Home', () => {
    it('renders a heading', () => {
        const { asFragment } = render(<Home c19TestData={[]} manufacturers={[]} />);

        const heading: HTMLElement = screen.getByRole('heading', {
            name: /COVID Test expiration date checker/i,
        });

        expect(heading).toBeInTheDocument();
    })
});
