import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SignInAndSignUp from '../pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import TasksPage from '../pages/tasks/tasks.component';

interface IProps {
  currentUser: any;
}

type Props = IProps;

const App: React.FC<Props> = ({ currentUser }: Props) => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={SignInAndSignUp} />
        <Route exact path="/tasks" component={TasksPage} />
      </Switch>
    </div>
  );
}

export default App;
