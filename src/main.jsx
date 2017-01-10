import {TestComponent} from './components/Test.jsx';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

export function main() {
    console.log(ReactDOMServer.renderToString(<TestComponent/>));   // eslint-disable-line
}
