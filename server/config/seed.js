
const { Pool } = require('pg');

const user = require('os').userInfo().username;

const pool = new Pool({
  user,
  host: 'localhost',
  database: 'solopipe_db',
  password: '1234',
  port: 5432,
});


const genFakeData = async () => {
  const addPeople = async () => {
    const client = await pool.connect();
    // Add People
    const people = [
      ['jake', 'jakobjk@gmail.com', '$2b$10$n8wuntsiC4QuY6CQ0Obrw.YWYo66dTiSW4IZpMOpiFIoadWmjx8o6'],
      ['benja', 'benja@gmail.com', '$2b$10$n8wuntsiC4QuY6CQ0Obrw.YWYo66dTiSW4IZpMOpiFIoadWmjx8o6'],
      ['george', 'george@gilm.com', '$2b$10$n8wuntsiC4QuY6CQ0Obrw.YWYo66dTiSW4IZpMOpiFIoadWmjx8o6']];
    const promises = [];
    for (let i = 0; i < people.length; i += 1) {
      promises.push(
        client.query(
          `
      INSERT INTO users
      (username,
      usermail,
      hashpass)
      VALUES
      ($1, $2, $3)
      `,
          [people[i][0], people[i][1], people[i][2]],
        ),
      );
    }
    return Promise.all(promises);
  };
  const addSubmissions = async () => {
    const client = await pool.connect();
    const promises = [];
    const subs = [
      ['this is totally a report', 1, '/uploads/thisismyfile.mb', 'This is the asset', 'This is the project'],
      ['this is totally a report', 1, '/uploads/thisIsMyOtherFile.mb', 'ThisIsMyAsset', 'Totally a very different project'],
      ['this is totally a report', 1, '/uploads/thisIsMyOtherFile.mb', 'ThisIsMyAsset', 'Totally a very different project'],
      ['this is totally a report', 1, '/uploads/thisIsMyOtherFile.mb', 'ThisIsMyAsset', 'Totally a very different project'],
      ['this is totally a report', 2, '/uploads/thisIsMyOtherFile.mb', 'ThisIsAnotherAsset!', 'Totally a very different project'],
    ];
    for (let i = 0; i < subs.length; i += 1) {
      promises.push(
        client.query(
          `
      INSERT INTO submission
      (report,
      companyid,
      fileLocation,
      asset,
      project,
      uploaded)
      VALUES
      ($1, $2, $3, $4, $5, now())
      `,
          [subs[i][0], subs[i][1], subs[i][2], subs[i][3], subs[i][4]],
        ),
      );
    }
    return Promise.all(promises);
  };
  const addPermissions = async () => {
    const client = await pool.connect();
    const promises = [];
    // Add People
    promises.push(
      client.query(
        `
      INSERT INTO userspermission
      (userid,
      permission)
      VALUES
      (1, 'isAdmin')
      `,
      ),
    );
    return Promise.all(promises);
  };
  const addCompanies = async () => {
    const client = await pool.connect();
    const promises = [];
    const subs = [
      ['Ghost', 'http://www.ghost.dk'],
      ['Industrial Light & Magic', 'http://ilm.com'],
    ];
    for (let i = 0; i < subs.length; i += 1) {
      promises.push(
        client.query(
          `
      INSERT INTO companies
      (company,
      companyurl)
      VALUES
      ($1, $2)
      `,
          [subs[i][0], subs[i][1]],
        ),
      );
    }
    return Promise.all(promises);
  };

  const addEmployees = async () => {
    const client = await pool.connect();
    const promises = [];

    promises.push(
      client.query(
        `
      INSERT INTO employees
      (companyid,
        userid)
      VALUES
      (1,3)
      `,
      ),
    );

    return Promise.all(promises);
  };
  await addPeople();
  await addCompanies();
  await addSubmissions();
  await addPermissions();
  await addEmployees();
  console.log('worked!');
};
genFakeData();
