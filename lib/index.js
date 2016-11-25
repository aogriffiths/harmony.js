'use strict';
var exports = module.exports = {};
var math = require('mathjs');

class Pitch {
  constructor(name) {
  }
}

class Scale {
  constructor(name) {
    this.name = name;
    this.base = 1;
    this.minRatio = math.fraction(1, 1);
    this.maxRatio = math.fraction(2, 1);
    this.noteratios = [];
    this.noteratios.push(this.minRatio);
  }

  getNoteratios(){
    return this.noteratios;
  }

  getNoteratiosSorted(){
    return this.noteratios.sort(function(a,b){return a.compare(b)});
  }

  hasNote(note){
    return this.noteratios
       .map(function(n){return n.compare(note) == 0})
       .reduce(function(a,res){return res || a});
  }

  makeStep(from, ratio, isUp){
    if(isUp){
      return makeStepUp(from, ratio);
    }else{
      return makeStepDown(from, ratio);
    }
  }

  makeStepUp(from, ratio){
    ratio = math.multiply(ratio, math.fraction(1, 1));
    return this._makeStep(from, ratio);
  }

  makeStepDown(from, ratio){
    ratio = math.multiply(ratio, math.fraction(1, 1));
    return this._makeStep(from, ratio.inverse());
  }

  _makeStep(from, ratio){
    from = math.multiply(from, math.fraction(1, 1));
    if(ratio < this.maxRatio.inverse() || ratio > this.maxRatio) throw "out of range";
    var note = math.multiply(from, ratio);
    note = this._bringNoteInRnage(note);
    this.noteratios.push(note);
    return note;
  }

  //assumes the note is only one step out of range
  _bringNoteInRnage(note){
    if( note > this.maxRatio){
      note =  math.multiply(note, this.maxRatio.inverse());
    }
    else if( note < this.minRatio){
      note =  math.multiply(note, this.maxRatio);
    }
    return note;
  }

}

exports.Scale = Scale;


exports.Pitch = Pitch;
