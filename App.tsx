import React from "react";
import { Text, View } from "react-native";
import { ThemeProvider, createTheme } from '@rneui/themed';
import { FONTFAMILY } from "./Src/Theme/FontFamily";
import { FONTSIZE } from "./Src/Theme/FontSize";
import Route from "./Src/Navigation/Route";
import { ApolloProvider } from "@apollo/client";
import client from "./Src/Client/Client";
import { Theme } from "./Src/Theme/ThemeContext";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function App() {
  const theme = createTheme({
    lightColors: {
      primary: '#e7e7e8',
    },
    darkColors: {
      primary: '#000',
    },
    mode: 'light',
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>   
      <ThemeProvider theme={theme}> 
      <ApolloProvider client={client}> 

      <Theme>  
   <Route/>

   </Theme>  
   </ApolloProvider>
      </ThemeProvider>
      </GestureHandlerRootView>
  );
}