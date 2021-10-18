import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ChildRoutes from './ChildRoutes';
import { NavigationInterface } from '..';

interface Props {
  items: NavigationInterface[]
}

const ParentRoutes: React.FC<Props> = ({ items }) => {
  return (
    <Switch>
      {items.map((item, index) => {
        const Guard = item.guard || Fragment;
        const Layout = item.layout || Fragment;
        const Loading = item.loading;
        return (
          <Route key={index} path={item.path}>
            <Guard>
              <Layout>
                <ChildRoutes routes={item.routes} otherwise={item.otherwise} Loading={Loading}/>
              </Layout>
            </Guard>
          </Route>
        );
      })}
    </Switch>
  );
};

export default ParentRoutes;
