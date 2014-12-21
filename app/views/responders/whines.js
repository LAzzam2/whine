var _ = require('underscore');

var allowedProperties = [
    '_id',
    'text',
    'submitted',
    'author',
];

exports.build = function(whine) {
    result = whine.toObject();
    return _.pick(result, function(value, key) {
        return _.contains(allowedProperties, key);
    });
};
