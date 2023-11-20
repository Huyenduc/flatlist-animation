import React, { useEffect } from 'react';
import { da, faker } from '@faker-js/faker';
import { Entypo, Feather } from '@expo/vector-icons';
import { Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('screen');

faker.seed(123);

const data = [...Array(20).keys()].map((i, index, a) =>
({
  id: i,
  title: index === a.length - 1 ? 'Scroll End' : faker.commerce.productName()
}))

const _colors = {
  active: `#FCD259ff`,
  inactive: `#FCD25900`,
};
const _spacing = 10;

const ScrollToIndex = () => {
  const flatListRef = React.useRef<FlatList>(null);
  const [index, setIndex] = React.useState<number>(0);
  const [viewPosition, setWiewPosition] = React.useState<number>(0);

  const handleTest = () => {
    flatListRef.current?.scrollToOffset({ offset: 20, animated: true });
  }
  useEffect(() => {
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: index,
      viewPosition: viewPosition,
      viewOffset: 10,
    })
  }, [index, viewPosition])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <FlatList
        ref={flatListRef}
        style={{ flexGrow: 0 }}
        initialScrollIndex={index}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingLeft: _spacing }}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item, index: fIndex }) => {
          return (
            <TouchableOpacity onPress={() => { setIndex(fIndex) }}>
              <View
                style={{
                  marginRight: _spacing,
                  padding: _spacing,
                  borderWidth: 2,
                  borderColor: _colors.active,
                  borderRadius: 12,
                  backgroundColor: index === fIndex ? _colors.active : _colors.inactive,
                }}>
                <Text style={{ color: '#36303F', fontWeight: '700' }}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          marginTop: _spacing * 10,
        }}>
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              color: '#36303F',
              fontWeight: '700',
              marginBottom: _spacing,
            }}>
            Scroll position
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: width / 2,
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={() => { setWiewPosition(0) }}>
              <View
                style={{
                  padding: _spacing,
                  backgroundColor: '#FCD259',
                  borderRadius: _spacing,
                  marginRight: _spacing,
                }}>
                <Entypo name='align-left' size={24} color='#36303F' />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setWiewPosition(0.5) }}>
              <View
                style={{
                  padding: _spacing,
                  backgroundColor: '#FCD259',
                  borderRadius: _spacing,
                  marginRight: _spacing,
                }}>
                <Entypo
                  name='align-horizontal-middle'
                  size={24}
                  color='#36303F'
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setWiewPosition(1);
            }}>
              <View
                style={{
                  padding: _spacing,
                  backgroundColor: '#FCD259',
                  borderRadius: _spacing,
                }}>
                <Entypo name='align-right' size={24} color='#36303F' />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{ color: '#36303F', fontWeight: '700', marginBottom: 10 }}>
            Navigation
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: width / 2,
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={() => {
              if (index === 0) return;
              setIndex(index - 1);
            }}>
              <View
                style={{
                  padding: _spacing,
                  backgroundColor: '#FCD259',
                  borderRadius: _spacing,
                  marginRight: _spacing,
                }}>
                <Feather name='arrow-left' size={24} color='#36303F' />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              if (index === data.length - 1) return;
              setIndex(index + 1);
            }}>
              <View
                style={{
                  padding: _spacing,
                  backgroundColor: '#FCD259',
                  borderRadius: _spacing,
                }}>
                <Feather name='arrow-right' size={24} color='#36303F' />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default ScrollToIndex;