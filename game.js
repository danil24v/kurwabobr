var words = []
var rightVarI = -1

const wordH1 = document.getElementById('word')
const elAnswer = document.querySelectorAll('[role="alert"]')
const btnNext = document.getElementById('next')
for (let i = 0; i < elAnswer.length; i++) {
    elAnswer[i].addEventListener('click', function(e) {
        var currElement = elAnswer[i]
        console.log('Clicked on: ' + i);
        if(i == rightVarI){
            highlightVar(i, true)
            btnNext.setAttribute('class', 'btn btn-primary')
        } 
        else highlightVar(i, false)
    });
}
btnNext.addEventListener('click', function(e) {
    setGameWord()
});

loadWords('words/words1.csv');

// -------------------- FUNCTION --------------------

function highlightVar(varI, isRight){
    for (let i = 0; i < elAnswer.length; i++) {
        var className = 'alert alert-secondary'
        if(i == varI){
            if(isRight) className = 'alert alert-success'
            else className = 'alert alert-danger'
        }
        elAnswer[i].setAttribute('class', className)
    }
}

function setGameWord(){
    let rndI = Math.floor(Math.random() * words.length);
    let wordComb = words[rndI]
    wordH1.innerText = wordComb[0]
    highlightVar(-1, true)

    rightVarI = Math.floor(Math.random() * elAnswer.length);
    for (let i = 0; i < elAnswer.length; i++) {
        let notRightI = Math.floor(Math.random() * words.length);
        let variantWord = elAnswer[i].innerText = words[notRightI][1]
        if(i == rightVarI) variantWord = wordComb[1]
        
        elAnswer[i].innerText = i + '. ' + variantWord
    }

    btnNext.setAttribute('class', 'none')

}

async function loadWords(url) {
    try {
        words = []
        const response = await fetch(url);
        const data = await response.text();
        //console.log(data);
        data.split('\n').forEach(element => {
            let plWord = element.split(';')[0]
            let ruWord = element.substring(plWord.length + 1)
            //console.log(plWord + '-' + ruWord)
            let compl = [plWord, ruWord]
            words.push(compl)
        });

        setGameWord()
    } catch (err) {
        console.error(err);
    }
}