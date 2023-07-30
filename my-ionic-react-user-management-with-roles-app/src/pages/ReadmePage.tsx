import React from 'react';
import { useIonViewDidEnter, IonCard, IonList, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import GetVersion from "../components/GetVersion";


const ReadmePage: React.FC = () => {

    const { name } = useParams<{ name: string; }>();

    const handleViewDidEnter = () => {
        console.log('ReadmePage: ionViewDidEnter');
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
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <div >
                    <h6 className='my-textheadline-style'>ReadmePage</h6>
                </div>
                <div>
                    <IonCard>
                        <IonList>
                            <p className='my-text-style'>
                                <span style={{ fontWeight: 'bold' }}>My Ionic React User Management App</span> is an example program how to manage users with an Ionic/React app via a web service. The usual CRUD (Create, Read, Update and Delete) functions are available.
                            </p>
                        </IonList>
                    </IonCard>
                </div>
            </IonContent>

        </IonPage>
    );
};

export default ReadmePage;