var _ = require('underscore');

allowedProperties = [
    '_id',
    'contents',
    'submitted',
    'by',
];

exports.build = function(whine) {
    result = whine.toObject();
    return _.pick(result, function(value, key) {
        return _.contains(allowedProperties, key);
    });
};
