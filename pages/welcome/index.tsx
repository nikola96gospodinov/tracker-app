import type { NextPage } from 'next'
import Link from 'next/link'

import Logo from '../../components/Logo'

import styles from './welcome.module.scss'

const Welcome: NextPage = () => {
    return (
        <>
            <header className={styles.header}>
                <div className='container'>
                    <div className={styles.headerInner}>
                        <Logo />
                        <Link href=''>
                            <a className='button button-secondary'>See Demo</a>
                        </Link>
                    </div>
                </div>
            </header>
            <div className='container'>
                <div className={styles.main}>
                    <div className='double-grid'>
                        <div>
                            <h1>Welcome</h1>
                            <h2>Some secondary headline</h2>
                            <div className={styles.btnHolder}>
                            <Link href='/register'>
                                <a className='button button-primary'>Register</a>
                            </Link>
                            <Link href='/login'>
                                <a className='button button-tertiary'>Login</a>
                            </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Welcome