Create table Movies (     
   ID       INT  PRIMARY KEY NOT NULL AUTO_INCREMENT,  
   movie    varchar(64) not null,
   Poster   varchar(200) not null,
   imdID     varchar(64)  NOT NULL,
   Year     varchar(64)  NOT NULL,
   movieType     varchar(64) not null
);
insert into Movies(movie,Poster,imdID,movieType) values("Superman, Spiderman or Batman","https://images-na.ssl-images-amazon.com/images/M/MV5BMjQ4MzcxNDU3N15BMl5BanBnXkFtZTgwOTE1MzMxNzE@._V1_SX300.jpg","tt2084949","movie");