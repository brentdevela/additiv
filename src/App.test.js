import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import '@testing-library/jest-dom/extend-expect'

import { store } from './app/store';
import App from './App';

const server = setupServer(
    rest.get('http://api.additivasia.io/api/v1/assignment/employees/Brent', (req, res, ctx) => {
        return res(ctx.json(['CEO',{'direct-subordinates': ['Nina', 'Anna']}]));
    }),
    rest.get('http://api.additivasia.io/api/v1/assignment/employees/Nina', (req, res, ctx) => {
        return res(ctx.json(['Secretary',{'direct-subordinates': ['Beth']}]));
    }),
    rest.get('http://api.additivasia.io/api/v1/assignment/employees/Anna', (req, res, ctx) => {
        return res(ctx.json(['employee']));
    }),
    rest.get('http://api.additivasia.io/api/v1/assignment/employees/Beth', (req, res, ctx) => {
        return res(ctx.json(['employee']));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('App test', () => {
    it('should show Employee Explorer', () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );
        expect(screen.getByText(/Employee Explorer/i)).toBeInTheDocument();
    });

    it('should show Employee Overview on Search click',async () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );
        fireEvent.change(screen.getByLabelText('Type employee name'), { target: { value: 'Brent' } });
        fireEvent.click(screen.getByText('Search'));

        await screen.queryByText(/Overview/i);

        expect(screen.getByText(/Back/i)).toBeInTheDocument();
        expect(screen.getByText(/Show All/i)).toBeInTheDocument();

        fireEvent.click(screen.getByText(/Show All/i));

        await screen.queryByText(/Explorer/i);
        expect(screen.queryByText(/Show All/i)).not.toBeInTheDocument();
    });

    it('should show Employee Explorer on Key Enter',async () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );
        fireEvent.click(screen.getByText('Back'));
        await screen.findAllByText(/Explorer/i);

        fireEvent.change(screen.getByLabelText('Type employee name'), { target: { value: 'Brent' } });
        fireEvent.keyPress(screen.getByLabelText('Type employee name'), { key: 'Enter'});
    });
});
