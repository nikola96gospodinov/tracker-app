import { Checkbox, MenuItem, Text } from '@chakra-ui/react'
import { ActivePeriod, periods } from '../data'
import { Dispatch } from '../../../typings'

export const UpcommingMenuItems: React.FunctionComponent<{
    activePeriod: ActivePeriod
    setActivePeriod: Dispatch<ActivePeriod>
    includeWithNoDeadline: boolean
    setIncludeWithNoDeadline: Dispatch<boolean>
}> = ({
    activePeriod,
    setActivePeriod,
    includeWithNoDeadline,
    setIncludeWithNoDeadline
}) => {
    return (
        <>
            {periods.map(({ label }) => {
                const isActive = label === activePeriod

                return (
                    <MenuItem
                        key={label}
                        onClick={() => setActivePeriod(label)}
                        bg={isActive ? 'purple.400' : 'white'}
                        color={isActive ? 'white' : 'neutral.900'}
                        _hover={{
                            bg: isActive ? 'purple.400' : 'neutral.100'
                        }}
                    >
                        {label}
                    </MenuItem>
                )
            })}
            <MenuItem
                closeOnSelect={false}
                _hover={{
                    bg: 'white'
                }}
                mt={4}
                pt={2}
                bg='neutral.50'
                boxShadow='inset'
            >
                <Checkbox
                    defaultChecked={includeWithNoDeadline}
                    onChange={(e) => setIncludeWithNoDeadline(e.target.checked)}
                    size='sm'
                >
                    <Text fontSize='sm'>Show items with no deadlines</Text>
                </Checkbox>
            </MenuItem>
        </>
    )
}
