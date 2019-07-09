import bcrypt from 'bcrypt';

const saltRounds = 12;

export default {
  encrypt: password => bcrypt.hashSync(password, saltRounds),
  decrypt: (password, hashedPassword) => bcrypt.compare(password, hashedPassword, (err, res) => {
    if (res) {
      return true;
    }
    return false;
  }),
};
