const controllers = require('../controllers/')
const {auth} = require('../middlewares')
///
///users
///
module.exports = (app) => {
    ///
    ///CRUD users
    ///
    app.get('/api/users',auth, controllers.userList)
    app.get('/api/users/:id',auth, controllers.userDetail)
    app.put('/api/users/:id',auth, controllers.updateUser)
    app.delete('/api/users/:id',auth, controllers.deleteUser)

    ///
    /// Login/registration
    ///
    app.post('/api/registration', controllers.createUser)
    app.post('/api/login', controllers.userLogin)
}
