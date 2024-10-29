//go:build public

// This will need refactoring in the future, but it is sufficient for the amount of routes we have at the moment

package routes

import (
	"net/http"

	"github.com/2024-CMPU9010-GROUP-3/PROJECT/internal/handlers"
	"github.com/2024-CMPU9010-GROUP-3/PROJECT/internal/middleware"
)

func init() {
	AddRoute(route{"/public/", public()})
}

func public() *http.ServeMux {
	router := http.NewServeMux()
	router.Handle("/points/", http.StripPrefix("/points", pointsPublic()))
	router.Handle("/auth/", http.StripPrefix("/auth", auth()))
	return router
}

func pointsPublic() *http.ServeMux {
	router := http.NewServeMux()
	pointsHandler := &handlers.PointsHandler{}

	// Authenticated access
	router.Handle("GET /inRadius", middleware.Access.Authenticated(http.HandlerFunc(pointsHandler.HandleGetByRadius)))
	router.Handle("GET /{id}", middleware.Access.Authenticated(http.HandlerFunc(pointsHandler.HandleGetPointDetails)))

	return router
}

func auth() *http.ServeMux {
	router := http.NewServeMux()
	authHandler := &handlers.AuthHandler{}

	// Public access
	router.Handle("POST /User/login", middleware.Access.Public(http.HandlerFunc(authHandler.HandleLogin)))
	router.Handle("POST /User/", middleware.Access.Public(http.HandlerFunc(authHandler.HandlePost)))

	// Protected access
	router.Handle("GET /User/{id}", middleware.Access.Protected(http.HandlerFunc(authHandler.HandleGet)))
	router.Handle("PUT /User/{id}", middleware.Access.Protected(http.HandlerFunc(authHandler.HandlePut)))
	router.Handle("DELETE /User/{id}", middleware.Access.Protected(http.HandlerFunc(authHandler.HandleDelete)))

	return router
}
