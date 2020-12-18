const selectionButtons = document.querySelectorAll('[data-selection]')
const finalColumn = document.querySelector('[data-final-column]')
const computerScore = document.querySelector('[data-computer-score]')
const yourScore = document.querySelector('[data-your-score]')
const SELECTIONS = [
    {
        name: 'rock',
        emoji: '✊',
        beats: 'scissors'
    },
    {
        name: 'paper',
        emoji: '🤚',
        beats: 'rock'
    },
    {
        name: 'scissors',
        emoji: '✌️',
        beats: 'paper'
    },
]

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener("click", e => {
        const selectionName = selectionButton.dataset.selection
        const selection = SELECTIONS.find(selection => selection.name === selectionName)
        makeSelection(selection)
    })
})

function makeSelection(selection) {
    const computerSelection = randomSelection()
    const yourWinner = isWinner(selection, computerSelection)
    const computerWinner = isWinner(computerSelection, selection)
    // console.log(computerSelection) // mengecek apa sudah sesuai atau belum value-nya
    addSelectionResult(computerSelection, computerWinner)
    addSelectionResult(selection, yourWinner)

    if (yourWinner) incrementScore(yourScore)
    if (computerWinner) incrementScore(computerScore)
}

function incrementScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}

function addSelectionResult(selection, winner) {
    const div = document.createElement('div')
    div.innerText = selection.emoji
    div.classList.add('result-selection')
    if (winner) div.classList.add('winner')
    finalColumn.after(div)
}

function isWinner(selection, oppSelection) {
    return selection.beats === oppSelection.name // untuk menentukan pemenang
}

function randomSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length) // menghitung index 0,1,2 dari [] SELECTIONS
    return SELECTIONS[randomIndex]
}