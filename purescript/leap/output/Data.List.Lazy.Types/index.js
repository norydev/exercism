// Generated by psc version 0.10.5
"use strict";
var Prelude = require("../Prelude");
var Control_Alt = require("../Control.Alt");
var Control_Alternative = require("../Control.Alternative");
var Control_Extend = require("../Control.Extend");
var Control_Comonad = require("../Control.Comonad");
var Control_Lazy = require("../Control.Lazy");
var Control_MonadPlus = require("../Control.MonadPlus");
var Control_MonadZero = require("../Control.MonadZero");
var Control_Plus = require("../Control.Plus");
var Data_Foldable = require("../Data.Foldable");
var Data_Lazy = require("../Data.Lazy");
var Data_Maybe = require("../Data.Maybe");
var Data_Monoid = require("../Data.Monoid");
var Data_Newtype = require("../Data.Newtype");
var Data_NonEmpty = require("../Data.NonEmpty");
var Data_Traversable = require("../Data.Traversable");
var Data_Tuple = require("../Data.Tuple");
var Data_Unfoldable = require("../Data.Unfoldable");
var Data_Show = require("../Data.Show");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Eq = require("../Data.Eq");
var Data_Ord = require("../Data.Ord");
var Data_Ordering = require("../Data.Ordering");
var Data_Function = require("../Data.Function");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Functor = require("../Data.Functor");
var Control_Apply = require("../Control.Apply");
var Control_Applicative = require("../Control.Applicative");
var Control_Category = require("../Control.Category");
var Control_Monad = require("../Control.Monad");
var Control_Bind = require("../Control.Bind");
var List = function (x) {
    return x;
};
var Nil = (function () {
    function Nil() {

    };
    Nil.value = new Nil();
    return Nil;
})();
var Cons = (function () {
    function Cons(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Cons.create = function (value0) {
        return function (value1) {
            return new Cons(value0, value1);
        };
    };
    return Cons;
})();
var NonEmptyList = function (x) {
    return x;
};
var nil = List(Data_Lazy.defer(function (v) {
    return Nil.value;
}));
var newtypeNonEmptyList = new Data_Newtype.Newtype(function (n) {
    return n;
}, NonEmptyList);
var newtypeList = new Data_Newtype.Newtype(function (n) {
    return n;
}, List);
var step = function ($154) {
    return Data_Lazy.force(Data_Newtype.unwrap(newtypeList)($154));
};
var semigroupList = new Data_Semigroup.Semigroup(function (xs) {
    return function (ys) {
        var go = function (v) {
            if (v instanceof Nil) {
                return step(ys);
            };
            if (v instanceof Cons) {
                return new Cons(v.value0, Data_Semigroup.append(semigroupList)(v.value1)(ys));
            };
            throw new Error("Failed pattern match at Data.List.Lazy.Types line 88, column 5 - line 88, column 21: " + [ v.constructor.name ]);
        };
        return Data_Functor.map(Data_Lazy.functorLazy)(go)(Data_Newtype.unwrap(newtypeList)(xs));
    };
});
var showList = function (dictShow) {
    return new Data_Show.Show(function (xs) {
        var go = function (v) {
            if (v instanceof Nil) {
                return "Nil";
            };
            if (v instanceof Cons) {
                return "(Cons " + (Data_Show.show(dictShow)(v.value0) + (" " + (go(step(v.value1)) + ")")));
            };
            throw new Error("Failed pattern match at Data.List.Lazy.Types line 58, column 3 - line 63, column 1: " + [ v.constructor.name ]);
        };
        return "fromStrict (" + (go(step(xs)) + ")");
    });
};
var showNonEmptyList = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(NonEmptyList " + (Data_Show.show(Data_Lazy.showLazy(Data_NonEmpty.showNonEmpty(dictShow)(showList(dictShow))))(v) + ")");
    });
};
var monoidList = new Data_Monoid.Monoid(function () {
    return semigroupList;
}, nil);
var lazyList = new Control_Lazy.Lazy(function (f) {
    return List(Data_Lazy.defer(function ($155) {
        return step(f($155));
    }));
});
var functorList = new Data_Functor.Functor(function (f) {
    return function (xs) {
        var go = function (v) {
            if (v instanceof Nil) {
                return Nil.value;
            };
            if (v instanceof Cons) {
                return new Cons(f(v.value0), Data_Functor.map(functorList)(f)(v.value1));
            };
            throw new Error("Failed pattern match at Data.List.Lazy.Types line 97, column 5 - line 97, column 17: " + [ v.constructor.name ]);
        };
        return Data_Functor.map(Data_Lazy.functorLazy)(go)(Data_Newtype.unwrap(newtypeList)(xs));
    };
});
var functorNonEmptyList = new Data_Functor.Functor(function (f) {
    return function (v) {
        return Data_Functor.map(Data_Lazy.functorLazy)(Data_Functor.map(Data_NonEmpty.functorNonEmpty(functorList))(f))(v);
    };
});
var eqList = function (dictEq) {
    return new Data_Eq.Eq(function (xs) {
        return function (ys) {
            var go = function (__copy_v) {
                return function (__copy_v1) {
                    var v = __copy_v;
                    var v1 = __copy_v1;
                    tco: while (true) {
                        if (v instanceof Nil && v1 instanceof Nil) {
                            return true;
                        };
                        if (v instanceof Cons && (v1 instanceof Cons && Data_Eq.eq(dictEq)(v.value0)(v1.value0))) {
                            var __tco_v = step(v.value1);
                            var __tco_v1 = step(v1.value1);
                            v = __tco_v;
                            v1 = __tco_v1;
                            continue tco;
                        };
                        return false;
                    };
                };
            };
            return go(step(xs))(step(ys));
        };
    });
};
var eqNonEmptyList = function (dictEq) {
    return Data_Lazy.eqLazy(Data_NonEmpty.eqNonEmpty(dictEq)(eqList(dictEq)));
};
var ordList = function (dictOrd) {
    return new Data_Ord.Ord(function () {
        return eqList(dictOrd["__superclass_Data.Eq.Eq_0"]());
    }, function (xs) {
        return function (ys) {
            var go = function (__copy_v) {
                return function (__copy_v1) {
                    var v = __copy_v;
                    var v1 = __copy_v1;
                    tco: while (true) {
                        if (v instanceof Nil && v1 instanceof Nil) {
                            return Data_Ordering.EQ.value;
                        };
                        if (v instanceof Nil) {
                            return Data_Ordering.LT.value;
                        };
                        if (v1 instanceof Nil) {
                            return Data_Ordering.GT.value;
                        };
                        if (v instanceof Cons && v1 instanceof Cons) {
                            var $75 = Data_Ord.compare(dictOrd)(v.value0)(v1.value0);
                            if ($75 instanceof Data_Ordering.EQ) {
                                var __tco_v = step(v.value1);
                                var __tco_v1 = step(v1.value1);
                                v = __tco_v;
                                v1 = __tco_v1;
                                continue tco;
                            };
                            return $75;
                        };
                        throw new Error("Failed pattern match at Data.List.Lazy.Types line 72, column 3 - line 80, column 23: " + [ v.constructor.name, v1.constructor.name ]);
                    };
                };
            };
            return go(step(xs))(step(ys));
        };
    });
};
var ordNonEmptyList = function (dictOrd) {
    return Data_Lazy.ordLazy(Data_NonEmpty.ordNonEmpty(dictOrd)(ordList(dictOrd)));
};
var cons = function (x) {
    return function (xs) {
        return List(Data_Lazy.defer(function (v) {
            return new Cons(x, xs);
        }));
    };
};
var foldableList = new Data_Foldable.Foldable(function (dictMonoid) {
    return function (f) {
        return Data_Foldable.foldl(foldableList)(function (b) {
            return function (a) {
                return Data_Semigroup.append(dictMonoid["__superclass_Data.Semigroup.Semigroup_0"]())(b)(f(a));
            };
        })(Data_Monoid.mempty(dictMonoid));
    };
}, (function () {
    var go = function (__copy_op) {
        return function (__copy_b) {
            return function (__copy_xs) {
                var op = __copy_op;
                var b = __copy_b;
                var xs = __copy_xs;
                tco: while (true) {
                    var $81 = step(xs);
                    if ($81 instanceof Nil) {
                        return b;
                    };
                    if ($81 instanceof Cons) {
                        var __tco_op = op;
                        var __tco_b = op(b)($81.value0);
                        op = __tco_op;
                        b = __tco_b;
                        xs = $81.value1;
                        continue tco;
                    };
                    throw new Error("Failed pattern match at Data.List.Lazy.Types line 107, column 18 - line 109, column 41: " + [ $81.constructor.name ]);
                };
            };
        };
    };
    return go;
})(), function (op) {
    return function (z) {
        return function (xs) {
            var rev = Data_Foldable.foldl(foldableList)(Data_Function.flip(cons))(nil);
            return Data_Foldable.foldl(foldableList)(Data_Function.flip(op))(z)(rev(xs));
        };
    };
});
var extendList = new Control_Extend.Extend(function () {
    return functorList;
}, function (f) {
    return function (l) {
        var go = function (a) {
            return function (v) {
                var acc$prime = cons(a)(v.acc);
                return {
                    val: cons(f(acc$prime))(v.val), 
                    acc: acc$prime
                };
            };
        };
        var $88 = step(l);
        if ($88 instanceof Nil) {
            return nil;
        };
        if ($88 instanceof Cons) {
            return cons(f(l))((Data_Foldable.foldr(foldableList)(go)({
                val: nil, 
                acc: nil
            })($88.value1)).val);
        };
        throw new Error("Failed pattern match at Data.List.Lazy.Types line 153, column 5 - line 156, column 55: " + [ $88.constructor.name ]);
    };
});
var extendNonEmptyList = new Control_Extend.Extend(function () {
    return functorNonEmptyList;
}, function (f) {
    return function (v) {
        var go = function (a) {
            return function (v1) {
                return {
                    val: cons(f(Data_Lazy.defer(function (v2) {
                        return new Data_NonEmpty.NonEmpty(a, v1.acc);
                    })))(v1.val), 
                    acc: cons(a)(v1.acc)
                };
            };
        };
        var $98 = Data_Lazy.force(v);
        return NonEmptyList(Data_Lazy.defer(function (v1) {
            return new Data_NonEmpty.NonEmpty(f(v), (Data_Foldable.foldr(foldableList)(go)({
                val: nil, 
                acc: nil
            })($98.value1)).val);
        }));
    };
});
var foldableNonEmptyList = new Data_Foldable.Foldable(function (dictMonoid) {
    return function (f) {
        return function (v) {
            return Data_Foldable.foldMap(Data_NonEmpty.foldableNonEmpty(foldableList))(dictMonoid)(f)(Data_Lazy.force(v));
        };
    };
}, function (f) {
    return function (b) {
        return function (v) {
            return Data_Foldable.foldl(Data_NonEmpty.foldableNonEmpty(foldableList))(f)(b)(Data_Lazy.force(v));
        };
    };
}, function (f) {
    return function (b) {
        return function (v) {
            return Data_Foldable.foldr(Data_NonEmpty.foldableNonEmpty(foldableList))(f)(b)(Data_Lazy.force(v));
        };
    };
});
var toList = function (v) {
    return Control_Lazy.defer(lazyList)(function (v1) {
        var $112 = Data_Lazy.force(v);
        return cons($112.value0)($112.value1);
    });
};
var semigroupNonEmptyList = new Data_Semigroup.Semigroup(function (v) {
    return function (as$prime) {
        var $117 = Data_Lazy.force(v);
        return Data_Lazy.defer(function (v1) {
            return new Data_NonEmpty.NonEmpty($117.value0, Data_Semigroup.append(semigroupList)($117.value1)(toList(as$prime)));
        });
    };
});
var traversableList = new Data_Traversable.Traversable(function () {
    return foldableList;
}, function () {
    return functorList;
}, function (dictApplicative) {
    return Data_Traversable.traverse(traversableList)(dictApplicative)(Control_Category.id(Control_Category.categoryFn));
}, function (dictApplicative) {
    return function (f) {
        return Data_Foldable.foldr(foldableList)(function (a) {
            return function (b) {
                return Control_Apply.apply(dictApplicative["__superclass_Control.Apply.Apply_0"]())(Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(cons)(f(a)))(b);
            };
        })(Control_Applicative.pure(dictApplicative)(nil));
    };
});
var traversableNonEmptyList = new Data_Traversable.Traversable(function () {
    return foldableNonEmptyList;
}, function () {
    return functorNonEmptyList;
}, function (dictApplicative) {
    return function (v) {
        return Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(function (xxs) {
            return NonEmptyList(Data_Lazy.defer(function (v1) {
                return xxs;
            }));
        })(Data_Traversable.sequence(Data_NonEmpty.traversableNonEmpty(traversableList))(dictApplicative)(Data_Lazy.force(v)));
    };
}, function (dictApplicative) {
    return function (f) {
        return function (v) {
            return Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(function (xxs) {
                return NonEmptyList(Data_Lazy.defer(function (v1) {
                    return xxs;
                }));
            })(Data_Traversable.traverse(Data_NonEmpty.traversableNonEmpty(traversableList))(dictApplicative)(f)(Data_Lazy.force(v)));
        };
    };
});
var unfoldableList = new Data_Unfoldable.Unfoldable((function () {
    var go = function (f) {
        return function (b) {
            return Control_Lazy.defer(lazyList)(function (v) {
                var $127 = f(b);
                if ($127 instanceof Data_Maybe.Nothing) {
                    return nil;
                };
                if ($127 instanceof Data_Maybe.Just) {
                    return cons($127.value0.value0)(go(f)($127.value0.value1));
                };
                throw new Error("Failed pattern match at Data.List.Lazy.Types line 115, column 28 - line 117, column 39: " + [ $127.constructor.name ]);
            });
        };
    };
    return go;
})());
var comonadNonEmptyList = new Control_Comonad.Comonad(function () {
    return extendNonEmptyList;
}, function (v) {
    return Data_NonEmpty.head(Data_Lazy.force(v));
});
var monadList = new Control_Monad.Monad(function () {
    return applicativeList;
}, function () {
    return bindList;
});
var bindList = new Control_Bind.Bind(function () {
    return applyList;
}, function (xs) {
    return function (f) {
        var go = function (v) {
            if (v instanceof Nil) {
                return Nil.value;
            };
            if (v instanceof Cons) {
                return step(Data_Semigroup.append(semigroupList)(f(v.value0))(Control_Bind.bind(bindList)(v.value1)(f)));
            };
            throw new Error("Failed pattern match at Data.List.Lazy.Types line 134, column 5 - line 134, column 17: " + [ v.constructor.name ]);
        };
        return Data_Functor.map(Data_Lazy.functorLazy)(go)(Data_Newtype.unwrap(newtypeList)(xs));
    };
});
var applyList = new Control_Apply.Apply(function () {
    return functorList;
}, Control_Monad.ap(monadList));
var applicativeList = new Control_Applicative.Applicative(function () {
    return applyList;
}, function (a) {
    return cons(a)(nil);
});
var applyNonEmptyList = new Control_Apply.Apply(function () {
    return functorNonEmptyList;
}, function (v) {
    return function (v1) {
        var $137 = Data_Lazy.force(v);
        var $138 = Data_Lazy.force(v1);
        return Data_Lazy.defer(function (v2) {
            return new Data_NonEmpty.NonEmpty($137.value0($138.value0), Data_Semigroup.append(semigroupList)(Control_Apply.apply(applyList)($137.value1)(cons($138.value0)(nil)))(Control_Apply.apply(applyList)(cons($137.value0)($137.value1))($138.value1)));
        });
    };
});
var bindNonEmptyList = new Control_Bind.Bind(function () {
    return applyNonEmptyList;
}, function (v) {
    return function (f) {
        var $146 = Data_Lazy.force(v);
        var $147 = Data_Lazy.force(Data_Newtype.unwrap(newtypeNonEmptyList)(f($146.value0)));
        return Data_Lazy.defer(function (v1) {
            return new Data_NonEmpty.NonEmpty($147.value0, Data_Semigroup.append(semigroupList)($147.value1)(Control_Bind.bind(bindList)($146.value1)(function ($156) {
                return toList(f($156));
            })));
        });
    };
});
var altNonEmptyList = new Control_Alt.Alt(function () {
    return functorNonEmptyList;
}, Data_Semigroup.append(semigroupNonEmptyList));
var altList = new Control_Alt.Alt(function () {
    return functorList;
}, Data_Semigroup.append(semigroupList));
var plusList = new Control_Plus.Plus(function () {
    return altList;
}, nil);
var alternativeList = new Control_Alternative.Alternative(function () {
    return applicativeList;
}, function () {
    return plusList;
});
var monadZeroList = new Control_MonadZero.MonadZero(function () {
    return alternativeList;
}, function () {
    return monadList;
});
var monadPlusList = new Control_MonadPlus.MonadPlus(function () {
    return monadZeroList;
});
var applicativeNonEmptyList = new Control_Applicative.Applicative(function () {
    return applyNonEmptyList;
}, function (a) {
    return Data_Lazy.defer(function (v) {
        return Data_NonEmpty.singleton(plusList)(a);
    });
});
var monadNonEmptyList = new Control_Monad.Monad(function () {
    return applicativeNonEmptyList;
}, function () {
    return bindNonEmptyList;
});
module.exports = {
    List: List, 
    NonEmptyList: NonEmptyList, 
    Nil: Nil, 
    Cons: Cons, 
    cons: cons, 
    nil: nil, 
    step: step, 
    toList: toList, 
    newtypeList: newtypeList, 
    showList: showList, 
    eqList: eqList, 
    ordList: ordList, 
    lazyList: lazyList, 
    semigroupList: semigroupList, 
    monoidList: monoidList, 
    functorList: functorList, 
    foldableList: foldableList, 
    unfoldableList: unfoldableList, 
    traversableList: traversableList, 
    applyList: applyList, 
    applicativeList: applicativeList, 
    bindList: bindList, 
    monadList: monadList, 
    altList: altList, 
    plusList: plusList, 
    alternativeList: alternativeList, 
    monadZeroList: monadZeroList, 
    monadPlusList: monadPlusList, 
    extendList: extendList, 
    newtypeNonEmptyList: newtypeNonEmptyList, 
    eqNonEmptyList: eqNonEmptyList, 
    ordNonEmptyList: ordNonEmptyList, 
    showNonEmptyList: showNonEmptyList, 
    functorNonEmptyList: functorNonEmptyList, 
    applyNonEmptyList: applyNonEmptyList, 
    applicativeNonEmptyList: applicativeNonEmptyList, 
    bindNonEmptyList: bindNonEmptyList, 
    monadNonEmptyList: monadNonEmptyList, 
    altNonEmptyList: altNonEmptyList, 
    extendNonEmptyList: extendNonEmptyList, 
    comonadNonEmptyList: comonadNonEmptyList, 
    semigroupNonEmptyList: semigroupNonEmptyList, 
    foldableNonEmptyList: foldableNonEmptyList, 
    traversableNonEmptyList: traversableNonEmptyList
};
