import styles from './styles/BoxWrapper.module.scss';

const BoxWrapper = (props) => {
    return(
        <div className={styles.boxWrapper}>
            {props.children}
        </div>
    )
}

export default BoxWrapper;