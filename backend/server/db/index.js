const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  password: "",
  user: "root",
  database: "laf",
  host: "localhost",
  port: "3306",
});

let testdb = {};

//GET LOST
testdb.all = (type) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT post_date as date, item_id as id, item_name as title, item_description as description, item_image as image, post_type as type, found_location
     FROM item WHERE post_type=? AND item_status <> "COMPLETED"
     ORDER BY post_date DESC`,
      [type],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

//GET COMPLETED ITEMS
testdb.completedItems = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT item_id as id, item_name as title, item_description as description, item_image as image, post_type as type
     FROM item WHERE item_status="COMPLETED"
     ORDER BY post_date DESC`,
      [],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

//FILTER COMPLETED ITEMS
testdb.filterCompletedItems = (type) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT item_id as id, item_name as title, item_description as description, item_image as image, post_type as type
     FROM item WHERE item_status="COMPLETED" AND post_type=?
     ORDER BY post_date DESC`,
      [type],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

//GET BASED ON ITEM ID
testdb.one = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM item LEFT JOIN student ON item.post_creator=student.student_id WHERE item_id = ?`,
      [id],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results[0]);
      }
    );
  });
};

//CHECK IF FOUND MESSAGE EXISTS
testdb.checkFound = (uid, itemId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM message WHERE student_id = ? AND item_id = ?`,
      [uid, itemId],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

//POST TO ITEM
testdb.postLost = (uid, type, title, description, image, location) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO ITEM (post_creator,post_type,item_name,item_description,item_image,found_location,item_status)
      VALUES(?,?,?,?,?,?,"INCOMPLETE")`,
      [uid, type, title, description, image, location],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

//POST TO MESSAGE
testdb.postMessage = (date, uid, itemId, message, sender) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO MESSAGE (date,student_id,item_id,message_text,message_sender,read_status)
      VALUES(?,?,?,?,?,'UNREAD')`,
      [date, uid, itemId, message, sender],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

//POST TO CLAIMS
testdb.postClaim = (date, uid, itemId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO CLAIMS (date,student_id,item_id,claimant_status)
      VALUES(?,?,?,'PENDING')`,
      [date, uid, itemId],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

//GET USER MESSAGES
testdb.getMessage = (uid) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT *, sum(case when read_status = 'UNREAD' then 1 else 0 end) AS count FROM MESSAGE WHERE student_id = ? GROUP BY item_id ORDER BY date DESC`,
      [uid],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

testdb.getMessage1 = (uid) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT a.message_id, a.student_id, a.item_id, a.message_text, a.message_sender, b.latest as date, a.read_status, b.count FROM message a INNER JOIN (SELECT *, sum(case when read_status = 'UNREAD' AND message_sender="ADMIN" then 1 else 0 end) AS count, MAX(date) as latest from message where student_id=? group by item_id) b where a.date=b.latest order by b.latest desc`,
      [uid],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

testdb.getAdminMessage = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT a.message_id, a.student_id, a.item_id, a.message_text, a.message_sender, b.latest as date, a.read_status, b.count FROM message a INNER JOIN (SELECT *, sum(case when read_status = 'UNREAD' AND message_sender="STUDENT" then 1 else 0 end) AS count, MAX(date) as latest from message group by student_id,item_id) b where a.date=b.latest order by b.latest desc`,
      [],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

// GET USER UNREAD MESSAGES COUNT

testdb.getUnreadCount = (uid) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT sum(case when read_status = 'UNREAD' AND message_sender="ADMIN" then 1 else 0 end) AS count FROM message WHERE student_id=?`,
      [uid],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

// UPDATE USER UNREAD MESSAGES

testdb.putUpdateUnread = (messageId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE message SET read_status = 'READ' WHERE message_id = ?`,
      [messageId],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

// UPDATE CLAIMS REJECT ALL CLAIMS

testdb.rejectClaim = (uid, itemId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE claims SET claimant_status = 'REJECTED' WHERE item_id = ? AND student_id <> ?`,
      [itemId, uid],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

// UPDATE CLAIMS ACCEPT CLAIM

testdb.acceptClaim = (uid, itemId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE claims SET claimant_status = 'ACCEPTED' WHERE student_id = ? AND item_id = ?`,
      [uid, itemId],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

// UPDATE ITEM SET STATUS COMPLETED

testdb.itemCompleted = (itemId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE item SET item_status = 'COMPLETED' WHERE item_id = ?`,
      [itemId],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

// UPDATE ITEM DETAILS WITH IMAGE

testdb.updateItem = (itemId, title, description, location, image) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE item SET item_name = ?, item_description=?, found_location=?, item_image=? WHERE item_id = ?`,
      [title, description, location, image, itemId],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

// UPDATE ITEM DETAILS WITHOUT IMAGE

testdb.updateItemWithoutImage = (itemId, title, description, location) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE item SET item_name = ?, item_description=?, found_location=? WHERE item_id = ?`,
      [title, description, location, itemId],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

// UPDATE EMAIL AND PHONE

testdb.updateEmail = (uid, email, phone) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE student SET email = ?, phone=? WHERE student_id=?`,
      [email, phone, uid],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};
// DELETE FROM ITEM

testdb.deleteItem = (itemId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM item WHERE item_id = ?`,
      [itemId],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

testdb.getAdminUnreadCount = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT sum(case when read_status = 'UNREAD' AND message_sender="STUDENT" then 1 else 0 end) AS count FROM message `,
      [],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

//GET USER ITEM MESSAGES
testdb.getItemMessage = (uid, itemId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM MESSAGE WHERE student_id = ? AND item_id = ? ORDER BY date ASC`,
      [uid, itemId],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

//SEARCH ITEM
testdb.search = (key, currentPage) => {
  return new Promise((resolve, reject) => {
    var keyword = "%" + key + "%";
    pool.query(
      `SELECT item_id as id, item_name as title, item_description as description, item_image as image, post_type as type, found_location FROM ITEM WHERE post_type = ? AND item_status <> "COMPLETED" AND (lower(item_name) LIKE lower(?) OR lower(item_description) LIKE lower(?) OR lower(found_location) LIKE lower(?)) `,
      [currentPage, keyword, keyword, keyword],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

//SEARCH MY ITEM
testdb.searchMyItem = (key, currentPage, uid) => {
  return new Promise((resolve, reject) => {
    var keyword = "%" + key + "%";
    pool.query(
      `SELECT item_id as id, item_name as title, item_description as description, item_image as image, post_type as type, found_location, item_status FROM ITEM WHERE post_type = ? AND post_creator = ? AND lower(item_name) LIKE lower(?) `,
      [currentPage, uid, keyword],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

//GET USER'S ITEMS
testdb.myItems = (uid, type) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT post_date as date, item_id as id, item_name as title, item_description as description, item_image as image, post_type as type, found_location, item_status
      FROM item WHERE post_type=? AND post_creator=?
      ORDER BY post_date DESC`,
      [type, uid],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

//GET CLAIMS
testdb.getClaims = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM claims c inner join item a ON c.item_id=a.item_id inner join (SELECT *, COUNT(student_id) AS count FROM claims group by item_id ) b on a.item_id=b.item_id WHERE a.item_status="INCOMPLETE" group by a.item_id order by c.date DESC`,
      [],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

//GET CLAIMS
testdb.searchClaims = (key, currentPage) => {
  return new Promise((resolve, reject) => {
    var keyword = "%" + key + "%";
    pool.query(
      `SELECT * FROM item a inner join (SELECT *, COUNT(student_id) AS count FROM claims group by item_id ) b on a.item_id=b.item_id WHERE a.item_status=? AND lower(item_name) LIKE lower(?)`,
      [currentPage, keyword],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

//GET CLAIMS COMPLETED
testdb.getClaimsCompleted = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM claims c INNER JOIN item a ON c.item_id=a.item_id inner join (SELECT *, COUNT(student_id) AS count FROM claims group by item_id ) b on a.item_id=b.item_id WHERE a.item_status="COMPLETED" group by a.item_id order by c.date DESC`,
      [],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

//GET CLAIMANTS
testdb.getClaimants = (itemId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM student a INNER JOIN (SELECT * FROM claims where item_id=?) b ON a.student_id=b.student_id`,
      [itemId],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

//GET SINGLE CLAIMANT
testdb.getClaimant = (uid, itemId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM student a INNER JOIN (SELECT * FROM claims where student_id=? AND item_id=?) b ON a.student_id=b.student_id`,
      [uid, itemId],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

//VERIFY LOGIN INFO
testdb.studentLogin = (uid, password) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT *
      FROM student WHERE user_type="STUDENT" AND student_id=? AND password=?`,
      [uid, password],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results[0]);
      }
    );
  });
};

//VERIFY LOGIN INFO
testdb.adminLogin = (uid, password) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT *
      FROM student WHERE user_type="ADMIN" AND student_id=? AND password=?`,
      [uid, password],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results[0]);
      }
    );
  });
};

//GET USER INFO
testdb.getUserInfo = (uid) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT first_name, last_name, email, phone FROM student where student_id=?`,
      [uid],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

module.exports = testdb;
