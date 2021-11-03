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

const deleteAllContacts = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Deleting all Contacts.');
  const query = 'DELETE FROM Contact';
  createRequest(req, res, next, NAMESPACE, query, 'Deleted contacts: ');
};

const getAllContacts = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Getting all Contacts.');
  const query = 'SELECT * FROM Contact';
  createRequest(req, res, next, NAMESPACE, query, 'Retrieved contact: ');
};

export default { createContact, deleteAllContacts, getAllContacts };
