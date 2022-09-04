import Link from "next/link"

import styles from './logo.module.scss'

const Logo = (): JSX.Element => {
    return (
        <Link href="/">
            <a className={styles.logo}>
                <span>Solve</span>
                <span>LIFE</span>
                <div className={styles.cirlce}/>
            </a>
        </Link>
    )
}

export default Logo