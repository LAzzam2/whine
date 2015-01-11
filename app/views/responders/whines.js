var _ = require('underscore');

var allowedProperties = [
    '_id',
    'text',
    'submitted',
    'author',
    'rating',
];

exports.build = function(whine) {
    result = whine.toJSON();
    return _.pick(result, function(value, key) {
        return _.contains(allowedProperties, key);
    });
};
