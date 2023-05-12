import { Button, Text } from '@chakra-ui/react'
import { FunctionComponent } from 'react'
import { signOut } from 'firebase/auth'

import LogoutIcon from '../../Icons/LogoutIcon'
import { auth } from '../../../firebase/firebase'

export const ProfileActions: FunctionComponent = () => {
    return (
        <Button
            onClick={() => signOut(auth)}
            variant='link'
            display='flex'
            gap={1}
            alignItems='center'
            color='neutral.900'
            _hover={{ textDecoration: 'none', color: 'purple.600' }}
        >
            <LogoutIcon />
            <Text>Logout</Text>
        </Button>
    )
}
