import React, {useState} from "react";
import Question from "./Question";
import {Box, Button, Stack} from "@mui/material";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import classes from './Questions.module.css';
import QuestionData from "../models/questionData";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;
import AnswerData from "../models/answerData";
import FormData from "../models/formData";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    borderTop: '10px solid #01BCD6',
    width: '100%'
}));

const Questions: React.FC<{QuestionsData: QuestionData[]}> = ({QuestionsData}) => {
    const [formObject, setFormObject] = useState<FormData[]>([]);

    const submitFormHandler = (event: React.FormEvent) => {
        event.preventDefault();
        let isValid: boolean = true;

        for (let question of QuestionsData) {
            if (question.required && !formObject.find((item: FormData) => item.questionID != question.id)) {
                isValid = false;
            }
        }

        if (isValid) {
            console.log('form ok');
        }
        else {
            console.log('form not valid');
        }
    }

    const onRadioChange = (question: QuestionData, answer: AnswerData) => {
        if (question.required) {
            const formData: FormData[] = [];

            if (formObject.find((item: FormData) => item.questionID != question.id)) {
                formData.push(formObject.filter((item: FormData) => item.questionID != question.id)[0]);
            }
            formData.push({
                questionID: question.id,
                answer: answer.title
            });

            setFormObject(formData);
        }
    }

    return (
        <div className={classes.container}>
            <Box sx={{ width: '100%' }}>
                <form onSubmit={submitFormHandler}>
                    <Stack spacing={2}>
                        <Item>
                            <div className={classes.header}>GoTech Questionnaire</div>
                            <div className={classes.subHeader}>Show me what you got!</div>
                            <div className={classes.error}>* Required</div>
                        </Item>
                        {
                            QuestionsData.map((question) => (
                                <Question question={question} key={question.id} onRadioChange={onRadioChange} />
                            ))
                        }
                    </Stack>
                    <Button type="submit" variant="contained">Submit</Button>
                </form>
            </Box>
        </div>
    )
}

export default Questions;
