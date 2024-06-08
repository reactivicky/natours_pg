create table users (
	_id serial primary key,
	name varchar(255) not null,
	email varchar(255) not null unique,
	role varchar(50) not null,
	active boolean not null,
	photo varchar(255),
	password varchar(255) not null
);