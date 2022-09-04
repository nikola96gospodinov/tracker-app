import Link from 'next/link'
import moment from 'moment'

import Logo from '../Logo'

import styles from './header.module.scss'

const now = moment()

// Address myself differently every time with a different affirmation :)
const randomName = () => {
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

const generateGreeting = () => {
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

const Header = (): JSX.Element => {
    return (
        <header className={styles.header}>
            <div className={styles.borderUp}></div>
            <div className="container">
                <div className={styles.navigation}>
                    <div className={styles.logo}>
                        <Logo />
                    </div>
                    <div>
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                        <Link href="/current-week">
                            <a>Current week</a>
                        </Link>
                        <Link href="/previous-weeks">
                            <a>Previous weeks</a>
                        </Link>
                        <Link href="/activities">
                            <a>Activities</a>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={styles.greetingOuter}>
                <div className="container">
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