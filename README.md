Readme 



base de datos postgres

CREATE DATABASE repertorio ;
 \c repertorio
CREATE TABLE repertorio (id VARCHAR(50), cancion VARCHAR(50), artista VARCHAR(50), tono VARCHAR(10));

nota : se cambio id a VARCHAR para ocupar uuid como identificador..