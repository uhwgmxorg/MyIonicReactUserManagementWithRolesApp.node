import React, { useState } from "react";
import { useIonViewDidEnter, IonAvatar, IonAccordion, IonAccordionGroup, IonToast, IonButton, IonInput, IonLabel, IonItem, IonCardContent, IonCardHeader, IonCard, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import axios from 'axios';
import GetVersion from "../components/GetVersion";
import RoleModal from '../components/RoleModal';

import config from '../config.json';

import { BsPersonFillAdd } from "react-icons/bs";


interface group {
    id: number;
    name: string;
}

const ManageUserGroups: React.FC = () => {
    const { name } = useParams<{ name: string; }>();

    const [result, setResult] = useState("");
    var [groups, setGroups] = useState<group[]>([]);

    const [showToastInserted, setShowToastInserted] = useState(false);
    const [showToastInsertedError, setShowToastInsertedError] = useState(false);
    const [showToastReloded, setShowToastReloded] = useState(false);
    const [showToastDeleted, setShowToastDeleted] = useState(false);
    const [showToastErrorDeleted, setShowToastErrorDeleted] = useState(false);
    const [showToastErrorLoding, setShowToastErrorLoding] = useState(false);

    const [GroupName, setInputGroupName] = useState("");

    const [showModalRole, setShowModalRole] = useState(false);

    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

    const handleViewDidEnter = () => {
        console.log('AddUserPage: ionViewDidEnter');
        reloadAllGroups();
    };
    useIonViewDidEnter(handleViewDidEnter);

    function reloadAllGroups() {
        try {
            axios.get(config["rest-api-group"]).then((response) => {
                setResult(response.data);
                setGroups(response.data);
                console.log(groups);
            });
        } catch (error) {
            setShowToastErrorLoding(true);
        }
    }

    const createGroup = async (name: string) => {
        try {
            const response = await axios.post(config["rest-api-group"], {
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

    const deleteGroup = async (userId: number) => {
        try {
            const response = await axios.delete(config["rest-api-group"] + "/" + userId);
            setShowToastDeleted(true);
            console.log(response.data.message);
        } catch (error) {
            setShowToastErrorDeleted(true);
            console.error(error);
        }
    };

    // handleOpenRoleModal aktualisieren, um eine group_id zu akzeptieren
    const handleOpenRoleModal = (group_id: number) => {
        setSelectedGroupId(group_id);
        setShowModalRole(true);
    };

    // handleCloseRoleModal aktualisieren, um den selectedGroupId Zustand zu bereinigen
    const handleCloseRoleModal = () => {
        setSelectedGroupId(null);
        setShowModalRole(false);
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
                    <h6 className='my-textheadline-style'>ManageUserGroups</h6>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <IonCard className="device-card" color={'primary'} style={{ width: '390px', height: '240px' }}>
                        <IonCardHeader>
                            <div style={{ display: 'flex', alignItems: 'center' }}><h1 style={{ marginRight: '10px' }}><BsPersonFillAdd /></h1> <h4>Add Group Name:</h4></div>
                        </IonCardHeader>

                        <IonCardContent>

                            <IonItem>
                                <IonLabel>Group Name:</IonLabel>
                                <IonInput label="group" value={GroupName} onIonChange={(e: any) => { setInputGroupName(e.target.value) }} placeholder="Enter Group Name"></IonInput>
                            </IonItem>

                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                                <IonButton
                                    color={'dark'}
                                    style={{ marginTop: '20px', marginRight: '10px' }}
                                    onClick={async () => {
                                        console.log("Group Name is: " + GroupName);
                                        await createGroup(GroupName);
                                        reloadAllGroups();
                                    }} >
                                    Add
                                </IonButton>
                                <IonButton
                                    color={'dark'}
                                    style={{ marginTop: '20px', marginRight: '10px' }}
                                    onClick={() => {
                                        setShowToastReloded(true);
                                        reloadAllGroups();
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
                            {Array.isArray(groups) && groups.map(group => (
                                <div key={group.id}>
                                    <IonAccordion key={group.id}>
                                        <IonItem slot="header" color={"primary"}>
                                            <IonAvatar slot="start">
                                                <BsPersonFillAdd />
                                            </IonAvatar>
                                            <IonLabel>{group.id}</IonLabel>
                                            <IonLabel>{group.name}</IonLabel>
                                        </IonItem>
                                        <div className="ion-padding" slot="content" style={{ margin: '0px', padding: '0px' }}>
                                            <IonItem style={{ margin: '0px', padding: '0px' }}>

                                                <IonButton color={'dark'} onClick={async () => {
                                                    await deleteGroup(group.id);
                                                    reloadAllGroups();
                                                }}>
                                                    Delete
                                                </IonButton>

                                                {/* Modal anzeigen, wenn ausgewählte Gruppe entspricht */}
                                                {selectedGroupId === group.id && <RoleModal showModalRole={showModalRole} handleCloseRoleModal={handleCloseRoleModal} group_id={group.id} />}

                                                {/* handleOpenRoleModal innerhalb der map Funktion aktualisieren, um die group_id weiterzugeben */}
                                                <IonButton color={'dark'} onClick={() => handleOpenRoleModal(group.id)}>
                                                    Assign a Role
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

export default ManageUserGroups;
