import React, { Suspense, lazy, Component } from "react";
import { Switch, Route } from "react-router-dom";

import Navigation from "./Navigation/Navigation";
import routes from "../routes";

const Home = lazy(() =>
  import("../views/Home/Home" /* webpackChunkName: "home-page" */)
);

const Movies = lazy(() =>
  import("../views/Movies/Movies" /* webpackChunkName: "movies-page" */)
);

const MovieDetails = lazy(() =>
  import(
    "../views/MovieDetails/MovieDetails" /* webpackChunkName: "movies-details-page" */
  )
);

class App extends Component {
  render() {
    return (
      <>
        <Navigation />
        <Suspense fallback={<h4>Loading...</h4>}>
          <Switch>
            <Route path={routes.home} exact component={Home} />
            <Route path={routes.movies} exact component={Movies} />
            <Route path={routes.movieDetails} component={MovieDetails} />
            <Route component={Home} />
          </Switch>
        </Suspense>
      </>
    );
  }
}

export default App;
