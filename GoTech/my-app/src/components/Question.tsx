import React, {useState} from "react";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import {Box, FormControlLabel, Radio, RadioGroup, Stack, TextField} from "@mui/material";
import classes from "./Question.module.css";
import QuestionData from "../models/questionData";
import AnswerData from "../models/answerData";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    width: '100%'
}));

const Question: React.FC<{question: QuestionData, onRadioChange: (question: QuestionData ,answer: AnswerData) => void}> = ({question, onRadioChange}) => {
    const [specialQuestion, setSpecialQuestion] = useState({show: false, title: ''});

    const checkSpecialAnswer = (event: any, answer: AnswerData) => {
        if (event.target.value == 2 && answer.title === 'TypeScript') {
            setSpecialQuestion({show: true, title: answer.title});
        }
        else {
            setSpecialQuestion({show: false, title: ''});
        }
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Stack spacing={2}>
                <Item>
                    <div className={classes.title}>
                        <span>{question.title}</span>
                        {
                            question.required && <span className={classes.error}>*</span>
                        }
                    </div>
                    {
                        question.type === 'radio' &&
                        <>
                            <RadioGroup>
                                {
                                    question.answers.map((answer) => (
                                        <React.Fragment key={Math.random()}>
                                            <FormControlLabel value={answer.id} key={answer.id} onChange={
                                                (event) => {
                                                    checkSpecialAnswer(event, answer);
                                                    onRadioChange(question, answer);
                                                }
                                            } control={<Radio />} label={answer.title} />
                                            {
                                                answer.isOpen &&
                                                <TextField id="standard-basic" label="Your answer" variant="standard" />
                                            }
                                        </React.Fragment>
                                    ))
                                }
                            </RadioGroup>
                            {
                                specialQuestion.show &&
                                <TextField id="standard-basic" label={'why do you like' + specialQuestion.title + '?'} variant="standard" />
                            }
                        </>
                    }
                    {
                        question.type === 'text' &&
                        <TextField id="standard-basic" label="Your answer" variant="standard" />
                    }
                </Item>
            </Stack>
        </Box>
    )
}

export default Question;
