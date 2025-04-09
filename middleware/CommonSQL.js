const pool = require("../config/database");


const createTable = (schema) => {
  return new Promise((resolve, reject) => {
    pool.query(schema, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const fetchRecords = (tableName, all) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tableName}`;

    pool.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        if (all) {
          resolve(results.length ? results : null);
          return;
        }
        resolve(results.length ? results[0] : null);
      }
    });
  });
};
const fetchQueryRecords = (tableName, column, value, all) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tableName} WHERE ${column} = ?`;

    pool.query(query, [value], (err, results) => {
      if (err) {
        reject(err);
      } else {
        if (all) {
          resolve(results.length ? results : null);
          return;
        }
        resolve(results.length ? results[0] : null);
      }
    });
  });
};
const checkRecordExists = (tableName, column, value, all) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tableName} WHERE ${column} = ?`;

    pool.query(query, [value], (err, results) => {
      if (err) {
        reject(err);
      } else {
        if (all) {
          resolve(results.length ? results : null);
          return;
        }
        resolve(results.length ? results[0] : null);
      }
    });
  });
};

const insertRecord = (tableName, record) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO ${tableName} SET ?`;

    pool.query(query, [record], (err, results) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const updateRecord = (tableName, record, recordPicker, recordPickerValue) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE ${tableName} SET ? WHERE ${recordPicker} = ?`;

    pool.query(query, [record, recordPickerValue], (err, results) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
const deleteRecord = (tableName, recordPicker, recordPickerValue) => {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM ${tableName} WHERE ${recordPicker} = ?`;

    pool.query(query, [recordPickerValue], (err, results) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
  createTable,
  checkRecordExists,
  fetchRecords,
  fetchQueryRecords,
  insertRecord,
  updateRecord,
  deleteRecord,
};
