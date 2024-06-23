export const getAllUsersQuery = `
  SELECT 
      id, name, email, role, active, photo
  FROM 
    users;
`;

export const getUserQuery = `
  SELECT 
      id, name, email, role, active, photo
  FROM 
    users
  WHERE
    id = $1
`;

export const createUserQuery = `
  INSERT INTO users (name, email, role, active, photo, password)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING id, name, email, role, active, photo;
`;

export const updateUserQuery = (setClauses, queryIndex) => `
  UPDATE users
  SET ${setClauses.join(', ')}
  WHERE id = $${queryIndex}
  RETURNING id, name, email, role, active, photo;
`;

export const deleteUserQuery = `
  DELETE FROM users
  WHERE id = $1
  RETURNING id, name, email, role, active, photo;
`;
