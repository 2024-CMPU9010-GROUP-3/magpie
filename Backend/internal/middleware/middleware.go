// created following this tutorial by DreamsOfCode on YouTube https://www.youtube.com/watch?v=H7tbjKFSg58
package middleware

import "net/http"

type Middleware func(http.Handler) http.Handler

// This function creates a linked list of functions of the given middlewares and returns a reference to the first function
// Any HTTP request passed to the first function is passed to all middlewares in the order they were provided to this function
func CreateMiddlewareStack(middlewares ...Middleware) Middleware {
	return func(next http.Handler) http.Handler {
		for i := len(middlewares) - 1; i >= 0; i-- {
			middleware := middlewares[i]
			next = middleware(next)
		}
		return next
	}
}

var Access = struct {
	Public        Middleware
	Authenticated Middleware
	Protected     Middleware
}{
	Public:        CreateMiddlewareStack(accessPublic),
	Authenticated: CreateMiddlewareStack(accessAuthenticated),
	Protected:     CreateMiddlewareStack(accessAuthenticated, accessOwnerOnly),
}
