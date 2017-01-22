// Generated by psc version 0.10.5
"use strict";
var Prelude = require("../Prelude");
var Control_Alt = require("../Control.Alt");
var Control_Alternative = require("../Control.Alternative");
var Control_Monad_Eff_Class = require("../Control.Monad.Eff.Class");
var Control_Monad_Error_Class = require("../Control.Monad.Error.Class");
var Control_Monad_Reader_Class = require("../Control.Monad.Reader.Class");
var Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class");
var Control_Monad_State_Class = require("../Control.Monad.State.Class");
var Control_Monad_Trans_Class = require("../Control.Monad.Trans.Class");
var Control_Monad_Writer_Class = require("../Control.Monad.Writer.Class");
var Control_Plus = require("../Control.Plus");
var Data_Monoid = require("../Data.Monoid");
var Data_Newtype = require("../Data.Newtype");
var Data_Tuple = require("../Data.Tuple");
var Data_Functor = require("../Data.Functor");
var Control_Apply = require("../Control.Apply");
var Control_Bind = require("../Control.Bind");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Function = require("../Data.Function");
var Control_Applicative = require("../Control.Applicative");
var Control_Monad = require("../Control.Monad");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Unit = require("../Data.Unit");
var RWSResult = (function () {
    function RWSResult(value0, value1, value2) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
    };
    RWSResult.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return new RWSResult(value0, value1, value2);
            };
        };
    };
    return RWSResult;
})();
var RWST = function (x) {
    return x;
};
var withRWST = function (f) {
    return function (m) {
        return function (r) {
            return function (s) {
                return Data_Tuple.uncurry(m)(f(r)(s));
            };
        };
    };
};
var runRWST = function (v) {
    return v;
};
var newtypeRWST = new Data_Newtype.Newtype(function (n) {
    return n;
}, RWST);
var monadTransRWST = function (dictMonoid) {
    return new Control_Monad_Trans_Class.MonadTrans(function (dictMonad) {
        return function (m) {
            return function (v) {
                return function (s) {
                    return Control_Bind.bind(dictMonad["__superclass_Control.Bind.Bind_1"]())(m)(function (a) {
                        return Control_Applicative.pure(dictMonad["__superclass_Control.Applicative.Applicative_0"]())(new RWSResult(s, a, Data_Monoid.mempty(dictMonoid)));
                    });
                };
            };
        };
    });
};
var mapRWST = function (f) {
    return function (v) {
        return function (r) {
            return function (s) {
                return f(v(r)(s));
            };
        };
    };
};
var functorRWST = function (dictFunctor) {
    return new Data_Functor.Functor(function (f) {
        return function (v) {
            return function (r) {
                return function (s) {
                    return Data_Functor.map(dictFunctor)(function (v1) {
                        return new RWSResult(v1.value0, f(v1.value1), v1.value2);
                    })(v(r)(s));
                };
            };
        };
    });
};
var execRWST = function (dictMonad) {
    return function (v) {
        return function (r) {
            return function (s) {
                return Control_Bind.bind(dictMonad["__superclass_Control.Bind.Bind_1"]())(v(r)(s))(function (v1) {
                    return Control_Applicative.pure(dictMonad["__superclass_Control.Applicative.Applicative_0"]())(new Data_Tuple.Tuple(v1.value0, v1.value2));
                });
            };
        };
    };
};
var evalRWST = function (dictMonad) {
    return function (v) {
        return function (r) {
            return function (s) {
                return Control_Bind.bind(dictMonad["__superclass_Control.Bind.Bind_1"]())(v(r)(s))(function (v1) {
                    return Control_Applicative.pure(dictMonad["__superclass_Control.Applicative.Applicative_0"]())(new Data_Tuple.Tuple(v1.value1, v1.value2));
                });
            };
        };
    };
};
var applyRWST = function (dictBind) {
    return function (dictMonoid) {
        return new Control_Apply.Apply(function () {
            return functorRWST((dictBind["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]());
        }, function (v) {
            return function (v1) {
                return function (r) {
                    return function (s) {
                        return Control_Bind.bind(dictBind)(v(r)(s))(function (v2) {
                            return Data_Functor.mapFlipped((dictBind["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(v1(r)(v2.value0))(function (v3) {
                                return new RWSResult(v3.value0, v2.value1(v3.value1), Data_Semigroup.append(dictMonoid["__superclass_Data.Semigroup.Semigroup_0"]())(v2.value2)(v3.value2));
                            });
                        });
                    };
                };
            };
        });
    };
};
var bindRWST = function (dictBind) {
    return function (dictMonoid) {
        return new Control_Bind.Bind(function () {
            return applyRWST(dictBind)(dictMonoid);
        }, function (v) {
            return function (f) {
                return function (r) {
                    return function (s) {
                        return Control_Bind.bind(dictBind)(v(r)(s))(function (v1) {
                            var $102 = f(v1.value1);
                            return Data_Functor.mapFlipped((dictBind["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())($102(r)(v1.value0))(function (v2) {
                                return new RWSResult(v2.value0, v2.value1, Data_Semigroup.append(dictMonoid["__superclass_Data.Semigroup.Semigroup_0"]())(v1.value2)(v2.value2));
                            });
                        });
                    };
                };
            };
        });
    };
};
var applicativeRWST = function (dictMonad) {
    return function (dictMonoid) {
        return new Control_Applicative.Applicative(function () {
            return applyRWST(dictMonad["__superclass_Control.Bind.Bind_1"]())(dictMonoid);
        }, function (a) {
            return function (v) {
                return function (s) {
                    return Control_Applicative.pure(dictMonad["__superclass_Control.Applicative.Applicative_0"]())(new RWSResult(s, a, Data_Monoid.mempty(dictMonoid)));
                };
            };
        });
    };
};
var monadRWST = function (dictMonad) {
    return function (dictMonoid) {
        return new Control_Monad.Monad(function () {
            return applicativeRWST(dictMonad)(dictMonoid);
        }, function () {
            return bindRWST(dictMonad["__superclass_Control.Bind.Bind_1"]())(dictMonoid);
        });
    };
};
var monadAskRWST = function (dictMonad) {
    return function (dictMonoid) {
        return new Control_Monad_Reader_Class.MonadAsk(function () {
            return monadRWST(dictMonad)(dictMonoid);
        }, function (r) {
            return function (s) {
                return Control_Applicative.pure(dictMonad["__superclass_Control.Applicative.Applicative_0"]())(new RWSResult(s, r, Data_Monoid.mempty(dictMonoid)));
            };
        });
    };
};
var monadReaderRWST = function (dictMonad) {
    return function (dictMonoid) {
        return new Control_Monad_Reader_Class.MonadReader(function () {
            return monadAskRWST(dictMonad)(dictMonoid);
        }, function (f) {
            return function (m) {
                return function (r) {
                    return function (s) {
                        return m(f(r))(s);
                    };
                };
            };
        });
    };
};
var monadEffRWS = function (dictMonoid) {
    return function (dictMonadEff) {
        return new Control_Monad_Eff_Class.MonadEff(function () {
            return monadRWST(dictMonadEff["__superclass_Control.Monad.Monad_0"]())(dictMonoid);
        }, function ($148) {
            return Control_Monad_Trans_Class.lift(monadTransRWST(dictMonoid))(dictMonadEff["__superclass_Control.Monad.Monad_0"]())(Control_Monad_Eff_Class.liftEff(dictMonadEff)($148));
        });
    };
};
var monadErrorRWST = function (dictMonadError) {
    return function (dictMonoid) {
        return new Control_Monad_Error_Class.MonadError(function () {
            return monadRWST(dictMonadError["__superclass_Control.Monad.Monad_0"]())(dictMonoid);
        }, function (m) {
            return function (h) {
                return RWST(function (r) {
                    return function (s) {
                        return Control_Monad_Error_Class.catchError(dictMonadError)(m(r)(s))(function (e) {
                            var $113 = h(e);
                            return $113(r)(s);
                        });
                    };
                });
            };
        }, function (e) {
            return Control_Monad_Trans_Class.lift(monadTransRWST(dictMonoid))(dictMonadError["__superclass_Control.Monad.Monad_0"]())(Control_Monad_Error_Class.throwError(dictMonadError)(e));
        });
    };
};
var monadRecRWST = function (dictMonadRec) {
    return function (dictMonoid) {
        return new Control_Monad_Rec_Class.MonadRec(function () {
            return monadRWST(dictMonadRec["__superclass_Control.Monad.Monad_0"]())(dictMonoid);
        }, function (k) {
            return function (a) {
                var k$prime = function (r) {
                    return function (v) {
                        var $116 = k(v.value1);
                        return Control_Bind.bind((dictMonadRec["__superclass_Control.Monad.Monad_0"]())["__superclass_Control.Bind.Bind_1"]())($116(r)(v.value0))(function (v1) {
                            return Control_Applicative.pure((dictMonadRec["__superclass_Control.Monad.Monad_0"]())["__superclass_Control.Applicative.Applicative_0"]())((function () {
                                if (v1.value1 instanceof Control_Monad_Rec_Class.Loop) {
                                    return new Control_Monad_Rec_Class.Loop(new RWSResult(v1.value0, v1.value1.value0, Data_Semigroup.append(dictMonoid["__superclass_Data.Semigroup.Semigroup_0"]())(v.value2)(v1.value2)));
                                };
                                if (v1.value1 instanceof Control_Monad_Rec_Class.Done) {
                                    return new Control_Monad_Rec_Class.Done(new RWSResult(v1.value0, v1.value1.value0, Data_Semigroup.append(dictMonoid["__superclass_Data.Semigroup.Semigroup_0"]())(v.value2)(v1.value2)));
                                };
                                throw new Error("Failed pattern match at Control.Monad.RWS.Trans line 123, column 16 - line 125, column 68: " + [ v1.value1.constructor.name ]);
                            })());
                        });
                    };
                };
                return function (r) {
                    return function (s) {
                        return Control_Monad_Rec_Class.tailRecM(dictMonadRec)(k$prime(r))(new RWSResult(s, a, Data_Monoid.mempty(dictMonoid)));
                    };
                };
            };
        });
    };
};
var monadStateRWST = function (dictMonad) {
    return function (dictMonoid) {
        return new Control_Monad_State_Class.MonadState(function () {
            return monadRWST(dictMonad)(dictMonoid);
        }, function (f) {
            return function (v) {
                return function (s) {
                    var $128 = f(s);
                    return Control_Applicative.pure(dictMonad["__superclass_Control.Applicative.Applicative_0"]())(new RWSResult($128.value1, $128.value0, Data_Monoid.mempty(dictMonoid)));
                };
            };
        });
    };
};
var monadTellRWST = function (dictMonad) {
    return function (dictMonoid) {
        return new Control_Monad_Writer_Class.MonadTell(function () {
            return monadRWST(dictMonad)(dictMonoid);
        }, function (w) {
            return function (v) {
                return function (s) {
                    return Control_Applicative.pure(dictMonad["__superclass_Control.Applicative.Applicative_0"]())(new RWSResult(s, Data_Unit.unit, w));
                };
            };
        });
    };
};
var monadWriterRWST = function (dictMonad) {
    return function (dictMonoid) {
        return new Control_Monad_Writer_Class.MonadWriter(function () {
            return monadTellRWST(dictMonad)(dictMonoid);
        }, function (m) {
            return function (r) {
                return function (s) {
                    return Control_Bind.bind(dictMonad["__superclass_Control.Bind.Bind_1"]())(m(r)(s))(function (v) {
                        return Control_Applicative.pure(dictMonad["__superclass_Control.Applicative.Applicative_0"]())(new RWSResult(v.value0, new Data_Tuple.Tuple(v.value1, v.value2), v.value2));
                    });
                };
            };
        }, function (m) {
            return function (r) {
                return function (s) {
                    return Control_Bind.bind(dictMonad["__superclass_Control.Bind.Bind_1"]())(m(r)(s))(function (v) {
                        return Control_Applicative.pure(dictMonad["__superclass_Control.Applicative.Applicative_0"]())(new RWSResult(v.value0, v.value1.value0, v.value1.value1(v.value2)));
                    });
                };
            };
        });
    };
};
var altRWST = function (dictAlt) {
    return new Control_Alt.Alt(function () {
        return functorRWST(dictAlt["__superclass_Data.Functor.Functor_0"]());
    }, function (v) {
        return function (v1) {
            return RWST(function (r) {
                return function (s) {
                    return Control_Alt.alt(dictAlt)(v(r)(s))(v1(r)(s));
                };
            });
        };
    });
};
var plusRWST = function (dictPlus) {
    return new Control_Plus.Plus(function () {
        return altRWST(dictPlus["__superclass_Control.Alt.Alt_0"]());
    }, function (v) {
        return function (v1) {
            return Control_Plus.empty(dictPlus);
        };
    });
};
var alternativeRWST = function (dictMonoid) {
    return function (dictAlternative) {
        return function (dictMonad) {
            return new Control_Alternative.Alternative(function () {
                return applicativeRWST(dictMonad)(dictMonoid);
            }, function () {
                return plusRWST(dictAlternative["__superclass_Control.Plus.Plus_1"]());
            });
        };
    };
};
module.exports = {
    RWSResult: RWSResult, 
    RWST: RWST, 
    evalRWST: evalRWST, 
    execRWST: execRWST, 
    mapRWST: mapRWST, 
    runRWST: runRWST, 
    withRWST: withRWST, 
    newtypeRWST: newtypeRWST, 
    functorRWST: functorRWST, 
    applyRWST: applyRWST, 
    altRWST: altRWST, 
    alternativeRWST: alternativeRWST, 
    bindRWST: bindRWST, 
    applicativeRWST: applicativeRWST, 
    monadRWST: monadRWST, 
    monadTransRWST: monadTransRWST, 
    monadEffRWS: monadEffRWS, 
    monadAskRWST: monadAskRWST, 
    monadReaderRWST: monadReaderRWST, 
    monadStateRWST: monadStateRWST, 
    monadTellRWST: monadTellRWST, 
    monadWriterRWST: monadWriterRWST, 
    monadErrorRWST: monadErrorRWST, 
    monadRecRWST: monadRecRWST, 
    plusRWST: plusRWST
};
