USE music_rankings_db;

TRUNCATE `songs`;
LOAD DATA INFILE '/Users/cnrudd/workspace/2U/fullStackFlex/classwork/12-Week/03-Day/12-Week-03-Day-Solutions/12-TopMusic/TopSongs.csv' 
INTO TABLE songs 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n';

TRUNCATE `albums`;
LOAD DATA INFILE '/Users/cnrudd/workspace/2U/fullStackFlex/classwork/12-Week/03-Day/12-Week-03-Day-Solutions/12-TopMusic/TopAlbums.csv' 
INTO TABLE `albums` 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n';