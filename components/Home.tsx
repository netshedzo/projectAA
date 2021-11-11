import axios from "axios";
import React, { useState }  from "react";
import {ScrollView, Text, StyleSheet, Image, View, TouchableOpacity} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addName } from "../store/actions/main.actions";
import CardView from "react-native-cardview";

const Home = (props: any) => {
const {navigation} = props;
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


 const handleStartQuiz = React.useCallback((category) => {
  navigation.navigate('Child', { categoryName: category.label, categoryValue: category.value });
 },[]);


return (
    <ScrollView style={styles.background} >
      <View style={styles.mainView}> 
       <Text  style={styles.medFont}>Welcome Back!</Text>
       <Text  style={styles.smallFont}>The best mobile quiz app out there</Text>
      </View>
      <View style={{marginTop: -30, paddingLeft: 20, paddingRight:20}}><CardView
          cardElevation={3}
          cardMaxElevation={10}
          cornerRadius={4}>
            <Text style={{fontSize: 19, paddingTop:25,paddingLeft:25 }}>View your Scoreboard</Text>
            <Text style={{fontSize: 12, color:"#8B80B6" , paddingLeft: 25,paddingBottom: 20}}>Click to view your quiz history</Text>
            </CardView></View>
      <Text  style={{color: "black", fontSize: 17,fontWeight: 'bold',marginTop: 15, paddingLeft:10,  }}>Select Quiz to Take</Text>
      <View style={{padding:10}}>
      {categories.map((cat: any) => <TouchableOpacity  key={cat.value} onPress={() => handleStartQuiz(cat)}   style={{marginTop: 25}}><CardView
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
            <Text  style={{fontSize: 17}}>{cat.label}</Text>
            <Text  style={{color:"#8B80B6"}}>10 Questions</Text>
              </View>
            
          </View>
</CardView></TouchableOpacity>)}
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
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0

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

