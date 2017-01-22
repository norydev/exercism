// Generated by psc version 0.10.5
"use strict";
var Prelude = require("../Prelude");
var Data_Exists = require("../Data.Exists");
var Control_Comonad = require("../Control.Comonad");
var Control_Extend = require("../Control.Extend");
var Control_Monad_Trans_Class = require("../Control.Monad.Trans.Class");
var Data_Functor = require("../Data.Functor");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Control_Apply = require("../Control.Apply");
var Data_Function = require("../Data.Function");
var Control_Applicative = require("../Control.Applicative");
var Control_Bind = require("../Control.Bind");
var Control_Monad = require("../Control.Monad");
var Control_Category = require("../Control.Category");
var CoyonedaF = function (x) {
    return x;
};
var Coyoneda = function (x) {
    return x;
};
var lowerCoyoneda = function (dictFunctor) {
    return function (v) {
        return Data_Exists.runExists(function (v1) {
            return Data_Functor.map(dictFunctor)(v1.k)(v1.fi);
        })(v);
    };
};
var liftCoyoneda = function (fa) {
    return Coyoneda(Data_Exists.mkExists({
        k: Control_Category.id(Control_Category.categoryFn), 
        fi: fa
    }));
};
var monadTransCoyoneda = new Control_Monad_Trans_Class.MonadTrans(function (dictMonad) {
    return liftCoyoneda;
});
var coyoneda = function (k) {
    return function (fi) {
        return Coyoneda(Data_Exists.mkExists({
            k: k, 
            fi: fi
        }));
    };
};
var functorCoyoneda = new Data_Functor.Functor(function (f) {
    return function (v) {
        return Data_Exists.runExists(function (v1) {
            return coyoneda(function ($36) {
                return f(v1.k($36));
            })(v1.fi);
        })(v);
    };
});
var extendCoyoneda = function (dictExtend) {
    return new Control_Extend.Extend(function () {
        return functorCoyoneda;
    }, function (f) {
        return function (v) {
            return Data_Exists.runExists(function (v1) {
                return liftCoyoneda(Control_Extend.extend(dictExtend)(function ($37) {
                    return f(coyoneda(v1.k)($37));
                })(v1.fi));
            })(v);
        };
    });
};
var hoistCoyoneda = function (nat) {
    return function (v) {
        return Data_Exists.runExists(function (v1) {
            return coyoneda(v1.k)(nat(v1.fi));
        })(v);
    };
};
var comonadCoyoneda = function (dictComonad) {
    return new Control_Comonad.Comonad(function () {
        return extendCoyoneda(dictComonad["__superclass_Control.Extend.Extend_0"]());
    }, function (v) {
        return Data_Exists.runExists(function (v1) {
            return v1.k(Control_Comonad.extract(dictComonad)(v1.fi));
        })(v);
    });
};
var applyCoyoneda = function (dictApply) {
    return new Control_Apply.Apply(function () {
        return functorCoyoneda;
    }, function (f) {
        return function (g) {
            return liftCoyoneda(Control_Apply.apply(dictApply)(lowerCoyoneda(dictApply["__superclass_Data.Functor.Functor_0"]())(f))(lowerCoyoneda(dictApply["__superclass_Data.Functor.Functor_0"]())(g)));
        };
    });
};
var bindCoyoneda = function (dictBind) {
    return new Control_Bind.Bind(function () {
        return applyCoyoneda(dictBind["__superclass_Control.Apply.Apply_0"]());
    }, function (v) {
        return function (k) {
            return liftCoyoneda(Data_Exists.runExists(function (v1) {
                return Control_Bind.bind(dictBind)(v1.fi)(function ($38) {
                    return lowerCoyoneda((dictBind["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(k(v1.k($38)));
                });
            })(v));
        };
    });
};
var applicativeCoyoneda = function (dictApplicative) {
    return new Control_Applicative.Applicative(function () {
        return applyCoyoneda(dictApplicative["__superclass_Control.Apply.Apply_0"]());
    }, function ($39) {
        return liftCoyoneda(Control_Applicative.pure(dictApplicative)($39));
    });
};
var monadCoyoneda = function (dictMonad) {
    return new Control_Monad.Monad(function () {
        return applicativeCoyoneda(dictMonad["__superclass_Control.Applicative.Applicative_0"]());
    }, function () {
        return bindCoyoneda(dictMonad["__superclass_Control.Bind.Bind_1"]());
    });
};
module.exports = {
    Coyoneda: Coyoneda, 
    coyoneda: coyoneda, 
    hoistCoyoneda: hoistCoyoneda, 
    liftCoyoneda: liftCoyoneda, 
    lowerCoyoneda: lowerCoyoneda, 
    functorCoyoneda: functorCoyoneda, 
    applyCoyoneda: applyCoyoneda, 
    applicativeCoyoneda: applicativeCoyoneda, 
    bindCoyoneda: bindCoyoneda, 
    monadCoyoneda: monadCoyoneda, 
    monadTransCoyoneda: monadTransCoyoneda, 
    extendCoyoneda: extendCoyoneda, 
    comonadCoyoneda: comonadCoyoneda
};
