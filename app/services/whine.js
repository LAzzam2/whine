var Whine = require('../models/whine')

function read(id, callback) {
     Whine.findById(id, callback);
}

function browse(page, pageSize, callback) {
    Whine.find({}, {
            skip: page * pageSize,
            limit: pageSize,
        }
    ).sort({
        submitted: "desc",
    }).find(callback)
}

function create(obj, callback) {
    var whine = Whine();
    whine.contents = obj;
    success = true;
    whine.save(callback);
}
