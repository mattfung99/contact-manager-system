import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';

const NAMESPACE = 'Contacts';

const createContact = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Inserting Contact');

  let { contactFirstname, contactLastname, contactEmail, contactPhoneNumber, contactNotes } = req.body;

  let query = `INSERT INTO Contact (contactFirstname, contactLastname, contactEmail, contactPhoneNumber, contactNotes) VALUES ("${contactFirstname}", "${contactLastname}", "${contactEmail}", "${contactPhoneNumber}", "${contactNotes}")`;

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((result) => {
          logging.info(NAMESPACE, 'Contact created: ', result);

          return res.status(200).json({
            result
          });
        })
        .catch((error) => {
          logging.error(NAMESPACE, error.message, error);

          return res.status(200).json({
            message: error.message,
            error
          });
        })
        .finally(() => {
          logging.info(NAMESPACE, 'Closing connection.');
          connection.end();
        });
    })
    .catch((error) => {
      logging.error(NAMESPACE, error.message, error);

      return res.status(200).json({
        message: error.message,
        error
      });
    });
};

const deleteAllContacts = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Deleting all Contacts.');

  let query = 'DELETE FROM Contact';

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((results) => {
          logging.info(NAMESPACE, 'Deleted contacts: ', results);

          return res.status(200).json({
            results
          });
        })
        .catch((error) => {
          logging.error(NAMESPACE, error.message, error);

          return res.status(200).json({
            message: error.message,
            error
          });
        })
        .finally(() => {
          logging.info(NAMESPACE, 'Closing connection.');
          connection.end();
        });
    })
    .catch((error) => {
      logging.error(NAMESPACE, error.message, error);

      return res.status(200).json({
        message: error.message,
        error
      });
    });
};

const getAllContacts = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Getting all Contacts.');

  let query = 'SELECT * FROM Contact';

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((results) => {
          logging.info(NAMESPACE, 'Retrieved contact: ', results);

          return res.status(200).json({
            results
          });
        })
        .catch((error) => {
          logging.error(NAMESPACE, error.message, error);

          return res.status(200).json({
            message: error.message,
            error
          });
        })
        .finally(() => {
          logging.info(NAMESPACE, 'Closing connection.');
          connection.end();
        });
    })
    .catch((error) => {
      logging.error(NAMESPACE, error.message, error);

      return res.status(200).json({
        message: error.message,
        error
      });
    });
};

export default { createContact, deleteAllContacts, getAllContacts };
