// Generated by psc version 0.10.5
"use strict";
var Prelude = require("../Prelude");
var Control_Monad_Reader_Class = require("../Control.Monad.Reader.Class");
var Control_Monad_Reader_Trans = require("../Control.Monad.Reader.Trans");
var Data_Identity = require("../Data.Identity");
var Data_Newtype = require("../Data.Newtype");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Function = require("../Data.Function");
var withReader = Control_Monad_Reader_Trans.withReaderT;
var runReader = function (v) {
    return function ($2) {
        return Data_Newtype.unwrap(Data_Identity.newtypeIdentity)(v($2));
    };
};
var mapReader = function (f) {
    return Control_Monad_Reader_Trans.mapReaderT(function ($3) {
        return Data_Identity.Identity(f(Data_Newtype.unwrap(Data_Identity.newtypeIdentity)($3)));
    });
};
module.exports = {
    mapReader: mapReader, 
    runReader: runReader, 
    withReader: withReader
};
