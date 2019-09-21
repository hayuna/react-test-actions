import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { I18nextProvider } from 'react-i18next';

import ThemeProvider from '@material-ui/styles/ThemeProvider';
import CssBaseLine from '@material-ui/core/CssBaseline';
import createGenerateClassName from '@material-ui/styles/createGenerateClassName';
import StylesProvider from '@material-ui/styles/StylesProvider';

import { ErrorBoundary, Loading } from 'components/shared';
import theme from './theme';
import i18n from 'locales/i18n';
import routes from './routes';

const baseUrl = process.env.PUBLIC_URL || '';
const generateClassName = createGenerateClassName({
  disableGlobal: true,
  productionPrefix: 's',
});

const App = () => (
  <I18nextProvider i18n={i18n}>
    <ThemeProvider theme={theme}>
      <CssBaseLine />
      <StylesProvider generateClassName={generateClassName}>
        <BrowserRouter basename={baseUrl}>
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>{renderRoutes(routes)}</Suspense>
          </ErrorBoundary>
        </BrowserRouter>
      </StylesProvider>
    </ThemeProvider>
  </I18nextProvider>
);

export default App;
