// integrate react-navigation & drawer
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainScreen from './screens/main_screen';
import AboutScreen from './screens/about_screen';

const Drawer = createDrawerNavigator();

const App = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Main" component={MainScreen} />
            <Drawer.Screen name="About" component={AboutScreen} />
        </Drawer.Navigator>
    )
}

export default App;