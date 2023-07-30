import React, { useState } from "react";
import { useIonViewDidEnter, IonButton, IonToast, IonCol, IonRow, IonGrid, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
// 
import { personCircleOutline } from 'ionicons/icons';
import axios from 'axios';
import GetVersion from "../components/GetVersion";
import UserItem from "../components/UserItem";

import config from '../config.json';

interface user {
    id: number;
    username: string;
    email: string;
    color: string;
}


const UserListPage: React.FC = () => {

    const [showToastErrorLoding, setShowToastErrorLoding] = useState(false);

    const [users, setUsers] = useState<user[]>([]);
    const [result, setResult] = useState("");

    const { name } = useParams<{ name: string; }>();

    const reloadAllUsers = async () => {
        try {
            const response = await axios.get(config['rest-api-user']);
            setResult(response.data);
            setUsers(response.data);
            console.log(users);
        } catch (error) {
            setShowToastErrorLoding(true);
        }
    };

    const handleRefresh = async () => {
        await reloadAllUsers();
        console.log('Refresh button clicked');
    };

    const handleUserDeleted = (deletedUserId: number) => {
        setUsers(users.filter(user => user.id !== deletedUserId));
    };

    const handleViewDidEnter = () => {
        console.log('UserListPage: ionViewDidEnter');
        handleRefresh();
    };
    useIonViewDidEnter(handleViewDidEnter);


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                        <GetVersion />
                    </IonButtons>
                    <IonTitle>{name}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton className="custom-color-button" onClick={handleRefresh}>Refresh</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <div >
                    <h6 className='my-textheadline-style'>UserListPage</h6>
                </div>

                <IonGrid style={{ textAlign: 'center' }} fixed>
                    <IonRow>
                        {users.map(users => (
                            <div key={users.id}>
                                <IonCol size="12" size-md="60" key={users.id}>
                                    <UserItem
                                        id={users.id}
                                        username={users.username}
                                        email={users.email}
                                        color={'medium'}
                                        icon={personCircleOutline}
                                        onUserDeleted={handleUserDeleted}
                                        onUserUpdate={handleRefresh} />
                                </IonCol>
                            </div>
                        ))
                        }
                    </IonRow>
                </IonGrid>

                <IonToast isOpen={showToastErrorLoding} onDidDismiss={() => setShowToastErrorLoding(false)} message="Error loding user" duration={3000} color="danger" />

            </IonContent>
        </IonPage>
    );
};

export default UserListPage;