const User = require("../collections/User");
const asyncWrapper = require("../middlewares/async");
const { createCustomeError } = require("../errors/custom-error");

const getAllUsers = asyncWrapper(async (req, res) => {
  //wait for the promise to be executed
  const Users = await User.find({});
  //    res.status(200).json({ Users});
  //    res.status(200).json({ Users, Nb_Users: Users.length });
  res
    .status(200)
    .json({ success: true, data: { Users, Nb_Users: Users.length } });
});

const createUser = asyncWrapper(async (req, res) => {
  //we're going to create and fill the documents(lines) of our collection(table)
  const User = await User.create(req.body);
  res.status(201).json({ User });
});

const getUser = asyncWrapper(async (req, res, next) => {
  //get the id requested and give it name UserID
  const { id: UserID } = req.params;
  const User = await User.findOne({ _id: UserID });
  if (!User) {
    return next(createCustomeError(`No User with id ${UserID}`, 404));
  }
  res.status(200).json({ User });
});

const updateUser = asyncWrapper(async (req, res, next) => {
  try {
    const { id: UserID } = req.params;

    const User = await User.findOneAndUpdate(
      { _id: UserID },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!User) {
      return next(createCustomeError(`No User with id ${UserID}`, 404));
    }

    res.status(200).json({ User });
  } catch (error) {}
});

const deleteUser = asyncWrapper(async (req, res, next) => {
  const { id: UserID } = req.params;
  const User = await User.findOneAndDelete({ _id: UserID });

  if (!User) {
    return next(createCustomeError(`No User with id ${UserID}`, 404));
  } else {
    return res.status(200).json({ msg: "User deleted successfuly" });
  }

  res.status(200).json({ User });
});

const editUser = asyncWrapper(async (req, res, next) => {
  const { id: UserID } = req.params;

  const User = await User.findOneAndUpdate({ _id: UserID }, req.body, {
    new: true,
    runValidators: true,
    overwrite: true, //to change the whole object (if we give only name completed(remove default also from it's description) will not appear)
  });

  if (!User) {
    return next(createCustomeError(`No User with id ${UserID}`, 404));
  }

  res.status(200).json({ User });
});

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  editUser,
};
