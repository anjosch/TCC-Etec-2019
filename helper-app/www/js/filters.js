app.filter('money', ['$filter', function ($filter) {

    return function (input, symbol, direction) {

        var str = input + '';

        str = str.replace(/\D/g, '');
        str = str.length >= 3 ? str.trim() : "0".repeat(3 - str.length).concat(str);
        str = str.replace(/(\d)(\d{2})$/, '$1.$2');

        if (direction == 'to') {

            return $filter('currency')(str, symbol, 2);

        } else if (direction == 'from') {

            return Number(str);
        }
    }
}]);

app.filter('cpf', [function () {

    return function (input) {

        var str = input + '';

        if (str.length <= 11) {
            str = str.replace(/\D/g, '');
            str = str.replace(/(\d{3})(\d)/, "$1.$2");
            str = str.replace(/(\d{3})(\d)/, "$1.$2");
            str = str.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        }
        return str;
    };

}]);