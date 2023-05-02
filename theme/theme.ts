import { extendTheme } from '@chakra-ui/react'

import { Button } from './components/button'
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
        Button
    }
}

export default extendTheme(overrides)
