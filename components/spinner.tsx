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
            <h2>Loading...</h2>
        </div>
    )
}

export default Spinner