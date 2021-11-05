import React from 'react';

import { Switch, Redirect, useRouteMatch } from 'react-router-dom';

import { PageActivate } from '@/app/account/PageActivate';
import { PagePassword } from '@/app/account/PagePassword';
import { PageProfile } from '@/app/account/PageProfile';
import { PageRegister } from '@/app/account/PageRegister';
import { Route, RoutePublicOnly } from '@/app/router';
import { Error404 } from '@/errors';

const AccountRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Switch>
      <Route
        exact
        path={`${url}/`}
        render={() => <Redirect to={`${url}/profile`} />}
      />

      <RoutePublicOnly
        exact
        path={`${url}/register`}
        render={() => <PageRegister />}
      />
      <RoutePublicOnly
        exact
        path={`${url}/activate`}
        render={() => <PageActivate />}
      />

      <Route exact path={`${url}/profile`} render={() => <PageProfile />} />
      <Route exact path={`${url}/password`} render={() => <PagePassword />} />

      <Route path="*" render={() => <Error404 />} />
    </Switch>
  );
};

export default AccountRoutes;
