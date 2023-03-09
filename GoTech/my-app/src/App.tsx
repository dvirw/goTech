import React, {useState} from 'react';
import './App.css';
import {useCallback, useEffect} from "react";
import Questions from "./components/Questions";

function App() {
  const [questionsData, setQuestionsData] = useState([]);

  const fetchQuestionnairesHandler = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3000/questionnaires/1');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      setQuestionsData(data.questions);
      console.log(data.questions);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchQuestionnairesHandler();
  }, [fetchQuestionnairesHandler]);

  return (
    <div className="App">
      <Questions QuestionsData={questionsData} />
    </div>
  );
}

export default App;
