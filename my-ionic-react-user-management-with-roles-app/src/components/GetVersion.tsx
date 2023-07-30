import { IonNote } from "@ionic/react";
import packageJson from '../../package.json';

const appVersion = packageJson.version;


const GetVersion: React.FC = () => {
    return (
        <IonNote>Version {appVersion}</IonNote>
    );
};

export default GetVersion;