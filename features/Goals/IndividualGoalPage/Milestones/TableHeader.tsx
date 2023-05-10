import { Flex, Th, Thead, Tr } from '@chakra-ui/react'

import LoadingIcon from '../../../../components/Icons/LoadingIcon'

export const TableHeader = () => (
    <>
        <colgroup>
            <col style={{ width: '5%' }} />
            <col style={{ width: '40%' }} />
            <col style={{ width: '40%' }} />
            <col style={{ width: '15%' }} />
        </colgroup>
        <Thead bg='neutral.100' boxShadow='inset'>
            <Tr>
                <Th>
                    <Flex alignItems='center' justifyContent='center'>
                        <LoadingIcon />
                    </Flex>
                </Th>
                <Th>Name</Th>
                <Th>Deadline</Th>
                <Th></Th>
            </Tr>
        </Thead>
    </>
)
