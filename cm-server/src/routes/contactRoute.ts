import express from 'express';
import controller from '../controllers/contactController';

const router = express.Router();

router.post('', controller.createContact);
router.put('/:id', controller.editContactById);
router.delete('/:id', controller.deleteContactById);
router.delete('', controller.deleteAllContacts);
router.get('/:id', controller.getContactById);
router.get('', controller.getAllContacts);

export = router;
