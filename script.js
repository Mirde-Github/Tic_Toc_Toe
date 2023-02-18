const box = document.querySelectorAll(".box");
const status_text = document.getElementById("status");
const btn = document.getElementById("restarts");

const winner = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // each box of number start from zero
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let cuurentplayer = "X";
let running = false;
initialization();

function initialization() {
    box.forEach(cell => cell.addEventListener("click", cellclicked));
    btn.addEventListener("click", restart);
    status_text.textContent = `${cuurentplayer} turns`  // update the text 
    running = true // while initialization 
}
function cellclicked() {
    const cell_index = this.getAttribute("index") //this index come from html 
    if (options[cell_index] != "" || !running) {
        return; // do nothing
    }

    updatecell(this, cell_index);
    checkwinner();


}

function updatecell(cell, cell_val) {
    options[cell_val] = cuurentplayer;
    cell.textContent = cuurentplayer;
}
function changeplayer() {
    // if current player x then change to o 
    cuurentplayer = (cuurentplayer == "X") ? "O" : "X";
    status_text.textContent = `${cuurentplayer}'s turn`;
}
function checkwinner() {
    let roundwon = false;
    for (let i = 0; i < winner.length; i++) {
        const condition = winner[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundwon = true;
            break;
        }

    }
    if(roundwon){
        status_text.textContent=`${cuurentplayer} winnes`;        
        running=false;
    }
    else if(!options.includes("")){
        status_text.textContent=`Draw`
        running=false;
    }
    else{
        changeplayer()
    }

}


function restart() {
cuurentplayer="X";
options["","","","","","","","",""];
status_text.textContent=`${cuurentplayer} turn`;
box.forEach(cell=> cell.textContent= "");
running=true;
}