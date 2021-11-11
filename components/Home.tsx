import axios from "axios";
import React, { useState }  from "react";
import {SafeAreaView, Text, StyleSheet, StatusBar, Image} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addName } from "../store/actions/main.actions";

const Home = (props: any) => {
const [homeA, setHomeA] = useState(null);
const [upcomingLaunch, setUpcomingLaunch] = useState([]);
const [imageUrl , setImageUril] = useState(null);
React.useEffect(() => {
 console.log('came to hooks')
  axios.get('')
  .then(res => {
      setUpcomingLaunch(res.data);
      const image  = res.data[0]['links']['mission_patch_small'];
      console.log('image', image);
      setImageUril(image);
      
  })
  .catch(err => {
      console.log('err', err);
  })  
}, []);

setTimeout(() => {
  if(props.navigation){
    props.navigation.navigate('Child');
  }
}, 10000);



return (
    <SafeAreaView style={styles.background} >
     { imageUrl && <Image  style={styles.image}  source={{
          uri: imageUrl
      }} />}
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "white",
    },
    image : {
        width: 100,
        height: 100
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

