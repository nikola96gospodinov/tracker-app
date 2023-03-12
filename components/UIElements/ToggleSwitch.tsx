import styles from './toggleSwitch.module.scss'

const ToggleSwitch: React.FunctionComponent<{
    onToggle: () => void
    checked: boolean
    text?: string
}> = ({ text, checked, onToggle }) => (
    <div className={styles.toggleWrapper}>
        <label className={styles.toggle}>
            <input type='checkbox' onChange={onToggle} checked={checked} />
            <span></span>
        </label>
        <span>{text}</span>
    </div>
)

export default ToggleSwitch
