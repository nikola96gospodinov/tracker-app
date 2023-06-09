import { extendTheme } from '@chakra-ui/react'

import { Button } from './components/button'
import { Checkbox } from './components/checkbox'
import { Heading } from './components/heading'
import { Switch } from './components/switch'
import { Radio } from './components/radio'
import { Tooltip } from './components/tooltip'
import { breakpoints } from './breakpoints'
import { colors } from './colors'
import { fonts } from './fonts'
import { shadows } from './shadows'
import { global } from './global'

import '@fontsource/source-sans-pro'
import '@fontsource/montserrat'

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
        Tooltip,
        Checkbox,
        Heading,
        Radio
    }
}

export default extendTheme(overrides)
