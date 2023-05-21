import { Td, Flex, Text } from '@chakra-ui/react'
import { FunctionComponent } from 'react'
import { inputStyles } from '../data'
import { Input } from '../../../../components/Form/Input'
import { Milestone } from '../../../../types/goals.types'
import { Dispatch } from '../../../../typings'
import { getProgressForUI } from '../helpers/utils'

export const ProgressCell: FunctionComponent<{
    milestone: Milestone
    isActiveMilestone: boolean
    progress: number | undefined
    setProgress: Dispatch<number | undefined>
    target: number | undefined
    setTarget: Dispatch<number | undefined>
}> = ({
    milestone,
    isActiveMilestone,
    progress,
    setProgress,
    target,
    setTarget
}) => {
    const text = getProgressForUI(milestone)
    return (
        <Td>
            {isActiveMilestone ? (
                <Flex gap={1} align='center'>
                    <Input
                        value={progress ?? milestone.progress}
                        type='number'
                        onChange={(e) => {
                            setProgress(e.target.valueAsNumber)
                        }}
                        {...inputStyles}
                        placeholder='Progress'
                    />
                    <Text>/</Text>
                    <Input
                        value={target ?? milestone.target}
                        type='number'
                        onChange={(e) => {
                            setTarget(e.target.valueAsNumber)
                        }}
                        {...inputStyles}
                        placeholder='Target'
                    />
                </Flex>
            ) : (
                <Text>{text}</Text>
            )}
        </Td>
    )
}
