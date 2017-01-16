import express from 'express';
import ctrl from '../controllers';

const router = express.Router();

router.get('/*', ctrl.main);
router.post('/godir', ctrl.redirect);
router.post('/uploadfile', ctrl.uploadFile);

export default router;
