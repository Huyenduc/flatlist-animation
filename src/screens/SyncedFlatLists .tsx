import * as React from 'react';
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Easing,
  SafeAreaViewBase,
  SafeAreaView,
} from 'react-native';
const { width, height } = Dimensions.get('screen');

export interface IPhotos {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: ISrc;
  liked: boolean;
  alt: string;
}

export interface ISrc {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}

const IMAGE_SIZE = 80;
const SPACING = 10;



const API_KEY = "UpJeyxa5gd3wwCkSogYxI5bEuqDWV5Wk56eIDZD5cRHS0fDiUUYhOHvj";
const API_URL = "https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&per_page=20";

const fecthApi = async () => {
  const data = await fetch(API_URL, {
    headers: {
      Authorization: API_KEY
    }
  });
  const { photos } = await data.json();
  return photos;
}

const SyncedFlatLists = () => {


  const refTop = React.useRef<FlatList>(null);
  const refThumb = React.useRef<FlatList>(null);
  const [images, setImages] = React.useState<IPhotos[]>([]);
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  const scrollToActiveIndex = (index: number) => {
    setActiveIndex(index);

    refTop.current?.scrollToOffset({
      offset: index * width,
      animated: true
    })
    console.log('index:', index*(IMAGE_SIZE + SPACING));
    console.log('width:', width/2);
    if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
      refThumb.current?.scrollToOffset({
        offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
        animated: true
      })
    } else {
      refThumb.current?.scrollToOffset({
        offset: 0,
        animated: true
      })
    }
  }

  React.useEffect(() => {
    (async () => {
      const data = await fecthApi();
      setImages(data);
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {images && (
        <View style={{ flex: 1 }}>
          <FlatList
            ref={refTop}
            data={images}
            horizontal
            pagingEnabled
            keyExtractor={(item) => item?.id.toString()}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(ev) => {
              // console.log(ev.nativeEvent.contentOffset.x);
              // console.log('width:',width);
              scrollToActiveIndex(Math.floor(ev.nativeEvent.contentOffset.x / width));
            }}
            renderItem={({ item }) => {
              return (
                <View style={{ width, height }}>
                  <Image source={{ uri: item?.src?.portrait }} style={[StyleSheet.absoluteFill]} />
                </View>
              )
            }}
          >
          </FlatList>
          <FlatList
            ref={refThumb}
            data={images}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item?.id.toString()}
            style={{ position: 'absolute', bottom: 80 }}
            contentContainerStyle={{ paddingHorizontal: SPACING }}

            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity onPress={() => { scrollToActiveIndex(index) }}>
                  <Image
                    source={{ uri: item?.src?.portrait }}
                    style={{
                      width: IMAGE_SIZE,
                      height:IMAGE_SIZE,
                      borderRadius: 16,
                      marginRight: SPACING,
                      borderWidth: 2,
                      borderColor: activeIndex === index ? '#fff' : 'transparent'
                    }}
                  />
                </TouchableOpacity>
              )
            }}
          >
          </FlatList>
        </View>
      )
      }
    </View>
  )
}

export default SyncedFlatLists;