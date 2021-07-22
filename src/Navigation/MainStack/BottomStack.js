/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import Routes from '../Routes/index';
import Business from '../../Screens/Business';
import Detail from '../../Screens/Detail';
import App from '../../Screens/App';
import Sports from '../../Screens/Sports';
import Financial from '../../Screens/Financial';
import {IconX, ICON_TYPE} from '../../Icons';
import {createStackNavigator} from '@react-navigation/stack';
import useAppTheme from '../../Themes/Context';
import useTranslation from '../../i18n';
import NavigationStyles from '../../Styles/NavigationStyles';

const BusinessStackScreen = () => {
  const {t} = useTranslation();
  const {theme} = useAppTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: "Business",
          headerStyle: [
            NavigationStyles.header_statusBar,
            {backgroundColor: theme.colors.header},
          ],
          headerTitleStyle: [
            NavigationStyles.headerTitle,
            {color: theme.colors.headerTitle},
          ],
        }}
        name="businessstackscreen"
        component={Business}
      />
      <Stack.Screen
        options={{
          title: "Detail",
          headerStyle: [
            NavigationStyles.header_statusBar,
            {backgroundColor: theme.colors.header},
          ],
          headerTitleStyle: [
            NavigationStyles.headerTitle,
            {color: theme.colors.headerTitle},
          ],
        }}
        name="businessdetail"
        component={Detail}
      />
    </Stack.Navigator>
  );
};

const SportsStackScreen = () => {
  const {t} = useTranslation();
  const {theme} = useAppTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: "Sports",
          headerStyle: [
            NavigationStyles.header_statusBar,
            {backgroundColor: theme.colors.header},
          ],
          headerTitleStyle: [
            NavigationStyles.headerTitle,
            {color: theme.colors.headerTitle},
          ],
        }}
        name="profilestackscreen"
        component={Sports}
      />
      <Stack.Screen
        options={{
          title: "Detail",
          headerStyle: [
            NavigationStyles.header_statusBar,
            {backgroundColor: theme.colors.header},
          ],
          headerTitleStyle: [
            NavigationStyles.headerTitle,
            {color: theme.colors.headerTitle},
          ],
        }}
        name="sportsdetail"
        component={Detail}
      />
    </Stack.Navigator>
  );
};

const BookmarksStackScreen = () => {
  const {t} = useTranslation();
  const {theme} = useAppTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={(route, navigation) => {
          return {
            title: "Bookmarks",
            headerStyle: [
              NavigationStyles.header_statusBar,
              {backgroundColor: theme.colors.header},
            ],
            headerTitleStyle: [
              NavigationStyles.headerTitle,
              {color: theme.colors.headerTitle},
            ],
          };
        }}
        name="notificationsstackscreen"
        component={App}
      />
      <Stack.Screen
        options={{
          title: "Detail",
          headerStyle: [
            NavigationStyles.header_statusBar,
            {backgroundColor: theme.colors.header},
          ],
          headerTitleStyle: [
            NavigationStyles.headerTitle,
            {color: theme.colors.headerTitle},
          ],
        }}
        name="bookmarksdetail"
        component={Detail}
      />
    </Stack.Navigator>
  );
};

const FinanceStackScreen = () => {
  const {t} = useTranslation();
  const {theme} = useAppTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={(route, navigation) => {
          return {
            title: 'Financial',
            headerStyle: [
              NavigationStyles.header_statusBar,
              {backgroundColor: theme.colors.header},
            ],
            headerTitleStyle: [
              NavigationStyles.headerTitle,
              {color: theme.colors.headerTitle},
            ],
          };
        }}
        name="financestackscreen"
        component={Financial}
      />
      <Stack.Screen
        options={{
          title: "Detail",
          headerStyle: [
            NavigationStyles.header_statusBar,
            {backgroundColor: theme.colors.header},
          ],
          headerTitleStyle: [
            NavigationStyles.headerTitle,
            {color: theme.colors.headerTitle},
          ],
        }}
        name="financialdetail"
        component={Detail}
      />
    </Stack.Navigator>
  );
};

function getHomeIcon({focused, color}) {
  return (
    <IconX
      style={{marginBottom: 5}}
      origin={ICON_TYPE.ICONICONS}
      name={'business'}
      color={color}
    />
  );
}

function getSportsIcon({focused, color}) {
  return (
    <IconX
      style={{marginBottom: 5}}
      origin={ICON_TYPE.ENTYPO}
      name={'sports-club'}
      color={color}
    />
  );
}

function getBookmarkIcon({focused, color}) {
  return (
    <IconX
      style={{marginBottom: 5}}
      origin={ICON_TYPE.ICONICONS}
      name={'bookmark-outline'}
      color={color}
    />
  );
}

function getFinanceIcon({focused, color}) {
  return (
    <IconX
      style={{marginBottom: 5}}
      origin={ICON_TYPE.MATERIAL_COMMUNITY}
      name={'finance'}
      color={color}
    />
  );
}



const Tab = createMaterialBottomTabNavigator();

const BottomTabs = () => {
  const {theme} = useAppTheme();
  return (
    <Tab.Navigator
      initialRouteName={Routes.HOME_SCREEN}
      backBehavior={'initialRoute'}
      inactiveColor="rgba(255,255,255,0.4)"
      activeColor={theme.colors.surface}
      shifting={true}
      barStyle={{backgroundColor: theme.colors.primary}}
      labeled={false}>
      <Tab.Screen
        options={{
          tabBarIcon: getHomeIcon,
          title: 'Business',
        }}
        name={Routes.HOME_SCREEN}
        component={BusinessStackScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: getSportsIcon,
          title: 'Sports',
        }}
        name={Routes.PROFILE_SCREEN}
        component={SportsStackScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: getFinanceIcon,
          title: 'Sports',
        }}
        name={"Finance"}
        component={FinanceStackScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: getBookmarkIcon,
          title: 'Home',
        }}
        name={Routes.NOTIFICATION_SCREEN}
        component={BookmarksStackScreen}
      />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={'bottomtabs'} component={BottomTabs} />
    </Stack.Navigator>
  );
};
