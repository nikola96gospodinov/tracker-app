import Link from 'next/link'
import { useRouter } from 'next/router'
import moment from 'moment'

import Logo from '../Logo'

import styles from './header.module.scss'

const now = moment()

// Address myself differently every time with a different affirmation :)
const randomName = (): string => {
	const names = [
		'champ',
		'winner',
		'beast',
		'sexy',
		'handsome'
	]
	const name = names[Math.floor(Math.random() * names.length)]
	return name
}

const generateGreeting = (): string => {
	const hour = moment(now).format('HH')
	if (Number(hour) >= 7 && Number(hour) <= 11) {
		return 'Good morning'
	} else if (Number(hour) >= 12 && Number(hour) <= 17) {
		return 'Good afternoon'
	} else {
		return 'Good evening'
	}
}

const name = randomName()
const greeting = generateGreeting()

const menu = [
    { title: 'Dashboard', path: '/' },
    { title: 'Enter metrics', path: '/metrics' },
    { title: 'Roadmap', path: '/roadmap' },
    { title: 'Profile', path: '/profile' }
]

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
                                        className={router.pathname === item.path ? styles.navActive : ''}
                                    >{item.title}</a>
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            </div>
            <div className={styles.greetingOuter}>
                <div className='container'>
                    <div className={styles.greeting}>
                        <h1>{greeting}, <span>{name}!</span></h1>
                        <h2>Remember to trust the process</h2>
                    </div>
                </div>
                <img src="/images/bg-pattern-1.png"/>
                <img src="/images/bg-pattern-2.png"/>
            </div>
        </header>
    )
}

export default Header