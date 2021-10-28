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

    instantiate() {
        var table = [];
        for(var i=0; i<this.dimension; i++) {
            table[i] = [];
            for(var j=0; j<this.dimension; j++) {
                table[i][j] = -1;
            }
        }
        this.table = table;
    }

}

function makeTable(t) {
    var board = document.querySelector("#board");
    board.firstElementChild && board.removeChild(board.firstElementChild);
    table = document.createElement("table");
    board.appendChild(table);
    for(var i=0; i<t.dimension; i++) {
        var row = document.createElement("tr");
        table.appendChild(row);
        for(j=0; j<t.dimension; j++) {
            var data = document.createElement("td");
            if(Math.random() < t.vacancy) {
                data.style.backgroundColor = "#FFFFFF";
            }
            else {
                if(Math.random() < t.ratio) {
                    data.style.backgroundColor = t.popXcolor;
                }
                else {
                    data.style.backgroundColor = t.popYcolor;
                }
            }
            row.appendChild(data);
        }
    }
}

let schelling = new schellingTable;
schelling.instantiate();
makeTable(schelling);