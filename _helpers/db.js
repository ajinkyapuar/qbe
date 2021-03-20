const config = require('../globalConfig/globalConfig');

const mongoose = require('mongoose');
mongoose.connect(config['database'].connectionString, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;
module.exports = {
    User: require('../users/user.model'),
    Job:require('../job/job.model')
};