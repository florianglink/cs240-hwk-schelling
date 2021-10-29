/**
 * Schelling's Model simulator
 * @author Florian Godfrey Link
 */

/**
 * Main class to hold all the relevant information needed to represent the board
 */
class schellingTable {

    dimension = document.querySelector("#dimension").value;
    threshold = document.querySelector("#threshold").value;
    vacancy = document.querySelector("#vacantRatio").value;
    ratio = document.querySelector("#popRatio").value;
    popXcolor = document.querySelector("#popXcolor").value;
    popYcolor = document.querySelector("#popYcolor").value;
    table = [];

//Creates the 2D array to represent the table on which the simulation is run. Puts an "x"
//in a cell if it is a blank space, an "a" if the space is occupied by an agent from 
//population X and a "b" if the space is occupied by an agent from population Y.
    instantiate() {
        for(var i=0; i<this.dimension; i++) {
            this.table[i] = [];
            for(var j=0; j<this.dimension; j++) {
                if(Math.random() < this.vacancy) {
                    this.table[i][j] = "x";
                }
                else {
                    if(Math.random() < this.ratio) {
                        this.table[i][j] = "a";
                    }
                    else {
                        this.table[i][j] = "b";
                    }
                }
            }
        }
    }

//After the board has been created, this method iterates over it and appends each element as part of an
//HTML table to the #board div in index.HTML with the correct color depending on if the given space
//is occupied by an agent from pop X, pop Y, or is a blank space (colored white).
    makeTable() {
        var board = document.querySelector("#board");
        board.firstElementChild && board.removeChild(board.firstElementChild);
        var table1 = document.createElement("table");
        board.appendChild(table1);
        for(var i=0; i<this.dimension; i++) {
            var row = document.createElement("tr");
            table1.appendChild(row);
            for(var j=0; j<this.dimension; j++) {
                var data = document.createElement("td");
                if(this.table[i][j] == "x") {
                    data.style.backgroundColor = "#FFFFFF";
                }
                else if(this.table[i][j] == "a") {
                    data.style.backgroundColor = this.popXcolor;
                }
                else if(this.table[i][j] == "b") {
                    data.style.backgroundColor = this.popYcolor;
                }
                row.appendChild(data);
            }
        }
    }
}

//instantiates the event listeners necessary to dynamically update the board as the user types in a new value
//for dimension, color, etc.
function listeners() {
    document.querySelector("#randomize").addEventListener("click", function() {
        schelling.instantiate();
        schelling.makeTable();
    });
    let dim = document.querySelector("#dimension");
    dim.addEventListener("input", function() {
        schelling.dimension = dim.value;
        schelling.instantiate();
        schelling.makeTable();
    });
    let thresh = document.querySelector("#threshold");
    thresh.addEventListener("input", function() {
        schelling.threshold = thresh.value;
    });
    let vacant = document.querySelector("#vacantRatio");
    vacant.addEventListener("input", function() {
        schelling.vacancy = vacant.value;
        schelling.instantiate();
        schelling.makeTable();
    });
    let pop = document.querySelector("#popRatio");
    pop.addEventListener("input", function() {
        schelling.ratio = pop.value;
        schelling.instantiate();
        schelling.makeTable();
    });
    let xColor = document.querySelector("#popXcolor");
    xColor.addEventListener("input", function() {
        schelling.popXcolor = xColor.value;
        schelling.makeTable();
    });
    let yColor = document.querySelector("#popYcolor");
    yColor.addEventListener("input", function() {
        schelling.popYcolor = yColor.value;
        schelling.makeTable();
    });
    let startStop = document.querySelector("#runstop");
    startStop.addEventListener("click", function() {
        if(startStop.innerHTML == "Stop!") {
            startStop.value = "false";
        }
        else if(startStop.value == "true") {
            runSim();
        }
    });

}

//startup
let schelling = new schellingTable;
schelling.instantiate();
schelling.makeTable();
listeners();

//this function iterates over the table and determines if the agent in each cell is satisfied
//given the similarity threshold.   
function satisfied(i,j) {
    var totalSimilar = 0;
    var totalDifferent = 0;
    var neighbors= [];

try {
    if(schelling.table[i-1][j] != undefined) {
        neighbors.push(schelling.table[i-1][j]);
    }
}
catch {}
try {
    if(schelling.table[i+1][j] != undefined) {
        neighbors.push(schelling.table[i+1][j]);
    }
}
catch {}
try {
    if(schelling.table[i][j-1] != undefined) {
        neighbors.push(schelling.table[i][j-1]);
    }
}
catch {}
try {
    if(schelling.table[i][j+1] != undefined) {
        neighbors.push(schelling.table[i][j+1]);
    }
}
catch{}
try {
    if(schelling.table[i-1][j-1] != undefined) {
        neighbors.push(schelling.table[i-1][j-1]);
    }
}
catch{}
try {
    if(schelling.table[i+1][j+1] != undefined) {
        neighbors.push(schelling.table[i+1][j+1]);
    }
}
catch{}
try {
    if(schelling.table[i+1][j-1] != undefined) {
        neighbors.push(schelling.table[i+1][j-1]);
    }
}
catch{}
try {
    if(schelling.table[i-1][j+1] != undefined) {
        neighbors.push(schelling.table[i-1][j+1]);
    }
}
catch{}
    for(var k=0; k<neighbors.length; k++) {
        if(neighbors[k] != "x" && neighbors[k] == schelling.table[i][j]) {
            totalSimilar++;
        }
        else if(neighbors[k] != "x" && neighbors[k] != schelling.table[i][j]){
            totalDifferent++;
        }
    }
    var localRatio = totalSimilar/(totalSimilar + totalDifferent);
    if (localRatio >= schelling.threshold) {
        return true;
    } 
    else {
        return false;
    }
}

//finds all open spaces in the board and collects them into a single array.
//each element in the arry is an array of length 2 that holds the indices of the board for 
//the given blank space
function getOpenSpaces() {
    var openSpaces = [];
    for(var i=0; i<schelling.dimension; i++) {
        for(var j=0; j<schelling.dimension; j++) {
            if(schelling.table[i][j] == "x") {
                var entry = [];
                entry.push(i);
                entry.push(j);
                openSpaces.push(entry);
            }
        }
    }
    return openSpaces;
}

//calls getOpenSpaces and randomly chooses an open space
function chooseOpenSpace() {
    var spaces = getOpenSpaces();
    var candidate = spaces[Math.floor(Math.random()*spaces.length)];
    return candidate;
}

//iterates over the board and determines if each agent is satisfied. If not, the agent 
//is moved to a random blank space
async function generation() {
    await new Promise((resolve) =>
        setTimeout(() => {
            resolve(); // do nothing after waiting 100 ms, just alert the calling thread
        }, 100)
    );
    let moves = 0;
    for(var i=0; i<schelling.dimension; i++){
        for(var j=0; j<schelling.dimension; j++) {
            if(schelling.table[i][j] != "x") {
                if(!satisfied(i,j)) {
                    var curr = schelling.table[i][j];
                    var newLocation = chooseOpenSpace();
                    try { 
                        var newY = newLocation[0];
                        var newX = newLocation[1];
                        var newLoc = schelling.table[newY][newX];
                        schelling.table[i][j] = schelling.table[newY][newX];
                        schelling.table[newY][newX] = curr;
                        moves++;
                    }
                    catch {
                    }
                }
            }
        }
    }
    schelling.makeTable();
    return moves;
}

let generations = 0;

//continues to run generations until the board converges or the user presses the 
//"stop" button
async function runSim() {
    let button = document.querySelector("#runstop")
    button.innerHTML = "Stop!";
    let total = document.querySelector("p");
    let moves = 0;
    do {
        moves = 0;
        moves += await generation();
        generations++;
        total.innerHTML = "Generations: " + generations;
        if(button.value == "false") {
            break;
        }
    } while (moves > 0 && button.value == "true");
    button.innerHTML = "Run!";
    button.value = "true";
}
