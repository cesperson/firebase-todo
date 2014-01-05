'use strict';

/* Directives */


angular.module('myApp.directives', []).
    directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
            elm.text(version);
        };
    }]).
    directive('showonhoverparent', [function() {
        return {
            // TODO: learn how this works
            // http://www.grobmeier.de/angular-js-the-show-on-mouseenter-hide-on-mouseleave-directive-31082012.html#.UeIDsz7wJgI
            link : function(scope, element, attrs) {
                element.parent().bind('mouseenter', function() {
                    element.show();
                });
                element.parent().bind('mouseleave', function() {
                    element.hide();
                });
            }
        };
    }]).
    directive('sortable', [function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.sortable({
                    placeholder: "sortable-placeholder-custom",
                    connectWith: ".incomplete-todos",
                    receive: function (event, ui) {
                        // TODO: Need to work with event, ui to figure out what needs
                        // to be updated when moving items between boards and lists.
//                        var $scope = angular.element($('.ui-sortable')[0]).scope(),
//                            boardIndex = $(this).parent().parent().parent().data('board-index'),
//                            listIndex = $(this).parent().data('list-index');
//
//                        console.log('receive: ')
//                        console.log('boardIndex: ' + boardIndex);
//                        console.log('listIndex: ' + listIndex);
//                        $scope.boards[boardIndex].lists[listIndex].todos = [];
//
//                        $('ul.incomplete-todos').eq(listIndex).find('li').each(function () {
//                            $scope.boards[boardIndex].lists[listIndex].todos.push({
//                                thing: $(this).text(),
//                                complete: false
//                            });
//                        });
//
//                        $('ul.complete-todos').eq(listIndex).find('li').each(function () {
//                            $scope.boards[boardIndex].lists[listIndex].todos.push({
//                                thing: $(this).text(),
//                                complete: true
//                            });
//                        });
//
//                        $scope.$apply();
                    },
                    stop: function(event, ui) {
                        var $scope = angular.element($('.ui-sortable')[0]).scope(),
                            boardIndex = $(this).parent().parent().parent().data('board-index'),
                            listIndex = $(this).parent().data('list-index'),

                            $previousList = $(event.target),
                            $targetList = $(event.toElement.parentElement.parentElement),
                            previousListIndex = $previousList.data('list-index'),
                            targetListIndex = $targetList.data('list-index');

                        $scope.boards[boardIndex].lists[previousListIndex].todos = [];
                        $scope.boards[boardIndex].lists[targetListIndex].todos = [];

                        $previousList.find('li').each(function () {
                            $scope.boards[boardIndex].lists[previousListIndex].todos.push({
                                thing: $(this).find('.item-text').text(),
                                complete: false
                            });
                        });

                        if (previousListIndex !== targetListIndex) {
                            $targetList.find('li').each(function () {
                                $scope.boards[boardIndex].lists[targetListIndex].todos.push({
                                    thing: $(this).find('.item-text').text(),
                                    complete: false
                                });
                            });
                        }

                        $scope.$apply();
                    }
                })
            }
        };
    }]);

