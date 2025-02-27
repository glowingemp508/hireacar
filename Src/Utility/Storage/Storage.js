import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value) => {
  try {
    const jsonvalue = JSON.stringify(value);
    console.log('json value',jsonvalue)
    await AsyncStorage.setItem('user', jsonvalue);
  } catch (error) {
    console.error('Error storing data:', error);
  }
};

const getData = async ()=> {
  try {
    const jsonvalue = await AsyncStorage.getItem('user');
    return jsonvalue != null ? JSON.parse(jsonvalue) : null;
  } catch (e) {
    console.error('Error getting data:', e);
    return null;
  }
};

const removeData = async () => {
  try {
    await AsyncStorage.removeItem('user');
  } catch (e) {
    console.error('Error removing data:', e);
  }
};

export { storeData, getData, removeData };
