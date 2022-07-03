function sleep(seconds) {
    let ms = seconds*1000;
    
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const startButton = document.querySelector("#rrContainerDiv > div > div > div.button > button");
if (startButton) {
    startButton.click();
}

const answerButtons = [
    document.querySelector("#rrContainerDiv > div > div.multiple-choice-component > div:nth-child(1) > div.answer-text"),
    document.querySelector("#rrContainerDiv > div > div.multiple-choice-component > div:nth-child(2) > div.answer-text"),
    document.querySelector("#rrContainerDiv > div > div.multiple-choice-component > div:nth-child(3) > div.answer-text"),
    document.querySelector("#rrContainerDiv > div > div.multiple-choice-component > div:nth-child(4) > div.answer-text"),
];

const answers = window.rrDataset;
const numberOfQuestions = answers["questions"].length;
let currentQuestion = document.querySelector("#rrContainerDiv > div > div.display > div > div > div").textContent;

function getAnswer() {
    for (let i = 0; i < numberOfQuestions; i++) {
        let question = answers["questions"][i];
        if (question["questionText"] == currentQuestion) {
            for (let i2 = 0; i2 < question["answers"].length; i2++) {
                if (question["answers"][i2]["isCorrect"] == true) {
                    let answer = question["answers"][i2]["answerText"];
                    return answer;
                }
            }
        }
    }
}

for (let i = 0; i < numberOfQuestions; i++) {
    const answer = await getAnswer();
    for (let i2 = 0; i2 < 4; i2++) {
        const answerButton = answerButtons[i2];
        if (answerButton.textContent == answer) {
            answerButton.click();
        }
    }

    await sleep(2);
    if (document.querySelector("#rrContainerDiv > div > div.display > div > div > div") != null) {
        currentQuestion = document.querySelector("#rrContainerDiv > div > div.display > div > div > div").textContent;
    }
}
