import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
} from '@ionic/react';
import GetVersion from "../components/GetVersion";

import { useLocation } from 'react-router-dom';
// see:
//https://ionic.io/ionicons 
import { list, personAddOutline, attachOutline, peopleOutline, peopleCircleOutline, personCircleOutline } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'ReadMe',
    url: '/page/ReadmePage',
    iosIcon: attachOutline,
    mdIcon: attachOutline,
  },
  {
    title: 'Add User',
    url: '/page/AddUserPage',
    iosIcon: personAddOutline,
    mdIcon: personAddOutline
  },
  {
    title: 'Manage User Groups',
    url: '/page/ManageUserGroups',
    iosIcon: peopleCircleOutline,
    mdIcon: peopleCircleOutline
  },
  {
    title: 'Manage User Roles',
    url: '/page/ManageUserRoles',
    iosIcon: personCircleOutline,
    mdIcon: personCircleOutline
  },
  {
    title: 'User List',
    url: '/page/UserListPage',
    iosIcon: peopleOutline,
    mdIcon: peopleOutline
  },
  {
    title: 'ChangeLog',
    url: '/page/ChangeLogPage',
    iosIcon: list,
    mdIcon: list
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>

        <IonList id="menu-list">
          <IonListHeader className='my-ion-list-header'>My Ionic React User Management App</IonListHeader>
          <GetVersion />
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

      </IonContent>
    </IonMenu>
  );
};

export default Menu;
