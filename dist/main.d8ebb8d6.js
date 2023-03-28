// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts/main.js":[function(require,module,exports) {
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var rows = document.querySelectorAll('.field-row');
var score = document.querySelector('.game-score');
var message = document.querySelector('.message-lose');
var win = document.querySelector('.message-win');
var messageStart = document.querySelector('.message-start');
var scoreAnimation = document.querySelector('.score-animation');
var button = document.querySelector('.button');
var arrayObject = [[], [], [], []];
var scoreGame = 0;
var gameStart = false;

var Ceil = /*#__PURE__*/function () {
  function Ceil(value, position) {
    _classCallCheck(this, Ceil);

    this.value = value;
    this.position = position;
  }

  _createClass(Ceil, [{
    key: "setValue",
    value: function setValue(number) {
      this.value = number;
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.value;
    }
  }]);

  return Ceil;
}();
/* auxiliary functions */


var getRandomElement = function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
};

var createGridElements = function createGridElements() {
  for (var i = 0; i < rows.length; i++) {
    for (var q = 0; q < rows[i].children.length; q++) {
      if (arrayObject[i].length < 4) {
        arrayObject[i].push(new Ceil(0, rows[i].children[q]));
      }
    }
  }

  for (var _i = 0; _i < 2; _i++) {
    getRandomElement(getRandomElement(arrayObject).filter(function (el) {
      return el.getValue() === 0;
    })).value = getRandomElement([2, 4]);
  }
};

var renderElements = function renderElements(array) {
  array.forEach(function (el) {
    el.forEach(function (item) {
      item.position.innerHTML = '';

      if (item.position.classList[1]) {
        item.position.classList.remove(item.position.classList[1]);
      }
    });
  });
  score.innerHTML = '0';
  array.forEach(function (el) {
    el.forEach(function (item) {
      if (item.getValue()) {
        item.position.innerHTML = item.getValue();
        item.position.classList.add("field-cell--".concat(item.getValue()));
      }
    });
  });
};

var addAnimationClass = function addAnimationClass(number) {
  scoreAnimation.classList.add('animation');
  scoreAnimation.innerHTML = "+".concat(number);
  setTimeout(function () {
    scoreAnimation.classList.remove('animation');
  }, 500);
};

var compersionArray = function compersionArray(copy, array) {
  var result = true;
  copy.forEach(function (el, index) {
    el.map(function (item) {
      return item.value;
    }).forEach(function (element, i) {
      if (array[index].map(function (item) {
        return item.getValue();
      })[i] !== element) {
        result = false;
      }
    });
  });
  return result;
};

var restartGame = function restartGame() {
  message.classList.remove('hidden');
};

var checkOnWin = function checkOnWin() {
  var result = false;
  arrayObject.forEach(function (el) {
    if (el.some(function (item) {
      return item.getValue() === 2048;
    })) {
      win.classList.remove('hidden');
      result = true;
    }
  });
  return result;
};

var checkMovie = function checkMovie() {
  var UpToDown = false;
  var leftToRigth = false;
  arrayObject.forEach(function (el) {
    if (checkOnDoubleCount(el, 4)) {
      leftToRigth = true;
    }
  });

  var _loop = function _loop(i) {
    arrayObject[i].forEach(function (el, index) {
      if (arrayObject[i + 1]) {
        if (el.getValue() === arrayObject[i + 1][index].getValue()) {
          UpToDown = true;
        }
      }
    });
  };

  for (var i = 0; i < arrayObject.length; i++) {
    _loop(i);
  }

  return !UpToDown && !leftToRigth;
};

var getElementWithZeroValue = function getElementWithZeroValue() {
  var result = [];
  arrayObject.forEach(function (el) {
    el.forEach(function (item) {
      if (item.getValue() === 0) {
        result.push(item);
      }
    });
  });
  return result;
};

var checkOnDoubleCount = function checkOnDoubleCount(array, countStep) {
  for (var i = 0; i < countStep; i++) {
    if (array[i + 1]) {
      if (array[i].getValue() === array[i + 1].getValue()) {
        return true;
      }
    }
  }

  return false;
};
/* functions for events ArrorLeft ArrowRight */


var changeValueElement = function changeValueElement(array, select, scorePerMovie) {
  for (var i = 0; i < array.length; i++) {
    if (select.getValue() > 0 && array[i].getValue() > 0 && select.getValue() !== array[i].getValue()) {
      break;
    }

    if (select.getValue() === array[i].getValue()) {
      select.setValue(select.getValue() + array[i].getValue());
      array[i].setValue(0);

      if (select.getValue() + array[i].getValue()) {
        scoreGame += select.getValue();
        scorePerMovie.push(select.getValue() + array[i].getValue());
      }
    }

    if (select.getValue() === 0 && array[i].getValue() !== 0) {
      select.setValue(array[i].getValue());
      array[i].setValue(0);
    }
  }

  return select;
};

var returnChangeArray = function returnChangeArray(countStep, arr, scorePerMovie) {
  var result = [];

  for (var i = 0; i < countStep; i++) {
    var select = arr.shift();
    result.push(changeValueElement(arr, select, scorePerMovie));
  }

  return result;
};

var leftOrRight = function leftOrRight(said) {
  var copy = JSON.parse(JSON.stringify(arrayObject));
  var scorePerMovie = [];
  arrayObject = arrayObject.map(function (el) {
    var countStep = el.length;
    var result = returnChangeArray(countStep, said ? el.reverse() : el, scorePerMovie);

    if (scorePerMovie.reduce(function (acc, item) {
      return acc + item;
    }, 0)) {
      addAnimationClass(scorePerMovie.reduce(function (acc, item) {
        return acc + item;
      }, 0));
    }

    if (checkOnDoubleCount(result, countStep) && compersionArray(copy, arrayObject)) {
      return said ? returnChangeArray(countStep, result, scorePerMovie).reverse() : returnChangeArray(countStep, result, scorePerMovie);
    }

    return said ? result.reverse() : result;
  });

  if (!compersionArray(copy, arrayObject)) {
    getRandomElement(getElementWithZeroValue()).setValue(getRandomElement([2, 4]));
    renderElements(arrayObject);
  }

  score.innerHTML = scoreGame;
};
/* functions for events ArrowUp ArrowDown */


var returnChangeArrays = function returnChangeArrays(select, filerArray, array, scorePerMovie) {
  var wrongNumber = [];

  var _loop2 = function _loop2(i) {
    array.filter(function (el) {
      return !filerArray.includes(el);
    }).forEach(function (item) {
      for (var q = 0; q < select.length; q++) {
        if (select[q].getValue() > 0 && item[q].getValue() > 0 && item[q].getValue() !== select[q].getValue()) {
          wrongNumber.push(q);
        }

        if (select[q].getValue() === 0 && item[q].getValue() > 0) {
          select[q].setValue(select[q].getValue() + item[q].getValue());
          item[q].setValue(0);
        }

        if (select[q].getValue() === item[q].getValue() && !wrongNumber.includes(q) && select[q].getValue() !== 0 && item[q].getValue() !== 0) {
          select[q].setValue(select[q].getValue() + item[q].getValue());
          item[q].setValue(0);

          if (select[q].getValue() + item[i].getValue()) {
            scoreGame += select[q].getValue();
            scorePerMovie.push(select[q].getValue() + item[i].getValue());
          }
        }
      }
    });
  };

  for (var i = 0; i < array.length; i++) {
    _loop2(i);
  }

  return select;
};

var UpOrDown = function UpOrDown(said) {
  var copy = JSON.parse(JSON.stringify(arrayObject));
  var arraySelected = [];
  var array = said === 'Down' ? arrayObject.reverse() : arrayObject;
  var scorePerMovie = [];
  arrayObject = array.map(function (el) {
    var select = el;
    arraySelected.push(select);
    return returnChangeArrays(select, arraySelected, arrayObject, scorePerMovie);
  });

  if (scorePerMovie.reduce(function (acc, item) {
    return acc + item;
  }, 0)) {
    addAnimationClass(scorePerMovie.reduce(function (acc, item) {
      return acc + item;
    }, 0));
  }

  if (!compersionArray(copy, said === 'Down' ? arrayObject.reverse() : arrayObject)) {
    getRandomElement(getElementWithZeroValue()).setValue(getRandomElement([2, 4]));
    renderElements(arrayObject);
  }

  score.innerHTML = scoreGame;
};
/* listeners */


window.addEventListener('keydown', function (e) {
  switch (true) {
    case e.key === 'ArrowLeft':
      {
        if (!checkOnWin()) {
          leftOrRight();
        }

        if (!getElementWithZeroValue(arrayObject).length) {
          if (checkMovie()) {
            restartGame();
          }
        }

        break;
      }

    case e.key === 'ArrowRight':
      {
        if (!checkOnWin()) {
          leftOrRight('right');
        }

        if (!getElementWithZeroValue(arrayObject).length) {
          if (checkMovie()) {
            restartGame();
          }
        }

        break;
      }

    case e.key === 'ArrowDown':
      {
        if (!checkOnWin()) {
          UpOrDown('Down');
        }

        if (!getElementWithZeroValue(arrayObject).length) {
          if (!checkMovie()) {
            restartGame();
          }
        }

        break;
      }

    case e.key === 'ArrowUp':
      {
        if (!checkOnWin()) {
          UpOrDown();
        }

        if (!getElementWithZeroValue(arrayObject).length) {
          if (checkMovie()) {
            restartGame();
          }
        }

        break;
      }

    default:
      {
        alert('only arrows buttons need use for play game');
      }
  }
});
button.addEventListener('click', function () {
  if (!gameStart) {
    createGridElements();
    renderElements(arrayObject);
  }

  messageStart.classList.add('hidden');
  button.classList.add('restart');
  button.innerHTML = 'Restart';
  button.classList.remove('start');
  gameStart = true;

  if (checkMovie()) {
    arrayObject = arrayObject.map(function () {
      return [];
    });
    message.classList.add('hidden');
    createGridElements();
    renderElements(arrayObject);
    scoreGame = 0;
    score.innerHTML = '0';
  }

  ;
});
},{}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57197" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","scripts/main.js"], null)
//# sourceMappingURL=/main.d8ebb8d6.js.map