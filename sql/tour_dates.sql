CREATE TABLE tour_dates (
    id SERIAL PRIMARY KEY,
    tour_id INT NOT NULL,
    start_date TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE
);