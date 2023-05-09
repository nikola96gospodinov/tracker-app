import { extendTheme } from '@chakra-ui/react'

import { Button } from './components/button'
import { Switch } from './components/switch'
import { Tooltip } from './components/tooltip'
import { breakpoints } from './breakpoints'
import { colors } from './colors'
import { fonts } from './fonts'
import { shadows } from './shadows'
import { global } from './global'

const overrides = {
    breakpoints,
    colors,
    fonts,
    shadows,
    styles: {
        global
    },
    components: {
        Button,
        Link: { ...Button }, // Use the same style as Button
        Switch,
        Tooltip
    }
}

export default extendTheme(overrides)
