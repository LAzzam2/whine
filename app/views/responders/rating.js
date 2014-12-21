var _ = require('underscore');

allowedProperties = [
    'rating',
];

exports.build = function(rating) {
    result = rating.toObject();
    return _.pick(result, function(value, key) {
        return _.contains(allowedProperties, key);
    });
};
