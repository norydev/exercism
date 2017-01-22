// Generated by psc version 0.10.5
"use strict";
var Prelude = require("../Prelude");
var Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class");
var Control_Monad_Trans_Class = require("../Control.Monad.Trans.Class");
var Data_CatList = require("../Data.CatList");
var Data_Either = require("../Data.Either");
var Data_Foldable = require("../Data.Foldable");
var Data_Inject = require("../Data.Inject");
var Data_Maybe = require("../Data.Maybe");
var Data_Traversable = require("../Data.Traversable");
var Data_Tuple = require("../Data.Tuple");
var Unsafe_Coerce = require("../Unsafe.Coerce");
var Data_Eq = require("../Data.Eq");
var Data_Ord = require("../Data.Ord");
var Data_Functor = require("../Data.Functor");
var Control_Bind = require("../Control.Bind");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Monad = require("../Control.Monad");
var Data_Function = require("../Data.Function");
var Control_Category = require("../Control.Category");
var Data_Semigroup = require("../Data.Semigroup");
var ExpF = function (x) {
    return x;
};
var Free = (function () {
    function Free(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Free.create = function (value0) {
        return function (value1) {
            return new Free(value0, value1);
        };
    };
    return Free;
})();
var Return = (function () {
    function Return(value0) {
        this.value0 = value0;
    };
    Return.create = function (value0) {
        return new Return(value0);
    };
    return Return;
})();
var Bind = (function () {
    function Bind(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Bind.create = function (value0) {
        return function (value1) {
            return new Bind(value0, value1);
        };
    };
    return Bind;
})();
var toView = function (__copy_v) {
    var v = __copy_v;
    tco: while (true) {
        var runExpF = function (v2) {
            return v2;
        };
        var concatF = function (v2) {
            return function (r) {
                return new Free(v2.value0, Data_Semigroup.append(Data_CatList.semigroupCatList)(v2.value1)(r));
            };
        };
        if (v.value0 instanceof Return) {
            var $37 = Data_CatList.uncons(v.value1);
            if ($37 instanceof Data_Maybe.Nothing) {
                return new Return(Unsafe_Coerce.unsafeCoerce(v.value0.value0));
            };
            if ($37 instanceof Data_Maybe.Just) {
                var __tco_v = Unsafe_Coerce.unsafeCoerce(concatF(runExpF($37.value0.value0)(v.value0.value0))($37.value0.value1));
                v = __tco_v;
                continue tco;
            };
            throw new Error("Failed pattern match at Control.Monad.Free line 206, column 7 - line 210, column 64: " + [ $37.constructor.name ]);
        };
        if (v.value0 instanceof Bind) {
            return new Bind(v.value0.value0, function (a) {
                return Unsafe_Coerce.unsafeCoerce(concatF(v.value0.value1(a))(v.value1));
            });
        };
        throw new Error("Failed pattern match at Control.Monad.Free line 204, column 3 - line 212, column 56: " + [ v.value0.constructor.name ]);
    };
};
var runFreeM = function (dictFunctor) {
    return function (dictMonadRec) {
        return function (k) {
            var go = function (f) {
                var $46 = toView(f);
                if ($46 instanceof Return) {
                    return Data_Functor.map((((dictMonadRec["__superclass_Control.Monad.Monad_0"]())["__superclass_Control.Bind.Bind_1"]())["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Control_Monad_Rec_Class.Done.create)(Control_Applicative.pure((dictMonadRec["__superclass_Control.Monad.Monad_0"]())["__superclass_Control.Applicative.Applicative_0"]())($46.value0));
                };
                if ($46 instanceof Bind) {
                    return Data_Functor.map((((dictMonadRec["__superclass_Control.Monad.Monad_0"]())["__superclass_Control.Bind.Bind_1"]())["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Control_Monad_Rec_Class.Loop.create)(k(Data_Functor.map(dictFunctor)($46.value1)($46.value0)));
                };
                throw new Error("Failed pattern match at Control.Monad.Free line 182, column 10 - line 184, column 37: " + [ $46.constructor.name ]);
            };
            return Control_Monad_Rec_Class.tailRecM(dictMonadRec)(go);
        };
    };
};
var runFree = function (dictFunctor) {
    return function (k) {
        var go = function (__copy_f) {
            var f = __copy_f;
            tco: while (true) {
                var $50 = toView(f);
                if ($50 instanceof Return) {
                    return $50.value0;
                };
                if ($50 instanceof Bind) {
                    var __tco_f = k(Data_Functor.map(dictFunctor)($50.value1)($50.value0));
                    f = __tco_f;
                    continue tco;
                };
                throw new Error("Failed pattern match at Control.Monad.Free line 167, column 10 - line 169, column 33: " + [ $50.constructor.name ]);
            };
        };
        return go;
    };
};
var resume = function (dictFunctor) {
    return function (f) {
        var $54 = toView(f);
        if ($54 instanceof Return) {
            return new Data_Either.Right($54.value0);
        };
        if ($54 instanceof Bind) {
            return new Data_Either.Left(Data_Functor.map(dictFunctor)($54.value1)($54.value0));
        };
        throw new Error("Failed pattern match at Control.Monad.Free line 192, column 12 - line 194, column 29: " + [ $54.constructor.name ]);
    };
};
var fromView = function (f) {
    return new Free(Unsafe_Coerce.unsafeCoerce(f), Data_CatList.empty);
};
var suspendF = function (dictApplicative) {
    return function (f) {
        return fromView(new Bind(Unsafe_Coerce.unsafeCoerce(Control_Applicative.pure(dictApplicative)(f)), Unsafe_Coerce.unsafeCoerce));
    };
};
var freeMonad = new Control_Monad.Monad(function () {
    return freeApplicative;
}, function () {
    return freeBind;
});
var freeFunctor = new Data_Functor.Functor(function (k) {
    return function (f) {
        return Control_Bind.bindFlipped(freeBind)(function ($85) {
            return Control_Applicative.pure(freeApplicative)(k($85));
        })(f);
    };
});
var freeBind = new Control_Bind.Bind(function () {
    return freeApply;
}, function (v) {
    return function (k) {
        return new Free(v.value0, Data_CatList.snoc(v.value1)(Unsafe_Coerce.unsafeCoerce(k)));
    };
});
var freeApply = new Control_Apply.Apply(function () {
    return freeFunctor;
}, Control_Monad.ap(freeMonad));
var freeApplicative = new Control_Applicative.Applicative(function () {
    return freeApply;
}, function ($86) {
    return fromView(Return.create($86));
});
var freeMonadRec = new Control_Monad_Rec_Class.MonadRec(function () {
    return freeMonad;
}, function (k) {
    return function (a) {
        return Control_Bind.bind(freeBind)(k(a))(function (v) {
            if (v instanceof Control_Monad_Rec_Class.Loop) {
                return Control_Monad_Rec_Class.tailRecM(freeMonadRec)(k)(v.value0);
            };
            if (v instanceof Control_Monad_Rec_Class.Done) {
                return Control_Applicative.pure(freeApplicative)(v.value0);
            };
            throw new Error("Failed pattern match at Control.Monad.Free line 71, column 26 - line 73, column 21: " + [ v.constructor.name ]);
        });
    };
});
var liftF = function (f) {
    return fromView(new Bind(Unsafe_Coerce.unsafeCoerce(f), function ($87) {
        return Control_Applicative.pure(freeApplicative)(Unsafe_Coerce.unsafeCoerce($87));
    }));
};
var freeMonadTrans = new Control_Monad_Trans_Class.MonadTrans(function (dictMonad) {
    return liftF;
});
var liftFI = function (dictInject) {
    return function (fa) {
        return liftF(Data_Inject.inj(dictInject)(fa));
    };
};
var substFree = function (k) {
    var go = function (f) {
        var $65 = toView(f);
        if ($65 instanceof Return) {
            return Control_Applicative.pure(freeApplicative)($65.value0);
        };
        if ($65 instanceof Bind) {
            return Control_Bind.bind(freeBind)(k($65.value0))(Data_Functor.map(Data_Functor.functorFn)(go)($65.value1));
        };
        throw new Error("Failed pattern match at Control.Monad.Free line 157, column 10 - line 159, column 33: " + [ $65.constructor.name ]);
    };
    return go;
};
var hoistFree = function (k) {
    return substFree(function ($88) {
        return liftF(k($88));
    });
};
var injF = function (dictInject) {
    return hoistFree(Data_Inject.inj(dictInject));
};
var foldableFree = function (dictFunctor) {
    return function (dictFoldable) {
        return new Data_Foldable.Foldable(function (dictMonoid) {
            return function (f) {
                var go = function ($89) {
                    return (function (v) {
                        if (v instanceof Data_Either.Left) {
                            return Data_Foldable.foldMap(dictFoldable)(dictMonoid)(go)(v.value0);
                        };
                        if (v instanceof Data_Either.Right) {
                            return f(v.value0);
                        };
                        throw new Error("Failed pattern match at Control.Monad.Free line 78, column 21 - line 80, column 21: " + [ v.constructor.name ]);
                    })(resume(dictFunctor)($89));
                };
                return go;
            };
        }, function (f) {
            var go = function (r) {
                return function ($90) {
                    return (function (v) {
                        if (v instanceof Data_Either.Left) {
                            return Data_Foldable.foldl(dictFoldable)(go)(r)(v.value0);
                        };
                        if (v instanceof Data_Either.Right) {
                            return f(r)(v.value0);
                        };
                        throw new Error("Failed pattern match at Control.Monad.Free line 83, column 23 - line 85, column 23: " + [ v.constructor.name ]);
                    })(resume(dictFunctor)($90));
                };
            };
            return go;
        }, function (f) {
            var go = function (r) {
                return function ($91) {
                    return (function (v) {
                        if (v instanceof Data_Either.Left) {
                            return Data_Foldable.foldr(dictFoldable)(Data_Function.flip(go))(r)(v.value0);
                        };
                        if (v instanceof Data_Either.Right) {
                            return f(v.value0)(r);
                        };
                        throw new Error("Failed pattern match at Control.Monad.Free line 88, column 23 - line 90, column 23: " + [ v.constructor.name ]);
                    })(resume(dictFunctor)($91));
                };
            };
            return go;
        });
    };
};
var traversableFree = function (dictTraversable) {
    return new Data_Traversable.Traversable(function () {
        return foldableFree(dictTraversable["__superclass_Data.Functor.Functor_0"]())(dictTraversable["__superclass_Data.Foldable.Foldable_1"]());
    }, function () {
        return freeFunctor;
    }, function (dictApplicative) {
        return function (tma) {
            return Data_Traversable.traverse(traversableFree(dictTraversable))(dictApplicative)(Control_Category.id(Control_Category.categoryFn))(tma);
        };
    }, function (dictApplicative) {
        return function (f) {
            var go = function ($92) {
                return (function (v) {
                    if (v instanceof Data_Either.Left) {
                        return Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(function ($93) {
                            return Control_Bind.join(freeBind)(liftF($93));
                        })(Data_Traversable.traverse(dictTraversable)(dictApplicative)(go)(v.value0));
                    };
                    if (v instanceof Data_Either.Right) {
                        return Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Control_Applicative.pure(freeApplicative))(f(v.value0));
                    };
                    throw new Error("Failed pattern match at Control.Monad.Free line 95, column 21 - line 97, column 30: " + [ v.constructor.name ]);
                })(resume(dictTraversable["__superclass_Data.Functor.Functor_0"]())($92));
            };
            return go;
        };
    });
};
var foldFree = function (dictMonadRec) {
    return function (k) {
        var go = function (f) {
            var $81 = toView(f);
            if ($81 instanceof Return) {
                return Data_Functor.map((((dictMonadRec["__superclass_Control.Monad.Monad_0"]())["__superclass_Control.Bind.Bind_1"]())["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(Control_Monad_Rec_Class.Done.create)(Control_Applicative.pure((dictMonadRec["__superclass_Control.Monad.Monad_0"]())["__superclass_Control.Applicative.Applicative_0"]())($81.value0));
            };
            if ($81 instanceof Bind) {
                return Data_Functor.map((((dictMonadRec["__superclass_Control.Monad.Monad_0"]())["__superclass_Control.Bind.Bind_1"]())["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(function ($94) {
                    return Control_Monad_Rec_Class.Loop.create($81.value1($94));
                })(k($81.value0));
            };
            throw new Error("Failed pattern match at Control.Monad.Free line 147, column 10 - line 149, column 37: " + [ $81.constructor.name ]);
        };
        return Control_Monad_Rec_Class.tailRecM(dictMonadRec)(go);
    };
};
var eqFree = function (dictFunctor) {
    return function (dictEq) {
        return function (dictEq1) {
            return new Data_Eq.Eq(function (x) {
                return function (y) {
                    return Data_Eq.eq(Data_Either.eqEither(dictEq)(dictEq1))(resume(dictFunctor)(x))(resume(dictFunctor)(y));
                };
            });
        };
    };
};
var ordFree = function (dictFunctor) {
    return function (dictOrd) {
        return function (dictOrd1) {
            return new Data_Ord.Ord(function () {
                return eqFree(dictFunctor)(dictOrd["__superclass_Data.Eq.Eq_0"]())(dictOrd1["__superclass_Data.Eq.Eq_0"]());
            }, function (x) {
                return function (y) {
                    return Data_Ord.compare(Data_Either.ordEither(dictOrd)(dictOrd1))(resume(dictFunctor)(x))(resume(dictFunctor)(y));
                };
            });
        };
    };
};
module.exports = {
    foldFree: foldFree, 
    hoistFree: hoistFree, 
    injF: injF, 
    liftF: liftF, 
    liftFI: liftFI, 
    resume: resume, 
    runFree: runFree, 
    runFreeM: runFreeM, 
    substFree: substFree, 
    suspendF: suspendF, 
    eqFree: eqFree, 
    ordFree: ordFree, 
    freeFunctor: freeFunctor, 
    freeBind: freeBind, 
    freeApplicative: freeApplicative, 
    freeApply: freeApply, 
    freeMonad: freeMonad, 
    freeMonadTrans: freeMonadTrans, 
    freeMonadRec: freeMonadRec, 
    foldableFree: foldableFree, 
    traversableFree: traversableFree
};
