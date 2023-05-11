import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import theme from '../theme/theme'
import { UserProvider } from '../context/userContext'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <UserProvider>
            <ChakraProvider theme={theme}>
                <Component {...pageProps} />
            </ChakraProvider>
        </UserProvider>
    )
}

export default MyApp
