import isNumeric from 'validator/lib/isNumeric.js';
import { query } from '../db/index.js';
import {
  checkUserQuery,
  createUserQuery,
  deleteUserQuery,
  getAllUsersQuery,
  getUserQuery,
  updateUserQuery,
} from '../queries/users.js';

export const checkUserId = async (req, res, next, val) => {
  if (!isNumeric(val)) {
    return res.status(400).json({
      status: 'failed',
      message: `id must be numeric`,
    });
  }
  const userRes = await query(checkUserQuery, [val]);
  if (userRes.rowCount === 0) {
    return res.status(404).json({
      status: 'failed',
      message: `User with id ${val} does not exist`,
    });
  }
  next();
};

export const getAllUsers = async (req, res) => {
  try {
    const usersRes = await query(getAllUsersQuery);
    const users = usersRes.rows;
    res.status(200).json({
      status: 'success',
      results: usersRes.rowCount,
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error,
    });
  }
};

export const createUser = async (req, res) => {
  const { name, email, role, active, photo = null, password } = req.body;
  try {
    const userResponse = await query(createUserQuery, [
      name,
      email,
      role,
      active,
      photo,
      password,
    ]);
    const user = userResponse.rows[0];
    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error,
    });
  }
};

export const getUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const userRes = await query(getUserQuery, [userId]);
    res.status(200).json({
      status: 'success',
      data: {
        user: userRes.rows[0],
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error,
    });
  }
};

export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const updates = req.body;

  // Build the SET part of the update query dynamically based on the request body
  const setClauses = [];
  const values = [];
  let queryIndex = 1;

  for (let key in updates) {
    setClauses.push(`${key} = $${queryIndex}`);
    values.push(updates[key]);
    queryIndex++;
  }

  if (setClauses.length > 0) {
    values.push(userId);

    try {
      const result = await query(
        updateUserQuery(setClauses, queryIndex),
        values
      );
      res.status(200).json({
        status: 'success',
        data: {
          user: result.rows[0],
        },
      });
    } catch (error) {
      res.status(404).json({
        status: 'failed',
        message: error,
      });
    }
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await query(deleteUserQuery, [userId]);
    res.status(200).json({
      status: 'success',
      data: {
        deletedUser: deletedUser.rows[0],
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error,
    });
  }
};
