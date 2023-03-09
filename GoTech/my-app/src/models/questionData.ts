import AnswerData from "./answerData";

class QuestionData {
    id: number;
    title: string;
    type: string;
    required: boolean;
    answers: AnswerData[]

    constructor() {
        this.title = "";
        this.id = -1;
        this.type = "";
        this.required = true;
        this.answers = []
    }
}

export default QuestionData;
