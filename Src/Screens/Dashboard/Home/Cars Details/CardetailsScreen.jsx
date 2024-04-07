import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Details from '../../../../Components/Car Details/Details';

const CardetailsScreen = ({route}) => {

    const { id } = route.params;
    const carData = [
      {
        id: '1',
        image: require('../../../../Assets/Images/Home/car1-660x440.jpg'), 
        name: 'Toyota Camry',
        rating: 4.5,
        price: '$25,000',
        type: 'Sedan',
      },
      {
        id: '2',
        image: require('../../../../Assets/Images/Home/car3-660x440.jpg'), // Replace with your image source
        name: 'Honda Civic',
        rating: 4.3,
        price: '$22,000',
        type: 'Sedan',
      },
      {
        id: '3',
        image: require('../../../../Assets/Images/Home/car5-660x440.jpg'), // Replace with your image source
        name: 'Toyota Camry',
        rating: 4.5,
        price: '$25,000',
        type: 'Sedan',
      },
      {
        id: '4',
        image: require('../../../../Assets/Images/Home/car6-660x440.jpg'), // Replace with your image source
        name: 'Honda Civic',
        rating: 4.3,
        price: '$22,000',
        type: 'Sedan',
      },
      {
        id: '5',
        image: require('../../../../Assets/Images/Home/car8-660x440.jpg'), // Replace with your image source
        name: 'Honda Civic',
        rating: 4.3,
        price: '$22,000',
        type: 'Sedan',
      },
      {
        id: '6',
        image: require('../../../../Assets/Images/Home/car11-660x440.jpg'), // Replace with your image source
        name: 'Honda Civic',
        rating: 4.3,
        price: '$22,000',
        type: 'Sedan',
      },
    
    ];
  
    const selectedCar = carData.find(car => car.id === id);
    
  return (
    <View>
    <Details data={selectedCar}  />
    </View>
  )
}

export default CardetailsScreen

const styles = StyleSheet.create({})