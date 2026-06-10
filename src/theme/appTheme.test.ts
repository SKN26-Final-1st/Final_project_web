import { buildAppTheme } from './appTheme';

function assertEqual<T>(actual: T, expected: T, message: string) {
  if (actual !== expected) {
    throw new Error(`${message}: expected ${String(expected)}, received ${String(actual)}`);
  }
}

const lightTheme = buildAppTheme('light');
const darkTheme = buildAppTheme('dark');

assertEqual(
  lightTheme.token?.colorBgBase,
  '#ffffff',
  'light theme base background should keep form controls crisp instead of gray',
);
assertEqual(
  lightTheme.token?.colorBgContainer,
  '#ffffff',
  'light theme container background should keep inputs aligned with cards',
);
assertEqual(
  lightTheme.token?.borderRadius,
  8,
  'theme radius should match the compact operations dashboard cards',
);
assertEqual(
  darkTheme.token?.colorBgBase,
  '#0b1220',
  'dark theme base background should stay anchored to the app shell',
);
