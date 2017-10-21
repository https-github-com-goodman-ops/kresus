'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fetchOperations = exports.fetchAccounts = exports.SOURCE_NAME = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _helpers = require('../../helpers');

var _errors = require('../../shared/errors.json');

var _errors2 = _interopRequireDefault(_errors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // This modules mocks output generated by weboob.


var log = (0, _helpers.makeLogger)('sources/mock');

// Maximum time needed to generate new operations.
var MAX_GENERATION_TIME = 2000;

// Probability of generating a random error in fetchOperations (in %).
var PROBABILITY_RANDOM_ERROR = 10;

// Helpers.
var rand = function rand(low, high) {
    return low + (Math.random() * (high - low) | 0);
};

var randInt = function randInt(low, high) {
    return rand(low, high) | 0;
};

var randomArray = function randomArray(arr) {
    return arr[randInt(0, arr.length)];
};

var randomType = function randomType() {
    return randInt(0, 10);
};

// Generates a map of the accounts belonging to the given access.
var hashAccount = function hashAccount(access) {
    var login = access.login;
    var uuid = access.bank;

    var hash = uuid.charCodeAt(0) + login + uuid.charCodeAt(3) + uuid.charCodeAt(uuid.length - 1);

    var map = {
        main: hash + '1',
        second: hash + '2',
        third: hash + '3'
    };

    if (randInt(0, 100) > 80) {
        map.fourth = hash + '4';
    }

    return map;
};

var SOURCE_NAME = exports.SOURCE_NAME = 'mock';

var fetchAccounts = exports.fetchAccounts = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(access) {
        var _hashAccount, main, second, third, fourth, values;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _hashAccount = hashAccount(access), main = _hashAccount.main, second = _hashAccount.second, third = _hashAccount.third, fourth = _hashAccount.fourth;
                        values = [{
                            accountNumber: main,
                            label: 'Compte chèque',
                            balance: Math.random() * 150,
                            iban: 'FR235711131719',
                            currency: 'EUR'
                        }, {
                            accountNumber: second,
                            label: 'Livret A',
                            balance: '500',
                            currency: 'USD'
                        }, {
                            accountNumber: third,
                            label: 'Plan Epargne Logement',
                            balance: '0'
                        }];


                        if (fourth) {
                            values.push({
                                accountNumber: fourth,
                                label: 'Assurance vie',
                                balance: '1000'
                            });
                        }

                        return _context.abrupt('return', values);

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function fetchAccounts(_x) {
        return _ref.apply(this, arguments);
    };
}();

var randomLabels = [['Café Moxka', 'Petit expresso rapido Café Moxka'], ['MerBnB', 'Paiement en ligne MerBNB'], ['Tabac Debourg', 'Bureau de tabac SARL Clopi Cloppa'], ['Rapide PSC', 'Paiement sans contact Rapide'], ['MacDollars PSC', 'Paiement sans contact Macdollars'], ['FNAK', 'FNAK CB blabla'], ['CB Sefaurat', 'Achat de parfum chez Sefaurat'], ['Polyprix CB', 'Courses chez Polyprix'], ['Croisement CB', 'Courses chez Croisement'], ['PRLV UJC', 'PRLV UJC'], ['CB Spotifaille', 'CB Spotifaille London'], ['Antiquaire', 'Antiquaire'], ['Le Perroquet Bourré', 'Le Perroquet Bourré SARL'], ['Le Vol de Nuit', 'Bar Le Vol De Nuit SARL'], ['Impots fonciers', 'Prelevement impots fonciers numero reference\n    47839743892 client 43278437289'], ['ESPA Carte Hassan Cehef', 'Paiement carte Hassan Cehef'], ['Indirect Energie', 'ESPA Indirect Energie SARL'], ['', 'VIR Mr Jean Claude Dusse'], ['Nuage Douillet', 'ESPA Abonnement Nuage Douillet'], ['Glagla Frigidaire', 'CB GLAGLA FRIGIDAIRE'], ['Digiticable', 'ESPA Digiticable'], ['NOGO Sport', 'CB NOGO Sport'], ['FramaHard', 'ESPA Don FramaHard'], ['Sergent Tchoutchou', 'CB online Sergent Tchoutchou'], ['RAeTP', 'CB Raleurs Ambulants et Traficoteurs Patentés']];

var randomLabelsPositive = [['VIR Nuage Douillet', 'VIR Nuage Douillet REFERENCE Salaire'], ['Impots', 'Remboursement impots en votre faveur'], ['', 'VIR Pots de vin et magouilles pas claires'], ['Case départ', 'Passage par la case depart'], ['Assurancetourix', 'Remboursement frais médicaux pour plâtre généralisé']];

var generateDate = function generateDate(lowDay, highDay, lowMonth, highMonth) {
    return (0, _moment2.default)().month(rand(lowMonth, highMonth)).date(rand(lowDay, highDay)).format('YYYY-MM-DDT00:00:00.000[Z]');
};

var generateOne = function generateOne(account) {

    var n = rand(0, 100);
    var now = (0, _moment2.default)();
    var type = randomType();

    // with a 2% rate, generate a special operation to test duplicates
    // (happening on 4th of current month).
    if (n < 2) {
        return {
            account: account,
            amount: '-300',
            title: 'Loyer',
            raw: 'Loyer habitation',
            date: generateDate(4, 4, now.month(), now.month()),
            type: type
        };
    }

    // Note: now.month starts from 0.
    var date = generateDate(1, now.date(), 0, now.month() + 1);

    if (n < 15) {
        var _randomArray = randomArray(randomLabelsPositive),
            _randomArray2 = _slicedToArray(_randomArray, 2),
            _title = _randomArray2[0],
            _raw = _randomArray2[1];

        var _amount = (rand(100, 800) + rand(0, 100) / 100).toString();

        return {
            account: account,
            amount: _amount,
            title: _title,
            raw: _raw,
            date: date,
            type: type
        };
    }

    var _randomArray3 = randomArray(randomLabels),
        _randomArray4 = _slicedToArray(_randomArray3, 2),
        title = _randomArray4[0],
        raw = _randomArray4[1];

    var amount = (-rand(0, 60) + rand(0, 100) / 100).toString();

    var binary = null;
    if (rand(0, 100) > 90) {
        log.info('Generating a binary attached to the operation.');
        binary = {
            fileName: '__dev_example_file'
        };
    }

    return {
        account: account,
        amount: amount,
        title: title,
        raw: raw,
        date: date,
        type: type,
        binary: binary
    };
};

var generateRandomError = function generateRandomError() {
    var errorTable = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Object.keys(_errors2.default)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var error = _step.value;

            errorTable.push(_errors2.default[error]);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return errorTable[randInt(0, errorTable.length - 1)];
};

var selectRandomAccount = function selectRandomAccount(access) {

    var n = rand(0, 100);
    var accounts = hashAccount(access);

    if (n < 90) return accounts.main;

    if (n < 95) return accounts.second;

    return accounts.third;
};

var generate = function generate(access) {
    var operations = [];

    var i = 5;
    while (i--) {
        operations.push(generateOne(selectRandomAccount(access)));
    }

    while (rand(0, 100) > 70 && i < 3) {
        operations.push(generateOne(selectRandomAccount(access)));
        i++;
    }

    // Generate exact same operations imported at the same time
    // These operations shall not be considered as duplicates.
    if (rand(0, 100) > 85 && operations.length) {
        log.info('Generate a similar but non-duplicate operation.');
        operations.push(operations[0]);
    }

    // Generate always the same operation, so that it is considered
    // as a duplicate.
    if (rand(0, 100) > 70) {
        log.info('Generate a possibly duplicate operation.');

        var duplicateOperation = {
            title: 'This is a duplicate operation',
            amount: '13.37',
            raw: 'This is a duplicate operation',
            account: hashAccount(access).main
        };

        // The date is one day off, so it is considered a duplicate by the client.
        var date = (0, _moment2.default)(new Date('05/04/2020'));
        if (rand(0, 100) <= 50) {
            date = date.add(1, 'days');
        }

        duplicateOperation.date = date.format('YYYY-MM-DDT00:00:00.000[Z]');
        operations.push(duplicateOperation);
    }

    // Sometimes generate a very old operation, probably older than the oldest one.
    if (rand(0, 100) > 90) {
        log.info('Generate a very old transaction to trigger balance resync.');
        var op = {
            title: 'Ye Olde Transaction',
            raw: 'Ye Olde Transaction - for #413 testing',
            amount: '42.12',
            account: hashAccount(access).main,
            date: new Date('01/01/2000')
        };
        operations.push(op);
    }

    log.info('Generated ' + operations.length + ' fake operations:');
    var accountMap = new Map();
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = operations[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _op = _step2.value;

            var prev = accountMap.has(_op.account) ? accountMap.get(_op.account) : [0, 0];
            accountMap.set(_op.account, [prev[0] + 1, prev[1] + +_op.amount]);
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = accountMap[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _ref2 = _step3.value;

            var _ref3 = _slicedToArray(_ref2, 2);

            var account = _ref3[0];

            var _ref3$ = _slicedToArray(_ref3[1], 2);

            var num = _ref3$[0];
            var amount = _ref3$[1];

            log.info('- ' + num + ' new operations (' + amount + ') for account ' + account + '.');
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }

    return operations;
};

var fetchOperations = exports.fetchOperations = function fetchOperations(access) {
    return new Promise(function (accept, reject) {
        setTimeout(function () {

            if (rand(0, 100) <= PROBABILITY_RANDOM_ERROR) {
                var errorCode = generateRandomError();
                var error = new _helpers.KError('New random error: ' + errorCode, 500, errorCode);
                reject(error);
                return;
            }

            accept(generate(access));
        }, Math.random() * MAX_GENERATION_TIME);
    });
};