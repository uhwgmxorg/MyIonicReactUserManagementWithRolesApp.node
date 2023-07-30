import React from 'react';
import { IonItem, IonList, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import GetVersion from "../components/GetVersion";


const ChangeLogPage: React.FC = () => {

    const { name } = useParams<{ name: string; }>();

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
                <div>
                    <h6 className='my-textheadline-style'>ChangeLog</h6>
                </div>
                <div>
                    <IonList>
                        <IonItem>
                            <ul className='my-text-style'>
                                <span style={{ fontWeight: 'bold' }}>Version 1.0.6</span>
                                <li>Changes in SQL database, ON DELETE CASCADE added for user mangement</li>
                            </ul>
                        </IonItem>
                        <IonItem>
                            <ul className='my-text-style'>
                                <span style={{ fontWeight: 'bold' }}>Version 1.0.5</span>
                                <li>Add functionality for role assignments (add and delete per CheckBox)</li>
                            </ul>
                        </IonItem>
                        <IonItem>
                            <ul className='my-text-style'>
                                <span style={{ fontWeight: 'bold' }}>Version 1.0.4</span>
                                <li>Add functionality for group assignments (add and delete per CheckBox)</li>
                            </ul>
                        </IonItem>
                        <IonItem>
                            <ul className='my-text-style'>
                                <span style={{ fontWeight: 'bold' }}>Version 1.0.3</span>
                                <li>Change of add user functionality</li>
                                <li>Add Manager User Groups (functions for insert or delte in user_group_mappings)</li>
                                <li>Add Manager User Roles (not complete done yet)</li>
                            </ul>
                        </IonItem>
                        <IonItem>
                            <ul className='my-text-style'>
                                <span style={{ fontWeight: 'bold' }}>Version 1.0.2</span>
                                <li>Base for Version II</li>
                            </ul>
                        </IonItem>
                        <IonItem>
                            <ul className='my-text-style'>
                                <span style={{ fontWeight: 'bold' }}>Version 1.0.1</span>
                                <li>Formatting correction</li>
                            </ul>
                        </IonItem>
                        <IonItem>
                            <ul className='my-text-style'>
                                <span style={{ fontWeight: 'bold' }}>Version 1.0.0</span>
                                <li>Start version</li>
                            </ul>
                        </IonItem>
                    </IonList>
                </div>

            </IonContent>


        </IonPage>
    );
};

export default ChangeLogPage;
