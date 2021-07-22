/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text } from 'react-native';
import NavigationService from '../../Navigation/index';
import Routes from '../../Navigation/Routes/index';
import {
  Container,
  ButtonX,
} from '../../Components';
import useAppTheme from '../../Themes/Context';
import {useStoreState, useStoreActions} from 'easy-peasy';
import moment from 'moment';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function() {
  const {theme} = useAppTheme();

  const loading = false;

  const [rTime, setRTime] = React.useState("");
  const [rDate, setRDate] = React.useState("");

  const initial = useStoreActions(actions => actions.bookmark.initial);
  const {bookmarks} = useStoreState(state => ({
    bookmarks: state.bookmark.bookmarks
  }));

  const started = () => {
    NavigationService.navigate(Routes.MAIN_APP);
  }

  const updateTime = () => {
    console.log(new Date());
    var tObj = new Date();
    setRTime(tObj.getHours() + ":" + tObj.getMinutes() + ":" + tObj.getSeconds());
    
    var startDate = moment(tObj, 'YYYY-MM-DD hh:mm:ss GMT+0000');
    setRDate(startDate.format("MMMM Do YYYY"))
  }

  React.useEffect(()=>{
    setInterval(() => {
      updateTime()
    }, 1000);
    initial()
    console.log(bookmarks)
  }, [])

  return (
    <Container
      style={{
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: theme.colors.primary,
          fontSize: wp('15%'),
          paddingLeft: 10,
          marginTop: hp("25%"),
        }}>
        Welcome
      </Text>
      <Text
        style={{
          color: theme.colors.primary,
          fontSize: wp('10%'),
          paddingLeft: 10,
          marginTop: hp("10%"),
        }}>
        {rTime}
      </Text>
      <Text
        style={{
          color: theme.colors.primary,
          fontSize: wp('6%'),
          paddingLeft: 10,
          marginBottom: wp('10%'),
        }}>
        {rDate}
      </Text>
      <ButtonX
        loading={loading}
        dark={true}
        color={loading ? theme.colors.accent : theme.colors.primary}
        onPress={started}
        label={"Get Started"}
      />
    </Container>
  );
}
