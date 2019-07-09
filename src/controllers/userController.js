import model from '../db/models';
import validate from '../utils/validation';

const { User } = model;

const sampleUser = (req, res) => {
  User.create({
    name: 'Emery Muhozi',
    phone: '0789798789',
    email: 'muhozie@gmail.com',
  });
  return res.json({
    name: req.body.name,
    superPower: 'Jumping',
  });
};

const login = (req, res) => {
  const inputs = req.body;
  const rules = {
    email: [{ isRequired: false }, { email: true }],
    password: [{ isRequired: true }],
  };
  const valid = validate(inputs, rules);
  if (valid !== true) {
    return res.json(valid, 400);
  }
  return res.json(
    {
      name: req.body.name,
      superPower: 'Jumping',
    },
    201,
  );
};

export default {
  sampleUser,
  login,
};
