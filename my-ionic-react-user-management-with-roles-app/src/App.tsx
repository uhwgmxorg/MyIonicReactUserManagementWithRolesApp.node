import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import ReadmePage from './pages/ReadmePage';
import AddUserPage from './pages/AddUserPage';
import ManageUserGroups from './pages/ManageUserGroups';
import ManageUserRoles from './pages/ManageUserRoles';
import UserListPage from './pages/UserListPage';
import ChangeLogPage from './pages/ChangeLogPage';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import './App.css'

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Redirect from="/" to="/page/ReadmePage" exact />
            <Route path="/page/ReadmePage" component={ReadmePage} />
            <Route path="/page/AddUserPage" component={AddUserPage} />
            <Route path="/page/ManageUserGroups" component={ManageUserGroups} />
            <Route path="/page/ManageUserRoles" component={ManageUserRoles} />
            <Route path="/page/UserListPage" component={UserListPage} />
            <Route path="/page/ChangeLogPage" component={ChangeLogPage} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
