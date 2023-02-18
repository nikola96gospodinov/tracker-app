import Link from 'next/link'
import { useRouter } from 'next/router'

import Logo from '../../Logo'
import { menu } from './data'

import styles from './header.module.scss'

const Header = (): JSX.Element => {
    const router = useRouter()

    return (
        <header className={styles.header}>
            <div className={styles.borderUp}></div>
            <div className='container'>
                <div className={styles.navigation}>
                    <div className={styles.logo}>
                        <Logo />
                    </div>
                    <nav>
                        {menu.map((item, index) => {
                            return (
                                <Link key={index} href={item.path}>
                                    <a
                                        className={
                                            router.pathname === item.path
                                                ? styles.navActive
                                                : ''
                                        }
                                    >
                                        {item.title}
                                    </a>
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            </div>
            <div className={styles.bgImageHolder}>
                <img src='/images/bg-pattern-1.png' />
                <img src='/images/bg-pattern-2.png' />
            </div>
        </header>
    )
}

export default Header
