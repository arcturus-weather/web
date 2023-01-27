import { RouteObject, useRoutes } from 'react-router-dom';

import Layout from '@layout/index';
import Warnings from '@pages/warnings';
import Weathers from '@pages/weathers';

export default function Router() {
  const routers: RouteObject[] = [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Weathers />,
        },
        {
          path: '/warnings',
          element: <Warnings />,
        },
      ],
    },
  ];

  return useRoutes(routers);
}
