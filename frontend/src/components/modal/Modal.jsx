import styles from './styles/Modal.module.scss';

const Modal = (props) => (
    <div className={styles.modal}>
        <div className={styles.modalBackground}>
        </div>
        <div className={styles.modalBody}>
            {props.children}
        </div>
    </div>
)

export default Modal;