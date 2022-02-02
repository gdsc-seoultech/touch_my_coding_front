import { Route, Switch, BrowserRouter } from "react-router-dom";
import Coding from "@Pages/coding";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Coding} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
