CREATE TABLE tour_images (
  id SERIAL PRIMARY KEY,
  tour_id INT NOT NULL,
  image VARCHAR(255) NOT NULL,
  FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE
);

INSERT INTO tour_images (tour_id, image)
VALUES (1, 'tour-2-1.jpg'),
(1, 'tour-2-2.jpg'),
(1, 'tour-2-3.jpg'),
(2, 'tour-3-1.jpg'),
(2, 'tour-3-2.jpg'),
(2, 'tour-3-3.jpg'),
(3, 'tour-4-1.jpg'),
(3, 'tour-4-2.jpg'),
(3, 'tour-4-3.jpg'),
(4, 'tour-5-1.jpg'),
(4, 'tour-5-2.jpg'),
(4, 'tour-5-3.jpg'),
(5, 'tour-6-1.jpg'),
(5, 'tour-6-2.jpg'),
(5, 'tour-6-3.jpg'),
(6, 'tour-7-1.jpg'),
(6, 'tour-7-2.jpg'),
(6, 'tour-7-3.jpg'),
(7, 'tour-8-1.jpg'),
(7, 'tour-8-2.jpg'),
(7, 'tour-8-3.jpg'),
(8, 'tour-9-1.jpg'),
(8, 'tour-9-2.jpg'),
(8, 'tour-9-3.jpg');