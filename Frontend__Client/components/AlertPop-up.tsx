import Alert from '@mui/material/Alert';
import styles from '../styles/PopUp_Alert.module.scss';

interface Props {
    status: string;
    popUp: string;
    errorMessage?: string
    successMessage?: string
    onClick: () => void;
}

export const PopUp: React.FC<Props> = ({ status, onClick, popUp, errorMessage, successMessage }) => {
    return (
        <>
            {
                popUp === "1" ? (
                    status === '1' ?
                        (
                            successMessage ?
                            (
                                <Alert className={styles.success} color="success" variant="filled" onClick={onClick} sx={{position: 'absolute', zIndex: '10'}}>{successMessage}</Alert>
                            ) :
                            (
                                <Alert className={styles.success} color="success" variant="filled" onClick={onClick} sx={{position: 'absolute', zIndex: '10'}}>Your action has been done successfully</Alert>
                            ) 
                        ) :
                           (
                            errorMessage ? (
                                (
                                    <Alert className={styles.failed} severity="error" onClick={onClick} sx={{position: 'absolute', zIndex: '10'}}>{errorMessage}</Alert>
                                )
                            ) : (
                                (
                                    <Alert className={styles.failed} severity="error" onClick={onClick} sx={{position: 'absolute', zIndex: '10'}}>There is an error! Please try again.</Alert>
                                )
                            )
                           )
                        ) : ""
            }
        </>
    );
}
