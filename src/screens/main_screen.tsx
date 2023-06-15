// add dark theme support 
import React, { useCallback, useState } from 'react';
import { Pressable } from 'react-native';
import {
    Text, Box, Center, VStack,
    themeTools, useTheme, useColorMode, useColorModeValue, Fab, Icon,
} from 'native-base';
import ThemeToggle from '../components/theme_toggler';
import AnimatedCheckbox from '../components/animated_checkbox';
import TaskItem from '../components/task_item';
import { AntDesign } from '@expo/vector-icons';
import shortid from 'shortid';
import TaskList from '../components/task_list';
import AnimatedColorBox from '../components/animated_color_box';
import MastHead from '../components/masthead';
import NavBar from '../components/navBar';

// TODO make it a dynamic list that can connect to database
const initialData = [
    {
        id: shortid.generate(),
        subject: '周五牛new',
        done: false
    },
    {
        id: shortid.generate(),
        subject: '周六睡觉',
        done: false
    }
];

export default function MainScreen() {
    const [checked, setChecked] = useState(false);
    const handlePressCheckbox = useCallback(() => {
        setChecked(prev => !prev)
    }, []);

    // swipe to remove subject
    const [subject, setSubject] = useState('Task Item');
    const [isEditing, setEditing] = useState(false);

    // task list
    const [data, setData] = useState(initialData);
    const [editingItemId, setEditingItemId] = useState<string | null>(null);

    const handleToggleTaskItem = useCallback(item => {
        setData(prevData => {
            const newData = [...prevData];
            const index = prevData.indexOf(item);
            newData[index] = {
                ...item,
                done: !item.done
            }
            return newData;
        })
    }, []);

    const handleChangeTaskItemSubject = useCallback((item, newSubject) => {
        setData(prevData => {
            const newData = [...prevData];
            const index = prevData.indexOf(item);
            newData[index] = {
                ...item,
                subject: newSubject
            }
            return newData;
        })
    }, []);

    const handleFinishEditingTaskItem = useCallback(_item => {
        setEditingItemId(null);
    }, []);

    const handlePressTaskItemLabel = useCallback(item => {
        setEditingItemId(item.id);
    }, []);

    const handleRemoveItem = useCallback(item => {
        setData(prevData => {
            const newData = prevData.filter(i => i !== item);
            return newData;
        })
    }, []);

    return (
        // <Center
        <AnimatedColorBox
            // _dark={{ bg: 'blueGray.900' }}
            // _light={{ bg: 'blueGray.50' }}
            // px={4}
            flex={1}
            bg={useColorModeValue('warmGray.50', 'primary.900')}
            w="full"
        >
            <MastHead
                title="What's Up !"
                image={require('../assets/devaslife_masthead.png')}
            >
                <NavBar />
            </MastHead>
            <VStack
                space={1}
                mt="-20px"
                borderTopLeftRadius="20px"
                borderTopRightRadius="20px"
                pt="20px"
                bg={useColorModeValue('warmGray.50', 'primary.900')}
                flex={1}
            // alignItems="center"
            // w="full"
            >
                <TaskList
                    data={data}
                    onToggleItem={handleToggleTaskItem}
                    onChangeSubject={handleChangeTaskItemSubject}
                    onFinishEditing={handleFinishEditingTaskItem}
                    onPressLabel={handlePressTaskItemLabel}
                    onRemoveItem={handleRemoveItem}
                    editingItemId={editingItemId}
                />
                {/* <TaskItem
                    isDone={checked}
                    onToggleCheckbox={handlePressCheckbox}
                    subject={subject} 
                    onChangeSubject={setSubject}
                    isEditing={isEditing}
                    onFinishEdit={() => setEditing(false)}
                    onPressLabel={() => setEditing(true)}
                /> */}
                {/* 
                <Box p={10} bg={useColorModeValue('red.500', 'yellow.500')}>
                    <Text> Hello </Text>
                </Box> */}
                {/* <ThemeToggle /> */}
            </VStack>
            {/* creatte new task item */}
            <Fab
                position="absolute"
                renderInPortal={false}
                size="sm"
                icon={
                    <Icon
                        color="white"
                        as={
                            <AntDesign name="plus" />
                        }
                        size="sm"
                    />
                }
                colorScheme={useColorModeValue('blue', 'darkBlue')}
                bg={useColorModeValue('blue.500', 'blue.400')}
                onPress={() => {
                    const id = shortid.generate();
                    setData([
                        {
                            id,
                            subject: '',
                            done: false
                        },
                        ...data
                    ])
                    setEditingItemId(id)
                }}
            />
        </AnimatedColorBox>
    )
}