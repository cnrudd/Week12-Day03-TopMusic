SELECT * FROM `songs` LIMIT 100;

SELECT * FROM `albums` LIMIT 100;

-- * A query which returns all data for 
-- songs sung by a specific artist
SELECT * FROM `songs` WHERE artist = 'the police';

SELECT * FROM `songs` WHERE artist LIKE '%ng%';

SELECT * FROM songs
        WHERE artist LIKE '%beatles%'
        ORDER BY raw_usa DESC

-- * A query which returns all artists who appear 
-- within the top 5000 more than once
SELECT artist, COUNT(*) AS `count`
FROM songs
GROUP BY artist
HAVING COUNT(*) > 1;

--* A query which returns all 
-- data contained within the top 10 in the world
SELECT * FROM `songs`
ORDER BY raw_total DESC
LIMIT 10;

--  * A query which searches for a specific song in the top 5000 and returns the data for it
SELECT * FROM `songs` WHERE song LIKE '%nothing%';

-- Find how many hit songs in each year
SELECT year, COUNT(*) AS hits
FROM songs
GROUP BY year
ORDER BY hits DESC;

-- attempt to join album and song info by year and artist, but
-- there is no guarantee that just because an album and song were hits
-- in the same year that that album contained that song.
SELECT S.artist, A.album, S.song, S.year, S.raw_total, S.raw_usa, S.raw_uk, S.raw_eur, S.raw_row FROM `songs` S
LEFT JOIN `albums` A
ON S.artist = A.artist AND S.year = A.year
WHERE A.artist = 'Celine Dion';