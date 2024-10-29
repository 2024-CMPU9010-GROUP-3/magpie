package errors

type CustomError struct {
	HttpStatus int		`json:"-"`
	ErrorCode  int    `json:"errorCode"`
	ErrorMsg   string `json:"errorMsg"`
	Cause      string `json:"cause,omitempty"`
}

func (c CustomError) WithCause(err error) CustomError {
	c.Cause = err.Error()
	return c
}
