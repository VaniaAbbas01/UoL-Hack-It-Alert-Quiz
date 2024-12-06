import { StatusBar} from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { useState } from 'react';

export default function App() {
  let trivia = [
    {
      "question":"A polar bear's hair is transparent, not white.",
      "answers":[
        "True",
        "False"
      ],
      "correct":0
    },
    {
      "question":"What is Sweden's capital city?",
      "answers":[
        "Malmö",
        "Stockholm"
      ],
      "correct":1
    }
  ]

  function startQuiz(index, internalScore) {
    if(index==0)
      setScore(0);

    let ourQuestion = trivia[index]; // the current question object
    let buttons = []; // we’ll fill this with buttons, based on answers

    for(let answer_index in ourQuestion.answers) {
      buttons.push(
        {
          text: ourQuestion.answers[answer_index],
          onPress: () => {
            // come back later
            if(answer_index == ourQuestion.correct) {
              internalScore = internalScore + 1;
              setScore(internalScore);
            }
            if(index < trivia.length -1) {
              startQuiz(index + 1, internalScore);
            }
            else {
              Alert.alert(
                `Well done!`,
                `You scored ${internalScore}`,
                [
                  {
                    text: "Start again",
                    onPress: () => setScore(-1),
                    style: "cancel",
                  },
                ]
              );
            }
          }
        }
      )
    }

    Alert.alert(
      `Question ${index+1}`,
      `${ourQuestion.question}`,
      buttons,
    );
  }
  const [score, setScore] = useState(-1);
  if (score == -1) {
    // start game screen
    return (
      <View style={styles.container}>
      <Text>Trivia Quiz</Text>
      <Text>Are you ready for some trivia?</Text>
      <Button title="I'm Ready" onPress={()=>startQuiz(0,0)}/>
    </View>
  
    );
  }else {
    // in game screen
    return (
      <View style={styles.gameScreen}>

      </View>
  
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameScreen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom:100
  }
});
