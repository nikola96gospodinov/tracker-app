import {
    MdBatteryFull,
    MdBattery20,
    MdBattery30,
    MdBattery50,
    MdBattery60,
    MdBattery80,
    MdBattery90
} from 'react-icons/md'
import { Icon } from '@chakra-ui/react'

import { calculateProgressPercentage } from '../../helpers/calculate-functions'
import { IconProps } from './types.icons'

const EMPTY = 'empty'
const TWENTY = 'twenty'
const THRITY = 'thrity'
const FIFTY = 'fifty'
const SIXTY = 'sixty'
const EIGHTY = 'eighty'
const NINETY = 'ninety'
const FULL = 'full'

const BatteryIcons = {
    [EMPTY]: {
        Icon: MdBatteryFull,
        color: 'red.100'
    },
    [TWENTY]: {
        Icon: MdBattery20,
        color: 'red.500'
    },
    [THRITY]: {
        Icon: MdBattery30,
        color: 'orange.400'
    },
    [FIFTY]: {
        Icon: MdBattery50,
        color: 'yellow.500'
    },
    [SIXTY]: {
        Icon: MdBattery60,
        color: 'yellow.500'
    },
    [EIGHTY]: {
        Icon: MdBattery80,
        color: 'green.500'
    },
    [NINETY]: {
        Icon: MdBattery90,
        color: 'green.600'
    },
    [FULL]: {
        Icon: MdBatteryFull,
        color: 'green.600'
    }
}

const getIconType = (percentageComplete: number): keyof typeof BatteryIcons => {
    if (percentageComplete === 0) return EMPTY
    if (percentageComplete <= 20) return TWENTY
    if (percentageComplete <= 30) return THRITY
    if (percentageComplete <= 50) return FIFTY
    if (percentageComplete <= 60) return SIXTY
    if (percentageComplete <= 80) return EIGHTY
    if (percentageComplete <= 99) return NINETY

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
