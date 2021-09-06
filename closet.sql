CREATE TABLE closet(
    id SERIAL NOT NULL,
    type varchar(255) NOT NULL,
    color varchar(255) NOT NULL,
    season integer NOT NULL,
    PRIMARY KEY (id)
 );