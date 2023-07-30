import React, { useState } from "react";
import { IonGrid, IonRow, IonCol, IonModal, useIonViewDidEnter, IonCheckbox, IonAvatar, IonAccordion, IonAccordionGroup, IonToast, IonButton, IonInput, IonLabel, IonItem, IonCardContent, IonCardHeader, IonCard, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
// npm install axios --save
import axios from 'axios';
import GetVersion from "../components/GetVersion";
import GroupModal from '../components/GroupModal';

import config from '../config.json';

import { FcButtingIn, FcBusinesswoman } from "react-icons/fc";

// see:
// https://react-icons.github.io/react-icons/icons?name=bi
// npm install react-icons --save
import {
    AiOutlineUserAdd,
} from 'react-icons/ai';
import { BiUserCircle } from "react-icons/bi";

interface user {
    id: number;
    username: string;
    email: string;
    color: string;
}


const AddUserPage: React.FC = () => {



    const [InputUser, setInputUser] = useState("");
    const [InputEmail, setInputEmail] = useState("");
    const [InputPassword, setInputPassword] = useState("");

    const [showToastInserted, setShowToastInserted] = useState(false);
    const [showToastInsertedError, setShowToastInsertedError] = useState(false);
    const [showToastReloded, setShowToastReloded] = useState(false);
    const [showToastDeleted, setShowToastDeleted] = useState(false);
    const [showToastErrorDeleted, setShowToastErrorDeleted] = useState(false);
    const [showToastErrorLoding, setShowToastErrorLoding] = useState(false);

    const [result, setResult] = useState("");
    const [users, setUsers] = useState<user[]>([]);

    const [autoAdd, setAutoAdd] = useState(false);

    const [currentModalUser, setCurrentModalUser] = useState<user | null>(null);


    const { name } = useParams<{ name: string; }>();

    const handleViewDidEnter = () => {
        console.log('AddUserPage: ionViewDidEnter');
        reloadAllUsers();
    };
    useIonViewDidEnter(handleViewDidEnter);

    function reloadAllUsers() {
        try {
            axios.get(config["rest-api-user"]).then((response) => {
                setResult(response.data);
                setUsers(response.data);
                console.log(users);
            });
        } catch (error) {
            setShowToastErrorLoding(true);
        }
    }

    const createUser = async (username: string, email: string, password: string) => {
        try {
            const response = await axios.post(config["rest-api-user"], {
                username: username,
                email: email,
                password: password
            });
            setShowToastInserted(true);
            console.log(response.data); // The response from the server is output here
            return response.data;       // Here the response from the server is returned
        } catch (error) {
            setShowToastInsertedError(true);
            console.error(error);       // An error is returned here if the request fails
            throw error;                // This is where the error is propagated
        }
    }

    const deleteUser = async (userId: number) => {
        try {
            const response = await axios.delete(config["rest-api-user"] + "/" + userId);
            setShowToastDeleted(true);
            console.log(response.data.message); // Ausgabe: "User {id} wurde gelöscht"
        } catch (error) {
            setShowToastErrorDeleted(true);
            console.error(error);
        }
    };

    // generateRandomUserData
    function generateRandomUserData() {
        const firstNames = ['Max', 'Maria', 'Peter', 'Anna', 'John', 'Jane', 'David', 'Emma', 'Sophie', 'Luke'];
        const lastNames = ['Mustermann', 'Musterfrau', 'Parker', 'Smith', 'Doe', 'Brown', 'Garcia', 'Lee', 'Taylor'];
        const domains = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'aol.com', 'protonmail.com'];
        const passwordLength = 8;
        const id = 0;
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domains[Math.floor(Math.random() * domains.length)]}`;
        const password = Math.random().toString(36).substring(2, 2 + passwordLength);
        return {
            id,
            name: `${firstName} ${lastName}`,
            email,
            password,
        };
    }

    const handleOpenGroupModal = (user: user) => {
        setCurrentModalUser(user);
        console.log("User is: " + user.id);
    };

    const handleCloseGroupModal = (user: user) => {
        setCurrentModalUser(user);
        console.log("User is: " + user.id);
    };


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                        <GetVersion />
                    </IonButtons>
                    <IonTitle>{name}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <div >
                    <h6 className='my-textheadline-style'>AddUserPage</h6>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <IonCard className="device-card" color={'medium'} style={{ width: '390px', height: '380px' }}>
                        <IonCardHeader>
                            <div style={{ display: 'flex', alignItems: 'center' }}><h1 style={{ marginRight: '10px' }}><AiOutlineUserAdd /></h1> <h4>Add User:</h4></div>
                        </IonCardHeader>

                        <IonCardContent>

                            <IonItem>
                                <IonLabel>User Name:</IonLabel>
                                <IonInput label="user" value={InputUser} onIonChange={(e: any) => { setInputUser(e.target.value) }} placeholder="Enter User Name"></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel>EMail:</IonLabel>
                                <IonInput label="email" value={InputEmail} onIonChange={(e: any) => { setInputEmail(e.target.value) }} placeholder="Enter EMail"></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel>Password:</IonLabel>
                                <IonInput label="password" value={InputPassword} onIonChange={(e: any) => { setInputPassword(e.target.value) }} placeholder="Enter Password"></IonInput>
                            </IonItem>

                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                                <IonButton
                                    color={'dark'}
                                    style={{ marginTop: '20px', marginRight: '10px' }}
                                    onClick={async () => {
                                        const randomUserData = generateRandomUserData();
                                        setInputUser(randomUserData.name);
                                        setInputEmail(randomUserData.email);
                                        setInputPassword(randomUserData.password);

                                        if (autoAdd) {
                                            await createUser(randomUserData.name, randomUserData.email, randomUserData.password);
                                            reloadAllUsers();
                                        }
                                    }} >
                                    Random
                                </IonButton>
                                <IonButton
                                    color={'dark'}
                                    style={{ marginTop: '20px', marginRight: '10px' }}
                                    onClick={async () => {
                                        console.log("User is: " + InputUser);
                                        console.log("EMail is: " + InputEmail);
                                        console.log("Password is: " + InputPassword);
                                        await createUser(InputUser, InputEmail, InputPassword);
                                        reloadAllUsers();
                                    }} >
                                    Add
                                </IonButton>
                                <IonButton
                                    color={'dark'}
                                    style={{ marginTop: '20px', marginRight: '10px' }}
                                    onClick={() => {
                                        setShowToastReloded(true);
                                        reloadAllUsers();
                                    }} >
                                    Refresh
                                </IonButton>
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px', paddingLeft: '0', background: 'transparent' }}>
                                    <IonCheckbox
                                        className="custom-checkbox"
                                        slot="start"
                                        checked={autoAdd}
                                        onIonChange={(e) => setAutoAdd(e.detail.checked)}
                                    />
                                    <IonLabel style={{ marginLeft: '10px' }}>Auto Add</IonLabel>
                                </div>
                            </div>

                            <IonToast style={{ textAlign: 'center' }} isOpen={showToastInserted} onDidDismiss={() => setShowToastInserted(false)} message="User success full inserted" duration={2000} color="success" />
                            <IonToast style={{ textAlign: 'center' }} isOpen={showToastInsertedError} onDidDismiss={() => setShowToastInsertedError(false)} message="Error insert user" duration={2000} color="danger" />
                            <IonToast style={{ textAlign: 'center' }} isOpen={showToastReloded} onDidDismiss={() => setShowToastReloded(false)} message="Users reloded" duration={2000} color="light" />

                        </IonCardContent>
                    </IonCard>

                    <div style={{ marginLeft: '0px', minWidth: '390px', minHeight: '350px', maxWidth: '390px', maxHeight: '350px' }}>
                        <IonAccordionGroup>
                            {Array.isArray(users) && users.map(user => (
                                <div key={user.id}>
                                    <IonAccordion key={user.id}>
                                        <IonItem slot="header" color={"medium"}>
                                            <IonAvatar slot="start">
                                                <BiUserCircle />
                                            </IonAvatar>
                                            <IonLabel>{user.id}</IonLabel>
                                            <IonLabel>{user.username}</IonLabel>
                                            <IonLabel>{user.email}</IonLabel>
                                        </IonItem>
                                        <div className="ion-padding" slot="content" style={{ margin: '0px', padding: '0px' }}>
                                            <IonItem style={{ margin: '0px', padding: '0px' }}>

                                                <IonButton color={'dark'} onClick={async () => {
                                                    await deleteUser(user.id);
                                                    reloadAllUsers();
                                                    setShowToastDeleted(true);
                                                }}>
                                                    Delete
                                                </IonButton>

                                                {currentModalUser && (
                                                    <GroupModal showModalGroup={true} handleCloseGroupModal={() => setCurrentModalUser(null)} user_id={currentModalUser.id} />
                                                )}

                                                <IonButton color={'dark'} onClick={() => handleOpenGroupModal(user)}>
                                                    Assign a Group
                                                </IonButton>

                                            </IonItem>
                                        </div>
                                        <IonToast isOpen={showToastDeleted} onDidDismiss={() => setShowToastDeleted(false)} message="User success full deleted" duration={3000} color="warning" />
                                        <IonToast isOpen={showToastErrorDeleted} onDidDismiss={() => setShowToastErrorDeleted(false)} message="Error deleting user" duration={3000} color="danger" />
                                        <IonToast isOpen={showToastErrorLoding} onDidDismiss={() => setShowToastErrorLoding(false)} message="Error loding user" duration={3000} color="danger" />
                                    </IonAccordion>
                                </div>
                            ))
                            }
                        </IonAccordionGroup>
                    </div>

                </div>
            </IonContent>

        </IonPage>
    );
};

export default AddUserPage;
