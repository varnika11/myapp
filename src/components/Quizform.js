import React from "react";
import { useGlobalContext } from "./Context";

const Quizform = () => {
    const {Quiz, handleChange, handlesubmit, error} = useGlobalContext();
    console.log(Quiz, handleChange, handlesubmit, error)
    
    return (
        <section className ="quiz quiz-small">
        <form >
        <h2 style={{marginBottom: "2rem"}}>Let's start quiz </h2>
        <div className="mb-3">
            <label htmlFor="category">category</label>
            <select 
            className="form-select"
            name="category"
            id="category"
            defaultValue={Quiz.category}
            onChange={handleChange}
            >
            <option value="sports">sports</option>
            <option value="history">history</option>
            <option value="politics">politics</option>
            </select>
        </div>
         <div className="mb-3">
         <label htmlFor="noofquestion">No of questions</label>
         <input 
         type="number"
         name="amount"
         className="form-control"
         defaultValue={Quiz.amount}
         onChange={handleChange}
         min={1}
         max={50}
         style={{width: "400px"}}
         />
     </div>
       <div className="mb-3">
       <label htmlFor="diffculty">diffculty</label>
       <select 
       className="form-select"
       name="diffculty"
       id="diffculty"
       defaultValue={Quiz.diffculty}
       onChange={handleChange }
       >
            <option value="easy">easy</option>
            <option value="meduim">medium</option>
            <option value="hard">hard</option>
            </select>
            </div>
            {error && (
                <p className="error">
                    can't generate questions, please try again
                </p>
            )}
            <button
             type="submit"
             onClick={handleChange}
             className="btn btn-primary start-btn"
            >
               start
            </button>

        </form>
        </section>
      );
    };

    export default Quizform;
