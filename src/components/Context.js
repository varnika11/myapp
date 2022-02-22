import React, {useState, useContext } from "react";
import axios from "axios"

const table = {
    sports :21,
    history : 23,
    politics : 24,
}

const API_ENDPOINT = "https://opentdb.com/api.php?";

const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [waiting, setwaiting] = useState(true);
    const [loading, setloading] = useState(false);
    const [questions, setquestions] = useState([]);
    const [index, setIndex] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [error, seterror] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [Quiz, setQuiz] = useState ( {
        amount: 10,
        category: "sports",
        diffculty: "easy",
    });
    // const [isModalOpen, setIsModalOpen] = useState(false);

    const fecthquestions = async (url) => {
        setloading(true);
        setwaiting(false);
        const response = await axios(url).catch((err) => console.log(err));
        console.log(response);
        if (response) {
            
            const data = response.data.results;
            if(data.length > 0) {
                setquestions(data);
                setloading(false);
                setwaiting(false);
                seterror(false)
            } else {
                setwaiting(true);
                seterror(true)
            }
        } else {
            setwaiting(true);
        }
    };
     const nextquestion = () => {
         setIndex ((oldIndex) => {
             const index = oldIndex + 1;
             if(index > questions.length - 1) {
                 openModal();
                 return 0
             } else {
                 return index;
             }
         });
     };
      const openModal =() => {
          setIsModalOpen(true);
      }

      const checkAnswer = (value) => {
          if(value) {
              setCorrect((oldstate) => oldstate + 1)
          }
          nextquestion();
      };

      const closeModel = () => {
          setwaiting(true);
          setCorrect(0);
          setIsModalOpen(false);
      };

      const handleChange = (e) => {
          const {name, value} = e.target;
          setQuiz({...Quiz, [name]: value });
      };
      const handlesubmit = (e)=> {
          e.preventDefault();
          const {amount, category, diffculty} = Quiz;

          const url = `${API_ENDPOINT}amount=${amount}&diffculty=${diffculty}&category=${table[category]}&type=multiple`
          fecthquestions(url)
          
      }
      return (
          <AppContext.Provider value={{
              waiting,
              loading,
              questions,
              index,
              correct,
              error,
              isModalOpen,
              nextquestion,
              checkAnswer,
              closeModel,
              Quiz,
              handleChange,
              handlesubmit,

          }}>
              {
                  children
              }
              </AppContext.Provider>
      )
};

export const useGlobalContext= () => {
    return useContext(AppContext);
}

export {AppContext, AppProvider}