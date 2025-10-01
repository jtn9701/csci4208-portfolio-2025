import * as http from './http.js' //Import http functions
import * as view from './view.js'; //Import view functions

const GET_TRIVIA = `https://opentdb.com/api.php?amount=1&difficulty=easy`; //Trivia GET endpoint
const state = {
    score: 0,
    timer: 20,
    intervalId: null,
    trivia: null
}; //Game start

const playGame = async () => { //PLAY function
    const json = await http.sendGETRequest(GET_TRIVIA); //GET Request for trivia data
    [ state.trivia ] = json.results; //Destructure trivia data from array
    view.PlayScene(state); //Pass trivia data to view
}

window.start = async () => { //START function
    createGame(); 
}

window.addEventListener('load', start); 

const countdown = () => { //COUNTDOWN function
    if (state.timer){ //check if time remains
        state.timer--; //decrement timer
        view.PlayScene(state); //view render play scene
    }
}

const createGame = () => { //CREATE function
    state.timer = 20; //set timer
    state.intervalId = setInterval(countdown, 1000); //set interval id
    playGame(); //call PLAY function
}
