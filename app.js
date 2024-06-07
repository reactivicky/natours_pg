const express = require('express');
const fs = require('fs');
const { param, validationResult } = require('express-validator');
const { rateLimit } = require('express-rate-limit');

const app = express();

// Middleware to parse JSON bodies, limited to 10KB
app.use(express.json({ limit: '10kb' }));
// Middleware to parse URL-encoded bodies, limited to 10KB
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', limiter, (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.get(
  '/api/v1/tours/:id',
  limiter,
  param('id').notEmpty().isNumeric().withMessage('id must be numeric').escape(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // If validation passed, proceed with the request handling
    const tourId = req.params.id;
    // Fetch and return tour data by ID
    const tour = tours[tourId];
    if (tour) {
      res.status(200).json({
        status: 'success',
        data: {
          tour,
        },
      });
    } else {
      res.status(404).json({
        status: 'failed',
        message: `Tour with id ${tourId} does not exist`,
      });
    }
  }
);

app.post('/api/v1/tours', limiter, (req, res) => {
  console.log(req.body);
  const newId = tours.at(-1).id + 1;
  const newTour = { ...req.body, id: newId };
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        res.status(404).json({
          status: 'failed',
          message: 'Something went wrong!',
        });
        return;
      }
      res.status(201).json({
        status: 'success',
        data: { tour: newTour },
      });
    }
  );
});

const port = 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});
