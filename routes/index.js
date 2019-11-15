let router = require('express').Router();

const userControllers = require('../controllers/users');
const patrullaControllers = require('../controllers/patrullas');
const sensoresControllers = require('../controllers/sensores');

const auth = require('../middlewares/auth');

//API
router.get('/', (req, res) => {
    docs = {
        'user':{
            'get': ['/api/get_user'],
            'post': ['/api/sign_up', '/api/sign_in']
        },
        'patrullas':{
            'get': ['/api/read_patrullas'],
            'post': ['/api/create_patrullas', '/api/update_patrullas', '/delete_patrullas']
        },
        'sensores':{
            'get': ['/api/read_sensores'],
            'post': ['/api/create_sensores', '/api/update_sensores', '/delete_sensores']
        }
        
    }
    res.send(200, { docs })
});

router.post('/', (req, res) => {
    
    const entrada = {
        name: req.body.docs.name,
        email: req.body.docs.email,
        password: req.body.docs.password,
        role: req.body.docs.role,
        image: req.body.docs.image,
    }
    console.log(entrada);
    var docs = {
        'user':{
            'get': ['/api/get_user'],
            'post': ['/api/sign_up', '/api/sign_in']
        },
        'patrullas':{
            'get': ['/api/read_patrullas'],
            'post': ['/api/create_patrullas', '/api/update_patrullas', '/delete_patrullas']
        },
        'sensores':{
            'get': ['/api/read_sensores'],
            'post': ['/api/create_sensores', '/api/update_sensores', '/delete_sensores']
        }
        
    }
    res.send(200, { docs })
});

//Users
router.get('/get_user', userControllers.getUser);

//user login
router.post('/sign_up', userControllers.signUp);
router.post('/sign_in', userControllers.signIn);


// //CRUD Patrullas
router.post('/create_patrullas', auth, patrullaControllers.create);
router.get('/read_patrullas', patrullaControllers.read);
router.post('/update_patrullas', auth, patrullaControllers.update);
router.post('/delete_patrullas', auth, patrullaControllers.delet);


// //CRUD Sensores
router.post('/create_sensores', auth, sensoresControllers.create);
router.get('/read_sensores', sensoresControllers.read);
router.post('/update_sensores', auth, sensoresControllers.update);
router.post('/delete_sensores', auth, sensoresControllers.delet);

module.exports = router;