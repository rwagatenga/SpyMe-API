'use strict';
import models from '../models';
import hashPassword from '../../utils/hashing';

const { User } = models;

export default {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return User.bulkCreate([
      {
        name: 'Emery Muhozi',
        email: 'muhozie@gmail.com',
        type: 'admin',
        phone: '+25478732873827',
        password: hashPassword.encrypt('123456'),
      },
      {
        name: 'Ines Rachel',
        email: 'ines@gmail.com',
        type: 'admin',
        phone: '+25478736873827',
        password: hashPassword.encrypt('123456'),
      },
    ]).then(() => {
      console.log('Default user admin created 🎉');
    }).catch(error => {
      console.log(' ⚠️ ', error.message);
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
