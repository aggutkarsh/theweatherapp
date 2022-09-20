import { StyleSheet } from 'react-native';

const WeatherStyles = StyleSheet.create(
  {
    container: {
      justifyContent: 'center',
      padding: 20
    },
    text: {
      color: 'black',
      fontSize: 18,
      fontWeight: 'bold',
      marginVertical: 10
    },
    header: {
      color: "grey",
      fontSize: 24,
      fontWeight: "bold",
      marginVertical: 10
    },
    titleStyle: {
      color: 'grey',
      fontSize: 18,
      fontWeight: 'bold'
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 10,
      padding: 20,
      alignItems: "center",
      shadowColor: "#007FFF",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4.5,
      elevation: 5
    }
  }
);

export default WeatherStyles;