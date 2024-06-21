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
