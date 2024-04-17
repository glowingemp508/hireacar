import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { FONTFAMILY } from '../../Theme/FontFamily';
const containerName = 'carpictures';
const blobEndpoint = 'https://hacblob.blob.core.windows.net/';
const sasToken =
  '?sv=2022-11-02&ss=b&srt=sco&sp=rwtf&se=2024-04-26T06:15:31Z&st=2023-07-29T22:15:31Z&spr=https,http&sig=U64%2B0I7xhf9mJV3cHyrcNbGJEOEeIKZcRGThK%2FMEiC4%3D'; // Replace this with the SAS token generated on the server-side.

const uploadImageToBlobStorage = async file => {
  try {
    const uniqueFileName = `${Date.now()}-${file.name}`;
    const urlWithSasToken = `${blobEndpoint}${containerName}/${uniqueFileName}${sasToken}`;

    // Manually determine the content type based on the file extension
    let contentType = 'image/jpeg'; // Default to JPEG type
    if (file.type === 'image/png' || file.name.endsWith('.png')) {
      contentType = 'image/png';
    }

    await fetch(urlWithSasToken, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': contentType,
        'x-ms-blob-type': 'BlockBlob', // Add this header
      },
    });

    // Return the actual image URL without SAS token
    const url = `${blobEndpoint}${containerName}/${uniqueFileName}`;
    return url;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};
const ImageUpload = ({onImageUrlsChange}) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);

  const handleImageUpload = async () => {
    if (selectedImages.length === 0) {
      Alert.alert('Error', 'Please select an image to upload.');
      return;
    }

    const urls = [];

    for (const image of selectedImages) {
      const imageUrl = await uploadImageToBlobStorage(image);
      if (imageUrl) {
        urls.push(imageUrl);
      }
    }

    setUploadedImageUrls(urls);
    setSelectedImages([]); // Clear selected images after uploading
    onImageUrlsChange(urls);
  };

  const handleRemoveImage = index => {
    setSelectedImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const openMediaPicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      saveToPhotos:true
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri =
          response.uri || (response.assets && response.assets[0]?.uri);
        setSelectedImages(imageUri);
      }
    });
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#EEECEC',
          width: '100%',
          height: 228,
        }}>
        <TouchableOpacity
          onPress={() => {
            openMediaPicker('photo');
          }}>
          <Text style={{fontSize:14,fontFamily:FONTFAMILY.Poppins_Medium}}>Choose  photos</Text>
        </TouchableOpacity>
      </View>

      <View>
        {/* Display thumbnails of selected images */}
        {selectedImages.map((image, index) => (
          <View
            key={index}
            style={{position: 'relative', display: 'inline-block'}}>
            <Image
              source={{uri: image}}
              style={{width: 200, height: 200, marginRight: 5}}
            />
            <TouchableOpacity
              onPress={() => handleRemoveImage(index)}
              style={{
                position: 'absolute',
                top: 5,
                right: 5,
                backgroundColor: 'gray',
                padding: 5,
              }}>
              <Text style={{color: 'white'}}>&#x2715;</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity
        onPress={handleImageUpload}
        style={{
          backgroundColor: '#21408E',
          borderRadius: 5,
        
          border: 'transpaernt',
          paddingVertical: 8,
          paddingHorizontal: 8,
marginVertical:15,
          fontSize: 16,
        }}>
        <Text style={{color: 'white',fontFamily:FONTFAMILY.Poppins_Medium,fontSize:14,textAlign:"center"}}>Upload Photos</Text>
      </TouchableOpacity>

      <View>
        {/* Display uploaded images */}
        {uploadedImageUrls.map((url, index) => (
          <Image
            key={index}
            source={{uri: url}}
            style={{width: 100, height: 100, margin: 5}}
          />
        ))}
      </View>
    </View>
  );
};

export default ImageUpload;
