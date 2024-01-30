import express from 'express';
import Database from '../../providers/database/database';

const router = express.Router();

router.post('/', async (req, res, next) => {
  console.log(req.body);
  const user = await Database.create.user(req.body).catch((error) => {
    return res.status(500).json({ msg: 'Error creating user: ' + error.message });
  });
  return res.json(user);
});

router.get('/:id', (req, res, next) => {});
router.put('/:id', (req, res, next) => {});
router.delete('/:id', (req, res, next) => {});

export default router;
