import {
    FaBatteryFull,
    FaBatteryThreeQuarters,
    FaBatteryHalf,
    FaBatteryQuarter,
    FaBatteryEmpty
} from 'react-icons/fa'
import { Icon } from '@chakra-ui/react'

import { calculateProgressPercentage } from '../../helpers/calculate-functions'
import { IconProps } from './types.icons'

const EMPTY = 'empty'
const QUARTER = 'quarter'
const HALF = 'half'
const THREE_QUARTERS = 'three-quarters'
const FULL = 'full'

const BatteryIcons = {
    [EMPTY]: {
        Icon: FaBatteryEmpty,
        color: 'red.500'
    },
    [QUARTER]: {
        Icon: FaBatteryQuarter,
        color: 'red.500'
    },
    [HALF]: {
        Icon: FaBatteryHalf,
        color: 'yellow.600'
    },
    [THREE_QUARTERS]: {
        Icon: FaBatteryThreeQuarters,
        color: 'yellow.600'
    },
    [FULL]: {
        Icon: FaBatteryFull,
        color: 'green.500'
    }
}

const getIconType = (percentageComplete: number): keyof typeof BatteryIcons => {
    if (percentageComplete === 0) return EMPTY
    // Always adding 12.5% to the limit to make the icon more accurate
    if (percentageComplete < 37.5) return QUARTER
    if (percentageComplete < 62.5) return HALF
    if (percentageComplete < 100) return THREE_QUARTERS

    return FULL
}

const BatteryIcon: React.FunctionComponent<
    IconProps & { current?: number; total?: number }
> = ({ onClick, current, total, ...iconProps }) => {
    // if no values are provided it's always going to be full
    const percentageComplete = calculateProgressPercentage(
        current ?? 100,
        total ?? 100
    )

    const iconType = getIconType(percentageComplete)
    const BatteryIcon = BatteryIcons[iconType].Icon
    const iconColor = BatteryIcons[iconType].color

    return (
        <Icon
            as={BatteryIcon}
            color={iconColor}
            onClick={onClick}
            {...iconProps}
        />
    )
}

export default BatteryIcon
