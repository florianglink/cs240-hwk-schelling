/**
 * Schelling's Model simulator
 * @author Florian Godfrey Link
 */

class schellingTable {

    dimension = document.querySelector("#dimension").value;
    threshold = document.querySelector("#threshold").value;
    vacancy = document.querySelector("#vacantRatio").value;
    ratio = document.querySelector("#popRatio").value;
    popXcolor = document.querySelector("#popXcolor").value;
    popYcolor = document.querySelector("#popYcolor").value;
    table = [];

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

function listeners() {
    document.querySelector("#randomize").addEventListener("click", function() {
        schelling.instantiate();
        schelling.makeTable();
    });
    var dim = document.querySelector("#dimension");
    dim.addEventListener("input", function() {
        schelling.dimension = dim.value;
        schelling.instantiate();
        schelling.makeTable();
    });
    var thresh = document.querySelector("#threshold");
    thresh.addEventListener("input", function() {
        schelling.threshold = thresh.value;
    });
    var vacant = document.querySelector("#vacantRatio");
    vacant.addEventListener("input", function() {
        schelling.vacancy = vacant.value;
        schelling.instantiate();
        schelling.makeTable();
    });
    var pop = document.querySelector("#popRatio");
    pop.addEventListener("input", function() {
        schelling.ratio = pop.value;
        schelling.instantiate();
        schelling.makeTable();
    });
    var xColor = document.querySelector("#popXcolor");
    xColor.addEventListener("input", function() {
        schelling.popXcolor = xColor.value;
        schelling.makeTable();
    });
    var yColor = document.querySelector("#popYcolor");
    yColor.addEventListener("input", function() {
        schelling.popYcolor = yColor.value;
        schelling.makeTable();
    });
}

let schelling = new schellingTable;
schelling.instantiate();
schelling.makeTable();
listeners();
getOpenSpaces();
console.log(chooseOpenSpace());


//console.log(satisfied(5,0));
//console.log(satisfied(1,1));
    
function satisfied(i,j) {
    var totalSimilar = 0;
    var totalDifferent = 0;
    var neighbors= [];

    if(schelling.table[i-1][j] != null) {
        neighbors.push(schelling.table[i-1][j]);
    }
    if(schelling.table[i+1][j] != null) {
        neighbors.push(schelling.table[i+1][j]);
    }
    if(schelling.table[i][j-1] != null) {
        neighbors.push(schelling.table[i][j-1]);
    }
    if(schelling.table[i][j+1] != null) {
        neighbors.push(schelling.table[i][j+1]);
    }
    if(schelling.table[i-1][j-1] != null) {
        neighbors.push(schelling.table[i-1][j-1]);
    }
    if(schelling.table[i+1][j+1] != null) {
        neighbors.push(schelling.table[i+1][j+1]);
    }
    if(schelling.table[i+1][j-1] != null) {
        neighbors.push(schelling.table[i+1][j-1]);
    }
    if(schelling.table[i-1][j+1] != null) {
        neighbors.push(schelling.table[i-1][j+1]);
    }

    for(var k=0; k<neighbors.length; k++) {
        if(neighbors[k] != "x" && neighbors[k] == schelling.table[i][j]) {
            totalSimilar++;
        }
        else if(neighbors[k] != "x" && neighbors[k] != schelling.table[i][j]){
            totalDifferent++;
        }
    }
    var localRatio = totalSimilar/(totalSimilar + totalDifferent);
    if (localRatio >= schelling.ratio) {
        return true;
    } 
    else {
        return false;
    }
}

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

function chooseOpenSpace() {
    var spaces = getOpenSpaces();
    var candidate = spaces[Math.floor(Math.random()*spaces.length)];
    return candidate;
}
