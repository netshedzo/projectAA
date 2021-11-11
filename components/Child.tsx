import axios from "axios";
import React, { useState }  from "react";
import {ScrollView, Text, StyleSheet, Image, View, TouchableOpacity, Alert} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addName } from "../store/actions/main.actions";
import CardView from "react-native-cardview";

const Child = (props: any) => {
const {navigation, route} = props;
const [homeA, setHomeA] = useState(null);
 const params = route.params;
const [questions, setQuestions] = useState([]);
const [index, setIndex] = useState(0);
const [currentQuestion, setCurrentQuestion] = useState({
  question: '',
  correctAnswer:'',
  incorrectAnswers: [],
  id: null, 
  type: ''
});
const [savedAnswers, setSavedAnswers] = useState<any[]>([]);
const [allQuestions, setAllQuestions] = useState([]);
const [currentScore, setCurrentScore] = useState(0);
const [completed, setCompleted] = useState(false);
React.useEffect(() => {
  axios.get(`https://api.trivia.willfry.co.uk/questions?categories=${params.categoryValue}&limit=10`)
  .then(res => {
    setQuestions(res.data);   
    if(res.data.length === 10){
      setCurrentQuestion(res.data[index]);
      setAllQuestions(res.data);
    }
  })
  .catch(err => {
      console.log('err', err);
  })  
}, []);

function shuffleQuestions(array: string[], currentAnswer: string) {
  if(!currentAnswer){return []};
  console.log('correct Answer', currentAnswer);
  
  array = array.slice(0,3).concat([currentAnswer]);
  let currentIndex = array.length,  randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}



 const handleStartQuiz = React.useCallback((category) => {
    const answer: any = {
      question: currentQuestion.question,
      correct: category === currentQuestion.correctAnswer ? true: false
    }
    setSavedAnswers(answers => { answers.push(answer); return answers});
    if(answer.correst){
      setCurrentScore(score => { score += 1; return score});
    }
    if(index !== 9){
     const newIndex = index + 1;
     setIndex(newIndex);
     setCurrentQuestion(allQuestions[newIndex]);
    }else{
      setCurrentQuestion({
        question: 'Quiz Complete',
        correctAnswer:'',
        incorrectAnswers: [],
        id: null, 
        type: ''
      });
      setCompleted(true);
      Alert.alert(
        "You Scored "+currentScore+"/10 !",
        "Quiz automatically redirected to the main page in 2 minutes",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
      setTimeout(() => {
        navigation.navigate('Home');
      }, 2000)
    }

 },[index, currentQuestion, currentScore, savedAnswers, allQuestions]);


return (
    <ScrollView style={styles.background} >
      <View style={styles.mainView}> 
       <Text  style={styles.medFont}>{params.categoryName} Quiz</Text>
       <Text  style={styles.smallFont}>{completed ? "Thank you for participating in our quiz":"Answer all the following questions"}</Text>
      </View>
      <View style={{marginTop: -30, paddingLeft: 20, paddingRight:20}}><CardView
          cardElevation={3}
          cardMaxElevation={10}
          cornerRadius={4}>
            <Text style={{fontSize: 16, paddingTop:25,paddingLeft:25 }}>{currentQuestion.question}</Text>
            <Text style={{fontSize: 12, color:"orange" , paddingLeft: 25,paddingBottom: 20}}>Question {index+1}/10</Text>
            </CardView></View>
      <Text  style={{color: "black", fontSize: 17,fontWeight: 'bold',marginTop: 15, paddingLeft:10,  }}>{completed ? "Quiz Results" :"Select The Correct Answer"}</Text>
      <View style={{padding:10}}>
      {!completed && shuffleQuestions(currentQuestion.incorrectAnswers, currentQuestion.correctAnswer).map((cat: string) => <TouchableOpacity  key={cat} onPress={() => handleStartQuiz(cat)}   style={{marginTop: 25}}><CardView
  
          cardElevation={8}
          cardMaxElevation={10}
          cornerRadius={8}>
           <View
           
            style={{
              flexDirection: "row",
              height: 70,
              padding: 6
            }}
          >
            <View style={{flex: 0.3 }} >
            <Image
        style={styles.logo}
        source={{
          uri: `https://ui-avatars.com/api/?name=Q&background=random`,
        }}
      />
            </View>
            <View style={{ flex: 0.7 }} >
            <Text  style={{fontSize: 10}}></Text>
            <Text  style={{fontSize: 17}}>{cat}</Text>
              </View>
            
          </View>
</CardView></TouchableOpacity>)}

{completed && savedAnswers.map((cat: any, index: number) => <TouchableOpacity  key={cat.question+index}   style={{marginTop: 25}}><CardView
  
  cardElevation={8}
  cardMaxElevation={10}
  cornerRadius={8}>
   <View
   
    style={{
      flexDirection: "row",
      height: 80,
      padding: 6
    }}
  >
    <View style={{flex: 0.3 }} >
    <Image
style={styles.logo}
source={{
  uri: `https://ui-avatars.com/api/?name=A&background=random`,
}}
/>
    </View>
    <View style={{ flex: 0.7 }} >
    <Text  style={{fontSize: 15}}>{cat.question}</Text>
    <Text  style={{fontSize: 10 , fontWeight:'bold', color: cat.correct ? 'green': 'red'}}>{cat.correct ? 'Correct': 'Incorrect'}</Text>
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
  

export default connect(mapStateToProps,mapDispatchToProps)(Child);

