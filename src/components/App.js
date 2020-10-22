import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Navigation from "./Navigation/Navigation";
import Home from "../views/Home/Home";
import Movies from "../views/Movies/Movies";
import MovieDetails from "../views/MovieDetails/MovieDetails";
import routes from "../routes";

class App extends Component {
  render() {
    return (
      <>
        <Navigation />
        <Switch>
          <Route path={routes.home} exact component={Home} />
          <Route path={routes.movies} exact component={Movies} />
          <Route path={routes.movieDetails} component={MovieDetails} />
          <Route component={Home} />
        </Switch>
      </>
    );
  }
}

export default App;
