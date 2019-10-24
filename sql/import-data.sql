USE music_rankings_db;

-- replace '[ABS_PATH]' with your absolute path to this repo on your machine
TRUNCATE `songs`;
LOAD DATA LOCAL INFILE '[ABS_PATH]/data/TopSongs.csv' 
INTO TABLE songs 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n';

TRUNCATE `albums`;
LOAD DATA LOCAL INFILE '[ABS_PATH]/data/TopAlbums.csv' 
INTO TABLE `albums` 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n';