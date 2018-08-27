import React, { Component } from "react";
import { 
  Alert,
  AppRegistry,
  Platform, 
  StyleSheet, 
  TouchableHighlight, 
  TouchableOpacity, 
  TouchableNativeFeedback, 
  TouchableWithoutFeedback, 
  Animated,
  Image,
  Easing, 
  View } from 'react-native';
import Base ,{
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Left,
  Right,
  bottom,
  Body,
  Interpolate
} from "native-base";

import expo,{ LinearGradient } from 'expo';


const datas = [
  "Simon Mignolet",
  "Nathaniel Clyne",
  "Dejan Lovren",
  "Mama Sakho",
  "Alberto Moreno",
  "Emre Can",
  "Joe Allen",
  "Phil Coutinho"
];



class NHBasicList extends Component {
  constructor() {
    super();
    this.state = {
    isReady: false,
    isMainMenuOpen : false
    };

    this.animatedMenuValue = new Animated.Value(0)

    }
    

    animateMenu (open) {
      if(open){
        this.animatedMenuValue.setValue(1)
        Animated.timing(
          this.animatedMenuValue,
          {
            toValue: 0,
            duration: 400,
            easing: Easing.linear
          }
        ).start()
      }else{
          this.animatedMenuValue.setValue(0)
        Animated.timing(
          this.animatedMenuValue,
          {
            toValue: 1,
            duration: 400,
            easing: Easing.linear
          }
        ).start()
      }
      
    }



    async componentWillMount() {
    await Expo.Font.loadAsync({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    })
    this.setState({ isReady: true });

    
    
   
    }



    _changeMenuOpenState = () => {
      this.setState(previousState => {
        this.animateMenu(previousState.isMainMenuOpen)
        return { isMainMenuOpen: !previousState.isMainMenuOpen };
      });
      //render()
    }

    
 _modelPress = () => {
   if(this.state.isMainMenuOpen){
     this._changeMenuOpenState()
   }
 }

  
 
  render() {
  
    
    const transform = {transform : [{ translateX:  this.animatedMenuValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 300]
    })}]}

    const opacity =  {opacity : this.animatedMenuValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    })}
 



    if (!this.state.isReady) {
      return <Expo.AppLoading />;
      }

      var menuIcon = !this.state.isMainMenuOpen
      ? require('./assets/assets/ios/Icn/Menu.png')
      : require('./assets/Iconos/Close.png')

      var _menuBtn =!this.state.isMainMenuOpen
      ? styles.menuBtn
      : styles.menuBtnClose

    return (
      <Container style={styles.container}>
   
   <TouchableWithoutFeedback onPress={this._modelPress} underlayColor="white">
    <Animated.View style={[opacity,styles.modal]} />
  </TouchableWithoutFeedback>
  
   <Animated.View style={[transform,styles.mainMenu]}>
      <View style={styles.mainMenuProfile}>
        
      </View>
      <View style={styles.mainMenuItem}>
      <Text>Mi perfil</Text>
      </View>
      <View style={styles.mainMenuItem}>
        <Text>Adquirí tu servicio kölbi</Text>
      </View>

      <View style={styles.mainMenuItem}>
      <Text>Pagos y recargas</Text>
      </View>
      <View style={styles.mainMenuItem}>
      <Text>Cerrar sesión</Text>
      </View>
   </Animated.View>
      
     
        
           <LinearGradient colors={['#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#CEF9EF']} style={styles.menuGradient}>
                <TouchableOpacity onPress={this._changeMenuOpenState} underlayColor="white">
            <Image source={ menuIcon } style={_menuBtn}/>
           </TouchableOpacity>
           <Image source={require('./assets/assets/ios/logo/kolbi_logo_.png' )} style={styles.mainLogo} />
           <TouchableOpacity onPress={this._onOpenMenu} underlayColor="white">
            <Image source={this } style={styles.menuBtn}/>
           </TouchableOpacity>
           
</LinearGradient>
   


  
        <Content style={styles.mainPage}>
          <View style={styles.mainPageItems}>
            <View style={styles.mainPageItemsImg}>
              <Image  source={require("./assets/assets/ios/Icn/Recarga_.png")} />
            </View>
              
              <Text>Mis servicios</Text>
          </View>

            <View style={styles.mainPageItems}>
            <View style={styles.mainPageItemsImg}>
              <Image  source={require("./assets/assets/ios/Icn/Consulta_pago_.png")} />
            </View>
              
              <Text>kölbi pagos</Text>
          </View>

            <View style={styles.mainPageItems}>
            <View style={styles.mainPageItemsImg}>
              <Image  source={require("./assets/assets/ios/Icn/Shopping_.png")} />
            </View>
              
              <Text>kölbi klub</Text>
          </View>

            <View style={styles.mainPageItems}>
            <View style={styles.mainPageItemsImg}>
              <Image  source={require("./assets/assets/ios/Icn/Mapas_.png")} />
            </View>
              
              <Text>Localización</Text>
          </View>
          <View style={styles.mainPageItems}>
            <View style={styles.mainPageItemsImg}>
              <Image  source={require("./assets/assets/ios/Icn/Contact_.png")} />
            </View>
              
              <Text>Contactanos</Text>
          </View>
        </Content>

        
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  },

  menuGradient:{
    
     backgroundColor: "#FFF",
     height: 80,
     display: "flex",
    
     paddingLeft: 20,
     paddingRight: 20,
     flexDirection: 'row',
     justifyContent: "space-between",
     alignItems: 'center',
   
  },

  menubar:{
    backgroundColor: "transparent",
    height: 90,

  },

  menuBtn : {
    height:30,
    width: 30,
  },

  

  menuBtnClose : {
    height:30,
    width: 30,
    transform: [{translateX : 5}, {scale: 0.7}]
  },

  mainLogo : {
    //margin: -30
  },

  mainMenu : {
      position: 'absolute',
      top: 80,
      left: -300,
      bottom: 0,
      width: 300,
  
      zIndex : 10,
      backgroundColor: 'white',
      paddingLeft: 20,
      paddingRight: 20

  },
  modal :{
    position: 'absolute',
    top: 80,
    left: 0,
    bottom: 0,
    right:0,

    zIndex : 9,
    backgroundColor: "rgba(0,0,0,0.6)"
  },
  mainPage : {
    paddingLeft: 20,
    paddingRight: 20
  },
  mainPageItems :{
    height: 70,
    borderBottomColor: 'rgb(239, 239, 239)',
    borderBottomWidth: 1 ,
    display: "flex",
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: "center"

  },

  mainPageItemsImg : {
      width: 70,
      display: "flex",
      flexDirection: 'row',
      justifyContent: "center",
      alignItems: "center"
  },
  mainMenuProfile : {
    height: 135,
    borderBottomColor: 'rgb(239, 239, 239)',
    borderBottomWidth: 3 ,
  },

  mainMenuItem : {
    height :  70,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-between",
    borderBottomColor: 'rgb(239, 239, 239)',
    borderBottomWidth: 1 ,
  }



});


export default NHBasicList;