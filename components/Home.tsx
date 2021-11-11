import axios from "axios";
import React, { useState }  from "react";
import {ScrollView, Text, StyleSheet, Image, View} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addName } from "../store/actions/main.actions";
import CardView from "react-native-cardview";

const Home = (props: any) => {
const [homeA, setHomeA] = useState(null);
const [categories, setCategories] = useState([]);
React.useEffect(() => {
 console.log('came to hooks')
  axios.get('https://api.trivia.willfry.co.uk/categories')
  .then(res => {
    setCategories(res.data);   
  })
  .catch(err => {
      console.log('err', err);
  })  
}, []);





return (
    <ScrollView style={styles.background} >
      <View style={styles.mainView}> 
       <Text  style={styles.medFont}>Welcome Back!</Text>
       <Text  style={styles.smallFont}>The best quiz site out there</Text>
      </View>

      <Text  style={{color: "black", fontSize: 17,fontWeight: 'bold',marginTop: 15, paddingLeft:10,  }}>Recent Quiz</Text>
      <View style={{padding:10}}>
      {categories.map((cat: any) => <View style={{marginTop: 25}}><CardView
          key={cat.value}
          cardElevation={8}
          cardMaxElevation={10}
          
          cornerRadius={8}>
           <View
            style={{
              flexDirection: "row",
              height: 100,
              padding: 20
            }}
          >
            <View style={{flex: 0.3 }} >
            <Image
        style={styles.logo}
        source={{
          uri: `https://ui-avatars.com/api/?name=${cat.label}&background=random`,
        }}
      />
            </View>
            <View style={{ flex: 0.7 }} >
            <Text style={{fontSize: 16}}>{cat.label}</Text>
            <Text style={{color:"#8B80B6"}}>10 Questions</Text>
              </View>
            
          </View>
</CardView></View>)}
</View>
      
    </ScrollView>
);
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#F9F9F9",
    },
    mainView: {
      backgroundColor: "#8B80B6", 
      height: 180,
      width: "100%",
      paddingTop: 40,
      paddingLeft:10,
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40

    },
    smallFont: {
      color: "ghostwhite",
      fontSize: 14,
      paddingLeft: 10
    },
    medFont:{
      color: "ghostwhite",
      fontSize: 43,
      fontWeight: 'bold'
    }, 
    blackBack: {
      color: 'black',
    },
    logo: {
      width: 66,
      height: 58,
      borderRadius: 20
    },
})


const mapStateToProps = (state: any) => {
    return   { state }
  };

  const mapDispatchToProps = (dispatch: any) => (
    bindActionCreators({
      addName,
    }, dispatch)
  );
  

export default connect(mapStateToProps,mapDispatchToProps)(Home);

