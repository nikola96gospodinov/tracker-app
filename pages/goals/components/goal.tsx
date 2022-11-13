import Link from 'next/link'
import Image from 'next/image'
import { Goal } from '../interfaces'
import { goalsIcons } from '../contants'

import styles from './goal.module.scss'

export const GoalBox = ({ goal }: { goal: Goal }) => {
    const icon = goalsIcons[goal.category as keyof typeof goalsIcons]

    return (
        <Link href={`/goals/${goal.urlPath}`}>
            <a>
                <div className={styles.goalGrid}>
                    <div className={styles.imgHolder}>
                        <Image
                            src={icon.src}
                            alt={icon.alt}
                        />
                    </div>
                    <div>
                        <h3>{goal.name}</h3>
                        <p>{goal.description}</p>
                        <Link href={`/goals/${goal.urlPath}`}>
                            <a className={styles.configGoalBtn}>Configure goal</a>
                        </Link>
                    </div>
                </div>
            </a>
        </Link>
    )
}