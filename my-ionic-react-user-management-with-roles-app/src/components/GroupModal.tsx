import React, { useState, useEffect } from "react";
import { IonToast, IonModal, IonGrid, IonRow, IonCol, IonCheckbox, IonLabel, IonButton } from '@ionic/react';
import { FcButtingIn } from 'react-icons/fc';

import axios from 'axios';

import config from '../config.json';

interface group {
    id: number;
    name: string;
}

interface user_group_mappings {
    user_id: number;
    group_id: number;
}

interface GroupModalProps {
    showModalGroup: boolean;
    handleCloseGroupModal: () => void;
    user_id: number;
}

const GroupModal: React.FC<GroupModalProps> = ({ showModalGroup, handleCloseGroupModal, user_id }) => {

    const [result, setResult] = useState("");
    const [groups, setGroups] = useState<group[]>([]);

    const [selectedGroups, setSelectedGroups] = useState<user_group_mappings[]>([]);

    const [showToastErrorLoding, setShowToastErrorLoding] = useState(false);

    useEffect(() => {
        console.log("user_id: " + user_id);
        axios.get(`${config["rest-api-group"]}?user_id=${user_id}`)
            .then((response) => {
                const groupIds = response.data.map((group: group) => group.id);
                setSelectedGroups(groupIds);
                console.log("groupIds: " + groupIds + " for user " + user_id);
            })
            .catch((error) => {
                setShowToastErrorLoding(true);
            });
    }, [user_id]);

    useEffect(() => {
        console.log("selectedGroups:");
        console.log(JSON.stringify(selectedGroups))
    }, [selectedGroups]);

    useEffect(() => {
        if (showModalGroup) {
            console.log('GroupModal opened');
            console.log("groups: " + groups);
            reloadAllGroups(user_id);
        }
    }, [user_id]);

    function reloadAllGroups(user_id: number) {
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

    useEffect(() => {
        reloadUserGroupMappings(user_id);
    }, [user_id]);

    function reloadUserGroupMappings(user_id: number) {
        axios.get(`${config["user_group_mappings"]}?user_id=${user_id}`)
            .then((response) => {
                setSelectedGroups(response.data);
            })
            .catch((error) => {
                console.error(error);
                setShowToastErrorLoding(true);
            });
    }

    function handleGroupChange(checked: boolean, groupId: number) {
        if (checked) {
            setSelectedGroups([...selectedGroups, { user_id: user_id, group_id: groupId }]);
            // Code to add the group_id and user_id to the user_group_mappings table
            axios.post(config["user_group_mappings"], { user_id, group_id: groupId })
                .catch((error) => {
                    console.error(error);
                    // handle erroruser_group_mappings
                });
        } else {
            setSelectedGroups(selectedGroups.filter(mapping => mapping.group_id !== groupId));
            // Code to remove the group_id and user_id from the user_group_mappings table
            axios.delete(`${config["user_group_mappings"]}/${user_id}?group_id=${groupId}`)
                .catch((error) => {
                    console.error(error);
                    // handle error
                });
        }
    }


    return (
        <IonModal isOpen={showModalGroup} onDidDismiss={handleCloseGroupModal}>
            <div style={{ textAlign: 'center' }}>
                Group assignment for User {user_id}
            </div>
            <div style={{ textAlign: 'center' }}>
                <FcButtingIn style={{ paddingTop: '30px', paddingBottom: '30px' }} size={200} />
            </div>
            <div style={{ textAlign: 'center' }}>
                <IonGrid style={{ textAlign: 'center' }} fixed>
                    <IonRow className='ion-row'>
                        {groups.map(group => (
                            <div key={group.id}>
                                <IonCol className='ion-col1'>
                                    <div className="ion-text-nowrap">
                                        {group.id}
                                    </div>
                                </IonCol>
                                <IonCol className='ion-col2'>
                                    <div className="ion-text-nowrap">
                                        {group.name}
                                    </div>
                                </IonCol>
                                <IonCol className='ion-col4'>
                                    <div className="ion-text-nowrap" style={{ display: 'flex', alignItems: 'center' }}>
                                        <IonCheckbox
                                            style={{ height: '20px' }}
                                            checked={selectedGroups.some(obj => obj.group_id === group.id)}
                                            onIonChange={e => handleGroupChange(e.detail.checked, group.id)}
                                        />

                                        <IonLabel style={{ marginLeft: '10px' }}>Select</IonLabel>
                                    </div>
                                </IonCol>
                            </div>
                        ))}
                    </IonRow>
                </IonGrid>
            </div>
            <IonButton color={'dark'} onClick={handleCloseGroupModal}>Close the Group assignment</IonButton>
            <IonToast isOpen={showToastErrorLoding} onDidDismiss={() => setShowToastErrorLoding(false)} message="Error loding data" duration={3000} color="danger" />
        </IonModal>
    );
}

export default GroupModal;
