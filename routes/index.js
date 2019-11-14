let router = require('express').Router();

const userControllers = require('../controllers/users');
const patrullaControllers = require('../controllers/patrullas');
const sensoresControllers = require('../controllers/sensores');

const auth = require('../middlewares/auth');

//Users
router.get('/get_user', userControllers.getUser);

//user login
router.post('/sign_up', userControllers.signUp);
router.post('/sign_in', userControllers.signIn);


// //CRUD Patrullas
router.post('/create_patrullas', auth, patrullaControllers.create);
router.get('/read_patrullas', auth, patrullaControllers.read);
router.post('/update_patrullas', auth, patrullaControllers.update);
router.post('/delete_patrullas', auth, patrullaControllers.delet);


// //CRUD Sensores
router.post('/create_sensores', auth, sensoresControllers.create);
router.get('/read_sensores', auth, sensoresControllers.read);
router.post('/update_sensores', auth, sensoresControllers.update);
router.post('/delete_sensores', auth, sensoresControllers.delet);

module.exports = router;