create table users (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL UNIQUE,
	email VARCHAR(255) NOT NULL UNIQUE,
	role VARCHAR(255) NOT NULL,
	active BOOLEAN NOT NULL,
	photo VARCHAR(255),
	password VARCHAR(255) NOT NULL
);

INSERT INTO users (name, email, role, active, photo, password) VALUES
('Jonas Schmedtmann', 'admin@natours.io', 'admin', true, 'user-1.jpg', '$2a$12$Q0grHjH9PXc6SxivC8m12.2mZJ9BbKcgFpwSG4Y1ZEII8HJVzWeyS'),
('Lourdes Browning', 'loulou@example.com', 'user', true, 'user-2.jpg', '$2a$12$hP1h2pnNp7wgyZNRwPsOTeZuNzWBv7vHmsR3DT/OaPSUBQT.y0S..'),
('Sophie Louise Hart', 'sophie@example.com', 'user', true, 'user-3.jpg', '$2a$12$9nFqToiTmjgfFVJiQvjmreLt4k8X4gGYCETGapSZOb2hHa55t0dDq'),
('Ayla Cornell', 'ayls@example.com', 'user', true, 'user-4.jpg', '$2a$12$tm33.M/4pfEbZF64WbFuHuVFv85v4qEhi.ik8njbud7yaoqCZpjiy'),
('Leo Gillespie', 'leo@example.com', 'guide', true, 'user-5.jpg', '$2a$12$OOPr90tBEBF1Iho3ox0Jde0O/WXUR0VLA5xdh6tWcu7qb.qOCvSg2'),
('Jennifer Hardy', 'jennifer@example.com', 'guide', true, 'user-6.jpg', '$2a$12$XCXvvlhRBJ8CydKH09v1v.jpg0hB9gVVfMVEoz4MsxqL9zb5PrF42'),
('Kate Morrison', 'kate@example.com', 'guide', true, 'user-7.jpg', '$2a$12$II1F3aBSFDF3Xz7iB4rk/.a2dogwkClMN5gGCWrRlILrG1xtJG7q6'),
('Eliana Stout', 'eliana@example.com', 'user', true, 'user-8.jpg', '$2a$12$Jb/ILhdDV.ZpnPMu19xfe.NRh5ntE2LzNMNcsty05QWwRbmFFVMKO'),
('Cristian Vega', 'chris@example.com', 'user', true, 'user-9.jpg', '$2a$12$r7/jtdWtzNfrfC7zw3uS.eDJ3Bs.8qrO31ZdbMljL.lUY0TAsaAL6'),
('Steve T. Scaife', 'steve@example.com', 'lead-guide', true, 'user-10.jpg', '$2a$12$q7v9dm.S4DvqhAeBc4KwduedEDEkDe2GGFGzteW6xnHt120oRpkqm'),
('Aarav Lynn', 'aarav@example.com', 'lead-guide', true, 'user-11.jpg', '$2a$12$lKWhzujFvQwG4m/X3mnTneOB3ib9IYETsOqQ8aN5QEWDjX6X2wJJm'),
('Miyah Myles', 'miyah@example.com', 'lead-guide', true, 'user-12.jpg', '$2a$12$.XIvvmznHQSa9UOI639yhe4vzHKCYO1vpTUZc4d45oiT4GOZQe1kS'),
('Ben Hadley', 'ben@example.com', 'guide', true, 'user-13.jpg', '$2a$12$D3fyuS9ETdBBw5lOwceTMuZcDTyVq28ieeGUAanIuLMcSDz6bpfIe'),
('Laura Wilson', 'laura@example.com', 'user', true, 'user-14.jpg', '$2a$12$VPYaAAOsI44uhq11WbZ5R.cHT4.fGdlI9gKJd95jmYw3.sAsmbvBq'),
('Max Smith', 'max@example.com', 'user', true, 'user-15.jpg', '$2a$12$l5qamwqcqC2NlgN6o5A5..9Fxzr6X.bjx/8j3a9jYUHWGOL99oXlm'),
('Isabel Kirkland', 'isabel@example.com', 'user', true, 'user-16.jpg', '$2a$12$IUnwPH0MGFeMuz7g4gtfvOll.9wgLyxG.9C3TKlttfLtCQWEE6GIu'),
('Alexander Jones', 'alex@example.com', 'user', true, 'user-17.jpg', '$2a$12$NnclhoYFNcSApoQ3ML8kk.b4B3gbpOmZJLfqska07miAnXukOgK6y'),
('Eduardo Hernandez', 'edu@example.com', 'user', true, 'user-18.jpg', '$2a$12$uB5H1OxLMOqDYTuTlptAoewlovENJvjrLwzsL1wUZ6OkAIByPPBGq'),
('John Riley', 'john@example.com', 'user', true, 'user-19.jpg', '$2a$12$11JElTatQlAFo1Obw/dwd..vuVmQyYS7MT14pkl3lRvVPjGA00G8O'),
('Lisa Brown', 'lisa@example.com', 'user', true, 'user-20.jpg', '$2a$12$uA9FsDw63v6dkJKGlLQ/8ufYBs8euB7kqIQewyYlZXU5azEKeLEky');