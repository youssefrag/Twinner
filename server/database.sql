CREATE DATABASE twinner;

CREATE TABLE profile(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE post(
    id SERIAL PRIMARY KEY NOT NULL,
    profile_id INT REFERENCES profile(id) ON DELETE CASCADE,
    content VARCHAR(1000),
    post_date DATE
);

CREATE TABLE comment(
    id SERIAL PRIMARY KEY NOT NULL,
    profile_id INT REFERENCES profile(id) ON DELETE CASCADE,
    post_id INT REFERENCES post(id) ON DELETE CASCADE
);

CREATE TABLE reaction (
    id SERIAL PRIMARY KEY NOT NULL,
    profile_id INT REFERENCES profile(id) ON DELETE CASCADE,
    post_id INT REFERENCES post(id) ON DELETE CASCADE,
    reaction_type VARCHAR(255) NOT NULL
);