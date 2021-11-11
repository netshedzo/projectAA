import axios from "axios";
import React, { useState }  from "react";
import {ScrollView, Text, StyleSheet, StatusBar, View} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addName } from "../store/actions/main.actions";

const Home = (props: any) => {
const [homeA, setHomeA] = useState(null);
const [categories, setCategories] = useState([]);
React.useEffect(() => {
 console.log('came to hooks')
  axios.get('https://api.trivia.willfry.co.uk/categories')
  .then(res => {
    setCategories(res.data);   
    console.log('categories', res.data);
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
      
    </ScrollView>
);
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "white",
    },
    mainView: {
      backgroundColor: "#8B80B6", 
      height: "200px",
      width: "100%"
    },
    smallFont: {
      color: "ghostwhite",
      fontSize: 14
    },
    medFont:{
      color: "ghostwhite",
      fontSize: 14
    }



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

