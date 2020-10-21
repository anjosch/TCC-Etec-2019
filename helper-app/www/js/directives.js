app.directive("moveToOnMaxlength", [function() {
    return {
        restrict: "A",
        require: 'ngModel',
        priority: 9999,
        scope: {
            moveToOnMaxlength: '@'
        },
        link: function(scope, element, attrs, ctrl) {
            element.on('input', function(e) {
                if (element.val().length == attrs.maxlength) {
                    document.getElementById(scope.moveToOnMaxlength).focus();
                }
            });
        }
    }
}]);

app.directive('digit', [function() {
    return {
        restrict: "A",
        require: 'ngModel',
        priority: 9998,
        link: function(scope, element, attrs, ctrl) {
            element.on('input', function(e) {
                var result = ctrl.$viewValue;
                result = result ? result.replace(/\D/g, '') : result;
                ctrl.$setViewValue(result);
                ctrl.$render();
            })
        }
    };
}]);

app.directive('currency', ['$filter', function($filter) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {

            ngModel.$parsers.push(function(value) {

                var result = $filter('money')(value, 'R$ ', 'to');
                ngModel.$setViewValue(result);
                ngModel.$render();

                return $filter('money')(result, 'R$ ', 'from');
            });

            ngModel.$formatters.push(function(value) {
                return $filter('currency')(value, 'R$ ', 2);
            });

            if (attrs.required) {

                ngModel.$validators.required = function(modelValue, viewValue) {

                    return modelValue > 0;
                };
            }
        }
    }
}]);

app.directive('blockMaxlength', [function() {
    return {
        restrict: "A",
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {

            attrs.$set("ngTrim", "false");
            var maxlength = parseInt(attrs.maxlength);

            ctrl.$parsers.push(function(value) {
                if (value.length > maxlength) {
                    value = value.substr(0, maxlength);
                    ctrl.$setViewValue(value);
                    ctrl.$render();
                }
                return value;
            });
        }
    }
}]);

const raw = ionic.Platform.navigator.appVersion.match(/Chrom(e|ium)\/([0-9]+)\./);
const chromever = raw ? parseInt(raw[2], 10) : false;
if (chromever >= 53) {
  function avoidTap() {
    return {
      restrict: 'A',
      // scope: '=',
      link: (scope, elem) => {
        elem.attr('data-tap-disabled', 'true');
      },
    };
  }
  angular.module('ionic')
  .directive('selectPolyfill', avoidTap);
}
