const { User, Sequelize, sequelize } = require("../database/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// create new User
async function createUser(req, res) {
  try {
    const user = await User.create(req.body);
    return res.status(201).send({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ err });
  }
}

// get all users
async function fetchAllUsers(req, res) {
  try {
    const users = await User.findAll();
    return res.status(200).send({ users });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ err });
  }
}

// delete a user
async function deleteUser(req, res, next) {
  try {
    const userId = parseInt(req.query.userId);

    const deletedRows = await User.destroy({ where: { userId: userId } });

    if (deletedRows > 0) {
      return res
        .status(202)
        .send({ message: `User with id ${userId} deleted successfully` });
    } else {
      return res
        .status(404)
        .send({ error: `User with id ${userId} not found` });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ error: "An error occurred while processing the request" });
  }
}

// edit a user
async function editUser(req, res, next) {
  try {
    const userId = parseInt(req.query.userId);

    const editedData = req.body;

    const [editedRows] = await User.update(editedData, {
      where: { userId: userId },
    });

    const editedUser = await User.findOne({ where: { userId: userId } });

    if (editedRows === 0) {
      return res.status(304).send(`user id: ${userId} not changed`);
    } else {
      return res.status(202).send({
        message: `user id: ${userId} updated successfully`,
        user: editedUser,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error });
  }
}

// login user
async function loginUser(req, res, next) {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name });

    if (!user) {
      return res.status(404).json({ message: "Incorrect name or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect name or password" });
    }

    return res.status(200).json({ user });
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  createUser,
  deleteUser,
  editUser,
  fetchAllUsers,
  loginUser,
};
