/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Section, TouchableX} from '../../Components';
import {Image, View} from 'react-native';
import {Text} from 'react-native';
import metrics from '../../Themes/Metrics';
import useAuth from '../../Services/Auth';

const Drawer = props => {
  return (
    <DrawerContentScrollView {...props}>
      <Section style={{paddingTop: 100, backgroundColor: 'white'}}>
        <Text style={{fontSize: 20}}>News Star</Text>
      </Section>
      {/* <Image
        style={{width: metrics.drawerWidth, height: 200}}
        source={require('../../../hero/1.png')}
      /> */}

      <Content />
    </DrawerContentScrollView>
  );
};

const Content = () => {
  const gotoBookmark = () => {
    console.log('book mark');
  }

  return (
    <>
      <Item name="Business" />
      <Item name="Sports" />
      <Item name="Financial" />
      <View style={{height: 20}} />
      <Item name="Bookmarks" color={'blue'} onPress={gotoBookmark} />
    </>
  );
};

const Item = ({name, color = 'black', onPress = () => {}}) => {
  return (
    <TouchableX border onPress={onPress}>
      <View style={{padding: 16}}>
        <Text style={{color}}>{name}</Text>
      </View>
    </TouchableX>
  );
};

export default Drawer;
