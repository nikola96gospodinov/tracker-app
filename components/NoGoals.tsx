import Link from 'next/link'

import styles from './NoGoals.module.scss'

const NoGoals = (): JSX.Element => (
    <div className={styles.noGoals}>
        <img src='/images/no-goals.png' alt='no goals icon' />
        <p>It seems like you haven&apos;t set any goals yet</p>
        <Link href='/goals'>
            <a className='button button-primary'>Set goals</a>
        </Link>
    </div>
)

export default NoGoals
