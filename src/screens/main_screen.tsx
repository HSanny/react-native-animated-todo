// add dark theme support 
import React, { useCallback, useState } from 'react';
import { Pressable } from 'react-native';
import {
    Text, Box, Center, VStack,
    themeTools, useTheme, useColorMode, useColorModeValue,
} from 'native-base';
import ThemeToggle from '../components/theme_toggler';
import AnimatedCheckbox from '../components/animated_checkbox';
import TaskItem from '../components/task_item';

export default function MainScreen() {
    const [checked, setChecked] = useState(false);
    const handlePressCheckbox = useCallback(() => {
        setChecked(prev => !prev)
    }, []);
    return (
        <Center
            _dark={{ bg: 'blueGray.900' }}
            _light={{ bg: 'blueGray.50' }}
            px={4}
            flex={1}
        >
            <VStack
                space={5}
                alignItems="center"
                w = "full"
            >
                <TaskItem isDone={checked} onToggleCheckbox={handlePressCheckbox} />

                <Box p={10} bg={useColorModeValue('red.500', 'yellow.500')}>
                    <Text> Hello </Text>
                </Box>
                <ThemeToggle />
            </VStack>
        </Center>
    )
}