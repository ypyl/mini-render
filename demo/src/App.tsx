// App.tsx — demo router with wouter.
import { Router, Route, Switch, Link } from "wouter";
import { Container, Title } from "@mantine/core";
import { HomePage } from "./HomePage";
import { BasicCase } from "./cases/basic/BasicCase";
import { FormCase } from "./cases/form/FormCase";
import { ActionsCase } from "./cases/actions/ActionsCase";
import { LargeCase } from "./cases/large/LargeCase";
import { TableCase } from "./cases/table/TableCase";
import { SwitchCase } from "./cases/switch/SwitchCase";
import { DetailModalCase } from "./cases/detail-modal/DetailModalCase";
import { TwoStoreCase } from "./cases/two-store/TwoStoreCase";

export function App() {
  return (
    <Router base="/mini-render">
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/basic" component={BasicCase} />
        <Route path="/form" component={FormCase} />
        <Route path="/actions" component={ActionsCase} />
        <Route path="/large" component={LargeCase} />
        <Route path="/table" component={TableCase} />
        <Route path="/switch" component={SwitchCase} />
        <Route path="/detail-modal" component={DetailModalCase} />
        <Route path="/two-store" component={TwoStoreCase} />
        <Route>
          <Container py="xl">
            <Title order={3} mb="md">404 — Page not found</Title>
            <Link href="/">← Back to home</Link>
          </Container>
        </Route>
      </Switch>
    </Router>
  );
}
