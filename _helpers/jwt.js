const expressJwt = require('express-jwt');
const config = require('../globalConfig/globalConfig');
const userService = require('../users/user.service');

module.exports = jwt;

function jwt() {
    const secret = config['database']['secret'];
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register',
            /^\/users\/verify\/.*/,
            '/users/resend',
            '/users/forgot',
            '/users/newPass',
            '/job/save-name',
            /^\/job\/upload\/.*/
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};