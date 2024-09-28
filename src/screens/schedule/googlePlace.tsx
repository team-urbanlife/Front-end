import React from 'react'
import { View, Text, Image } from 'react-native'
import {
  GooglePlacesAutocomplete,
  GooglePlaceData,
} from 'react-native-google-places-autocomplete'
import { TouchableOpacity } from 'react-native-gesture-handler'
const GOOGLE_PLACES_API_KEY = 'AIzaSyAIzs9FFNmjYXOCT75CRvnB2MIMLY53VPw'
interface GooglePlaceDetail {
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
  name: string
  photos?: Array<{
    photo_reference: string
  }>
}

const PlaceSearchComponent: React.FC = () => {
  return (
    <View style={{ paddingTop: 100 }}>
      <GooglePlacesAutocomplete
        placeholder="장소를 검색해보세요"
        onPress={(data: GooglePlaceData, details: GooglePlaceDetail | null) => {
          console.log('Data:', data)
          if (!details) {
            console.error('Failed to retrieve place details')
            return
          }

          console.log(data)
          const { name, geometry, photos } = details

          const latitude = geometry?.location?.lat
          const longitude = geometry?.location?.lng

          console.log('Place name:', name)
          console.log('Latitude:', latitude)
          console.log('Longitude:', longitude)

          if (photos && photos.length > 0) {
            const photoRef = photos[0].photo_reference
            const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${GOOGLE_PLACES_API_KEY}`
            console.log('Photo URL:', photoUrl)
          } else {
            console.log('No photos available for this place')
          }
        }}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'ko',
          components: 'country:kr',
        }}
        fetchDetails={true}
        renderRow={(data) => (
          <View
            style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}
          >
            {/* <Image
              source={{
                uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photoreference=${photos[0].photo_reference}&key=${GOOGLE_PLACES_API_KEY}`,
              }}
              style={{ width: 50, height: 50, marginRight: 10 }}
            /> */}
            {/* 장소 이름 */}
            <Text style={{ flex: 1, fontSize: 16 }}>
              {data.structured_formatting.main_text}
            </Text>

            {/* 장소 추가 버튼 */}
            <TouchableOpacity
              style={{
                backgroundColor: '#1faadb',
                padding: 10,
                borderRadius: 5,
              }}
              onPress={() => {
                console.log('Add place button clicked')
                // 여기서 장소를 추가하는 로직을 넣을 수 있습니다.
              }}
            >
              <Text style={{ color: '#fff' }}>장소 추가</Text>
            </TouchableOpacity>
          </View>
        )}
        styles={{
          textInputContainer: {
            width: '100%',
          },
          textInput: {
            height: 44,
            fontSize: 16,
          },
          listView: {
            position: 'absolute',
            top: 45,
            width: '100%',
          },
        }}
      />
    </View>
  )
}

export default PlaceSearchComponent
