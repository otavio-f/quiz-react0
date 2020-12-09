import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      questionary: [
        {
          question: "What animal barks?",
          answers: ["Dog", "Cat"],
          rightAnswer: "Dog",
          playerChoice: null
        },
        {
          question: "What animal is more closely related to a tiger?",
          answers: ["Dog", "Cat"],
          rightAnswer: "Cat",
          playerChoice: null
        },
        {
          question: "What animal is more closely related to a wolf?",
          answers: ["Dog", "Cat"],
          rightAnswer: "Dog",
          playerChoice: null
        },
        {
          question: "What animal is best known for playing fetch?",
          answers: ["Dog", "Cat"],
          rightAnswer: "Dog",
          playerChoice: null
        }
      ]
    }
    this.answerQuestion = this.answerQuestion.bind(this);
  }

  answerQuestion(index, choice) {
    const answeredQuestion = this.state.questionary[index];
    answeredQuestion.playerChoice = choice;
    const allQuestions = this.state.questionary;
    allQuestions[index] = answeredQuestion;
    this.setState({
      questions: allQuestions
    }, () => {
      this.updatescore();
    });
  }

  updatescore() {
    const score = this.state.questionary.filter(q => q.rightAnswer === q.playerChoice).length;
    this.setState({ score });
    console.log("New player score:", score);
  }

  displayResult(index) {
    const question = this.state.questionary[index];
    if (!question.playerChoice) { return; }
    if (question.playerChoice === question.rightAnswer) {
        return (
          <p className="result-correct">
            Your answer is correct!
          </p>
        );
    } else {
      return (
        <p className="result-incorrect">
          Your answer is incorrect!
        </p>
      );
    }
  }

  displayQuestion(index) {
    if (this.state.score < index) { return; }
    const question = this.state.questionary[index];
    return (
      <div className="question-display">
        <p className="question">
          {question.question}
        </p>
        <br />
        <button className="question-choice" onClick={() => this.answerQuestion(index, question.answers[0])}>
          {question.answers[0]}
        </button>
        <button className="question-choice" onClick={() => this.answerQuestion(index, question.answers[1])}>
          {question.answers[1]}
        </button>
        <br />
        {this.displayResult(index)}
      </div>
    );
  }
  
  render() {
    return (
      <div className="App">
        <h1>Quiz Show!</h1>
        <hr/>
        {this.displayQuestion(0)}
        {this.displayQuestion(1)}
        {this.displayQuestion(2)}
        {this.displayQuestion(3)}
      </div>
    );
  }
}

export default App;
