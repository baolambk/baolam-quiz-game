const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'Bao Lam bao nhieu tuoi?',
        answers: [
            { text: '18', correct: true },
            { text: '20', correct: false },
            { text: '23', correct: false },
            { text: '30', correct: false }
        ]
    },
    {
        question: 'Bao Lam dang o dau',
        answers: [
            { text: 'Ha Noi', correct: true },
            { text: 'Phu Tho', correct: false },
            { text: 'Tokio', correct: false },
            { text: 'Pa rit', correct: false }
        ]
    },
    {
        question: 'Ai la nguoi yeu cu cua Bao Lam?',
        answers: [
            { text: 'Chi Kim Le', correct: false },
            { text: 'Duong Linh', correct: false },
            { text: 'Thuy Vi Nguyen', correct: false },
            { text: 'Phuong Anh Cave', correct: false }
        ]
    },
    {
        question: 'Bao Lam thich ruou hay bia hon',
        answers: [
            { text: 'Ruou', correct: false },
            { text: 'Bia', correct: true }
        ]
    }
]