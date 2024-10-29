-- name: GetPointsInEnvelope :many
SELECT Id, LongLat::geometry, Type FROM points
WHERE ST_Intersects(ST_MakeEnvelope(@x1::float, @y1::float, @x2::float, @y2::float, 4326), points.LongLat);

-- name: GetPointsInRadius :many
SELECT Id, LongLat::geometry, Type from points
WHERE ST_DWithin(
  LongLat::geography,
  ST_SetSRID(ST_MakePoint(@longitude::float, @latitude::float), 4326)::geography,
  @radius::float
);

-- name: GetPointDetails :one
SELECT Details::jsonb FROM points
WHERE id = $1 LIMIT 1;

-- name: GetLoginById :one
SELECT Id, Username, Email, PasswordHash
FROM logins
WHERE Id = $1
LIMIT 1;

-- name: GetLoginByUsername :one
SELECT Id, Username, Email, PasswordHash
FROM logins
WHERE Username = $1
LIMIT 1;

-- name: GetLoginByEmail :one
SELECT Id, Username, Email, PasswordHash
FROM logins
WHERE Email = $1
LIMIT 1;

-- name: GetUserDetails :one
SELECT Id, RegisterDate, FirstName, LastName, ProfilePicture, LastLoggedIn
FROM user_details
WHERE Id = $1
LIMIT 1;

-- name: CreateUser :one
INSERT INTO logins (
  Username, Email, PasswordHash
) VALUES (
  $1, $2, $3
) RETURNING Id;

-- name: CreateUserDetails :one
INSERT INTO user_details (
  Id, FirstName, LastName, ProfilePicture
) VALUES (
  $1, $2, $3, $4
) RETURNING Id;

-- name: UpdateLastLogin :exec
UPDATE user_details
SET LastLoggedIn = (NOW() AT TIME ZONE 'utc')
WHERE Id = $1;

-- name: UpdateLogin :exec
UPDATE logins
SET 
  Username = COALESCE($2, Username),
  Email = COALESCE($3, Email),
  PasswordHash = COALESCE(NULLIF(@PasswordHash::VARCHAR(72), ''), PasswordHash)
WHERE Id = $1;

-- name: UpdateUserDetails :exec
UPDATE user_details
SET
  FirstName = COALESCE(NULLIF(@FirstName::VARCHAR(64), ''), FirstName),
  LastName = COALESCE(NULLIF(@LastName::VARCHAR(64), ''), LastName),
  ProfilePicture = COALESCE(NULLIF(@ProfilePicture::VARCHAR(512), ''), ProfilePicture)
WHERE Id = $1;

-- name: DeleteUser :exec
DELETE FROM logins WHERE Id = $1;