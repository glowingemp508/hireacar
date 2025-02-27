import { StyleSheet, Text, View ,Image} from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '../../Theme/ThemeContext';
import { darkTheme, lightTheme } from '../../Theme/Color';
import { FlatList } from 'react-native-gesture-handler';
import { FONTFAMILY } from '../../Theme/FontFamily';
import { SPACING } from '../../Theme/Spacing';
import { ChatState } from '../../Context/ChatProvider';
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../../config/ChatLogics';

const Scroll = ({messages}) => {

    const themeContext = useContext(ThemeContext);
    const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
const { setUser,user} = ChatState();








  

    const renderItem = ({ item,index }) => {
      const createdAtDate = new Date(item?.createdAt);
      const date = createdAtDate?.toLocaleDateString(); // Format date
      const time = createdAtDate?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format time
      return(



    
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }} key={item.id}>
        {(isSameSender(messages, item, index, user?.userByGoogleId?.id) ||
          isLastMessage(messages, item, user?.userByGoogleId?.id)) && (
            <Image
            style={{ marginTop: 7, marginRight: 4, width: 40, height: 40, borderRadius: 20 }}
            source={{ uri: item.sender.photoLink }}
          />
        
        )}
        <View
          style={{
            backgroundColor: item.sender.id === user?.userByGoogleId?.id ? theme.BackgroundSecondary : theme.PrimarylightText,
            marginLeft: isSameSenderMargin(messages, item, index, user?.userByGoogleId?.id),
            marginTop: isSameUser(messages, item, index, user?.userByGoogleId?.id) ? 3 : 30,
            borderRadius: 20,
            paddingVertical: 5,
            paddingHorizontal: 15,
            maxWidth: '75%',
          }}>
          <Text style={[styles.content]}>{item.content}</Text>
          <Text style={[styles.time]}>{date}{time}</Text>
        </View>
      </View>
      
    
    
    
    
  )
}

  return (
     <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: SPACING.space_8,marginTop:20,paddingBottom:40 }}
      />

  )
}

export default Scroll

const styles = StyleSheet.create({
    messageContainer: {
        flexDirection: 'row',
        
        marginBottom: 10,
      },
      messageBubble: {
        padding: 10,
        borderRadius: 10,
        maxWidth: '100%', // Adjust as needed
      },
      content: {
        fontSize: 14,
        fontFamily:FONTFAMILY.Poppins_Medium
      },
      time:
      {
        fontSize: 12,
        fontFamily:FONTFAMILY.Poppins_Medium
      }

})