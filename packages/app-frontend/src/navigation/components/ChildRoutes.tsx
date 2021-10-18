import React, { Suspense } from 'react';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';
import { ParamRoute, RouteInterface } from '..';

interface Props {
  routes: Array<RouteInterface>
  otherwise: ParamRoute
  Loading: React.FC
}

const ChildRoutes: React.FC<Props> = ({ routes = [], otherwise, Loading }) => {
  const params = useParams();
  console.log(otherwise(params));
  return (
    <Switch>
      {routes.map(({ name, component: Component, exact = true, subpath }, index) => {
        console.log(subpath, exact)
        return (
          <Route key={index} path={subpath} exact={exact}>
            <Suspense fallback={<Loading/>}>
              <Component/>
            </Suspense>
          </Route>
        );
      })}
      <Redirect to={otherwise(params)}/>
    </Switch>
  );
};

export default ChildRoutes;
