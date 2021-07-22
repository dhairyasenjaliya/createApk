/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import axios from 'axios';
import {View, ScrollView, TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import LoadingActionContainer from '../../Components/LoadingActionContainer';
import {Container, HeaderButton} from '../../Components';
import useAppTheme from '../../Themes/Context';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {IconX, ICON_TYPE} from '../../Icons';
import moment from 'moment';
import metrics from '../../Themes/Metrics';
import {useStoreState, useStoreActions} from 'easy-peasy';
import Fonts from '../../Themes/Fonts';
import {APIKEY} from '../../Constants';

const BusinessScreen = ({routes, navigation}) => {
  const {theme} = useAppTheme();
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const {bookmarks} = useStoreState(state => ({
    bookmarks: state.bookmark.bookmarks
  }));
  const addBookmark = useStoreActions(actions => actions.bookmark.addBookmark);
  const removeBookmark = useStoreActions(actions => actions.bookmark.removeBookmark);
  const calculateTime = (t) => {
    var startDate = moment(t, 'YYYY-MM-DD hh:mm:ss GMT+0000');
    return startDate.format("MMMM Do YYYY")
  }

  const gotoDetail = (detailData) => {
    console.log(routes, 'routes')
    navigation.navigate('bookmarksdetail', {
      detail: detailData
    })
  }
  
  const bookMarkCheck = (item) => { 
    var flag = false
    bookmarks.map((b, index)=>{
      if(b.source.id == item.source.id && b.title == item.title && b.author == item.author) {
        console.log(b.source.id, item.source.id)
        flag = true
      }
    })
    return flag
  }

  const toggleBookMark = (item) => {
    console.log(item)
    if(bookMarkCheck(item)){
      removeBookmark(item)
    } else {
      addBookmark(item)
    }
  }
  return (
    <LoadingActionContainer fixed>
      <Container
        style={{
          padding: 10,
        }}>
          {
            loading ? <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: wp('100%'),
                height: hp('80%')
                }}
              >
                <ActivityIndicator color={theme.colors.primary} size={wp('15%')}/>
                <Text
                  style={{
                    color: theme.colors.primary,
                    fontSize: wp('6%'),
                    paddingLeft: 10,
                    marginBottom: wp('10%'),
                  }}>
                    Loading...
                  </Text>
            </View> :  <ScrollView>
            {
              bookmarks.map((d, index)=>{
                return <Card
                  key={index}
                  style={{
                    marginBottom: hp('3%')
                  }}
                  mode="outlined"
                >
                  <Card.Cover source={{ uri: d.urlToImage }} />
                  <Card.Title title={d.title} subtitle={calculateTime(d.publishedAt)+", "+d.author} />
                  <Card.Content>
                    <Paragraph>{d.description}</Paragraph>
                    <View style={{
                      display: 'flex',
                      flexDirection: "row",
                      alignItems: 'center',
                      width: "100%",
                      justifyContent: 'flex-end'
                    }}>
                      <TouchableOpacity
                        onPress={()=>{gotoDetail(d)}}
                      >
                        <Text
                          style={{
                            color: theme.colors.primary,
                            marginRight: wp('5%'),
                            textDecorationLine: 'underline'
                          }}
                        >
                          Read More
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress = { () => { toggleBookMark(d)}}
                      >
                        <IconX
                          style={{marginBottom: 5}}
                          origin={ICON_TYPE.ICONICONS}
                          name={bookMarkCheck(d) ? 'bookmark' : 'bookmark-outline'}
                          color={theme.colors.primary}
                        />
                      </TouchableOpacity>
                    </View>
                  </Card.Content>
                </Card>    
              })  
            }
          </ScrollView>
      
          }
         
      </Container>
    </LoadingActionContainer>
  );
};

export default BusinessScreen;
