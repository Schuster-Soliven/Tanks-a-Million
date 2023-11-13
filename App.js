import * as React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function FunctionA({title, onIncrement}) {
  return <Button title={title} onPress={onIncrement}/>
}



function HomeScreen({navigation, route}) {
  return (
    
    <View style={temp1.container}>
      <Text style={temp1.text}>Tanks A Million</Text>
      <Image source={require('./img/BSTank.png')}
      style = {{ width:350, height: 350 }}/>
      <Button 
        title="Next Screen" 
        color ="#1ACDA5"
        onPress={() => {
          navigation.navigate('SearchandBookmark')
          console.log("NextScreen Pressed")
        }}
        />
      <Button 
        title="Settings" 
        color ="#1ACDA5"
        onPress={() => {
          navigation.navigate('Settings')
          console.log("Settings Pressed")
        }}
        />
      <Button 
        title="About" 
        color ="#1ACDA5"
        onPress={() => {
          navigation.navigate('About')
          console.log("About Pressed")
        }}
      />
    </View>
  );
}

function About({navigation}){
  return(
  <View style={temp1.container}>
  <Text style={temp3.text}>Created By Schuster Soliven</Text>
  <Text style={temp3.text}>Github repository: https://github.com/Schuster-Soliven/Tanks-a-Million</Text>
  <Button 
    title="Back" 
    color ="#1ACDA5"
    onPress={() => {
      navigation.goBack()
      console.log("HomeScreen Pressed")
    }}
  />
  </View>
  )
}

function Settings({navigation}){
  return(
    <View style={temp1.container}>
    <Text style={temp1.text}>Settings</Text>
    <Button 
      title="Back" 
      color ="#1ACDA5"
      onPress={() => {
        navigation.goBack()
        console.log("HomeScreen Pressed")
      }}
    />
  </View>
  )
}

function SearchandBookmark({navigation, route}){
  return(
    <View style={temp1.container}>
      <TextInput
        placeholder="Search"
    />
    <Text style={temp3.text}>- Semovente L40 da 47/32                                                  </Text>
    <Text style={temp3.text}>- WZ-141 Super Light Model Anti-Tank Fighting Vehicle</Text>
    <Text style={temp3.text}>- FV4003 Centurion AVRE                                                   </Text>
    <Text style={temp3.text}>- Type 10 Hitomaru Main Battle Tank                                </Text>
    <Text style={temp3.text}>- M2020, New North Korean MBT                                      </Text>
    <Button style={temp2.container}
      title="I'm Feeling Lucky" 
      color ="#1ACDA5"
      onPress={() => {
        navigation.navigate('TemplatedSearchResult')
        console.log("Random Pressed")
      }}
    />
    </View>
  )
}

function TemplatedSearchResult({navigation}){
  return(
    
    <View style={temp2.container}>
      <Text style={temp2.title}>BT42</Text>
      <Image source={require('./img/bt42.jpg')}
        style = {{ width:350, height: 350 }}
      />
    <Text style={temp2.text}>Properly speaking, these were captured BT-7 modified to carry the British QF 4.5-inch howitzer howitzer in a custom-built superstructure. Top heavy and unstable, the BT-42s proved unable to penetrate the thick sloped armor of standard Soviet tanks in 1942.
    Disabled BT-42. One of the few Finnish-built tanks was a risky compromise that did not pay off due to the numerous shortcuts that had to be done in order to be completed. On paper, a fast tank armed with a 114 mm gun seemed like quite a good idea.</Text>
    <Button 
      title="Back" 
      color ="#1ACDA5"
      onPress={() => {
        navigation.goBack()
        console.log("HomeScreen Pressed")
      }}
    />
    <Button 
      title="Bookmark" 
      color ="#1ACDA5"
      onPress={() => {
        navigation.goBack()
        console.log("HomeScreen Pressed")
      }}
    />
  </View>
  )
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="SearchandBookmark" component={SearchandBookmark} />
        <Stack.Screen name="TemplatedSearchResult" component={TemplatedSearchResult} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const temp1 = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  text: {
    color: 'rgb(59,108,212)',
    fontSize: 48,
    fontWeight: '100',
    textAlign: 'center',
    alignItems: 'center',
  },
})

const temp2 = StyleSheet.create({
  container: {
    flex: 20,
    padding: 25,
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    justifyContent: 'center'
  },
  title: {
    marginTop: 12,
    borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 6,
    backgroundColor: '#61dafb',
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'rgb(0, 0, 0)',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'left',
  },

  

});

const temp3 = StyleSheet.create({
  text: {
    color: 'rgb(0, 0, 0)',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'left',
  },
})
export default App;