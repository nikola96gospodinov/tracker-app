import { Td, Flex, Text, Progress } from '@chakra-ui/react'
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
    const progressPercentage = (() => {
        if (!milestone.progress && !milestone.target) return undefined
        if (!milestone.progress && milestone.target) return 0
        if (milestone.progress && milestone.target)
            return (milestone.progress / milestone.target) * 100

        return undefined
    })()

    const showProgress = progressPercentage && progressPercentage < 100

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
                <Text textAlign={showProgress ? 'center' : 'left'}>
                    {text}
                    {showProgress && (
                        <Progress
                            value={progressPercentage}
                            colorScheme='purple'
                            size='xs'
                            hasStripe
                            mt={1}
                            bg='purple.100'
                        />
                    )}
                </Text>
            )}
        </Td>
    )
}
