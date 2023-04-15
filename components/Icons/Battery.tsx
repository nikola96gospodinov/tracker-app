import {
    FaBatteryFull,
    FaBatteryThreeQuarters,
    FaBatteryHalf,
    FaBatteryQuarter,
    FaBatteryEmpty
} from 'react-icons/fa'

import { calculateProgressPercentage } from '../../helpers/calculate-functions'
import { IconProps } from './types.icons'

import styles from './Battery.module.scss'

const EMPTY = 'empty'
const QUARTER = 'quarter'
const HALF = 'half'
const THREE_QUARTERS = 'three-quarters'
const FULL = 'full'

const BatteryIcons = {
    [EMPTY]: {
        Icon: FaBatteryEmpty,
        className: styles.low
    },
    [QUARTER]: {
        Icon: FaBatteryQuarter,
        className: styles.low
    },
    [HALF]: {
        Icon: FaBatteryHalf,
        className: styles.medium
    },
    [THREE_QUARTERS]: {
        Icon: FaBatteryThreeQuarters,
        className: styles.medium
    },
    [FULL]: {
        Icon: FaBatteryFull,
        className: styles.high
    }
}

const getIconType = (percentageComplete: number): keyof typeof BatteryIcons => {
    if (percentageComplete === 0) return EMPTY
    // Always adding 12.5% to the limit to make the icon more accurate
    if (percentageComplete < 37.5) return QUARTER
    if (percentageComplete < 62.5) return HALF
    if (percentageComplete < 87.5) return THREE_QUARTERS

    return FULL
}

const BatteryIcon: React.FunctionComponent<
    IconProps & { current?: number; total?: number }
> = ({ onClick, className, current, total }) => {
    // if no values are provided it's always going to be full
    const percentageComplete = calculateProgressPercentage(
        current ?? 100,
        total ?? 100
    )

    const iconType = getIconType(percentageComplete)
    const Icon = BatteryIcons[iconType].Icon
    const iconClassName = BatteryIcons[iconType].className

    return (
        <Icon className={`${iconClassName} ${className}`} onClick={onClick} />
    )
}

export default BatteryIcon
