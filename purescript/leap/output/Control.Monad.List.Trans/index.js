// Generated by psc version 0.10.5
"use strict";
var Prelude = require("../Prelude");
var Control_Alt = require("../Control.Alt");
var Control_Alternative = require("../Control.Alternative");
var Control_Monad_Eff_Class = require("../Control.Monad.Eff.Class");
var Control_Monad_Trans_Class = require("../Control.Monad.Trans.Class");
var Control_MonadPlus = require("../Control.MonadPlus");
var Control_MonadZero = require("../Control.MonadZero");
var Control_Plus = require("../Control.Plus");
var Data_Lazy = require("../Data.Lazy");
var Data_Maybe = require("../Data.Maybe");
var Data_Monoid = require("../Data.Monoid");
var Data_Newtype = require("../Data.Newtype");
var Data_Tuple = require("../Data.Tuple");
var Data_Unfoldable = require("../Data.Unfoldable");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Functor = require("../Data.Functor");
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Monad = require("../Control.Monad");
var Control_Bind = require("../Control.Bind");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Function = require("../Data.Function");
var Data_Ring = require("../Data.Ring");
var Control_Category = require("../Control.Category");
var Yield = (function () {
    function Yield(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Yield.create = function (value0) {
        return function (value1) {
            return new Yield(value0, value1);
        };
    };
    return Yield;
})();
var Skip = (function () {
    function Skip(value0) {
        this.value0 = value0;
    };
    Skip.create = function (value0) {
        return new Skip(value0);
    };
    return Skip;
})();
var Done = (function () {
    function Done() {

    };
    Done.value = new Done();
    return Done;
})();
var ListT = function (x) {
    return x;
};
var wrapLazy = function (dictApplicative) {
    return function (v) {
        return ListT(Control_Applicative.pure(dictApplicative)(new Skip(v)));
    };
};
var wrapEffect = function (dictFunctor) {
    return function (v) {
        return ListT(Data_Functor.map(dictFunctor)(function ($166) {
            return Skip.create(Data_Lazy.defer(Data_Function["const"]($166)));
        })(v));
    };
};
var unfold = function (dictMonad) {
    return function (f) {
        return function (z) {
            var g = function (v) {
                if (v instanceof Data_Maybe.Just) {
                    return new Yield(v.value0.value1, Data_Lazy.defer(function (v1) {
                        return unfold(dictMonad)(f)(v.value0.value0);
                    }));
                };
                if (v instanceof Data_Maybe.Nothing) {
                    return Done.value;
                };
                throw new Error("Failed pattern match at Control.Monad.List.Trans line 120, column 3 - line 120, column 60: " + [ v.constructor.name ]);
            };
            return ListT(Data_Functor.map(((dictMonad["__superclass_Control.Bind.Bind_1"]())["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(g)(f(z)));
        };
    };
};
var uncons = function (dictMonad) {
    return function (v) {
        var g = function (v1) {
            if (v1 instanceof Yield) {
                return Control_Applicative.pure(dictMonad["__superclass_Control.Applicative.Applicative_0"]())(Data_Maybe.Just.create(new Data_Tuple.Tuple(v1.value0, Data_Lazy.force(v1.value1))));
            };
            if (v1 instanceof Skip) {
                return uncons(dictMonad)(Data_Lazy.force(v1.value0));
            };
            if (v1 instanceof Done) {
                return Control_Applicative.pure(dictMonad["__superclass_Control.Applicative.Applicative_0"]())(Data_Maybe.Nothing.value);
            };
            throw new Error("Failed pattern match at Control.Monad.List.Trans line 185, column 3 - line 185, column 50: " + [ v1.constructor.name ]);
        };
        return Control_Bind.bind(dictMonad["__superclass_Control.Bind.Bind_1"]())(v)(g);
    };
};
var tail = function (dictMonad) {
    return function (l) {
        return Data_Functor.map(((dictMonad["__superclass_Control.Bind.Bind_1"]())["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Data_Functor.map(Data_Maybe.functorMaybe)(Data_Tuple.snd))(uncons(dictMonad)(l));
    };
};
var stepMap = function (dictFunctor) {
    return function (f) {
        return function (v) {
            return ListT(Data_Functor.map(dictFunctor)(f)(v));
        };
    };
};
var takeWhile = function (dictApplicative) {
    return function (f) {
        var g = function (v) {
            if (v instanceof Yield) {
                var $90 = f(v.value0);
                if ($90) {
                    return new Yield(v.value0, Data_Functor.map(Data_Lazy.functorLazy)(takeWhile(dictApplicative)(f))(v.value1));
                };
                if (!$90) {
                    return Done.value;
                };
                throw new Error("Failed pattern match at Control.Monad.List.Trans line 144, column 19 - line 144, column 68: " + [ $90.constructor.name ]);
            };
            if (v instanceof Skip) {
                return Skip.create(Data_Functor.map(Data_Lazy.functorLazy)(takeWhile(dictApplicative)(f))(v.value0));
            };
            if (v instanceof Done) {
                return Done.value;
            };
            throw new Error("Failed pattern match at Control.Monad.List.Trans line 144, column 3 - line 144, column 68: " + [ v.constructor.name ]);
        };
        return stepMap((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(g);
    };
};
var scanl = function (dictMonad) {
    return function (f) {
        return function (b) {
            return function (l) {
                var g = function (v) {
                    var h = function (v1) {
                        if (v1 instanceof Yield) {
                            var b$prime$prime = f(v.value0)(v1.value0);
                            return Data_Maybe.Just.create(new Data_Tuple.Tuple(new Data_Tuple.Tuple(b$prime$prime, Data_Lazy.force(v1.value1)), v.value0));
                        };
                        if (v1 instanceof Skip) {
                            return Data_Maybe.Just.create(new Data_Tuple.Tuple(new Data_Tuple.Tuple(v.value0, Data_Lazy.force(v1.value0)), v.value0));
                        };
                        if (v1 instanceof Done) {
                            return Data_Maybe.Nothing.value;
                        };
                        throw new Error("Failed pattern match at Control.Monad.List.Trans line 219, column 5 - line 219, column 78: " + [ v1.constructor.name ]);
                    };
                    return Data_Functor.map(((dictMonad["__superclass_Control.Bind.Bind_1"]())["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(h)(v.value1);
                };
                return unfold(dictMonad)(g)(new Data_Tuple.Tuple(b, l));
            };
        };
    };
};
var runListT = function (v) {
    return v;
};
var prepend$prime = function (dictApplicative) {
    return function (h) {
        return function (t) {
            return ListT(Control_Applicative.pure(dictApplicative)(new Yield(h, t)));
        };
    };
};
var prepend = function (dictApplicative) {
    return function (h) {
        return function (t) {
            return prepend$prime(dictApplicative)(h)(Data_Lazy.defer(Data_Function["const"](t)));
        };
    };
};
var nil = function (dictApplicative) {
    return ListT(Control_Applicative.pure(dictApplicative)(Done.value));
};
var singleton = function (dictApplicative) {
    return function (a) {
        return prepend(dictApplicative)(a)(nil(dictApplicative));
    };
};
var take = function (dictApplicative) {
    return function (v) {
        return function (fa) {
            if (v === 0) {
                return nil(dictApplicative);
            };
            var f = function (v1) {
                if (v1 instanceof Yield) {
                    return new Yield(v1.value0, Data_Functor.map(Data_Lazy.functorLazy)(take(dictApplicative)(v - 1))(v1.value1));
                };
                if (v1 instanceof Skip) {
                    return new Skip(Data_Functor.map(Data_Lazy.functorLazy)(take(dictApplicative)(v))(v1.value0));
                };
                if (v1 instanceof Done) {
                    return Done.value;
                };
                throw new Error("Failed pattern match at Control.Monad.List.Trans line 137, column 3 - line 137, column 47: " + [ v1.constructor.name ]);
            };
            return stepMap((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(f)(fa);
        };
    };
};
var zipWith$prime = function (dictMonad) {
    return function (f) {
        var g = function (v) {
            return function (v1) {
                if (v1 instanceof Data_Maybe.Nothing) {
                    return Control_Applicative.pure(dictMonad["__superclass_Control.Applicative.Applicative_0"]())(nil(dictMonad["__superclass_Control.Applicative.Applicative_0"]()));
                };
                if (v instanceof Data_Maybe.Nothing) {
                    return Control_Applicative.pure(dictMonad["__superclass_Control.Applicative.Applicative_0"]())(nil(dictMonad["__superclass_Control.Applicative.Applicative_0"]()));
                };
                if (v instanceof Data_Maybe.Just && v1 instanceof Data_Maybe.Just) {
                    return Data_Functor.map(((dictMonad["__superclass_Control.Bind.Bind_1"]())["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Data_Function.flip(prepend$prime(dictMonad["__superclass_Control.Applicative.Applicative_0"]()))(Data_Lazy.defer(function (v2) {
                        return zipWith$prime(dictMonad)(f)(v.value0.value1)(v1.value0.value1);
                    })))(f(v.value0.value0)(v1.value0.value0));
                };
                throw new Error("Failed pattern match at Control.Monad.List.Trans line 226, column 3 - line 229, column 12: " + [ v.constructor.name, v1.constructor.name ]);
            };
        };
        var loop = function (fa) {
            return function (fb) {
                return wrapEffect(((dictMonad["__superclass_Control.Bind.Bind_1"]())["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Control_Bind.bind(dictMonad["__superclass_Control.Bind.Bind_1"]())(uncons(dictMonad)(fa))(function (v) {
                    return Control_Bind.bind(dictMonad["__superclass_Control.Bind.Bind_1"]())(uncons(dictMonad)(fb))(function (v1) {
                        return g(v)(v1);
                    });
                }));
            };
        };
        return loop;
    };
};
var zipWith = function (dictMonad) {
    return function (f) {
        var g = function (a) {
            return function (b) {
                return Control_Applicative.pure(dictMonad["__superclass_Control.Applicative.Applicative_0"]())(f(a)(b));
            };
        };
        return zipWith$prime(dictMonad)(g);
    };
};
var newtypeListT = new Data_Newtype.Newtype(function (n) {
    return n;
}, ListT);
var mapMaybe = function (dictFunctor) {
    return function (f) {
        var g = function (v) {
            if (v instanceof Yield) {
                return Data_Maybe.fromMaybe(Skip.create)(Data_Functor.map(Data_Maybe.functorMaybe)(Yield.create)(f(v.value0)))(Data_Functor.map(Data_Lazy.functorLazy)(mapMaybe(dictFunctor)(f))(v.value1));
            };
            if (v instanceof Skip) {
                return Skip.create(Data_Functor.map(Data_Lazy.functorLazy)(mapMaybe(dictFunctor)(f))(v.value0));
            };
            if (v instanceof Done) {
                return Done.value;
            };
            throw new Error("Failed pattern match at Control.Monad.List.Trans line 173, column 3 - line 173, column 72: " + [ v.constructor.name ]);
        };
        return stepMap(dictFunctor)(g);
    };
};
var iterate = function (dictMonad) {
    return function (f) {
        return function (a) {
            var g = function (x) {
                return Control_Applicative.pure(dictMonad["__superclass_Control.Applicative.Applicative_0"]())(new Data_Maybe.Just(new Data_Tuple.Tuple(f(x), x)));
            };
            return unfold(dictMonad)(g)(a);
        };
    };
};
var repeat = function (dictMonad) {
    return iterate(dictMonad)(Control_Category.id(Control_Category.categoryFn));
};
var head = function (dictMonad) {
    return function (l) {
        return Data_Functor.map(((dictMonad["__superclass_Control.Bind.Bind_1"]())["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Data_Functor.map(Data_Maybe.functorMaybe)(Data_Tuple.fst))(uncons(dictMonad)(l));
    };
};
var functorListT = function (dictFunctor) {
    return new Data_Functor.Functor(function (f) {
        var g = function (v) {
            if (v instanceof Yield) {
                return new Yield(f(v.value0), Data_Functor.map(Data_Lazy.functorLazy)(Data_Functor.map(functorListT(dictFunctor))(f))(v.value1));
            };
            if (v instanceof Skip) {
                return new Skip(Data_Functor.map(Data_Lazy.functorLazy)(Data_Functor.map(functorListT(dictFunctor))(f))(v.value0));
            };
            if (v instanceof Done) {
                return Done.value;
            };
            throw new Error("Failed pattern match at Control.Monad.List.Trans line 251, column 5 - line 251, column 48: " + [ v.constructor.name ]);
        };
        return stepMap(dictFunctor)(g);
    });
};
var fromEffect = function (dictApplicative) {
    return function (fa) {
        return ListT(Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Data_Function.flip(Yield.create)(Data_Lazy.defer(function (v) {
            return nil(dictApplicative);
        })))(fa));
    };
};
var monadTransListT = new Control_Monad_Trans_Class.MonadTrans(function (dictMonad) {
    return fromEffect(dictMonad["__superclass_Control.Applicative.Applicative_0"]());
});
var foldl$prime = function (dictMonad) {
    return function (f) {
        var loop = function (b) {
            return function (l) {
                var g = function (v) {
                    if (v instanceof Data_Maybe.Nothing) {
                        return Control_Applicative.pure(dictMonad["__superclass_Control.Applicative.Applicative_0"]())(b);
                    };
                    if (v instanceof Data_Maybe.Just) {
                        return Control_Bind.bind(dictMonad["__superclass_Control.Bind.Bind_1"]())(f(b)(v.value0.value0))(Data_Function.flip(loop)(v.value0.value1));
                    };
                    throw new Error("Failed pattern match at Control.Monad.List.Trans line 202, column 5 - line 202, column 35: " + [ v.constructor.name ]);
                };
                return Control_Bind.bind(dictMonad["__superclass_Control.Bind.Bind_1"]())(uncons(dictMonad)(l))(g);
            };
        };
        return loop;
    };
};
var foldl = function (dictMonad) {
    return function (f) {
        var loop = function (b) {
            return function (l) {
                var g = function (v) {
                    if (v instanceof Data_Maybe.Nothing) {
                        return Control_Applicative.pure(dictMonad["__superclass_Control.Applicative.Applicative_0"]())(b);
                    };
                    if (v instanceof Data_Maybe.Just) {
                        return loop(f(b)(v.value0.value0))(v.value0.value1);
                    };
                    throw new Error("Failed pattern match at Control.Monad.List.Trans line 210, column 5 - line 210, column 35: " + [ v.constructor.name ]);
                };
                return Control_Bind.bind(dictMonad["__superclass_Control.Bind.Bind_1"]())(uncons(dictMonad)(l))(g);
            };
        };
        return loop;
    };
};
var filter = function (dictFunctor) {
    return function (f) {
        var g = function (v) {
            if (v instanceof Yield) {
                var s$prime = Data_Functor.map(Data_Lazy.functorLazy)(filter(dictFunctor)(f))(v.value1);
                var $138 = f(v.value0);
                if ($138) {
                    return new Yield(v.value0, s$prime);
                };
                if (!$138) {
                    return new Skip(s$prime);
                };
                throw new Error("Failed pattern match at Control.Monad.List.Trans line 166, column 19 - line 166, column 54: " + [ $138.constructor.name ]);
            };
            if (v instanceof Skip) {
                var s$prime = Data_Functor.map(Data_Lazy.functorLazy)(filter(dictFunctor)(f))(v.value0);
                return new Skip(s$prime);
            };
            if (v instanceof Done) {
                return Done.value;
            };
            throw new Error("Failed pattern match at Control.Monad.List.Trans line 166, column 3 - line 166, column 80: " + [ v.constructor.name ]);
        };
        return stepMap(dictFunctor)(g);
    };
};
var dropWhile = function (dictApplicative) {
    return function (f) {
        var g = function (v) {
            if (v instanceof Yield) {
                var $143 = f(v.value0);
                if ($143) {
                    return new Skip(Data_Functor.map(Data_Lazy.functorLazy)(dropWhile(dictApplicative)(f))(v.value1));
                };
                if (!$143) {
                    return new Yield(v.value0, v.value1);
                };
                throw new Error("Failed pattern match at Control.Monad.List.Trans line 159, column 19 - line 159, column 70: " + [ $143.constructor.name ]);
            };
            if (v instanceof Skip) {
                return Skip.create(Data_Functor.map(Data_Lazy.functorLazy)(dropWhile(dictApplicative)(f))(v.value0));
            };
            if (v instanceof Done) {
                return Done.value;
            };
            throw new Error("Failed pattern match at Control.Monad.List.Trans line 159, column 3 - line 159, column 70: " + [ v.constructor.name ]);
        };
        return stepMap((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(g);
    };
};
var drop = function (dictApplicative) {
    return function (v) {
        return function (fa) {
            if (v === 0) {
                return fa;
            };
            var f = function (v1) {
                if (v1 instanceof Yield) {
                    return new Skip(Data_Functor.map(Data_Lazy.functorLazy)(drop(dictApplicative)(v - 1))(v1.value1));
                };
                if (v1 instanceof Skip) {
                    return new Skip(Data_Functor.map(Data_Lazy.functorLazy)(drop(dictApplicative)(v))(v1.value0));
                };
                if (v1 instanceof Done) {
                    return Done.value;
                };
                throw new Error("Failed pattern match at Control.Monad.List.Trans line 152, column 3 - line 152, column 44: " + [ v1.constructor.name ]);
            };
            return stepMap((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(f)(fa);
        };
    };
};
var cons = function (dictApplicative) {
    return function (lh) {
        return function (t) {
            return ListT(Control_Applicative.pure(dictApplicative)(new Yield(Data_Lazy.force(lh), t)));
        };
    };
};
var unfoldableListT = function (dictMonad) {
    return new Data_Unfoldable.Unfoldable(function (f) {
        return function (b) {
            var go = function (v) {
                if (v instanceof Data_Maybe.Nothing) {
                    return nil(dictMonad["__superclass_Control.Applicative.Applicative_0"]());
                };
                if (v instanceof Data_Maybe.Just) {
                    return cons(dictMonad["__superclass_Control.Applicative.Applicative_0"]())(Control_Applicative.pure(Data_Lazy.applicativeLazy)(v.value0.value0))(Data_Lazy.defer(function (v1) {
                        return go(f(v.value0.value1));
                    }));
                };
                throw new Error("Failed pattern match at Control.Monad.List.Trans line 256, column 3 - line 258, column 73: " + [ v.constructor.name ]);
            };
            return go(f(b));
        };
    });
};
var semigroupListT = function (dictApplicative) {
    return new Data_Semigroup.Semigroup(concat(dictApplicative));
};
var concat = function (dictApplicative) {
    return function (x) {
        return function (y) {
            var f = function (v) {
                if (v instanceof Yield) {
                    return new Yield(v.value0, Data_Functor.map(Data_Lazy.functorLazy)(function (v1) {
                        return Data_Semigroup.append(semigroupListT(dictApplicative))(v1)(y);
                    })(v.value1));
                };
                if (v instanceof Skip) {
                    return new Skip(Data_Functor.map(Data_Lazy.functorLazy)(function (v1) {
                        return Data_Semigroup.append(semigroupListT(dictApplicative))(v1)(y);
                    })(v.value0));
                };
                if (v instanceof Done) {
                    return new Skip(Data_Lazy.defer(Data_Function["const"](y)));
                };
                throw new Error("Failed pattern match at Control.Monad.List.Trans line 96, column 3 - line 96, column 43: " + [ v.constructor.name ]);
            };
            return stepMap((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(f)(x);
        };
    };
};
var monoidListT = function (dictApplicative) {
    return new Data_Monoid.Monoid(function () {
        return semigroupListT(dictApplicative);
    }, nil(dictApplicative));
};
var catMaybes = function (dictFunctor) {
    return mapMaybe(dictFunctor)(Control_Category.id(Control_Category.categoryFn));
};
var monadListT = function (dictMonad) {
    return new Control_Monad.Monad(function () {
        return applicativeListT(dictMonad);
    }, function () {
        return bindListT(dictMonad);
    });
};
var bindListT = function (dictMonad) {
    return new Control_Bind.Bind(function () {
        return applyListT(dictMonad);
    }, function (fa) {
        return function (f) {
            var g = function (v) {
                if (v instanceof Yield) {
                    var h = function (s$prime) {
                        return Data_Semigroup.append(semigroupListT(dictMonad["__superclass_Control.Applicative.Applicative_0"]()))(f(v.value0))(Control_Bind.bind(bindListT(dictMonad))(s$prime)(f));
                    };
                    return new Skip(Data_Functor.map(Data_Lazy.functorLazy)(h)(v.value1));
                };
                if (v instanceof Skip) {
                    return new Skip(Data_Functor.map(Data_Lazy.functorLazy)(function (v1) {
                        return Control_Bind.bind(bindListT(dictMonad))(v1)(f);
                    })(v.value0));
                };
                if (v instanceof Done) {
                    return Done.value;
                };
                throw new Error("Failed pattern match at Control.Monad.List.Trans line 268, column 5 - line 270, column 31: " + [ v.constructor.name ]);
            };
            return stepMap(((dictMonad["__superclass_Control.Bind.Bind_1"]())["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(g)(fa);
        };
    });
};
var applyListT = function (dictMonad) {
    return new Control_Apply.Apply(function () {
        return functorListT(((dictMonad["__superclass_Control.Bind.Bind_1"]())["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]());
    }, Control_Monad.ap(monadListT(dictMonad)));
};
var applicativeListT = function (dictMonad) {
    return new Control_Applicative.Applicative(function () {
        return applyListT(dictMonad);
    }, singleton(dictMonad["__superclass_Control.Applicative.Applicative_0"]()));
};
var monadEffListT = function (dictMonadEff) {
    return new Control_Monad_Eff_Class.MonadEff(function () {
        return monadListT(dictMonadEff["__superclass_Control.Monad.Monad_0"]());
    }, function ($167) {
        return Control_Monad_Trans_Class.lift(monadTransListT)(dictMonadEff["__superclass_Control.Monad.Monad_0"]())(Control_Monad_Eff_Class.liftEff(dictMonadEff)($167));
    });
};
var altListT = function (dictApplicative) {
    return new Control_Alt.Alt(function () {
        return functorListT((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]());
    }, concat(dictApplicative));
};
var plusListT = function (dictMonad) {
    return new Control_Plus.Plus(function () {
        return altListT(dictMonad["__superclass_Control.Applicative.Applicative_0"]());
    }, nil(dictMonad["__superclass_Control.Applicative.Applicative_0"]()));
};
var alternativeListT = function (dictMonad) {
    return new Control_Alternative.Alternative(function () {
        return applicativeListT(dictMonad);
    }, function () {
        return plusListT(dictMonad);
    });
};
var monadZeroListT = function (dictMonad) {
    return new Control_MonadZero.MonadZero(function () {
        return alternativeListT(dictMonad);
    }, function () {
        return monadListT(dictMonad);
    });
};
var monadPlusListT = function (dictMonad) {
    return new Control_MonadPlus.MonadPlus(function () {
        return monadZeroListT(dictMonad);
    });
};
module.exports = {
    catMaybes: catMaybes, 
    cons: cons, 
    drop: drop, 
    dropWhile: dropWhile, 
    filter: filter, 
    foldl: foldl, 
    "foldl'": foldl$prime, 
    fromEffect: fromEffect, 
    head: head, 
    iterate: iterate, 
    mapMaybe: mapMaybe, 
    nil: nil, 
    prepend: prepend, 
    "prepend'": prepend$prime, 
    repeat: repeat, 
    scanl: scanl, 
    singleton: singleton, 
    tail: tail, 
    take: take, 
    takeWhile: takeWhile, 
    uncons: uncons, 
    unfold: unfold, 
    wrapEffect: wrapEffect, 
    wrapLazy: wrapLazy, 
    zipWith: zipWith, 
    "zipWith'": zipWith$prime, 
    semigroupListT: semigroupListT, 
    monoidListT: monoidListT, 
    functorListT: functorListT, 
    unfoldableListT: unfoldableListT, 
    applyListT: applyListT, 
    applicativeListT: applicativeListT, 
    bindListT: bindListT, 
    monadListT: monadListT, 
    monadTransListT: monadTransListT, 
    altListT: altListT, 
    plusListT: plusListT, 
    alternativeListT: alternativeListT, 
    monadZeroListT: monadZeroListT, 
    monadPlusListT: monadPlusListT, 
    monadEffListT: monadEffListT
};
