import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { createRequest } from './requestController';

const NAMESPACE = 'Contacts';

const createContact = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Inserting Contact.');
  const { contactFirstname, contactLastname, contactEmail, contactPhoneNumber, contactNotes } = req.body;
  const query = `INSERT INTO Contact (contactFirstname, contactLastname, contactEmail, contactPhoneNumber, contactNotes) VALUES ("${contactFirstname}", "${contactLastname}", "${contactEmail}", "${contactPhoneNumber}", "${contactNotes}")`;
  createRequest(req, res, next, NAMESPACE, query, 'Created contact: ');
};

const editContactById = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Editing Contact by Id.');
  const { contactFirstname, contactLastname, contactEmail, contactPhoneNumber, contactNotes } = req.body;
  const getURLId: number = +req.params.id;
  const query = `UPDATE Contact SET contactFirstname = "${contactFirstname}", contactLastname = "${contactLastname}", contactEmail = "${contactEmail}", contactPhoneNumber = "${contactPhoneNumber}", contactNotes = "${contactNotes}" WHERE contactId = ${getURLId}`;
  createRequest(req, res, next, NAMESPACE, query, 'Edited contact with id: ${getURLId}');
};

const deleteContactById = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Deleting a Contact by Id.');
  const getURLId: number = +req.params.id;
  const query = `DELETE FROM Contact WHERE contactId = ${getURLId}`;
  createRequest(req, res, next, NAMESPACE, query, `Deleted contact with id: ${getURLId}`);
};

const deleteAllContacts = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Deleting all Contacts.');
  const query = 'DELETE FROM Contact';
  createRequest(req, res, next, NAMESPACE, query, 'Deleted contacts: ');
};

const getContactById = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Getting a Contact by Id.');
  const getURLId: number = +req.params.id;
  const query = `SELECT * FROM Contact WHERE contactId IN (${getURLId})`;
  createRequest(req, res, next, NAMESPACE, query, `Retrieved contact with id: ${getURLId}`);
};

const getAllContacts = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Getting all Contacts.');
  const query = 'SELECT * FROM Contact';
  createRequest(req, res, next, NAMESPACE, query, 'Retrieved contact: ');
};

export default { createContact, editContactById, deleteContactById, deleteAllContacts, getContactById, getAllContacts };
