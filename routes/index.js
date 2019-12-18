let router = require('express').Router();

const userControllers = require('../controllers/users');
const patrullaControllers = require('../controllers/patrullas');
const sensoresControllers = require('../controllers/sensores');
const sensor_1Controllers = require('../controllers/sensor_1');
const alertasControllers = require('../controllers/alertas');

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
        },
        'alertas':{
            'get': ['/api/read_alertas'],
            'post': ['/api/create_alertas', '/api/update_alertas', '/delete_alertas']
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
        },
        'alertas':{
            'get': ['/api/read_alertas'],
            'post': ['/api/create_alertas', '/api/update_alertas', '/delete_alertas']
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
router.post('/create_patrullas', patrullaControllers.create);
router.get('/read_patrullas', patrullaControllers.read);
// router.post('/update_patrullas', patrullaControllers.update);
router.post('/delete_patrullas', patrullaControllers.delet);


// //CRUD Sensores
router.post('/create_sensores', sensoresControllers.create);
router.get('/read_sensores', sensoresControllers.read);
// router.post('/update_sensores', sensoresControllers.update);
router.post('/delete_sensores', sensoresControllers.delet);

// //CRUD Sensor_1
router.post('/create_sensor_1', sensor_1Controllers.create);
router.get('/read_sensor_1', sensor_1Controllers.read);
router.get('/alertas_sensor_1', sensor_1Controllers.alertas);
router.post('/delete_sensor_1', sensor_1Controllers.delet);

// //CRUD Alertas
router.post('/create_alertas', alertasControllers.create);
router.get('/read_alertas', alertasControllers.read);
// router.post('/update_alertas', auth, alertasControllers.update);
router.post('/delete_alertas',  alertasControllers.delet);

module.exports = router;