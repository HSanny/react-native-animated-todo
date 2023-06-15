// create task list component
import React, { useCallback, useRef } from 'react';
import {
    AnimatePresence,
    View
} from 'moti';
import { PanGestureHandlerProps } from 'react-native-gesture-handler';
import TaskItem from './task_item';
import { makeStyledComponent } from '../utils/styled';
import { 
    
} from 'react-native-gesture-handler';
import { ScrollView } from 'native-base';

const StyledView = makeStyledComponent(View);
const StyledScrollView = makeStyledComponent(ScrollView);

interface TaskItemData {
    id: string,
    subject: string,
    done: boolean
};

interface TaskListProps { 
    data: Array<TaskItemData>,
    editingItemId: string | null,
    onToggleItem: (item: TaskItemData) => void,
    onChangeSubject: (item: TaskItemData, newSubject: string) => void,
    onFinishEditing: (item: TaskItemData) => void,
    onPressLabel: (item: TaskItemData) => void,
    onRemoveItem: (item: TaskItemData) => void,
};

interface TaskItemProps extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'>{
    data: TaskItemData,
    isEditing: boolean,
    onToggleItem: (item:TaskItemData) => void,
    onChangeSubject: (item: TaskItemData, newSubject: string) => void,
    onFinishEditing: (item: TaskItemData) => void,
    onPressLabel: (item: TaskItemData) => void,
    onRemoveItem: (item: TaskItemData) => void,
};

export const AnimatedTaskItem = (props: TaskItemProps) => {
    const {
        simultaneousHandlers,
        data,
        isEditing,
        onToggleItem,
        onChangeSubject,
        onFinishEditing,
        onPressLabel,
        onRemoveItem
    } = props;

    const handleToggleCheckbox = useCallback(() => {
        onToggleItem(data);
    }, [data, onToggleItem]);
    
    const handleChangeSubject = useCallback((subject: string) => {
        onChangeSubject(data, subject)
    }, [data, onChangeSubject]);

    const handleFinishEditing = useCallback(() => {
        onFinishEditing(data);
    }, [data, onPressLabel]);

    const handlePressLabel = useCallback(() => {
        onPressLabel(data);
    }, [data, onPressLabel]);

    const handleRemove = useCallback(() => {
        onRemoveItem(data);
    }, [data, onRemoveItem]);

    return (
        <StyledView
            w="full"
            from={{
                opacity: 0,
                scale: 0.5,
                marginBotton: -46
            }}
            animate={{
                opacity: 1,
                scale: 1,
                marginBotton: 0
            }}
            exit={{
                opacity: 0,
                scale: 0.5,
                marginBotton: -47
            }}
        >
            <TaskItem 
                simultaneousHandlers={simultaneousHandlers}
                subject={data.subject}
                isDone={data.done}
                isEditing={isEditing}
                onToggleCheckbox={handleToggleCheckbox}
                onChangeSubject={handleChangeSubject}
                onFinishEdit={handleFinishEditing}
                onPressLabel={handlePressLabel}
                onRemoveLabel={handleRemove}
            />
        </StyledView>
    )
}

export default function TaskList(props: TaskListProps) {
    const {
        data,
        editingItemId,
        onToggleItem,
        onChangeSubject,
        onFinishEditing,
        onPressLabel,
        onRemoveItem
    } = props;
    const refScrollView = useRef(null);

    return(
        <StyledScrollView
            ref={refScrollView}
            w="full"
        >
            {data.map(item => (
                <AnimatedTaskItem 
                    key={item.id}
                    data={item}
                    simultaneousHandlers={refScrollView}
                    isEditing={item.id === editingItemId}
                    onToggleItem={onToggleItem}
                    onChangeSubject={onChangeSubject}
                    onFinishEditing={onFinishEditing}
                    onPressLabel={onPressLabel}
                    onRemoveItem={onRemoveItem}
                />
            ))}
        </StyledScrollView>
    )
}