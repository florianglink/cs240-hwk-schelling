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
    var b = document.querySelector("#board");
    b.firstElementChild && b.removeChild(b.firstElementChild);
    table = document.createElement("table");
    b.appendChild(table);
    for(var i=0; i<t.dimension; i++) {
        var r = document.createElement("tr");
        table.appendChild(r);
        for(j=0; j<t.dimension; j++) {
            var n = document.createElement("td");
            n.style.backgroundColor = t.popXcolor.value;
            r.appendChild(n);
        }
    }
}

let schelling = new schellingTable;
schelling.instantiate();
makeTable(schelling);