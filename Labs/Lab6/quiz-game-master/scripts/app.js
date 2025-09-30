import * as http from './http.js' //Import http functions
import * as view from './view.js'; //Import view functions

const GET_TRIVIA = `https://opentdb.com/api.php?amount=1&difficulty=easy`; //Trivia GET endpoint
const state = {}; //Game start

const playGame = async () => { //PLAY function
    const json = await http.sendGETRequest(GET_TRIVIA); //GET Request for trivia data
    [ state.trivia ] = json.results; //Destructure trivia data from array
    view.PlayScene(state); //Pass trivia data to view
}

window.start = async () => { //START function
    playGame(); //call play function
}
window.addEventListener('load', start); 