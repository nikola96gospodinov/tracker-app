import { Flex, Text } from '@chakra-ui/react'
import { FunctionComponent, useState } from 'react'
import { motion } from 'framer-motion'

import BatteryIcon from '../../components/Icons/Battery'
import EditIcon from '../../components/Icons/EditIcon'
import SaveIcon from '../../components/Icons/SaveIcon'
import { Input } from '../../components/Form/Input'

export const SetProgress: FunctionComponent<{
    progress?: number | null
    target: number
    onProgressChange?: (progress: number, target: number) => void
    onClick?: () => void
    progressText?: string
}> = ({ progress, target, onClick, progressText: text, onProgressChange }) => {
    const [isEdited, setIsEdited] = useState(false)
    const [progressInput, setProgressInput] = useState(progress ?? 0)
    const [targetInput, setTargetInput] = useState(target)

    const progressText = text ?? `${progress ?? 0} / ${target}`

    const onEditIconClick = () => {
        if (onClick) onClick()
        else setIsEdited(true)
    }

    const onSaveClick = () => {
        if (
            onProgressChange &&
            (targetInput !== target || progressInput !== progress)
        ) {
            onProgressChange(progressInput, targetInput)
        }
        setIsEdited(false)
    }

    return (
        <Flex gap={2} alignItems={isEdited ? 'center' : 'flex-end'}>
            <BatteryIcon
                current={progress ?? 0}
                total={target}
                boxSize={5}
                ml={-0.5}
            />
            <motion.div layout animate={{ width: 'auto' }}>
                {isEdited ? (
                    <Flex align='center' gap={2}>
                        <Input
                            value={progressInput}
                            type='number'
                            onChange={(e) => {
                                setProgressInput(e.target.valueAsNumber)
                            }}
                            placeholder='Progress'
                            isSmall
                            maxWidth={20}
                        />
                        <Text>/</Text>
                        <Input
                            value={targetInput}
                            type='number'
                            onChange={(e) => {
                                setTargetInput(e.target.valueAsNumber)
                            }}
                            placeholder='Target'
                            isSmall
                            maxWidth={20}
                        />
                    </Flex>
                ) : (
                    <Text transform='translateY(3px)'>{progressText}</Text>
                )}
            </motion.div>
            {isEdited ? (
                <SaveIcon onClick={onSaveClick} cursor='pointer' />
            ) : (
                <EditIcon onClick={onEditIconClick} cursor='pointer' />
            )}
        </Flex>
    )
}
