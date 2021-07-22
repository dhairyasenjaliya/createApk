/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ScrollView, TouchableOpacity, Text, Linking } from 'react-native';
import LoadingActionContainer from '../../Components/LoadingActionContainer';
import {Container} from '../../Components';
import useAppTheme from '../../Themes/Context';
import { Card, Paragraph } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import moment from 'moment';

const DetailScreen = (props) => {
  const {theme} = useAppTheme();
  const [data, setData] = React.useState(props.route.params.detail)
  const calculateTime = (t) => {
    var startDate = moment(t, 'YYYY-MM-DD hh:mm:ss GMT+0000');
    return startDate.format("MMMM Do YYYY")
  }

  const gotoWebsite = () => {
    Linking.openURL(data.url);
  }
  return (
    <LoadingActionContainer fixed>
      <Container
        style={{
          padding: 10,
        }}>
          <ScrollView>
          <Card
            style={{
              marginBottom: hp('3%')
            }}
            mode="outlined"
          >
            <Card.Title title={data.title} subtitle={calculateTime(data.publishedAt)+", "+data.author} />
            <Card.Cover source={{ uri: data.urlToImage }} />
            
            <Card.Content>
              <Paragraph>{data.content}</Paragraph>
              <View style={{
                display: 'flex',
                flexDirection: "row",
                alignItems: 'center',
                width: "100%",
                justifyContent: 'flex-end'
              }}>
                <TouchableOpacity onPress={gotoWebsite}>
                  <Text
                    style={{
                      color: theme.colors.primary,
                      textDecorationLine: 'underline',
                      marginTop: hp("2%")
                    }}
                  >
                    Visit Website
                  </Text>
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>    
          </ScrollView>
      </Container>
    </LoadingActionContainer>
  );
};

export default DetailScreen;
