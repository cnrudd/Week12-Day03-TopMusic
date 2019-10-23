SELECT * FROM `songs` LIMIT 100;

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
