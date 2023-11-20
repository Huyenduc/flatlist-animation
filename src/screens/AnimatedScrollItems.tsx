import * as React from 'react';
import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity, Easing, SafeAreaViewBase, SafeAreaView } from 'react-native';
const { width, height } = Dimensions.get('screen');
import { faker } from '@faker-js/faker';

faker.seed(10);

const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: i,
    image: `https://randomuser.me/api/portraits/${faker.helpers.arrayElement(['women', 'men'])}/${60 + i}.jpg`,
    name: faker.name.firstName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});

const SPACING = 20;
const AVATAR_SIZE = 70;

const AnimatedScrollItems = () => {
  console.log(DATA);

  return <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
    <FlatList
      data={DATA}
      keyExtractor={item => item.key.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: SPACING }}
      renderItem={({ item, index }) => {
        return (
          <View style={{ 
            flexDirection: 'row', 
            padding:SPACING ,
             margin: SPACING, 
             backgroundColor:'rgba(255, 255, 255, 0.9)', 
             borderRadius: 12,
             shadowColor:'#000',
             shadowOffset:{
               width:0,
               height:10
             },
             shadowOpacity:0.3,
              shadowRadius:20,
          
          }}>
            <Image
              source={{ uri: item.image }}
              style={{
                height: AVATAR_SIZE,
                width: AVATAR_SIZE,
                borderRadius: AVATAR_SIZE,
                marginRight: SPACING
              }} />

            <View>
              <Text style={{ fontSize: 22, fontWeight: '700' }}>{item.name}</Text>
              <Text style={{ fontSize: 18, opacity: 0.7 }}>{item.jobTitle}</Text>
              <Text style={{ fontSize: 14, opacity: 0.8, color: '#0099cc' }}>{item.email}</Text>
            </View>
          </View>
        )
      }}
    >
    </FlatList>
  </SafeAreaView>

}

export default AnimatedScrollItems;