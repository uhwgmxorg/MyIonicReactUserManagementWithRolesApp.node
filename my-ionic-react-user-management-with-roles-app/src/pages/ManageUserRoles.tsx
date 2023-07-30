import React, { useState } from "react";
import { useIonViewDidEnter, IonCheckbox, IonAvatar, IonAccordion, IonAccordionGroup, IonToast, IonButton, IonInput, IonLabel, IonItem, IonCardContent, IonCardHeader, IonCard, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import axios from 'axios';
import GetVersion from "../components/GetVersion";

import config from '../config.json';

import { BsPersonFillGear } from "react-icons/bs";


interface role {
    id: number;
    name: string;
}

const ManageUserRoles: React.FC = () => {
    const { name } = useParams<{ name: string; }>();

    const [result, setResult] = useState("");
    var [roles, setRoles] = useState<role[]>([]);

    const [showToastInserted, setShowToastInserted] = useState(false);
    const [showToastInsertedError, setShowToastInsertedError] = useState(false);
    const [showToastReloded, setShowToastReloded] = useState(false);
    const [showToastDeleted, setShowToastDeleted] = useState(false);
    const [showToastErrorDeleted, setShowToastErrorDeleted] = useState(false);
    const [showToastErrorLoding, setShowToastErrorLoding] = useState(false);

    const [RoleName, setInputRoleName] = useState("");

    const handleViewDidEnter = () => {
        console.log('AddUserPage: ionViewDidEnter');
        reloadAllRoles();
    };
    useIonViewDidEnter(handleViewDidEnter);

    function reloadAllRoles() {
        try {
            axios.get(config["rest-api-role"]).then((response) => {
                setResult(response.data);
                setRoles(response.data);
                console.log(roles);
            });
        } catch (error) {
            setShowToastErrorLoding(true);
        }
    }

    const createRole = async (name: string) => {
        try {
            const response = await axios.post(config["rest-api-role"], {
                name: name
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

    const deleteRole = async (userId: number) => {
        try {
            const response = await axios.delete(config["rest-api-role"] + "/" + userId);
            setShowToastDeleted(true);
            console.log(response.data.message);
        } catch (error) {
            setShowToastErrorDeleted(true);
            console.error(error);
        }
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
                    <h6 className='my-textheadline-style'>ManageUserRoles</h6>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <IonCard className="device-card" color={'secondary'} style={{ width: '390px', height: '240px' }}>
                        <IonCardHeader>
                            <div style={{ display: 'flex', alignItems: 'center' }}><h1 style={{ marginRight: '10px' }}><BsPersonFillGear /></h1> <h4>Add Role Name:</h4></div>
                        </IonCardHeader>

                        <IonCardContent>

                            <IonItem>
                                <IonLabel>Role Name:</IonLabel>
                                <IonInput label="role" value={RoleName} onIonChange={(e: any) => { setInputRoleName(e.target.value) }} placeholder="Enter Role Name"></IonInput>
                            </IonItem>

                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                                <IonButton
                                    color={'dark'}
                                    style={{ marginTop: '20px', marginRight: '10px' }}
                                    onClick={async () => {
                                        console.log("Role Name is: " + RoleName);
                                        await createRole(RoleName);
                                        reloadAllRoles();
                                    }} >
                                    Add
                                </IonButton>
                                <IonButton
                                    color={'dark'}
                                    style={{ marginTop: '20px', marginRight: '10px' }}
                                    onClick={() => {
                                        setShowToastReloded(true);
                                        reloadAllRoles();
                                    }} >
                                    Refresh
                                </IonButton>
                            </div>

                            <IonToast style={{ textAlign: 'center' }} isOpen={showToastInserted} onDidDismiss={() => setShowToastInserted(false)} message="User success full inserted" duration={2000} color="success" />
                            <IonToast style={{ textAlign: 'center' }} isOpen={showToastInsertedError} onDidDismiss={() => setShowToastInsertedError(false)} message="Error insert user" duration={2000} color="danger" />
                            <IonToast style={{ textAlign: 'center' }} isOpen={showToastReloded} onDidDismiss={() => setShowToastReloded(false)} message="Users reloded" duration={2000} color="light" />

                        </IonCardContent>
                    </IonCard>

                    <div style={{ marginLeft: '0px', minWidth: '390px', minHeight: '350px', maxWidth: '390px', maxHeight: '350px' }}>
                        <IonAccordionGroup>
                            {Array.isArray(roles) && roles.map(roles => (
                                <div key={roles.id}>
                                    <IonAccordion key={roles.id}>
                                        <IonItem slot="header" color={"secondary"}>
                                            <IonAvatar slot="start">
                                                <BsPersonFillGear />
                                            </IonAvatar>
                                            <IonLabel>{roles.id}</IonLabel>
                                            <IonLabel>{roles.name}</IonLabel>
                                        </IonItem>
                                        <div className="ion-padding" slot="content" style={{ margin: '0px', padding: '0px' }}>
                                            <IonItem style={{ margin: '0px', padding: '0px' }}>
                                                <IonButton color={'dark'} onClick={async () => {
                                                    await deleteRole(roles.id);
                                                    reloadAllRoles();
                                                }}>
                                                    Delete
                                                </IonButton>
                                            </IonItem>
                                        </div>
                                        <IonToast isOpen={showToastDeleted} onDidDismiss={() => setShowToastDeleted(false)} message="Data success full deleted" duration={3000} color="warning" />
                                        <IonToast isOpen={showToastErrorDeleted} onDidDismiss={() => setShowToastErrorDeleted(false)} message="Error deleting data" duration={3000} color="danger" />
                                        <IonToast isOpen={showToastErrorLoding} onDidDismiss={() => setShowToastErrorLoding(false)} message="Error loding data" duration={3000} color="danger" />
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

export default ManageUserRoles;
