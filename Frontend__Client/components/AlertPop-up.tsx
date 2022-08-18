import Alert from '@mui/material/Alert';
import styles from '../styles/PopUp_Alert.module.scss';

interface Props {
    status: string;
    popUp: string;
    onClick: () => void;
}

export const PopUp: React.FC<Props> = ({ status, onClick, popUp }) => {
    return (
        <>
            {
                popUp === "1" ? (
                    status === '1' ?
                        (
                            <Alert className={styles.success} color="success" variant="filled" onClick={onClick}>Your action has been done successfully</Alert>
                        ) :
                        (
                            <Alert className={styles.failed} severity="error" onClick={onClick}>There is an error! Please try again.</Alert>
                        )) : ""
            }
        </>
    );
}
