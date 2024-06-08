CREATE TABLE tours (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  duration INT NOT NULL,
  maxGroupSize INT NOT NULL,
  difficulty VARCHAR(55) NOT NULL,
  ratingsAverage FLOAT CHECK (ratingsAverage >= 1 AND ratingsAverage <= 5),
  ratingsQuantity INT DEFAULT 0,
  price DECIMAL(10, 2) NOT NULL,
  summary VARCHAR(255) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  imageCover VARCHAR(255)
);