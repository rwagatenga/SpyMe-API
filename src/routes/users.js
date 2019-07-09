import express from 'express';
import auth from '../middleware/auth';

import user from '../controllers/userController';

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('Users');
});

// POST /api/users gets JSON bodies
router.post('/', auth, user.sampleUser);
router.post('/login', user.login);

export default router;
