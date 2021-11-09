import React, { Component } from 'react'
import ls from 'local-storage'
import './cssQuiz.css'
// import './style.css'
import QuestionBox from './components/QuestionBox'
import { getPostById, createProposal, createNotification } from '../../Actions'
import qs from 'qs'
import config from '../../config'
const {displayNameSettings, cloudinary} = config

//render raw HTML from question data 
const RawHTML = (props) => <span dangerouslySetInnerHTML={{__html: props.html}}></span>;

class QuestionImage extends React.Component {
  constructor(props) {
    super(props);

    this.imgRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.imgRef.current && prevProps.img.src !== this.props.img.src) {
      this.imgRef.current.classList.add('fade-in');

      let timer = setTimeout(() => {
        this.imgRef.current.classList.remove('fade-in');
        clearTimeout(timer);
      }, 1000)
    }
  }

  render() {
    return (
      <img ref={this.imgRef} className="img-fluid" src={this.props.img.src} alt={this.props.img.alt} />
    );
  }
}

const QuizProgress = (props) => {
  return (
    <div className="progress">
      <p className="counter">
        <span>Question {props.currentQuestion+1} of {props.questionLength}</span>
      </p>
      <div className="progress-bar" style={{'width': ((props.currentQuestion+1) / props.questionLength) * 100 + '%'}}></div>
    </div>
  );
}

const Results = (props) => {
  return (
    <div className="results fade-in">
      <h1>Your score: {((props.correct/props.questionLength) * 100).toFixed()}%</h1>
      <button type="button" onClick={props.startOver}>Try again <i className="fas fa-redo"></i></button>
    </div>
  );
}

export class Quiz extends React.Component {
  constructor(props) {
    super(props);

    this.updateAnswer = this.updateAnswer.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.getResults = this.getResults.bind(this);
    this.startOver = this.startOver.bind(this);

    this.state = {
        postId: '',
      createrUserId: '',
      questionnaireSelected: false,
      postId: '',
      userId: '',
      questionnaire: [],
      score: 0,
      responses: 0,
      givenAns: {},
      currentPage: 1,
      perpage: 2,
      pgStart: 0,
      pgEnd: 0,

      currentQuestion: 0,
      correct: 0,
      inProgress: true,
      questions: [{
        question: "<em>A Raisin in the Sun</em> was the first play by an African-American woman to be produced on Broadway. Who was the playwright?",
        options: [{
          option: "Lorraine Hansberry",
          correct: true
        }, {
          option: "Gwendolyn Brooks",
          correct: false
        }, {
          option: "Maya Angelou",
          correct: false
        }],
        img: {
          src: 'https://interactive.wttw.com/sites/default/files/dusable-to-obama_raisin-in-the-sun.jpg',
          alt: 'Characters in A Raisin in the Sun'
        },
        feedback: "Lorraine Hansberry's (1930–1965) play opened in 1959 to critical acclaim and was a huge success. The play is about a black family who faces racism when moving into an all-white suburb. The play is drawn from a similar experience in Hansberry’s early life.",
        moreUrl: 'https://interactive.wttw.com/dusable-to-obama/hansberrys-victory'
      }, {
        question: "The internationally famous Harlem Globetrotters basketball team started with players from which Chicago High School?",
        options: [{
          option: "Wendell Phillips High School",
          correct: true
        }, {
          option: "Lincoln Park High School",
          correct: false
        }, {
          option: "DuSable High School",
          correct: false
        }],
        img: {
          src: 'https://interactive.wttw.com/sites/default/files/dusable/riots_renaissance_thumb_5.jpg',
          alt: 'A Harlem Globetrotter holding a basketball in each hand'
        },
        feedback: "The athletes who would become Harlem Globetrotters first played together as students at Wendell Phillips High School on the south side of Chicago. Later, they played as a team under the banner of the South Side's Giles Post of the American Legion and then as the Savoy Big Five before taking on their current name. The team was based in Chicago for 50 years, from 1926 through 1976.",
        moreUrl: 'https://interactive.wttw.com/dusable-to-obama/harlem-globetrotters'
      }, {
        question: "What Chicagoan is known as the father of Gospel Music?",
        options: [{
          option: "Theodore R. Frye",
          correct: false
        }, {
          option: "Thomas A. Dorsey",
          correct: true
        }, {
          option: "Langston Hughes",
          correct: false
        }],
        img: {
          src: 'https://interactive.wttw.com/sites/default/files/dusable-to-obama_thomas-dorsey.jpg',
          alt: 'Thomas Andrew Dorsey'
        },
        feedback: "Thomas Andrew Dorsey (1899–1993) is widely known as the father of gospel music. The prolific composer wrote more than 1,000 songs, and created an uniquely American musical art form.",
        moreUrl: 'https://interactive.wttw.com/dusable-to-obama/dorseys-gospel'
      }, {
        question: "Which of these African-American women ran for the office of president of the United States?",
        options: [{
          option: "Political activist Lenora Fulani",
          correct: false
        }, {
          option: "Congresswoman Shirley Chisholm",
          correct: false
        }, {
          option: "Senator Carol Moseley-Braun",
          correct: false
        }, {
          option: "All of the above",
          correct: true
        }, {
          option: "None of the above",
          correct: false
        }],
        img: {
          src: 'https://interactive.wttw.com/sites/default/files/dusable/achieving_dream_thumb_9.jpg',
          alt: 'Carol Moseley-Braun'
        },
        feedback: "Congresswoman Shirley Chisholm ran for the Democratic nomination in 1972; political activist Lenora Fulani ran in 1988 and was the first African-American independent, as well as the first female presidential candidate on the ballot in all 50 states; and Senator Carol Moseley-Braun kicked off her Democratic presidential campaign in 2003 by saying, \"It's time to take the 'men only' sign off the White House door.\"",
        moreUrl: 'https://interactive.wttw.com/dusable-to-obama/carol-moseley-braun'
      }, {
        question: "Who was Oscar Stanton De Priest?",
        options: [{
          option: "The first Catholic priest in Chicago",
          correct: false
        }, {
          option: "The co-owner of Oscar Meyer and Company",
          correct: false
        }, {
          option: "A United States congressman",
          correct: true
        }],
        img: {
          src: 'https://interactive.wttw.com/sites/default/files/dusable-to-obama_oscar-stanton-de-priest.jpg',
          alt: 'Oscar Stanton De Priest'
        },
        feedback: "Oscar De Priest, U.S. representative from Illinois, was the first African-American elected to Congress in the 20th century, ending a 28-year absence of black representatives.",
        moreUrl: 'https://interactive.wttw.com/dusable-to-obama/carol-moseley-braun'
      }, {
        question: "What musical artist was part of Chicago's Black Renaissance?",
        options: [{
          option: "Louis Armstrong",
          correct: false
        }, {
          option: "Nat \"King\" Cole",
          correct: true
        }, {
          option: "Curtis Mayfield",
          correct: false
        }],
        img: {
          src: 'https://interactive.wttw.com/sites/default/files/dusable-to-obama_nat-king-cole.jpg',
          alt: 'Nat King Cole'
        },
        feedback: "In 1934, Nat King Cold won a talent competition sponosored by the <em>Chicago Defender</em>. He and other competition winners were awarded turkeys for Thanksgiving. Nat King Cole was part of Chicago's Black renaissance.",
        moreUrl: 'https://interactive.wttw.com/dusable-to-obama/dorseys-gospel'
      }, {
        question: "Gwendolyn Brooks was:",
        options: [{
          option: "the first black woman to win a Pulitzer Prize in poetry.",
          correct: false
        }, {
          option: "a former Illinois poet laureate.",
          correct: false
        }, {
          option: "a poet largely associated with the South Side of Chicago.",
          correct: false
        }, {
          option: "all of the above",
          correct: true
        }],
        img: {
          src: 'https://interactive.wttw.com/sites/default/files/dusable-to-obama_gwendolyn-brooks.jpg',
          alt: 'Gwendolyn Brooks'
        },
        feedback: "Gwendolyn Brooks (1917–2000) is a jewel in Chicago’s literary history. She was a writer best known for her poetry describing life in the South Side community in which she lived."
      }]
    }
  }

  updateAnswer(e) {
    //record whether the question was answered correctly
    let answerValue = e.target.value;

    this.setState((prevState, props) => {
      let stateToUpdate = prevState.questions;
      //convert boolean string to boolean with JSON.parse()
      stateToUpdate[prevState.currentQuestion].answerCorrect = JSON.parse(answerValue);

      return {questions: stateToUpdate};
    });
  }

  checkAnswer(e) {
    //display to the user whether their answer is correct
    this.setState((prevState, props) => {
      let stateToUpdate = prevState.questions;
      stateToUpdate[prevState.currentQuestion].checked = true;

      return {questions: stateToUpdate};
    });
  }

  nextQuestion(e) {
    //advance to the next question
    this.setState((prevState, props) => {
      let stateToUpdate = prevState.currentQuestion;

      return {currentQuestion: stateToUpdate+1};
    }, () => {
      this.radioRef.current.reset();
    });
  }

  getResults() {
    //loop through questions and calculate the number right
    let correct = this.state.correct;

    this.state.questions.forEach((item, index) => {
      if (item.answerCorrect) {
        ++correct;
      }

      if (index === (this.state.questions.length-1)) {
        this.setState({
          correct: correct,
          inProgress: false
        });
      }
    });
  }

  startOver() {
    //reset form and state back to its original value
    this.setState((prevState, props) => {
      let questionsToUpdate = prevState.questions;

      questionsToUpdate.forEach(item => {
        //clear answers from previous state
        delete item.answerCorrect;
        delete item.checked;
      });

      return {
        inProgress: true,
        correct: 0,
        currentQuestion: 0,
        questions: questionsToUpdate
      }
    });
  }

  componentDidMount() {
    let search = this.props.history.location.search
    if (search.length && search[0] === '?') {
      search = search.substr(1, search.length)
      search = qs.parse(search)
    }

    const { amount = '', hours = '', message = '' } = search

    const postId = this.props.match.params.postId

    const filter = {
      offset: 0,
      limit: 1,
      skip: 0,
      fields: {
        postId: true,
        questionnaireSelected: true,
        questionnaire: true,
        userId: true,
        passingQuesCount:true

      }
    }

    getPostById(postId, filter, (err, res) => {
      console.log('check post :', err, res)
      if (err) {
        alert(err)
        return
      }
      if (res) {
        if (res.postId === postId) {
          this.setState({
            postId: (res.postId || ''),
            createrUserId: (res.userId || ''),
            questionnaire: (res.questionnaire || []),
            questionnaireSelected: (res.questionnaireSelected || ''),
            postId: (res.postId || ''),
            userId: ls.get('userId'),
            pgStart: 0,
            pgEnd: (res.questionnaire.length > this.state.perpage ? this.state.perpage : res.questionnaire.length),
            amount: amount,
            hours: hours,
            message: message,
            passingQuesCount:res.passingQuesCount
          })
        }
      }
    })


    //since we're re-using the same form across questions,
    //create a ref to it so we can clear its state after a question is answered
    this.radioRef = React.createRef();
  }

  render() {
    if (!this.state.inProgress) {
      return (
        <section className="quiz">
          <Results correct={this.state.correct} questionLength={this.state.questions.length} startOver={this.startOver} />
        </section>
      );
    }

    return (
      <section style={{margin:10, padding:10}} className="quiz fade-in" aria-live="polite">
        <QuizProgress currentQuestion={this.state.currentQuestion} questionLength={this.state.questions.length} />
        <div className="question-container">
          {/* {this.state.questions[this.state.currentQuestion].img.src &&
            <QuestionImage img={this.state.questions[this.state.currentQuestion].img} />
          } */}
          <p className="question"><RawHTML html={this.state.questions[this.state.currentQuestion].question} /></p>

          <form ref={this.radioRef}>
            {this.state.questions[this.state.currentQuestion].options.map((item, index) => {
              return <div key={index}
                      className={"option" + (this.state.questions[this.state.currentQuestion].checked && !item.correct ? ' dim' : '') + (this.state.questions[this.state.currentQuestion].checked && item.correct ? ' correct' : '')}>
                      <input id={"radio-"+index} onClick={this.updateAnswer} type="radio" name="option" value={item.correct}
                          disabled={this.state.questions[this.state.currentQuestion].checked} />
                        <label htmlFor={"radio-"+index}><RawHTML html={item.option}/></label>
                    </div>
              })}
          </form>

          <div className="bottom">
            {this.state.questions[this.state.currentQuestion].feedback && this.state.questions[this.state.currentQuestion].checked
              && <div className="fade-in">
                <p>
                  <RawHTML html={this.state.questions[this.state.currentQuestion].feedback} />
                  {this.state.questions[this.state.currentQuestion].moreUrl &&
                    <React.Fragment>
                       &nbsp;<a target="_blank" href={this.state.questions[this.state.currentQuestion].moreUrl}>Learn more</a>.
                    </React.Fragment>
                  }
                </p>
              </div>
            }

            {!this.state.questions[this.state.currentQuestion].checked &&
               <button type="button" onClick={this.checkAnswer}
               disabled={!('answerCorrect' in this.state.questions[this.state.currentQuestion])}>Check answer</button>
             }

            {(this.state.currentQuestion+1) < this.state.questions.length && this.state.questions[this.state.currentQuestion].checked &&
              <button className="fade-in next" type="button" onClick={this.nextQuestion}>Next <i className="fa fa-arrow-right"></i></button>
            }
          </div>

          {(this.state.currentQuestion+1) === this.state.questions.length && this.state.questions[this.state.currentQuestion].checked &&
            <button type="button" className="get-results pulse" onClick={this.getResults}>Get Results</button>
          }
        </div>
      </section>
    )
  }
}


