const User = require("./user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Role = require("../utils/roles");

async function authenticate({ emailOrPhone, password }) {
  const user = await User.findOne({ emailOrPhone }).lean();

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      { sub: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    const { password, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      token,
    };
  }
}

async function getAll() {
  const allUsers = await User.find().lean();
  // console.log(allUsers);
  return allUsers.map((item) => {
    const { password, ...userWithoutPassword } = item;
    return userWithoutPassword;
  });
}

async function getById(id) {
  const user = await User.findById(id).lean();
  if (!user) return;
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

async function create(requestBody) {
  // validate
  if (await User.findOne({ emailOrPhone: requestBody.emailOrPhone })) {
    throw 'Email/Phone"' + requestBody.emailOrPhone + '" is already taken';
  }

  const user = new User(requestBody);

  if (
    user.emailOrPhone === "admin@gmail.com" ||
    user.emailOrPhone === "123456789"
  ) {
    user.role = Role.Admin;
  }

  // hash password
  if (requestBody.password) {
    user.password = bcrypt.hashSync(requestBody.password, 10);
  }

  // save user
  await user.save();
}

async function updateById(id, requestBody) {
  const user = await User.findById(id);

  // validate
  if (!user) throw "User not found";
  if (
    user.emailOrPhone !== requestBody.emailOrPhone &&
    (await User.findOne({ emailOrPhone: requestBody.emailOrPhone }))
  ) {
    throw 'Email/Phone"' + requestBody.emailOrPhone + '" is already taken';
  }

  // hash password if it was entered
  if (requestBody.password) {
    requestBody.password = bcrypt.hashSync(requestBody.password, 10);
  }

  // copy requestBody properties to user
  Object.assign(user, requestBody);

  await user.save();
}

async function deleteById(id) {
  await User.findByIdAndDelete(id);
}

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
