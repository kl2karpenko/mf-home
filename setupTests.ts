// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import React from 'react';
import { configure } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // this adds to jest's `expect()` assertions

// this is a hack to get rid of an error while testing in 'jsdom'
React.useLayoutEffect = React.useEffect;

configure({ testIdAttribute: 'data-test' });
