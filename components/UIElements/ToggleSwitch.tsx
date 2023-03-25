import { HTMLInputWithoutTypeAndName } from '../../typings'
import styles from './toggleSwitch.module.scss'

const ToggleSwitch: React.FunctionComponent<
    {
        text?: string
    } & HTMLInputWithoutTypeAndName
> = ({ text, ...args }) => (
    <div className={styles.toggleWrapper}>
        <label className={styles.toggle}>
            <input type='checkbox' name='complete' {...args} />
            <span></span>
        </label>
        <label htmlFor='complete'>{text}</label>
    </div>
)

export default ToggleSwitch
