import React, { useCallback } from 'react';
import {
    NativeSyntheticEvent,
    Pressable,
    TextInputChangeEventData,
} from 'react-native';
import { 
    Box, 
    HStack, 
    useTheme, 
    themeTools, 
    useColorModeValue, 
    Icon, 
    Input
} from 'native-base';
import AnimatedCheckbox from './animated_checkbox';
import AnimatedTaskLabel from './animated_task_label';
import SwipeView from './swipe_to_remove';
import { Feather } from '@expo/vector-icons';
import { PanGestureHandlerProps } from 'react-native-gesture-handler';


interface Props extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'>{
    isDone: boolean,
    onToggleCheckbox?: () => void
    onPressLabel?: () => void,
    onRemoveLabel?: () => void,
    subject: string
    isEditing: boolean,
    onChangeSubject?: (subject:string) => void,
    onFinishEdit?: () => void
}

const TaskItem = (props: Props) => {
    const { 
        isDone, 
        onToggleCheckbox, 
        onPressLabel, 
        onRemoveLabel, 
        subject, 
        simultaneousHandlers,
        isEditing,
        onChangeSubject,
        onFinishEdit
    } = props;
    const theme = useTheme();
    const highlightColor = themeTools.getColor(
        theme,
        useColorModeValue('blue.500', 'blue.400')
    );
    const boxStroke = themeTools.getColor(
        theme,
        useColorModeValue('muted.300', 'muted.500')
    );
    const checkmarkColor = themeTools.getColor(
        theme,
        useColorModeValue('white', 'white')
    );
    const activeTextColor = themeTools.getColor(
        theme,
        useColorModeValue('darkText', 'lightText')
    );
    const doneTextColor = themeTools.getColor(
        theme,
        useColorModeValue('muted.400', 'muted.600')
    );

    // make task item editable
    const handleChangeSubject = useCallback((e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        onChangeSubject && onChangeSubject(e.nativeEvent.text)
    }, [onChangeSubject])

    return (
        <SwipeView
            simultaneousHandlers={simultaneousHandlers}
            onSwipeLeft={onRemoveLabel}
            backView={
                <Box
                    w="full"
                    h="full"
                    bg="red.500"
                    alignItems="flex-end"
                    justifyContent="center"
                    pr={4} 
                >
                    <Icon
                        color="white"
                        as={
                            <Feather name="trash-2" />
                        } 
                        size="sm"
                    />
                </Box>
            }
        >
            <HStack
            alignItems="center"
            w="full"
            px={4}
            py={2}
            bg={useColorModeValue('warmGray.50', 'primary.900')}
        >
            <Box
                width={30}
                height={30}
                mr={2}
            >
                <Pressable onPress={onToggleCheckbox}>
                    <AnimatedCheckbox
                        highlightColor={highlightColor}
                        checkmarkColor={checkmarkColor}
                        boxOutlineColor={boxStroke}
                        checked={isDone}
                    />
                </Pressable>
            </Box>
            {isEditing ? (
                <Input
                    placeholder="Task"
                    value={subject}
                    variant="unstyled"
                    fontSize={19}
                    px={1}
                    py={0}
                    autoFocus
                    blurOnSubmit
                    onChange={handleChangeSubject}
                    onBlur={onFinishEdit}
                />
            ) : (
                <AnimatedTaskLabel
                strikethrough={isDone}
                textColor={activeTextColor}
                inactiveTextColor={doneTextColor}
                onPress={onPressLabel }
            >
                {subject}
            </AnimatedTaskLabel>
            )}
        </HStack>
        </SwipeView>
    )
}

export default TaskItem