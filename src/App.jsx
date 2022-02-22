import { Route, Switch, BrowserRouter } from "react-router-dom";

import Main from "@Pages/Main";
import Result from "@Pages/Result";
import Apply from "@Pages/Apply";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/result" component={Result} />
        <Route exact path="/apply" component={Apply} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
