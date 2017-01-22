// Generated by psc version 0.10.5
"use strict";
var Prelude = require("../Prelude");
var Control_Parallel_Class = require("../Control.Parallel.Class");
var Data_Foldable = require("../Data.Foldable");
var Data_Traversable = require("../Data.Traversable");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Control_Category = require("../Control.Category");
var parTraverse_ = function (dictParallel) {
    return function (dictFoldable) {
        return function (f) {
            return function ($8) {
                return Control_Parallel_Class.sequential(dictParallel)(Data_Foldable.traverse_(dictParallel["__superclass_Control.Applicative.Applicative_1"]())(dictFoldable)(function ($9) {
                    return Control_Parallel_Class.parallel(dictParallel)(f($9));
                })($8));
            };
        };
    };
};
var parTraverse = function (dictParallel) {
    return function (dictTraversable) {
        return function (f) {
            return function ($10) {
                return Control_Parallel_Class.sequential(dictParallel)(Data_Traversable.traverse(dictTraversable)(dictParallel["__superclass_Control.Applicative.Applicative_1"]())(function ($11) {
                    return Control_Parallel_Class.parallel(dictParallel)(f($11));
                })($10));
            };
        };
    };
};
var parSequence_ = function (dictParallel) {
    return function (dictTraversable) {
        return parTraverse_(dictParallel)(dictTraversable["__superclass_Data.Foldable.Foldable_1"]())(Control_Category.id(Control_Category.categoryFn));
    };
};
var parSequence = function (dictParallel) {
    return function (dictTraversable) {
        return parTraverse(dictParallel)(dictTraversable)(Control_Category.id(Control_Category.categoryFn));
    };
};
module.exports = {
    parSequence: parSequence, 
    parSequence_: parSequence_, 
    parTraverse: parTraverse, 
    parTraverse_: parTraverse_
};
