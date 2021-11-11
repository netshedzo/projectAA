import axios from "axios";
import React, { useState }  from "react";
import {ScrollView, Text, StyleSheet, Image, View, TouchableOpacity} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addScore } from "../store/actions/main.actions";
import CardView from "react-native-cardview";
import { useSelector } from 'react-redux';


const ScoreBoard = (props: any) => {
const {navigation} = props;
const [homeA, setHomeA] = useState(null);
const [categories, setCategories] = useState([]);
const mainStore: any = useSelector(state => state);
const scores: any[]  = mainStore["main"]["scores"];
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
 const goToHome = React.useCallback(() => {
  navigation.navigate('Home');
 },[]);


return (
    <ScrollView style={styles.background} >
      <View style={styles.mainView}> 
      <Text  style={styles.medFont}>Scoreboard</Text>
       <Text  style={styles.smallFont}>All your quiz history in one place</Text>
      </View>
      <TouchableOpacity onPress={() => {goToHome()}} style={{marginTop: -30, paddingLeft: 20, paddingRight:20}}><CardView
          cardElevation={3}
          cardMaxElevation={10}
          cornerRadius={4}>
            <Text style={{fontSize: 19, paddingTop:25,paddingLeft:25 }}>Go Back Home</Text>
            <Text style={{fontSize: 12, color:"#8B80B6" , paddingLeft: 25,paddingBottom: 20}}>Click to go back</Text>
            </CardView></TouchableOpacity>
      <Text  style={{color: "black", fontSize: 17,fontWeight: 'bold',marginTop: 15, paddingLeft:10,  }}>Quiz History</Text>
      <View style={{padding:10}}>
      {scores.map((cat: any) => <TouchableOpacity  key={cat.value} onPress={() => handleStartQuiz(cat)}   style={{marginTop: 25}}><CardView
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
          uri: `https://ui-avatars.com/api/?name=${cat.title}&background=random`,
        }}
      />
            </View>
            <View style={{ flex: 0.7 }} >
            <Text  style={{fontSize: 18}}>{cat.title} Quiz</Text>
            <Text  style={{color:"#8B80B6", fontSize: 17}}>Score {cat.score}/10 </Text>
            <Text  style={{fontSize: 12}}>Date: {cat.date} </Text>
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
      addScore,
    }, dispatch)
  );
  

export default connect(mapStateToProps,mapDispatchToProps)(ScoreBoard);

