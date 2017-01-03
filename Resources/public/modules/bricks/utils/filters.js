angular.module('bricks.utils')
    .filter('highlight', function () {
        return function (text, search, caseSensitive) {
            if (text && (search || angular.isNumber(search))) {
                text = text.toString();
                search = search.toString();
                if (caseSensitive) {
                    return text.split(search).join('<span class="bricks-highlight">' + search + '</span>');
                } else {
                    return text.replace(new RegExp(search, 'gi'), '<span class="bricks-highlight">$&</span>');
                }
            } else {
                return text;
            }
        }
    }
);