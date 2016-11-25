var assert = require('assert');
var harmoney = require('../lib/index.js');
var math = require('mathjs');

function Pythagorean_tuning(){
  s = new harmoney.Scale;

  var a = 1;
  a = s.makeStepDown(a, math.fraction(3, 2));
  a = s.makeStepDown(a, math.fraction(3, 2));
  a = s.makeStepDown(a, math.fraction(3, 2));
  a = s.makeStepDown(a, math.fraction(3, 2));
  a = s.makeStepDown(a, math.fraction(3, 2));
  a = s.makeStepDown(a, math.fraction(3, 2));

  a = 1;
  a = s.makeStepUp(a, math.fraction(3, 2));
  a = s.makeStepUp(a, math.fraction(3, 2));
  a = s.makeStepUp(a, math.fraction(3, 2));
  a = s.makeStepUp(a, math.fraction(3, 2));
  a = s.makeStepUp(a, math.fraction(3, 2));
  a = s.makeStepUp(a, math.fraction(3, 2));
  return s;
}
describe('Scale', function() {
  describe('#makeStepUp()', function() {
    it('should work going _up_', function() {
      s = new harmoney.Scale;
      var note = s.makeStepUp(1, math.fraction(3, 2));
      assert.equal(note+0, math.fraction(3, 2)+0);
    });
    it('should work going _down_', function() {
      s = new harmoney.Scale;
      var note = s.makeStepDown(1, math.fraction(3, 2));
      assert.equal(note+0, math.fraction(3, 2).inverse() * 2);
    });
    it('should create a basic harmony', function() {
      s = Pythagorean_tuning();
      // https://en.wikipedia.org/wiki/Pythagorean_tuning
      assert.equal(true, s.hasNote(math.fraction(1024, 729)));
      assert.equal(true, s.hasNote(math.fraction(256, 243)));
      assert.equal(true, s.hasNote(math.fraction(128, 81)));
      assert.equal(true, s.hasNote(math.fraction(32, 27)));
      assert.equal(true, s.hasNote(math.fraction(16, 9)));
      assert.equal(true, s.hasNote(math.fraction(4, 3)));
      assert.equal(true, s.hasNote(math.fraction(1, 1)));
      assert.equal(true, s.hasNote(math.fraction(3, 2)));
      assert.equal(true, s.hasNote(math.fraction(9, 8)));
      assert.equal(true, s.hasNote(math.fraction(27, 16)));
      assert.equal(true, s.hasNote(math.fraction(81, 64)));
      assert.equal(true, s.hasNote(math.fraction(243, 128)));
      assert.equal(true, s.hasNote(math.fraction(729, 512)));

      assert.equal(false, s.hasNote(math.fraction(123123, 511232)));
    });
    it('should be sorted', function() {
      s = Pythagorean_tuning();
      var prev = null;
      s.getNoteratiosSorted().forEach(function(i){
        if(prev != null){
          console.log(prev);
          console.log(i);
        }
        prev = i;
      });
    });
  });
});
