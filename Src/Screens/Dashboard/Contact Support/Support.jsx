import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Toast from "react-native-toast-message";
import { useMutation } from '@apollo/client';
import { CREATE_CONTACT } from '../../../Service/Mutation';
import ActivityIndicatorModal from '../../../Components/ActivityIndicatorModal';
import Header from '../../../Components/Header/Header';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FONTFAMILY } from '../../../Theme/FontFamily';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
  .email("Invalid email")
  .matches(
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/,
    "Invalid email format"
  )
  .required("Email is required"),
  phoneNumber: Yup.string().required('Phone number is required'),
  message: Yup.string().required('Message is required')
});

const ContactSupport = ({ navigation }) => {
  const [createContact, { loading, error }] = useMutation(CREATE_CONTACT);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await createContact({
        variables: {
          name: values.name,
          email: values.email,
          phoneNumber: values.phoneNumber,
          message: values.message
        }
      });
      Toast.show({ type: 'success', text1: 'Successfully submitted' });
      resetForm();
    } catch (err) {
      console.error('Error creating contact:', err);
      Toast.show({ type: 'error', text1: 'Submission failed', text2: err.message });
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.safeArea}>
      <Header text="Contact Support" />
      {loading && <ActivityIndicatorModal loaderIndicator={loading} />}
      
      <Formik
        initialValues={{ name: '', email: '', phoneNumber: '', message: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={{marginTop:20}}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Your Name"
              placeholderTextColor="#000000B2"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            <TextInput
              style={styles.textInput}
              placeholder="Enter Your Email"
              placeholderTextColor="#000000B2"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
            />
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <TextInput
              style={styles.textInput}
              placeholder="Enter Your Phone Number"
              placeholderTextColor="#000000B2"
              onChangeText={handleChange('phoneNumber')}
              onBlur={handleBlur('phoneNumber')}
              value={values.phoneNumber}
              keyboardType="phone-pad"
            />
            {touched.phoneNumber && errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}

            <TextInput
              style={styles.msgTextInput}
              placeholder="Enter Your Message"
              placeholderTextColor="#000000B2"
            multiline={true}
        
              textAlignVertical="top"
              onChangeText={handleChange('message')}
              onBlur={handleBlur('message')}
              value={values.message}
            />
            {touched.message && errors.message && <Text style={styles.errorText}>{errors.message}</Text>}

            <TouchableOpacity
          style={{
            backgroundColor: '#21408E',
            borderRadius: 5,
            border: 'transpaernt',
            paddingVertical: 8,
            paddingHorizontal: 8,
    marginHorizontal: 18,

            marginVertical: 15,
            fontSize: 16,
          }}
          onPress={handleSubmit}>
          <Text style={{ color: 'white', fontFamily: FONTFAMILY.Poppins_Medium, fontSize: 14, textAlign: "center" }}>Submit</Text>
        </TouchableOpacity>
          </View>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

export default ContactSupport;

const styles = StyleSheet.create({
  safeArea: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
  textInput: {
    height: 56,
    borderColor: '#0000001A',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 18,
    marginHorizontal: 18,
    marginBottom:20,
    color: "#000000",
    fontFamily:FONTFAMILY.Poppins_Regular,

  },
  msgTextInput: {
    height: 120,
    borderColor: '#0000001A',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingTop: 15,
    marginHorizontal: 20,
    color: '#000000',
    fontFamily:FONTFAMILY.Poppins_Regular,

  },
  sentTouchOpacitiy: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#0184A0',
    height: 56,
    marginHorizontal: 20,

  },
  sentTouchOpacityText: {
    fontSize: 17,
    fontFamily:FONTFAMILY.Poppins_Regular,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  errorText: {
    color: 'red',
    marginLeft: 20,
   
    fontFamily:FONTFAMILY.Poppins_Regular,

  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
