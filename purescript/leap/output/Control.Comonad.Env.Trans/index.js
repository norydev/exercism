// Generated by psc version 0.10.5
"use strict";
var Prelude = require("../Prelude");
var Control_Comonad = require("../Control.Comonad");
var Control_Comonad_Trans_Class = require("../Control.Comonad.Trans.Class");
var Control_Extend = require("../Control.Extend");
var Data_Tuple = require("../Data.Tuple");
var Data_Newtype = require("../Data.Newtype");
var Data_Functor = require("../Data.Functor");
var Data_Function = require("../Data.Function");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var EnvT = function (x) {
    return x;
};
var withEnvT = function (f) {
    return function (v) {
        return EnvT(new Data_Tuple.Tuple(f(v.value0), v.value1));
    };
};
var runEnvT = function (v) {
    return v;
};
var newtypeEnvT = new Data_Newtype.Newtype(function (n) {
    return n;
}, EnvT);
var mapEnvT = function (f) {
    return function (v) {
        return EnvT(new Data_Tuple.Tuple(v.value0, f(v.value1)));
    };
};
var functorEnvT = function (dictFunctor) {
    return new Data_Functor.Functor(function (f) {
        return function (v) {
            return EnvT(new Data_Tuple.Tuple(v.value0, Data_Functor.map(dictFunctor)(f)(v.value1)));
        };
    });
};
var extendEnvT = function (dictExtend) {
    return new Control_Extend.Extend(function () {
        return functorEnvT(dictExtend["__superclass_Data.Functor.Functor_0"]());
    }, function (f) {
        return function (v) {
            return EnvT(new Data_Tuple.Tuple(v.value0, Data_Functor.map(dictExtend["__superclass_Data.Functor.Functor_0"]())(f)(Control_Extend.extend(dictExtend)(function ($37) {
                return EnvT(Data_Tuple.Tuple.create(v.value0)($37));
            })(v.value1))));
        };
    });
};
var comonadTransEnvT = new Control_Comonad_Trans_Class.ComonadTrans(function (dictComonad) {
    return function (v) {
        return v.value1;
    };
});
var comonadEnvT = function (dictComonad) {
    return new Control_Comonad.Comonad(function () {
        return extendEnvT(dictComonad["__superclass_Control.Extend.Extend_0"]());
    }, function (v) {
        return Control_Comonad.extract(dictComonad)(v.value1);
    });
};
module.exports = {
    EnvT: EnvT, 
    mapEnvT: mapEnvT, 
    runEnvT: runEnvT, 
    withEnvT: withEnvT, 
    newtypeEnvT: newtypeEnvT, 
    functorEnvT: functorEnvT, 
    extendEnvT: extendEnvT, 
    comonadEnvT: comonadEnvT, 
    comonadTransEnvT: comonadTransEnvT
};
