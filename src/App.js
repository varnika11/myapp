import React from 'react';
import Quizform from "./components/Quizform";
import {useGlobalContext} from "./components/Context"
import Loading from './components/Loading';
import { Modal } from '@material-ui/core';
const App = ()  => {
  const {
    waiting,
    loading,
    questions,
    index,
    correct,
    nextquestion,
    checkanswer
  } = useGlobalContext();

  if(waiting) {
    return <Quizform />
  }
  if (loading) {
    return  <Loading />
  }
  const {question, incorrect_answers,correct_answer} = questions[index];
  let answers = [...incorrect_answers];
  const tempIndex = Math.floor((Math.random) * 4);
  if(tempIndex === 3) {
    answers.push(correct_answer)
  } else {
    answers.push(answers[tempIndex]);
    answers[tempIndex] = correct_answer
  }
  return (
    <main>
      <Modal />
      <section className="quiz">
        <p>correct Answer: {correct}/{index}</p>
        <article className="contanier">
           <h2 dangerouslySetInnerHTML={{ _html: question}}/>
           <div>
             {answers.map((answer, index) => {
               return (
                 <>
                 <button
                   key = {index}
                   style = {{width: "60%", textAlign: "center"}}
                   className="btn btn-info answer-btn"
                   onClick={() => checkanswer(correct_answer === answer)}
                    dangerouslySetInnerHTML={{ _html: answer}} />

                 
                 </>
               )
             })}
           </div>
        </article>
        <button className="btn btn-warning next-question" style={{width: "20%", marginRight: "1rem", onClick:{nextquestion}}}>
         Next Question
        </button>
      </section>
    </main>
  );
};

export default App;
