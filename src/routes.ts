import { RouteConfig } from 'react-router-config';
import { Layout, lazyLoad } from 'components/shared';

const HomePage = lazyLoad(() => import('pages/Home'));
const NotFoundPage = lazyLoad(() => import('pages/NotFound'));

const routes: RouteConfig[] = [
  {
    component: Layout,
    routes: [
      {
        path: '/',
        exact: true,
        component: HomePage
      },
      {
        component: NotFoundPage
      }
    ]
  },
  {
    component: NotFoundPage
  }
];

export default routes;
