export const getAllToursQuery = `
  SELECT 
      t.id,
      t.name,
      t.duration,
      t.maxGroupSize,
      t.difficulty,
      t.ratingsAverage,
      t.ratingsQuantity,
      t.price,
      t.summary,
      t.description,
      t.imageCover,
      ARRAY_AGG(DISTINCT td.start_date) AS start_dates,
      ARRAY_AGG(DISTINCT ti.image) AS images
  FROM 
      tours t
  LEFT JOIN 
      tour_dates td ON t.id = td.tour_id
  LEFT JOIN 
      tour_images ti ON t.id = ti.tour_id
  GROUP BY 
      t.id
  ORDER BY 
      t.id;
`;

export const getTourQuery = `
  SELECT 
      t.id,
      t.name,
      t.duration,
      t.maxGroupSize,
      t.difficulty,
      t.ratingsAverage,
      t.ratingsQuantity,
      t.price,
      t.summary,
      t.description,
      t.imageCover,
      ARRAY_AGG(DISTINCT td.start_date) AS start_dates,
      ARRAY_AGG(DISTINCT ti.image) AS images
  FROM 
      tours t
  LEFT JOIN 
      tour_dates td ON t.id = td.tour_id
  LEFT JOIN 
      tour_images ti ON t.id = ti.tour_id
  WHERE
      t.id = $1
  GROUP BY 
      t.id;
`;

export const insertTour = `
    INSERT INTO tours (name, duration, maxGroupSize, difficulty, price, summary, description, imageCover)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
`;

// Insert start dates into the tour_dates table
export const insertStartDatesQuery = (startDates) => `
INSERT INTO tour_dates (tour_id, start_date)
VALUES ${startDates
  .map((date, idx) => `($1, $${idx + 2})`)
  .join(', ')} RETURNING *`;

// Insert tour images into the tour_images table
export const insertTourImagesQuery = (tourImages) => `
INSERT INTO tour_images (tour_id, image)
VALUES ${tourImages
  .map((image, idx) => `($1, $${idx + 2})`)
  .join(', ')} RETURNING *
`;

// Delete the tour along with its associated start dates and images
export const deleteTourQuery = `
    DELETE FROM tours
    WHERE id = $1
    RETURNING *;
`;
