// Generated by psc version 0.10.5
"use strict";
var Prelude = require("../Prelude");
var Control_Apply = require("../Control.Apply");
var Data_Bifunctor = require("../Data.Bifunctor");
var Data_Foldable = require("../Data.Foldable");
var Data_Newtype = require("../Data.Newtype");
var Data_Traversable = require("../Data.Traversable");
var Data_Tuple = require("../Data.Tuple");
var Data_Eq = require("../Data.Eq");
var Data_Ord = require("../Data.Ord");
var Data_Show = require("../Data.Show");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Functor = require("../Data.Functor");
var Control_Applicative = require("../Control.Applicative");
var Control_Bind = require("../Control.Bind");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Control_Monad = require("../Control.Monad");
var Product = function (x) {
    return x;
};
var showProduct = function (dictShow) {
    return function (dictShow1) {
        return new Data_Show.Show(function (v) {
            return "(product " + (Data_Show.show(dictShow)(v.value0) + (" " + (Data_Show.show(dictShow1)(v.value1) + ")")));
        });
    };
};
var product = function (fa) {
    return function (ga) {
        return new Data_Tuple.Tuple(fa, ga);
    };
};
var newtypeProduct = new Data_Newtype.Newtype(function (n) {
    return n;
}, Product);
var functorProduct = function (dictFunctor) {
    return function (dictFunctor1) {
        return new Data_Functor.Functor(function (f) {
            return function (v) {
                return Data_Bifunctor.bimap(Data_Tuple.bifunctorTuple)(Data_Functor.map(dictFunctor)(f))(Data_Functor.map(dictFunctor1)(f))(v);
            };
        });
    };
};
var foldableProduct = function (dictFoldable) {
    return function (dictFoldable1) {
        return new Data_Foldable.Foldable(function (dictMonoid) {
            return function (f) {
                return function (v) {
                    return Data_Semigroup.append(dictMonoid["__superclass_Data.Semigroup.Semigroup_0"]())(Data_Foldable.foldMap(dictFoldable)(dictMonoid)(f)(v.value0))(Data_Foldable.foldMap(dictFoldable1)(dictMonoid)(f)(v.value1));
                };
            };
        }, function (f) {
            return function (z) {
                return function (v) {
                    return Data_Foldable.foldl(dictFoldable1)(f)(Data_Foldable.foldl(dictFoldable)(f)(z)(v.value0))(v.value1);
                };
            };
        }, function (f) {
            return function (z) {
                return function (v) {
                    return Data_Foldable.foldr(dictFoldable)(f)(Data_Foldable.foldr(dictFoldable1)(f)(z)(v.value1))(v.value0);
                };
            };
        });
    };
};
var traversableProduct = function (dictTraversable) {
    return function (dictTraversable1) {
        return new Data_Traversable.Traversable(function () {
            return foldableProduct(dictTraversable["__superclass_Data.Foldable.Foldable_1"]())(dictTraversable1["__superclass_Data.Foldable.Foldable_1"]());
        }, function () {
            return functorProduct(dictTraversable["__superclass_Data.Functor.Functor_0"]())(dictTraversable1["__superclass_Data.Functor.Functor_0"]());
        }, function (dictApplicative) {
            return function (v) {
                return Control_Apply.lift2(dictApplicative["__superclass_Control.Apply.Apply_0"]())(product)(Data_Traversable.sequence(dictTraversable)(dictApplicative)(v.value0))(Data_Traversable.sequence(dictTraversable1)(dictApplicative)(v.value1));
            };
        }, function (dictApplicative) {
            return function (f) {
                return function (v) {
                    return Control_Apply.lift2(dictApplicative["__superclass_Control.Apply.Apply_0"]())(product)(Data_Traversable.traverse(dictTraversable)(dictApplicative)(f)(v.value0))(Data_Traversable.traverse(dictTraversable1)(dictApplicative)(f)(v.value1));
                };
            };
        });
    };
};
var eqProduct = function (dictEq) {
    return function (dictEq1) {
        return new Data_Eq.Eq(function (x) {
            return function (y) {
                return Data_Eq.eq(Data_Tuple.eqTuple(dictEq)(dictEq1))(x)(y);
            };
        });
    };
};
var ordProduct = function (dictOrd) {
    return function (dictOrd1) {
        return new Data_Ord.Ord(function () {
            return eqProduct(dictOrd["__superclass_Data.Eq.Eq_0"]())(dictOrd1["__superclass_Data.Eq.Eq_0"]());
        }, function (x) {
            return function (y) {
                return Data_Ord.compare(Data_Tuple.ordTuple(dictOrd)(dictOrd1))(x)(y);
            };
        });
    };
};
var bihoistProduct = function (natF) {
    return function (natG) {
        return function (v) {
            return Data_Bifunctor.bimap(Data_Tuple.bifunctorTuple)(natF)(natG)(v);
        };
    };
};
var applyProduct = function (dictApply) {
    return function (dictApply1) {
        return new Control_Apply.Apply(function () {
            return functorProduct(dictApply["__superclass_Data.Functor.Functor_0"]())(dictApply1["__superclass_Data.Functor.Functor_0"]());
        }, function (v) {
            return function (v1) {
                return product(Control_Apply.apply(dictApply)(v.value0)(v1.value0))(Control_Apply.apply(dictApply1)(v.value1)(v1.value1));
            };
        });
    };
};
var bindProduct = function (dictBind) {
    return function (dictBind1) {
        return new Control_Bind.Bind(function () {
            return applyProduct(dictBind["__superclass_Control.Apply.Apply_0"]())(dictBind1["__superclass_Control.Apply.Apply_0"]());
        }, function (v) {
            return function (f) {
                return product(Control_Bind.bind(dictBind)(v.value0)(function ($88) {
                    return Data_Tuple.fst(Data_Newtype.unwrap(newtypeProduct)(f($88)));
                }))(Control_Bind.bind(dictBind1)(v.value1)(function ($89) {
                    return Data_Tuple.snd(Data_Newtype.unwrap(newtypeProduct)(f($89)));
                }));
            };
        });
    };
};
var applicativeProduct = function (dictApplicative) {
    return function (dictApplicative1) {
        return new Control_Applicative.Applicative(function () {
            return applyProduct(dictApplicative["__superclass_Control.Apply.Apply_0"]())(dictApplicative1["__superclass_Control.Apply.Apply_0"]());
        }, function (a) {
            return product(Control_Applicative.pure(dictApplicative)(a))(Control_Applicative.pure(dictApplicative1)(a));
        });
    };
};
var monadProduct = function (dictMonad) {
    return function (dictMonad1) {
        return new Control_Monad.Monad(function () {
            return applicativeProduct(dictMonad["__superclass_Control.Applicative.Applicative_0"]())(dictMonad1["__superclass_Control.Applicative.Applicative_0"]());
        }, function () {
            return bindProduct(dictMonad["__superclass_Control.Bind.Bind_1"]())(dictMonad1["__superclass_Control.Bind.Bind_1"]());
        });
    };
};
module.exports = {
    Product: Product, 
    bihoistProduct: bihoistProduct, 
    product: product, 
    newtypeProduct: newtypeProduct, 
    eqProduct: eqProduct, 
    ordProduct: ordProduct, 
    showProduct: showProduct, 
    functorProduct: functorProduct, 
    foldableProduct: foldableProduct, 
    traversableProduct: traversableProduct, 
    applyProduct: applyProduct, 
    applicativeProduct: applicativeProduct, 
    bindProduct: bindProduct, 
    monadProduct: monadProduct
};
