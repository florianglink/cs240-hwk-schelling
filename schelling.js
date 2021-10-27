/**
 * Schelling's Model simulator
 * @author Florian Godfrey Link
 */

class schellingTable {
    this.dimension = document.querySelector(#dimension).value;
    this.threshold = document.querySelector(#threshold).value;
    this.vacancy = document.querySelector(#vacantRatio).value;
    this.ratio = document.querySelector(#popRatio).value;
    this.popXcolor = document.querySelector(#popXcolor).value;
    this.popYcolor = document.querySelector(#popYcolor).value;

    intstantiate() {
        var table = [];
        for(var i=0; i<this.dimension; i++) {
            table[i] = [];
            for(var j=0; j<this.dimension; j++) {
                table[i][j] = -1;
            }
        }
    }

}