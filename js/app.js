'use strict';

// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'firebase']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/todos', {templateUrl: 'partials/todos.html', controller: 'MyCtrl1'});
    $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl1'});
    $routeProvider.when('/test-unique-url'), {templateUrl: 'partials/todos-unique.html', controller: 'MyCtrl1'}
    $routeProvider.otherwise({redirectTo: '/todos'});
  }]);

myApp.controller('MyCtrl1', ['$scope', '$filter', 'angularFire', 'angularFireCollection',
    function MyCtrl1($scope, $filter, angularFire, angularFireCollection) {
        var url = 'https://angulartodo.firebaseIO.com/todomvc';
        var promise = angularFire(url, $scope, 'boards', []);

        promise.then(function() {
            startWatch($scope, $filter);
        });

        $scope.isActive = function(index) {
            if (index === $scope.activeBoard) {
                return true;
            }
        }

        $scope.setActive = function(index) {
            $scope.activeBoard = index;
        }
    }
])

function startWatch($scope, $filter) {
    $scope.addBoard = function(title) {
        if ($scope.boards.length === 0) {
            $scope.boards[0] = {
                "title": title,
                "lists": []
            }
            return;
        }

        $scope.boards.push({
            "title": title,
            "lists": []
        });

    }

    $scope.addList = function(title, boardIndex) {
        if ($scope.boards[boardIndex].lists) {
            $scope.boards[boardIndex].lists.push({
                "title": title,
                "todos": []
            });
            return;
        }

        $scope.boards[boardIndex].lists = [{
            "title": title,
            "todos": []
        }];
    }

    $scope.addTodo = function(thing, boardIndex, listIndex) {
        if ($scope.boards[boardIndex].lists[listIndex].todos) {
            $scope.boards[boardIndex].lists[listIndex].todos.push({
                "thing": thing,
                "complete": false
            })
        } else {
            $scope.boards[boardIndex].lists[listIndex].todos = [{
                "thing": thing,
                "complete": false
            }]
        }
    }

    $scope.removeTodo = function(todo) {
        todo.complete = true;
    }

    $scope.returnTodo = function(todo) {
        todo.complete = false;
    }

    $scope.removeArchived = function(boardIndex, listIndex) {
        var incomplete = [],
            i;

        for  (i = 0; i < $scope.boards[boardIndex].lists[listIndex].todos.length; i += 1) {
            if ($scope.boards[boardIndex].lists[listIndex].todos[i].complete === false) {
                incomplete.push($scope.boards[boardIndex].lists[listIndex].todos[i])
            }
        }

        $scope.boards[boardIndex].lists[listIndex].todos = incomplete;
    }

    $scope.removeList = function(boardIndex, listIndex) {
        $scope.boards[boardIndex].lists.splice(listIndex, 1);
    }

    $scope.removeBoard = function(boardIndex) {
        $scope.boards.splice(boardIndex, 1);
    }

    $scope.isDone = function(todo) {
        return (todo.complete === true);
    }

    $scope.isIncomplete = function(todo) {
        return (todo.complete === false);
    }

    $scope.init = function() {
        this.setActive(0);
    }

    $scope.init();
}
