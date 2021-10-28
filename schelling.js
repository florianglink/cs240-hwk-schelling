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
    listeners() {
        document.querySelector("#randomize").addEventListener("click", function() {
            startup();
        });
        var dim = document.querySelector("#dimension");
        dim.addEventListener("input", function() {
            dim.value = dim.value;
            startup();
        });
        var thresh = document.querySelector("#threshold");
        thresh.addEventListener("input", function() {
            thresh.value = thresh.value;
        });
        var vacant = document.querySelector("#vacantRatio");
        vacant.addEventListener("input", function() {
            vacant.value = vacant.value;
            startup();
        });
        var pop = document.querySelector("#popRatio");
        pop.addEventListener("input", function() {
            pop.value = pop.value;
            startup();
        });
        var xColor = document.querySelector("#popXcolor");
        xColor.addEventListener("input", function() {
            popXcolor.value = popXcolor.value;
            startup();
        })
    }
}


// function listeners() {
//     document.querySelector("#randomize").addEventListener("click", function() {
//         startup();
//     });
//     var dim = document.querySelector("#dimension");
//     dim.addEventListener("input", function() {
//         dim.value = dim.value;
//         startup();
//     });
//     var thresh = document.querySelector("#threshold");
//     thresh.addEventListener("input", function() {
//         thresh.value = thresh.value;
//     });
//     var vacant = document.querySelector("#vacantRatio");
//     vacant.addEventListener("input", function() {
//         vacant.value = vacant.value;
//         startup();
//     });
//     var pop = document.querySelector("#popRatio");
//     pop.addEventListener("input", function() {
//         pop.value = pop.value;
//         startup();
//     });
//     var xColor = document.querySelector("#popXcolor");
//     xColor.addEventListener("input", function() {
//         popXcolor.value = popXcolor.value;
//         this.table.makeTable();
//     })
// }

//listeners();
startup();
    
function startup() {
    let schelling = new schellingTable;
    schelling.instantiate();
    schelling.makeTable();
    schelling.listeners();
}