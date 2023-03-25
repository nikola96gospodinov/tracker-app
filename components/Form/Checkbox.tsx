import { HTMLInputWithoutType } from '../../typings'

import style from './Checkbox.module.scss'

const Checkbox: React.FunctionComponent<
    HTMLInputWithoutType & {
        label?: string
    }
> = ({ label, name, ...args }) => {
    return (
        <div className={style.checkbox}>
            <input type='checkbox' id={name} {...args} />
            {label && <label htmlFor={name}>{label}</label>}
        </div>
    )
}

export default Checkbox
