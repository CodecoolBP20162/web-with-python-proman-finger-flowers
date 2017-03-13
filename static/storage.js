/**
 * Created by arinyu on 2017.03.13..
 */

function Board(title) {
    this.title = title;
    this.boardCardList = []
};

var board_example = new Board("My new board");
localStorage.setItem("key", board_example);
localStorage.getItem("key");

// var MakeBoard = function (board) {
//
//    var cardList = [];
//    var board = {title:"Board Title",boardCardList:cardList };
//    return board;
// };



var MakeCardList = function (Card) {

    cardList.push(Card);
    return cardList
};

var SaveCard = function (Card) {
    localStorage.setItem(Card)
};

var SaveCardList = function (cardList) {
    localStorage.setItem(cardList)

};


var storageDict = {};


//State pattern, required
var Card = function () {
    var count = 0;
    var currentState = new New(this);

    this.change = function (state) {
        // limits number of changes
        if (count++ >= 10) return;
        currentState = state;
        currentState.go();
    };

    this.start = function () {
        currentState.go();
    };
}

var New = function (light) {
    this.light = light;

    this.go = function () {
        log.add("Red --> for 1 minute");
        light.change(new Done(light));
    }
};

var InProgress = function (light) {
    this.light = light;

    this.go = function () {
        log.add("Yellow --> for 10 seconds");
        light.change(new New(light));
    }
};

var Done = function (light) {
    this.light = light;

    this.go = function () {
        log.add("Green --> for 1 minute");
        light.change(new InProgress(light));
    }
};

// log helper

var log = (function () {
    var log = "";

    return {
        add: function (msg) { log += msg + "\n"; },
        show: function () { alert(log); log = ""; }
    }
})();

function run() {
    var light = new TrafficLight();
    light.start();

    log.show();
}


//Factory pattern
function Factory() {
    this.createCard = function (type) {
        var card;

        if (type === "fulltime") {
            card = new FullTime();
        } else if (type === "parttime") {
            card = new PartTime();
        } else if (type === "temporary") {
            card = new Temporary();
        } else if (type === "contractor") {
            card = new Contractor();
        }

        card.type = type;

        card.say = function () {
            log.add(this.type + ": rate " + this.hourly + "/hour");
        }

        return card;
    }
}

var FullTime = function () {
    this.hourly = "$12";
};

var PartTime = function () {
    this.hourly = "$11";
};

var Temporary = function () {
    this.hourly = "$10";
};

var Contractor = function () {
    this.hourly = "$15";
};

// log helper
var log = (function () {
    var log = "";

    return {
        add: function (msg) { log += msg + "\n"; },
        show: function () { alert(log); log = ""; }
    }
})();

function run() {
    var employees = [];
    var factory = new Factory();

    employees.push(factory.createCard("fulltime"));
    employees.getItem() //local storage
    employees.setItem() //local storage
    employees.push(factory.createCard("parttime"));
    employees.push(factory.createCard("temporary"));
    employees.push(factory.createCard("contractor"));

    for (var i = 0, len = employees.length; i < len; i++) {
        employees[i].say();
    }

    log.show();
}

//card: title, status, msg, order_number, priority

//setitem,getitem:
var testObject = { 'one': 1, 'two': 2, 'three': 3 };

// Put the object into storage
localStorage.setItem('testObject', JSON.stringify(testObject));

// Retrieve the object from storage
var retrievedObject = localStorage.getItem('testObject');

console.log('retrievedObject: ', JSON.parse(retrievedObject));