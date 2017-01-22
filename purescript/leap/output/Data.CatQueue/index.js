// Generated by psc version 0.10.5
"use strict";
var Data_List = require("../Data.List");
var Data_Maybe = require("../Data.Maybe");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Show = require("../Data.Show");
var Data_Tuple = require("../Data.Tuple");
var Data_List_Types = require("../Data.List.Types");
var CatQueue = (function () {
    function CatQueue(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    CatQueue.create = function (value0) {
        return function (value1) {
            return new CatQueue(value0, value1);
        };
    };
    return CatQueue;
})();
var uncons = function (__copy_v) {
    var v = __copy_v;
    tco: while (true) {
        if (v.value0 instanceof Data_List_Types.Nil && v.value1 instanceof Data_List_Types.Nil) {
            return Data_Maybe.Nothing.value;
        };
        if (v.value0 instanceof Data_List_Types.Nil) {
            var __tco_v = new CatQueue(Data_List.reverse(v.value1), Data_List_Types.Nil.value);
            v = __tco_v;
            continue tco;
        };
        if (v.value0 instanceof Data_List_Types.Cons) {
            return new Data_Maybe.Just(new Data_Tuple.Tuple(v.value0.value0, new CatQueue(v.value0.value1, v.value1)));
        };
        throw new Error("Failed pattern match at Data.CatQueue line 51, column 1 - line 51, column 36: " + [ v.constructor.name ]);
    };
};
var snoc = function (v) {
    return function (a) {
        return new CatQueue(v.value0, new Data_List_Types.Cons(a, v.value1));
    };
};
var showCatQueue = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(CatQueue " + (Data_Show.show(Data_List_Types.showList(dictShow))(v.value0) + (" " + (Data_Show.show(Data_List_Types.showList(dictShow))(v.value1) + ")")));
    });
};
var $$null = function (v) {
    if (v.value0 instanceof Data_List_Types.Nil && v.value1 instanceof Data_List_Types.Nil) {
        return true;
    };
    return false;
};
var empty = new CatQueue(Data_List_Types.Nil.value, Data_List_Types.Nil.value);
module.exports = {
    CatQueue: CatQueue, 
    empty: empty, 
    "null": $$null, 
    snoc: snoc, 
    uncons: uncons, 
    showCatQueue: showCatQueue
};
