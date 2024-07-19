import { pg } from '../db/index.js';

export const getAllToursQuery = async (filters) => {
  try {
    const query = pg('tours as t')
      .leftJoin('tour_dates as td', 't.id', 'td.tour_id')
      .leftJoin('tour_images as ti', 't.id', 'ti.tour_id')
      .select(
        't.id',
        't.name',
        't.duration',
        't.maxGroupSize',
        't.difficulty',
        't.ratingsAverage',
        't.ratingsQuantity',
        't.price',
        't.summary',
        't.description',
        't.imageCover',
        't.createdAt',
        pg.raw('ARRAY_AGG(DISTINCT td.start_date) AS startDates'),
        pg.raw('ARRAY_AGG(DISTINCT ti.image) AS images')
      )
      .groupBy('t.id')
      .orderBy('t.id');

    if (filters?.duration) {
      query.where('t.duration', filters.duration);
    }
    if (filters?.price) {
      query.where('t.price', filters.price);
    }

    const tours = await query;
    return tours;
  } catch (error) {
    console.error('Error fetching tours:', error);
    throw error;
  }
};

export const checkTourQuery = `
  SELECT id
  FROM tours
  WHERE id = $1;
`;

export const getTourQuery = `
  SELECT 
      t.id,
      t.name,
      t.duration,
      t."maxGroupSize",
      t.difficulty,
      t."ratingsAverage",
      t."ratingsQuantity",
      t.price,
      t.summary,
      t.description,
      t."imageCover",
      t."createdAt",
      ARRAY_AGG(DISTINCT td.start_date) AS startDates,
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

export const createTourQuery = `
    INSERT INTO tours (name, duration, maxGroupSize, difficulty, price, summary, description, imageCover)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
`;

export const updateTourQuery = (setClauses, queryIndex) => `
    UPDATE tours
    SET ${setClauses.join(', ')}
    WHERE id = $${queryIndex}
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
