import {
    createAppContainer, 
} from 'react-navigation';
import { createDrawerNavigator} from 'react-navigation-drawer';

import HomeNote from '../screens/HomeNote';
import AddNote from '../screens/AddNote';
import EditNote from '../screens/EditNote';
import DrawerMenu from '../components/DrawerMenu';
import Cat from '../screens/DrawerMenu';

const AppDrawerNavigator = createDrawerNavigator({
    Home: { screen: HomeNote },
    Add: { screen: AddNote },
    EditNote: { screen: EditNote} ,
    Cat : {  screen: Cat }
  }, {
    contentComponent: DrawerMenu,
    drawerWidth: 230
  });
  
  export default createAppContainer(AppDrawerNavigator);