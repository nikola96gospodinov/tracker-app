import styles from '../goals.module.scss'

interface Props {
    setAddGoalsFormOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const EmptyGoalsList = ({ setAddGoalsFormOpen }: Props): JSX.Element => {
    return (
        <div className={styles.noGoals}>
            <p>No goals yet. Let&apos;s add some!</p>
            <button
                className='button button-primary'
                onClick={() => setAddGoalsFormOpen(true)}
            >Add goals</button>
        </div>
    )
}

export default EmptyGoalsList