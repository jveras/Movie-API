Create table movies (     
   id       INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,  
   movie    varchar(64) not null,
   poster   varchar(200) not null,
   imdID    varchar(64)  NOT NULL,
   movieYear     varchar(64)  NOT NULL,
   movieType     varchar(64) not null
);
insert into movies
(
   movie,
   poster,
   imdID,
   movieYear,
   movieType
   )
    values(
      'Superman, Spiderman or Batman',
      'https://images-na.ssl-images-amazon.com/images/M/MV5BMjQ4MzcxNDU3N15BMl5BanBnXkFtZTgwOTE1MzMxNzE@._V1_SX300.jpg',
      'tt2084949',
      '2019',
      'movie'
   );
