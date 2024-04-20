import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Pressable } from 'react-native';
import { styles } from './EditStyle';
import { Picker } from '@react-native-picker/picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { launchImageLibrary } from 'react-native-image-picker';
import Header from '../../../../Components/Header/Header';
import { ThemeContext } from '../../../../Theme/ThemeContext';
import { darkTheme, lightTheme } from '../../../../Theme/Color';
import { FONTFAMILY } from '../../../../Theme/FontFamily';
import Entypo from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';


const EditProfile = ({ navigation }) => {
  const [activeInput, setActiveInput] = useState('');
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [cnic, setCnic] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [verified, setVerified] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [editMode, setEditMode] = useState(false); // State variable for edit mode

  useEffect(() => {
    // Set initial values when edit mode is enabled
      setUsername('Initial Username');
      setEmail('example@email.com');
      setCnic('Initial CNIC');
      setContactNumber('Initial Contact Number');
      setVerified('Initial Verification');
  }, []); // Run this effect whenever editMode changes

  const handleInputFocus = (inputName) => {
    setActiveInput(inputName);
  };

  const handleInputBlur = () => {
    setActiveInput('');
  };

  const openMediaPicker = (mediaType) => {
    const options = {
      mediaType: mediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || (response.assets && response.assets[0]?.uri);
        setSelectedImage(imageUri);
      }
    });
  };

  const handleSubmit = () => {
    // Perform submit action with the form data
    const formData = {
      username,
      email,
      cnic,
      contactNumber,
      verified,
      selectedImage,
    };
    console.log(formData);
  };

  return (
    <KeyboardAwareScrollView style={[styles.container, { backgroundColor: theme.primaryBackground }]}>
      <Header text='Profile' />

      <View style={[styles.name_contaier, { position: 'relative' }]}>
        <Image source={require('../../../../Assets/Images/Message/image1.jpg')} style={styles.image} />
        <Pressable style={{ width: 12, height: 12, position: 'absolute', bottom: 5, left: 55 }} onPress={() => openMediaPicker('photo')}>
          <Image source={require('../../../../Assets/Images/Profile/Camera.png')} style={{tintColor:themeContext?.isDarkTheme?"white":null}}/>
        </Pressable>
        <View style={{ flex: 0.95 }}>
          <Text style={[styles.User_name, { color: theme.PrimarylightText }]}>Amina Mark</Text>
          <Text style={[styles.user_lastname, { color: theme.PrimarylightText }]}>Jos, Pleteau</Text>
        </View>

        {!editMode   ? 

       <Entypo name="edit-2" size={20} color={theme.primaryText}   onPress={() => setEditMode(true)}/> 
:
       <AntDesign name="close" size={20} color={theme.primaryText}   onPress={() => setEditMode(false)}/> 

       
        }

      </View>

      <View style={styles.form_container}>
        <View style={styles.input_container}>
          <Text style={[styles.label, { color: theme.primaryText }]}>Username</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.BackgroundSecondary,
                borderWidth: activeInput === 'Username' ? 0.5 : 0,
                borderColor: activeInput === 'Username' ? '#F1F1F0' : 'transparent',
                color:theme.PrimarylightText,
marginTop:activeInput === 'Username' ? 10 : 0

              },
            ]}
            onFocus={() => handleInputFocus('Username')}
            onBlur={handleInputBlur}
            onChangeText={setUsername}
            editable={editMode} // Make the input editable based on editMode state
            value={username} // Set the initial value of the input field
          />
        </View>

        <View style={styles.input_container}>
          <Text style={[styles.label, { color: theme.primaryText }]}>Email Address</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.BackgroundSecondary,
                borderWidth: activeInput === 'Email' ? 0.5 : 0,
                borderColor: activeInput === 'Email' ? '#F1F1F0' : 'transparent',
                color:theme.PrimarylightText,
marginTop:activeInput === 'Email' ? 10 : 0
              },
            ]}
            onFocus={() => handleInputFocus('Email')}
            onBlur={handleInputBlur}
            onChangeText={setEmail}
            editable={editMode} // Make the input editable based on editMode state
            value={email} // Set the initial value of the input field
          />
        </View>

        <View style={styles.input_container}>
          <Text style={[styles.label, { color: theme.primaryText }]}>Cnic</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.BackgroundSecondary,
                borderWidth: activeInput === 'cnic' ? 0.5 : 0,
                borderColor: activeInput === 'cnic' ? '#F1F1F0' : 'transparent',
                color:theme.PrimarylightText,
marginTop:activeInput === 'cnic' ? 10 : 0


              },
            ]}
            onFocus={() => handleInputFocus('cnic')}
            onBlur={handleInputBlur}
            onChangeText={setCnic}
            editable={editMode} // Make the input editable based on editMode state
            value={cnic} // Set the initial value of the input field
          />
        </View>




        <View style={styles.input_container}>
          <Text style={[styles.label, { color: theme.primaryText }]}>contactNumber</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.BackgroundSecondary,
                borderWidth: activeInput === 'contactNumber' ? 0.5 : 0,
                borderColor: activeInput === 'contactNumber' ? '#F1F1F0' : 'transparent',
                color:theme.PrimarylightText,
                marginTop:activeInput === 'contactNumber' ? 10 : 0


              },
            ]}
            onFocus={() => handleInputFocus('contactNumber')}
            onBlur={handleInputBlur}
            onChangeText={setCnic}
            editable={editMode} // Make the input editable based on editMode state
            value={contactNumber} // Set the initial value of the input field
          />
        </View>

      </View>

 

      {editMode && (
        <TouchableOpacity
          style={{
            backgroundColor: '#21408E',
            borderRadius: 5,
            border: 'transpaernt',
            paddingVertical: 8,
            paddingHorizontal: 8,
            marginVertical: 15,
            fontSize: 16,
          }}
          onPress={handleSubmit}>
          <Text style={{ color: 'white', fontFamily: FONTFAMILY.Poppins_Medium, fontSize: 14, textAlign: "center" }}>Submit</Text>
        </TouchableOpacity>
      )}

    </KeyboardAwareScrollView>
  );
};

export default EditProfile;
