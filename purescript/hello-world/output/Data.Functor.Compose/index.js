// Generated by psc version 0.10.5
"use strict";
var Prelude = require("../Prelude");
var Control_Alt = require("../Control.Alt");
var Control_Alternative = require("../Control.Alternative");
var Control_Plus = require("../Control.Plus");
var Data_Foldable = require("../Data.Foldable");
var Data_Newtype = require("../Data.Newtype");
var Data_Traversable = require("../Data.Traversable");
var Data_Eq = require("../Data.Eq");
var Data_Ord = require("../Data.Ord");
var Data_Show = require("../Data.Show");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Functor = require("../Data.Functor");
var Data_Function = require("../Data.Function");
var Control_Apply = require("../Control.Apply");
var Control_Applicative = require("../Control.Applicative");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Control_Category = require("../Control.Category");
var Compose = function (x) {
    return x;
};
var showCompose = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(Compose " + (Data_Show.show(dictShow)(v) + ")");
    });
};
var ordCompose = function (dictOrd) {
    return dictOrd;
};
var newtypeCompose = new Data_Newtype.Newtype(function (n) {
    return n;
}, Compose);
var functorCompose = function (dictFunctor) {
    return function (dictFunctor1) {
        return new Data_Functor.Functor(function (f) {
            return function (v) {
                return Compose(Data_Functor.map(dictFunctor)(Data_Functor.map(dictFunctor1)(f))(v));
            };
        });
    };
};
var foldableCompose = function (dictFoldable) {
    return function (dictFoldable1) {
        return new Data_Foldable.Foldable(function (dictMonoid) {
            return function (f) {
                return function (v) {
                    return Data_Foldable.foldMap(dictFoldable)(dictMonoid)(Data_Foldable.foldMap(dictFoldable1)(dictMonoid)(f))(v);
                };
            };
        }, function (f) {
            return function (i) {
                return function (v) {
                    return Data_Foldable.foldl(dictFoldable)(Data_Foldable.foldl(dictFoldable1)(f))(i)(v);
                };
            };
        }, function (f) {
            return function (i) {
                return function (v) {
                    return Data_Foldable.foldr(dictFoldable)(Data_Function.flip(Data_Foldable.foldr(dictFoldable1)(f)))(i)(v);
                };
            };
        });
    };
};
var traversableCompose = function (dictTraversable) {
    return function (dictTraversable1) {
        return new Data_Traversable.Traversable(function () {
            return foldableCompose(dictTraversable["__superclass_Data.Foldable.Foldable_1"]())(dictTraversable1["__superclass_Data.Foldable.Foldable_1"]());
        }, function () {
            return functorCompose(dictTraversable["__superclass_Data.Functor.Functor_0"]())(dictTraversable1["__superclass_Data.Functor.Functor_0"]());
        }, function (dictApplicative) {
            return Data_Traversable.traverse(traversableCompose(dictTraversable)(dictTraversable1))(dictApplicative)(Control_Category.id(Control_Category.categoryFn));
        }, function (dictApplicative) {
            return function (f) {
                return function (v) {
                    return Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Compose)(Data_Traversable.traverse(dictTraversable)(dictApplicative)(Data_Traversable.traverse(dictTraversable1)(dictApplicative)(f))(v));
                };
            };
        });
    };
};
var eqCompose = function (dictEq) {
    return dictEq;
};
var bihoistCompose = function (dictFunctor) {
    return function (natF) {
        return function (natG) {
            return function (v) {
                return natF(Data_Functor.map(dictFunctor)(natG)(v));
            };
        };
    };
};
var applyCompose = function (dictApply) {
    return function (dictApply1) {
        return new Control_Apply.Apply(function () {
            return functorCompose(dictApply["__superclass_Data.Functor.Functor_0"]())(dictApply1["__superclass_Data.Functor.Functor_0"]());
        }, function (v) {
            return function (v1) {
                return Compose(Control_Apply.apply(dictApply)(Data_Functor.map(dictApply["__superclass_Data.Functor.Functor_0"]())(Control_Apply.apply(dictApply1))(v))(v1));
            };
        });
    };
};
var applicativeCompose = function (dictApplicative) {
    return function (dictApplicative1) {
        return new Control_Applicative.Applicative(function () {
            return applyCompose(dictApplicative["__superclass_Control.Apply.Apply_0"]())(dictApplicative1["__superclass_Control.Apply.Apply_0"]());
        }, function ($57) {
            return Compose(Control_Applicative.pure(dictApplicative)(Control_Applicative.pure(dictApplicative1)($57)));
        });
    };
};
var altCompose = function (dictAlt) {
    return function (dictFunctor) {
        return new Control_Alt.Alt(function () {
            return functorCompose(dictAlt["__superclass_Data.Functor.Functor_0"]())(dictFunctor);
        }, function (v) {
            return function (v1) {
                return Compose(Control_Alt.alt(dictAlt)(v)(v1));
            };
        });
    };
};
var plusCompose = function (dictPlus) {
    return function (dictFunctor) {
        return new Control_Plus.Plus(function () {
            return altCompose(dictPlus["__superclass_Control.Alt.Alt_0"]())(dictFunctor);
        }, Control_Plus.empty(dictPlus));
    };
};
var alternativeCompose = function (dictAlternative) {
    return function (dictApplicative) {
        return new Control_Alternative.Alternative(function () {
            return applicativeCompose(dictAlternative["__superclass_Control.Applicative.Applicative_0"]())(dictApplicative);
        }, function () {
            return plusCompose(dictAlternative["__superclass_Control.Plus.Plus_1"]())((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]());
        });
    };
};
module.exports = {
    Compose: Compose, 
    bihoistCompose: bihoistCompose, 
    newtypeCompose: newtypeCompose, 
    eqCompose: eqCompose, 
    ordCompose: ordCompose, 
    showCompose: showCompose, 
    functorCompose: functorCompose, 
    applyCompose: applyCompose, 
    applicativeCompose: applicativeCompose, 
    foldableCompose: foldableCompose, 
    traversableCompose: traversableCompose, 
    altCompose: altCompose, 
    plusCompose: plusCompose, 
    alternativeCompose: alternativeCompose
};
