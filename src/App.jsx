import { Route, Switch, BrowserRouter } from "react-router-dom";

import Main from "@Pages/Main";
import Guide from "@Pages/Guide";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/guide" component={Guide} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
