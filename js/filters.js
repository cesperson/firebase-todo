'use strict';

/* Filters */

angular.module('myApp.filters', []).
    filter('interpolate', ['version', function(version) {
        return function(text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        }
    }]).
    filter('completeFilter', ['', function(todos) {
        return function(todos) {
            var incomplete = [];
            debugger;
            for  (i = 0; i < todos.length; i += 1) {
                if (todos[i].complete === true) {
                    incomplete.push(todos[i])
                }
            }

            return incomplete;
        }
    }]);
