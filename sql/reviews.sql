CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  review VARCHAR(1000) NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  user_id INT NOT NULL,
  tour_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(_id) ON DELETE CASCADE,
  FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE
);