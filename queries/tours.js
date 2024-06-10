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
    INSERT INTO tours ()
    VALUES ();
`;
