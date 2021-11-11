import React, { useState }  from "react";
import {SafeAreaView, Text, StyleSheet} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addName } from "../store/actions/main.actions";

const Child = (props: any) => {
const [homeA, setHomeA] = useState(null);
console.log('navigation', props.navigation);
return (
    <SafeAreaView style={styles.background} >
      <Text >Child</Text>
    </SafeAreaView>
);
    
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "white",
    }
})


const mapStateToProps = (state: any) => {
    const { main } = state
    return   { main }
  };

  const mapDispatchToProps = (dispatch: any) => (
    bindActionCreators({
      addName,
    }, dispatch)
  );
  

export default connect(mapStateToProps,mapDispatchToProps)(Child);

