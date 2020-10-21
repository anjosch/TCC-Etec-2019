app.factory('Mod10Service', [
    function() {

        var _isValid = function(input) {
            var checkDigitIndex = input.length - 1;
            return input.substr(checkDigitIndex) === create(input.substr(0, checkDigitIndex));
        };

        var _create = function(input) {
            var sum = 0;
            input.split('').reverse().forEach(function(value, index) {
                var weight = (index + 1) % 2 + 1;
                sum += digitSum(parseInt(value, 10) * weight);
            });
            var sumMod10 = sum % 10;
            if (sumMod10 === 0) {
                return '0';
            } else {
                return (10 - sumMod10) + '';
            }
        };

        var _apply = function apply(input) {
            return input + create(input);
        };

        function digitSum(number) {
            var sum = number > 9 ? 1 : 0;
            return sum + number % 10;
        }

        return {
            isValid: _isValid,
            create: _create,
            apply: _apply
        };
    }
]);
