import styles from './spinner.module.scss'

const Spinner = () => {
    return (
        <div 
            style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: '1.25rem'
            }}
        >
            <div className={styles.ldsRipple}><div></div><div></div></div>
            <p>Loading...</p>
        </div>
    )
}

export default Spinner