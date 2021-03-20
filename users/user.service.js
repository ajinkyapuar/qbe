const config = require('../globalConfig/globalConfig');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;

module.exports = {
    authenticate,
    // getAll,
    // getById,
    create,
    getId,
    // updatePass
    // update,
    // delete: _delete
};

async function authenticate({
    username,
    password,
    date
}) {
    const user = await User.findOne({
        username
    });
    if (user && bcrypt.compareSync(password, user.hash)) {

        // console.log(username, password, date);
        user.loggedInAt = date;
        // console.log(user.createdAt );
        if (user.createdAt - user.firstLogin == 0) {
            // console.log("First Time Login");
            user.firstLogin = date;
        }
        // console.log(user);
        await user.save();
        // console.log(user);
        const {
            hash,
            ...userWithoutHash
        } = user.toObject();
        const token = jwt.sign({
            sub: user.id
        }, config.database.secret);


        return { ...userWithoutHash, token }



    }
}

// async function getAll() {
//     return await User.find().select('-hash');
// }

// async function getById(id) {
//     return await User.findById(id).select('-hash');
// }

async function create(userParam) {
    // validate
    // console.log(userParam);

    if (await User.findOne({
        username: userParam.username
    })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    if (await User.findOne({
        email: userParam.email
    })) {
        throw 'Email is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
    return { "email": user.email, "id": user._id }
}



async function getId(email) {
    let result = await User.findOne({ email })
    // console.log("tgeh",result)
    if (result) {
        return result['_id']
    }
    else {
        // console.log("user doesn't exist")
        return null
    }
}


// async function updatePass(data) {

//     let hashNew = bcrypt.hashSync(data['pass'], 10);

//     let result = await User.findOneAndUpdate({ _id: data['id'] }, { hash: hashNew })

//     return result

// }


// async function update(id, userParam) {
//     const user = await User.findById(id);

//     // validate
//     if (!user) throw 'User not found';
//     if (user.username !== userParam.username && await User.findOne({
//             username: userParam.username
//         })) {
//         throw 'Username "' + userParam.username + '" is already taken';
//     }

//     // hash password if it was entered
//     if (userParam.password) {
//         userParam.hash = bcrypt.hashSync(userParam.password, 10);
//     }

//     // copy userParam properties to user
//     Object.assign(user, userParam);

//     await user.save();
// }

// async function _delete(id) {
//     await User.findByIdAndRemove(id);
// }