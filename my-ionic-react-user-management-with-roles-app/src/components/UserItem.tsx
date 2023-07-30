import React, { useEffect, useState } from "react";
import { IonToast, IonInput, IonButton, IonModal, IonCard, IonCardHeader, IonItem, IonLabel, IonAvatar, IonCardContent } from '@ionic/react';
import axios from 'axios';
import { FcBusinessman } from "react-icons/fc";

import config from '../config.json';

interface UserItemItemProps {
    id: number;
    username: string;
    email: string;
    color: string;
    icon: string;
    onUserDeleted: (id: number) => void;
    onUserUpdate: () => void;
}


const UserItem: React.FC<UserItemItemProps> = ({ id, username, email, color, icon, onUserDeleted, onUserUpdate }) => {

    const [InputUser, setInputUser] = useState("");
    const [InputEmail, setInputEmail] = useState("");
    const [InputPassword, setInputPassword] = useState("");
    const [showToastErrorDeleted, setShowToastErrorDeleted] = useState(false);
    const [showToastDeleted, setShowToastDeleted] = useState(false);

    const [showModalRole, setShowModalUpdate] = useState(false);

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

    const updateUser = async (id: number, username: string, email: string, password: string) => {
        try {
            const response = await axios.put(`${config["rest-api-user"]}/${id}`, {
                username: username,
                email: email,
                password: password
            });
            console.log(response.data); // The response from the server is output here
            return response.data;       // Here the response from the server is returned
        } catch (error) {
            console.error(error);       // An error is returned here if the request fails
            throw error;                // This is where the error is propagated
        }
    }

    const handleOpenUpdateModal = () => {
        setShowModalUpdate(true);
    };

    const handleCancelUpdateModal = () => {
        setShowModalUpdate(false);
    };

    const handleDelete = (id: number) => {
        deleteUser(id);
        setShowModalUpdate(false);
        onUserDeleted(id);
    };

    const handleSubmitUpdateModal = async (id: number, username: string, email: string, password: string) => {
        await updateUser(id, username, email, password);
        setShowModalUpdate(false);
        onUserUpdate();
    };

    useEffect(() => {
        setInputUser(username);
        setInputEmail(email);
    }, [username, email]);

    return (
        <>
            <IonCard className="device-card" color={color} style={{ minWidth: '280px', maxWidth: '280px', maxHeight: '180px' }}>
                <IonCardHeader>
                    <IonItem button detail={false} lines="none" className="device-item" onClick={() => { handleOpenUpdateModal(); }}>
                        <IonAvatar slot="start">
                            <FcBusinessman size={40} />
                        </IonAvatar>
                        <IonLabel>
                            <h2>{"#" + id}</h2>
                            <p>{username}</p>
                            <p>{email}</p>
                        </IonLabel>
                    </IonItem>
                </IonCardHeader>

                <IonCardContent>
                    <IonButton style={{ paddingBottom: '14px', paddingLeft: '0px', paddingRight: '20px', float: 'left' }} color={'dark'} onClick={() => handleDelete(id)}>Delete</IonButton>
                    <p style={{ paddingTop: '5px', paddingLeft: '0px', paddingRight: '20px', float: 'right' }}>USER</p>
                </IonCardContent>


                <IonModal isOpen={showModalRole} onDidDismiss={handleCancelUpdateModal}>
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div style={{ paddingTop: '20px', textAlign: 'center' }}>
                            USER UPDATE #{id}
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <FcBusinessman style={{ paddingTop: '30px', paddingBottom: '30px' }} size={200} />
                        </div>
                        <div>
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
                                <IonInput label="password" onIonChange={(e: any) => { setInputPassword(e.target.value) }} placeholder="Enter Password"></IonInput>
                            </IonItem>

                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '20px' }}>
                            <IonButton style={{ paddingLeft: '20px', paddingRight: '20px' }} color={'dark'} onClick={() => handleSubmitUpdateModal(id, InputUser, InputEmail, InputPassword)}>Submit</IonButton>
                            <IonButton style={{ paddingLeft: '20px', paddingRight: '20px' }} color={'dark'} onClick={handleCancelUpdateModal}>Cancel</IonButton>
                        </div>
                    </div>
                    <IonToast isOpen={showToastDeleted} onDidDismiss={() => setShowToastDeleted(false)} message="User success full deleted" duration={3000} color="warning" />
                    <IonToast isOpen={showToastErrorDeleted} onDidDismiss={() => setShowToastErrorDeleted(false)} message="Error deleting user" duration={3000} color="danger" />
                </IonModal>

            </IonCard >
        </>
    );
};


export default UserItem;