package errors

import "net/http"

const (
	codeUnknownError          = 1001
	codeJwtSecretMissingError = 1011
	codeHashingError          = 1012
	codeJwtParseError         = 1013
	codeJsonEncodingError     = 1021
	codeJsonDecodingError     = 1022
	codeGeoJsonEncodingError  = 1023
	codeGeoJsonDecodingError  = 1024

	codeDatabaseConnectionError        = 1101
	codeDatabaseTransactionStartError  = 1102
	codeDatabaseTransactionCommitError = 1103
	codeUnknownDatabaseError           = 1104

	codeRequiredParameterMissingError  = 1201
	codeInvalidParameterUUIDError      = 1202
	codeInvalidParameterFloatError     = 1203
	codeInvalidParameterIntError       = 1204
	codeInvalidParameterLongitudeError = 1205
	codeInvalidParameterLatitudeError  = 1206
	codeInvalidPayloadPointError       = 1211
	codeInvalidPayloadUserError        = 1212
	codeInvalidPayloadLoginError       = 1213
	codeUsernameAlreadyExistsError     = 1221
	codeEmailAlreadyExistsError        = 1222

	codeUserNotFoundError  = 1301
	codePointNotFoundError = 1302

	codeUnauthorizedError     = 1401
	codeWrongCredentialsError = 1402
	codeInvalidTokenError     = 1403
	codeIdMissingInContext    = 1404
)

var unknownError = CustomError{
	HttpStatus: http.StatusInternalServerError,
	ErrorCode:  codeUnknownError,
	ErrorMsg:   "Unknown internal server error",
}

var jwtSecretMissingError = CustomError{
	HttpStatus: http.StatusInternalServerError,
	ErrorCode:  codeJwtSecretMissingError,
	ErrorMsg:   "Could not generate JWT, secret not set",
}

var hashingError = CustomError{
	HttpStatus: http.StatusInternalServerError,
	ErrorCode:  codeHashingError,
	ErrorMsg:   "Could not hash password",
}

var jwtParseError = CustomError{
	HttpStatus: http.StatusInternalServerError,
	ErrorCode:  codeJwtParseError,
	ErrorMsg:   "Could not parse JWT",
}

var jsonEncodingError = CustomError{
	HttpStatus: http.StatusInternalServerError,
	ErrorCode:  codeJsonEncodingError,
	ErrorMsg:   "Could not encode json",
}

var jsonDecodingError = CustomError{
	HttpStatus: http.StatusInternalServerError,
	ErrorCode:  codeJsonDecodingError,
	ErrorMsg:   "Could not decode json",
}

var geoJsonEncodingError = CustomError{
	HttpStatus: http.StatusInternalServerError,
	ErrorCode:  codeGeoJsonEncodingError,
	ErrorMsg:   "Could not encode GeoJson",
}

var geoJsonDecodingError = CustomError{
	HttpStatus: http.StatusInternalServerError,
	ErrorCode:  codeGeoJsonDecodingError,
	ErrorMsg:   "Could not decode GeoJson",
}

var databaseConnectionError = CustomError{
	HttpStatus: http.StatusInternalServerError,
	ErrorCode:  codeDatabaseConnectionError,
	ErrorMsg:   "Could not connect to database",
}

var databaseTransactionStartError = CustomError{
	HttpStatus: http.StatusInternalServerError,
	ErrorCode:  codeDatabaseTransactionStartError,
	ErrorMsg:   "Could not start database transaction",
}

var databaseTransactionCommitError = CustomError{
	HttpStatus: http.StatusInternalServerError,
	ErrorCode:  codeDatabaseTransactionCommitError,
	ErrorMsg:   "Could not commit database transaction",
}

var databaseUnknownError = CustomError{
	HttpStatus: http.StatusInternalServerError,
	ErrorCode:  codeUnknownDatabaseError,
	ErrorMsg:   "Unknown database error",
}

var requiredParameterMissingError = CustomError{
	HttpStatus: http.StatusBadRequest,
	ErrorCode:  codeRequiredParameterMissingError,
	ErrorMsg:   "One or more required parameters are missing",
}

var invalidParameterUUIDError = CustomError{
	HttpStatus: http.StatusBadRequest,
	ErrorCode:  codeInvalidParameterUUIDError,
	ErrorMsg:   "Parameter invalid, expected type UUIDv4",
}

var invalidParameterFloatError = CustomError{
	HttpStatus: http.StatusBadRequest,
	ErrorCode:  codeInvalidParameterFloatError,
	ErrorMsg:   "Parameter invalid, expected type Float",
}

var invalidParameterIntError = CustomError{
	HttpStatus: http.StatusBadRequest,
	ErrorCode:  codeInvalidParameterIntError,
	ErrorMsg:   "Parameter invalid, expected type Int",
}

var invalidParameterLongitudeError = CustomError{
	HttpStatus: http.StatusBadRequest,
	ErrorCode:  codeInvalidParameterLongitudeError,
	ErrorMsg:   "Parameter invalid, expected Longitude",
}

var invalidParameterLatitudeError = CustomError{
	HttpStatus: http.StatusBadRequest,
	ErrorCode:  codeInvalidParameterLatitudeError,
	ErrorMsg:   "Parameter invalid, expected Latitude",
}

var invalidPayloadPointError = CustomError{
	HttpStatus: http.StatusBadRequest,
	ErrorCode:  codeInvalidPayloadPointError,
	ErrorMsg:   "Payload (Point) not valid",
}

var invalidPayloadUserError = CustomError{
	HttpStatus: http.StatusBadRequest,
	ErrorCode:  codeInvalidPayloadUserError,
	ErrorMsg:   "Payload (User) not valid",
}

var invalidPayloadLoginError = CustomError{
	HttpStatus: http.StatusBadRequest,
	ErrorCode:  codeInvalidPayloadLoginError,
	ErrorMsg:   "Payload (Login) not valid",
}

var usernameAlreadyExistsError = CustomError{
	HttpStatus: http.StatusBadRequest,
	ErrorCode:  codeUsernameAlreadyExistsError,
	ErrorMsg:   "Username already exists",
}

var emailAlreadyExistsError = CustomError{
	HttpStatus: http.StatusBadRequest,
	ErrorCode:  codeEmailAlreadyExistsError,
	ErrorMsg:   "Email already exists",
}

var userNotFoundError = CustomError{
	HttpStatus: http.StatusNotFound,
	ErrorCode:  codeUserNotFoundError,
	ErrorMsg:   "User not found",
}

var pointNotFoundError = CustomError{
	HttpStatus: http.StatusNotFound,
	ErrorCode:  codePointNotFoundError,
	ErrorMsg:   "Point not found",
}

var unauthorizedError = CustomError{
	HttpStatus: http.StatusUnauthorized,
	ErrorCode:  codeUnauthorizedError,
	ErrorMsg:   "Unauthorized",
}

var wrongCredentialsError = CustomError{
	HttpStatus: http.StatusUnauthorized,
	ErrorCode:  codeWrongCredentialsError,
	ErrorMsg:   "Wrong username or password",
}

var invalidTokenError = CustomError{
	HttpStatus: http.StatusUnauthorized,
	ErrorCode:  codeInvalidTokenError,
	ErrorMsg:   "Bearer token not valid",
}

var idMissingInContextError = CustomError{
	HttpStatus: http.StatusUnauthorized,
	ErrorCode:  codeIdMissingInContext,
	ErrorMsg:   "UserId from token missing in context",
}

var Internal = struct {
	UnknownError          CustomError
	JwtSecretMissingError CustomError
	HashingError          CustomError
	JwtParseError         CustomError
	JsonEncodingError     CustomError
	JsonDecodingError     CustomError
	GeoJsonEncodingError  CustomError
	GeoJsonDecodingError  CustomError
}{
	UnknownError:          unknownError,
	JwtSecretMissingError: jwtSecretMissingError,
	HashingError:          hashingError,
	JwtParseError:         jwtParseError,
	JsonEncodingError:     jsonEncodingError,
	JsonDecodingError:     jsonDecodingError,
	GeoJsonEncodingError:  geoJsonEncodingError,
	GeoJsonDecodingError:  geoJsonDecodingError,
}

var Database = struct {
	ConnectionError        CustomError
	TransactionStartError  CustomError
	TransactionCommitError CustomError
	UnknownDatabaseError   CustomError
}{
	ConnectionError:        databaseConnectionError,
	TransactionStartError:  databaseTransactionStartError,
	TransactionCommitError: databaseTransactionCommitError,
	UnknownDatabaseError:   databaseUnknownError,
}

var Parameter = struct {
	RequiredParameterMissingError CustomError
	InvalidUUIDError              CustomError
	InvalidFloatError             CustomError
	InvalidIntError               CustomError
	InvalidLongitudeError         CustomError
	InvalidLatitudeError          CustomError
}{
	RequiredParameterMissingError: requiredParameterMissingError,
	InvalidUUIDError:              invalidParameterUUIDError,
	InvalidFloatError:             invalidParameterFloatError,
	InvalidIntError:               invalidParameterIntError,
	InvalidLongitudeError:         invalidParameterLongitudeError,
	InvalidLatitudeError:          invalidParameterLatitudeError,
}

var Payload = struct {
	InvalidPayloadPointError   CustomError
	InvalidPayloadUserError    CustomError
	InvalidPayloadLoginError   CustomError
	UsernameAlreadyExistsError CustomError
	EmailAlreadyExistsError    CustomError
}{
	InvalidPayloadPointError:   invalidPayloadPointError,
	InvalidPayloadUserError:    invalidPayloadUserError,
	InvalidPayloadLoginError:   invalidPayloadLoginError,
	UsernameAlreadyExistsError: usernameAlreadyExistsError,
	EmailAlreadyExistsError:    emailAlreadyExistsError,
}

var NotFound = struct {
	UserNotFoundError  CustomError
	PointNotFoundError CustomError
}{
	UserNotFoundError:  userNotFoundError,
	PointNotFoundError: pointNotFoundError,
}

var Auth = struct {
	UnauthorizedError       CustomError
	WrongCredentialsError   CustomError
	InvalidTokenError       CustomError
	IdMissingInContextError CustomError
}{
	UnauthorizedError:       unauthorizedError,
	WrongCredentialsError:   wrongCredentialsError,
	InvalidTokenError:       invalidTokenError,
	IdMissingInContextError: idMissingInContextError,
}
