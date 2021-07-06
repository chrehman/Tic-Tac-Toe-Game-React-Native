import  React,{useState} from 'react';
import { Text, View, StyleSheet,Button,TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default function App() {
  // const [text, setText] = useState({ "cell0": "-", "cell1": "-", "cell2": "-", "cell3": "-" })
  const [title0, setTitle0] = useState('-');
  const [title1, setTitle1] = useState('-');
  const [title2, setTitle2] = useState('-');
  const [title3, setTitle3] = useState('-');
  const [title4, setTitle4] = useState('-');
  const [title5, setTitle5] = useState('-');
  const [title6, setTitle6] = useState('-');
  const [title7, setTitle7] = useState('-');
  const [title8, setTitle8] = useState('-');
  const [disable, setDisable] = useState(false)
  const [tries, setTries] = useState(1)
  const [win, setWin] = useState(0)
  const [user, setUser] = useState(Math.floor(Math.random()*2)+1);
  const [display, setDisplay] = useState('')
  const [array, setArray] = useState([[0, 0, 0], [0, 0, 0], [0, 0, 0]])
  

  const iterate = (e) => {
    let cell = -1
    // console.log("Hello row val"+row)

    if (tries === 1) {
      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
          cell++
          // console.log("e"+e);
          if (cell === e) {
            if (array[i][j] === 1 || array[i][j] === 2) {
              setDisplay("Already selected");
              console.log("Selected");
            } else {

              //  let cellname="cell"+e.toString()
              //  console.log(cellname);
              //  console.log("Before"+text.cell0 );
              //  text.cell0='X';
              //  setTitle0("X");
              //  console.log("after"+text.cell0 );

              if (user === 1) {
                array[i][j] = 1;
                setArray(array);
                titleSetting(e, 'X');
                setTries(0);

                checking();
                turnOver();
              } else {
                array[i][j] = 2;
                setArray(array);
                titleSetting(e, '0');
                setTries(0);
                checking();
                turnOver();

              }

              


            }

          }
          console.log("cell :" + cell);
          console.log(array[i][j]);

        }

      }

    } else {
      setDisplay("No Try left press turn over to move turn to other player")
    }
    setArray(array);
  }
  const buttonPressed = (e) => {
    console.log(e);
    // if(tries===1){
    //   iterate(e);
    // }
    iterate(e);
  }
  const checking = () => {
    if (!straight()) {
      console.log("INN")
      if (!topDown()) {
        console.log("In")
        if (!rightDiagonal()) {
          if (!leftDiagonal()) {
            let count = 0;
            for (let i = 0; i < array.length; i++) {

              for (let j = 0; j < array[0].length; j++) {
                if (array[i][j] === 0) {
                  count++
                }
              }
            }
            if (count === 0) {
              console.log("Draw");
              setWin(3);
              setDisable(true);
            }
          }
        }
      }
    }
  }
  const leftDiagonal = () => {
    let user1 = 0
    let user2 = 0
    console.log("LEFT DIAGONAL")
    let j = 0;
    for (let i = array.length - 1; i >= 0; i--) {
      // console.log("i::::"+i)
      // console.log("j::::"+j)
      if (array[j][i] === 0) {

        break;
      } else if (array[j][i] === 1) {
        user1++
      } else {
        user2++
      }
      j++;
      console.log("USer1 : " + user1);
      console.log("USer2 : " + user2);
      if (user1 >= 3) {
        setWin(1);
        setDisable(true);
        return true
      }
      if (user2 >= 3) {
        console.log("Player2 Wins")
        setWin(2);
        setDisable(true);
        return true;
      }
    }
    return false;

  }
  const rightDiagonal = () => {
    let user1 = 0
    let user2 = 0
    console.log("DIAGONAL")
    for (let i = 0; i < array.length; i++) {
      if (array[i][i] === 0) {

        break;
      } else if (array[i][i] === 1) {
        user1++
      } else {
        user2++
      }

      console.log("USer1 : " + user1);
      console.log("USer2 : " + user2);
      if (user1 >= 3) {
        setWin(1);
        setDisable(true);
        return true
      }
      if (user2 >= 3) {
        console.log("Player2 Wins")
        setWin(2);
        setDisable(true);
        return true;
      }
    }
    return false;

  }
  const topDown = () => {
    for (let i = 0; i < array[0].length; i++) {
      let user1 = 0;
      let user2 = 0;
      for (let j = 0; j < array[i].length; j++) {
        if (array[j][i] === 0) {

          break;
        } else if (array[j][i] === 1) {
          user1++
        } else {
          user2++
        }
      }

      // console.log("USer1 : " + user1);
      // console.log("USer2 : " + user2);
      if (user1 >= 3) {
        setWin(1);
        setDisable(true);
        return true
      }
      if (user2 >= 3) {
        console.log("Player2 Wins")
        setWin(2);
        setDisable(true);
        return true;
      }
    }
    return false;

  }
  const straight = () => {
    for (let i = 0; i < array.length; i++) {
      let user1 = 0;
      let user2 = 0;
      for (let j = 0; j < array[i].length; j++) {
        if (array[i][j] === 0) {

          break;
        } else if (array[i][j] === 1) {
          user1++
        } else {
          user2++
        }

      }
      console.log("USer1 : " + user1);
      console.log("USer2 : " + user2);
      if (user1 >= 3) {
        setWin(1);
        setDisable(true);
        return true
      }
      if (user2 >= 3) {
        console.log("Player2 Wins")
        setWin(2);
        setDisable(true);
        return true;
      }
    }
    return false;
  }
  const turnOver = () => {
    setDisplay('')
    if (user === 1) {
      setUser(2);
      setTries(1)
    } else {
      setUser(1);
      setTries(1)

    }
  }

  const startNewGame = () => {
    setTitle0('-');
    setTitle1('-');
    setTitle2('-');
    setTitle3('-');
    setTitle4('-');
    setTitle5('-');
    setTitle6('-');
    setTitle7('-');
    setTitle8('-');
    setDisable(false);
    setTries(1);
    setWin(0);
    setUser(Math.floor(Math.random()*2)+1);
    setDisplay('');
    setArray([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
  }
  const titleSetting = (e, value) => {
    switch (e) {
      case 0:
        setTitle0(value);
        break;
      case 1:
        setTitle1(value);
        break;
      case 2:
        setTitle2(value);
        break;
      case 3:
        setTitle3(value);
        break;
      case 4:
        setTitle4(value);
        break;
      case 5:
        setTitle5(value);
        break;
      case 6:
        setTitle6(value);
        break;
      case 7:
        setTitle7(value);
        break;
      case 8:
        setTitle8(value);
        break;
      default:
        break;
    }
  }
  const grid = (
    <View>
      <View style={styles.grid}>
        <View style={styles.button}><Button  disabled={disable} id="0" color={title0 === '-' ? "" : title0 === "X" ? "red" : "green"} onPress={() => buttonPressed(0)} title={title0} /></View>
        <View style={styles.button}><Button disabled={disable} id="1" color={title1 === '-' ? "" : title1 === "X" ? "red" : "green"} onPress={() => buttonPressed(1)} title={title1} /></View>
        <View style={styles.button}><Button disabled={disable} id="2" color={title2 === '-' ? "" : title2 === "X" ? "red" : "green"} onPress={() => buttonPressed(2)} title={title2} /></View>
      </View>
      <View style={styles.grid}>
        <View style={styles.button}><Button disabled={disable} id="3" color={title3 === '-' ? "" : title3 === "X" ? "red" : "green"} onPress={() => buttonPressed(3)} title={title3} /></View>
        <View style={styles.button}><Button disabled={disable} id="4" color={title4 === '-' ? "" : title4 === "X" ? "red" : "green"} onPress={() => buttonPressed(4)} title={title4} /></View>
        <View style={styles.button}><Button disabled={disable} id="5" color={title5 === '-' ? "" : title5 === "X" ? "red" : "green"} onPress={() => buttonPressed(5)} title={title5} /></View>
      </View>
      <View style={styles.grid}>
        <View style={styles.button}><Button disabled={disable} id="6" color={title6 === '-' ? "" : title6 === "X" ? "red" : "green"} onPress={() => buttonPressed(6)} title={title6} /></View>
        <View style={styles.button}><Button disabled={disable} id="7" color={title7 === '-' ? "" : title7 === "X" ? "red" : "green"} onPress={() => buttonPressed(7)} title={title7} /></View>
        <View style={styles.button}><Button disabled={disable} id="8" color={title8 === '-' ? "" : title8 === "X" ? "red" : "green"} onPress={() => buttonPressed(8)} title={title8} /></View>
      </View>
      <View style={styles.grid}>
        <Button disabled={!(disable)} onPress={startNewGame} title="Start New Game" />
      </View>
    </View>

  );

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Tic Tac Toe Game</Text>
      <Text style={styles.paragraph}>{win === 1 ? "Player 1 Wins " : win === 2 ? "Player 2 Wins" : win === 3 ? "Game Draw" :user === 1 ? "Player 1 Turn " : "Player 2 Turn" }</Text>
      <View>
        {grid}
      </View>
      <Text>{display}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  grid: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10
  },
  button: {
    // width:60,
    // backgroundColor:'#ff5c5c',
    // marginRight:10,
    // texcolor: "white", 
    padding: 10, color: "red",
    width:100

  }
  ,
  paragraph: {
    marginBottom: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});