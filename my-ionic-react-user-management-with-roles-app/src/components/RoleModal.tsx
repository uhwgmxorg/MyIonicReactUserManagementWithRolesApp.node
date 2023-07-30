import React, { useState, useEffect } from "react";
import { IonToast, IonModal, IonGrid, IonRow, IonCol, IonCheckbox, IonLabel, IonButton } from '@ionic/react';
import { FcBusinesswoman } from 'react-icons/fc';

import axios from 'axios';

import config from '../config.json';

interface role {
    id: number;
    name: string;
}

interface user_group_role_mappings {
    group_id: number;
    role_id: number;
}

interface RoleModalProps {
    showModalRole: boolean;
    handleCloseRoleModal: () => void;
    group_id: number;
}

const RoleModal: React.FC<RoleModalProps> = ({ showModalRole, handleCloseRoleModal, group_id }) => {

    const [result, setResult] = useState("");
    const [roles, setRoles] = useState<role[]>([]);

    const [selectedRoles, setSelectedRoles] = useState<user_group_role_mappings[]>([]);

    const [showToastErrorLoding, setShowToastErrorLoding] = useState(false);

    useEffect(() => {
        console.log("group_id: " + group_id);
        axios.get(`${config["rest-api-role"]}?group_id=${group_id}`)
            .then((response) => {
                const roleIds = response.data.map((role: role) => role.id);
                setSelectedRoles(roleIds);
                console.log("roleIds: " + roleIds + " for group " + group_id);
            })
            .catch((error) => {
                setShowToastErrorLoding(true);
            });
    }, [group_id]);

    useEffect(() => {
        console.log("selectedRoles:");
        console.log(JSON.stringify(selectedRoles))
    }, [selectedRoles]);

    useEffect(() => {
        if (showModalRole) {
            console.log('RoleModal opened');
            console.log("roles: " + roles);
            reloadAllRoles();
        }
    }, [group_id]);

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

    useEffect(() => {
        reloadUserGroupRoleMappings(group_id);
    }, [group_id]);

    function reloadUserGroupRoleMappings(group_id: number) {
        axios.get(`${config["user_group_role_mappings"]}?group_id=${group_id}`)
            .then((response) => {
                setSelectedRoles(response.data);
                console.log(roles);
            })
            .catch((error) => {
                console.error(error);
                setShowToastErrorLoding(true);
            });
    }

    function handleRoleChange(checked: boolean, roleId: number) {
        if (checked) {
            setSelectedRoles([...selectedRoles, { group_id: group_id, role_id: roleId }]);
            // Code to add the group_id and role_id to the user_group_role_mappings table
            axios.post(config["user_group_role_mappings"], { group_id, role_id: roleId })
                .catch((error) => {
                    console.error(error);
                    // handle error user_group_role_mappings
                });
        } else {
            setSelectedRoles(selectedRoles.filter(mapping => mapping.role_id !== roleId));
            // Code to remove the group_id and role_id from the user_group_role_mappings table
            axios.delete(`${config["user_group_role_mappings"]}/${group_id}?role_id=${roleId}`)
                .catch((error) => {
                    console.error(error);
                    // handle error
                });
        }
    }


    return (
        <IonModal isOpen={showModalRole} onDidDismiss={handleCloseRoleModal}>
            <div style={{ textAlign: 'center' }}>
                Role assignment for Group {group_id}
            </div>
            <div style={{ textAlign: 'center' }}>
                <FcBusinesswoman style={{ paddingTop: '30px', paddingBottom: '30px' }} size={200} />
            </div>

            <div style={{ textAlign: 'center' }}>
                <IonGrid style={{ textAlign: 'center' }} fixed>
                    <IonRow className='ion-row'>
                        {roles.map(role => (
                            <div key={role.id}>
                                <IonCol className='ion-col1'>
                                    <div className="ion-text-nowrap">
                                        {role.id}
                                    </div>
                                </IonCol>
                                <IonCol className='ion-col2'>
                                    <div className="ion-text-nowrap">
                                        {role.name}
                                    </div>
                                </IonCol>
                                <IonCol className='ion-col4'>
                                    <div className="ion-text-nowrap" style={{ display: 'flex', alignItems: 'center' }}>
                                        <IonCheckbox
                                            style={{ height: '20px' }}
                                            checked={selectedRoles.some(obj => obj.role_id === role.id)}
                                            onIonChange={e => handleRoleChange(e.detail.checked, role.id)}
                                        />

                                        <IonLabel style={{ marginLeft: '10px' }}>Select</IonLabel>
                                    </div>
                                </IonCol>
                            </div>
                        ))}
                    </IonRow>
                </IonGrid>
            </div>
            <IonButton color={'dark'} onClick={handleCloseRoleModal}>Close the Role assignment</IonButton>
            <IonToast isOpen={showToastErrorLoding} onDidDismiss={() => setShowToastErrorLoding(false)} message="Error loding data" duration={3000} color="danger" />
        </IonModal>
    );
}

export default RoleModal;