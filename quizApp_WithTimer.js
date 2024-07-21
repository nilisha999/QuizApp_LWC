import { LightningElement, track } from 'lwc';

export default class QuizApp_WithTimer extends LightningElement {
    @track openModal = false; // track start quiz state
    @track endQuiz = false; // track end quiz
    @track currentQueNo = 0; // track the Current que No
    @track score = 0;   // Track correct Answer score
    @track wrongAns = 0; // Track Wrong Answer score
    @track nextQueNo = 0;
    @track showNextQue = false;
    @track showSecModal = false;
    @track showResult = false;
    @track result = 0;

    @track timeLeft = 0; // To Track Time Left
    timer;


    // Start Quiz state
    startQuizButton() {
        this.openModal = true;
        this.startTimer();
    }

    queArr = [
        {
            question: 'What is the Capital of India ?',
            options: [
                { id: '1', text: 'Delhi' },
                { id: '2', text: 'Mumbai' },
                { id: '3', text: 'Kolkata' },
                { id: '4', text: 'Jaipur' }
            ],
            correctAnswer: '1'
        },
        {
            question: 'What is the Formula of Time',
            options: [
                { id: '1', text: 'Time = Distance / Velocity' },
                { id: '2', text: 'Time = Distance / Speed' },
                { id: '3', text: 'Time = Distance / Acceleration' },
                { id: '4', text: 'Time = Distance / Kinetic Energy' }
            ],
            correctAnswer: '3'
        },
        {
            question: 'From where Indus River Orginated ?',

            options: [
                { id: '1', text: 'Bhopal' },
                { id: '2', text: 'Gorakhpur' },
                { id: '3', text: 'Kanpur' },
                { id: '4', text: 'Ujjain' }
            ],
            correctAnswer: '2'
        }

    ]


    // step 1 : Get Current quetion index no
    // Get the current question index no
    get currentQues() {
        // console.log('currentQues No - nilisha : ', this.currentQueNo);
        return this.queArr[this.currentQueNo];
        //  return this.queArr[0] = (this.currentQueNo = 0)
    }

    // step 2 : Get the current options
    // Get the current options
    get currentOptions() {
        //console.log('currentOptions - nilisha : ', this.queArr[this.currentQueNo].options);
        return this.queArr[this.currentQueNo].options;
    }

    // Step 3 : For each Selected Options
    handleOptionClick(event) {

        // Get the Selected Option
        const selectedOption = event.target.value;
        //console.log('selectedOption - nilisha : ', selectedOption);
        if (selectedOption === this.queArr[this.currentQueNo].correctAnswer)
        // SelectedOption === this.queArr[0].1 (this.QueArr[0].Delhi)
        {
            this.score++; // Increment the score by 1
        }
        else {
            this.wrongAns++;
            this.timeLeft = 10; // Example : 10 seconds timer
            this.startTimer();
            //this.showNextQue = true;
            this.showSecModal = true;

            // To implement Timer Function



        }
        this.endQuiz = true;
    }

    // Step 4 : Show Next Question
    nextQue() {
        this.currentQueNo++;
        this.showNextQue = false;
        this.nextQueNo++;
        this.showSecModal = false;
        this.openModal = true;
        clearInterval(this.timer); // clear timer when moving to next que
        if (this.currentQueNo < this.queArr.length) {
            this.startTimer(); // Start Timer for the next question
        }
        else {
            this.endQuizFun(); // End quiz if no more Questions
        }
    }

    // stp 5 : End Quiz track
    endQuizFun() {
        this.showResult = true;
        this.openModal = false; // Close quiz modal
        this.endQuiz = false; // Hide "Next Question" button
        this.result = this.score - this.wrongAns; // Calculate final score
        console.log('Result is ', this.result); // Debugging statement
    }

    // Step 6 : Timer Function
    startTimer() {
        this.timer = setInterval(() => {
            if (this.timeLeft > 0) {
                this.timeLeft--;
            }
            else {
                clearInterval(this.timer);
                this.showSecModal = true;
                //this.nextQue();
            }
        }, 3000) // Timer decrements every second (1000) ms
    }


}
