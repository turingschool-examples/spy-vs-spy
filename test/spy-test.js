const sinon = require('sinon');
const assert = require('assert');

describe('Logger', function () {

  // How do we even test a method that just logs to the console?
  function logger(message) {
    console.log('LOG: ' + message);
    return message;
  }

  beforeEach(function () {
    sinon.spy(console, 'log');
  });

  afterEach(function () {
    console.log.restore();
  });

  it.skip('should log to the console', function () {
    logger('some message');
    assert(console.log.calledOnce);
  });

  it.skip('should log prefix the message with "LOG: "', function () {
    logger('some message');
    assert(console.log.calledWith('LOG: some message'));
  });

});

describe('fakeQuery', function () {

  var fakeData = { ideas: [
    { title: 'Learn JavaScript', quality: 0 },
    { title: 'Test JavaScript', quality: 2 }
  ] };

  var fakeQuery = {
    getJSON: function (url, callback) {
      setTimeout(function () {
        callback(fakeData);
      }, 1000);
    }
  };

  it.skip('should call the callback when it hears back from the server', function (done) {
    var spyCallback = sinon.spy(function () {
      assert(spyCallback.called);
      done();
    });

    fakeQuery.getJSON('/bogus', spyCallback);
  });

  it.skip('should call the callback with fakeData', function (done) {
    var spyCallback = sinon.spy(function () {
      assert(spyCallback.calledWith(fakeData));
      done();
    });

    fakeQuery.getJSON('/bogus', spyCallback);
  });

});

describe('APIFetcher', function () {

  var Twitter = {
    get: function () {
      // Crazy stuff happens over the network…
    }
  }

  beforeEach(function () {
    Twitter.get.withArgs('/users').returns([
      { username: 'stevekinney', tweetCount: 5 },
      { username: 'jcasimir', tweetCount: 3 }
    ]);
  });

  it.skip('should return the stubbed data', function () {
    var users = Twitter.get('/users');
    assert.equal(users[0].username, 'stevekinney');
  });

});

describe('Play.castMagicMissile', function () {
  var Roll = {
    dTwenty: function(){
      return Math.floor(Math.random() * (20 - 1 + 1) + 1);
    }
  }

  var Play = {
    castMagicMissile: function(){
      var roll = Roll.dTwenty();
      if (roll < 20) {
        return this.cheat(roll);
      } else {
        return roll;
      }
    },
    cheat: function(roll){
      return num + 1;
    }
  }

  it.skip('should cheat on a lousy dTwenty Roll', function () {
    var critical_fail = 1;

    var stub = sinon.stub(Roll, 'dTwenty').returns(critical_fail);

    var mock = sinon.mock(Play);
    mock.expects("cheat").once().withArgs(critical_fail);

    Play.castMagicMissile();

    mock.verify();
    stub.restore();
    mock.restore();
  });

  it.skip('should not cheat on a natural 20', function () {
    var natural_twenty = 20;

    var stub = sinon.stub(Roll, 'dTwenty').returns(natural_twenty);
    var mock = sinon.mock(Play);
    mock.expects("cheat").never();

    Play.castMagicMissile();

    mock.verify();
    stub.restore();
    mock.restore();
  });
});
