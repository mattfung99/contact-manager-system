import express from 'express';
import controller from '../controllers/contact';

const router = express.Router();

router.post('', controller.createContact);
router.delete('', controller.deleteAllContacts);
router.get('', controller.getAllContacts);

export = router;
