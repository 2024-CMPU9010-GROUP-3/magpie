package middleware

import (
	"context"
	"fmt"
	"net/http"
	"os"

	"github.com/golang-jwt/jwt/v5"
	"github.com/jackc/pgx/v5/pgtype"

	customErrors "github.com/2024-CMPU9010-GROUP-3/PROJECT/internal/errors"
	resp "github.com/2024-CMPU9010-GROUP-3/PROJECT/internal/responses"
)

type tokenKey string

func accessAuthenticated(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, request *http.Request) {

		auth_cookie, err := request.Cookie("magpie_auth")
		if err != nil {
			resp.SendError(customErrors.Auth.UnauthorizedError, w)
			return
		}

		jwtSecret := []byte(os.Getenv("MAGPIE_JWT_SECRET"))
		if len(jwtSecret) == 0 {
			resp.SendError(customErrors.Internal.JwtSecretMissingError, w)
			return
		}

		token, err := jwt.Parse(auth_cookie.Value, func(token *jwt.Token) (interface{}, error) {
			// Don't forget to validate the alg is what you expect:
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
			}

			return jwtSecret, nil
		})
		if err != nil {
			resp.SendError(customErrors.Internal.JwtParseError, w)
			return
		}

		subject, err := token.Claims.GetSubject()
		if err != nil {
			resp.SendError(customErrors.Internal.JwtParseError, w)
			return
		}

		key := tokenKey("token_user_id")

		ctx := context.WithValue(request.Context(), key, subject)

		next.ServeHTTP(w, request.WithContext(ctx))

	})
}

func accessOwnerOnly(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, request *http.Request) {
		userIdPathParam := request.PathValue("id")
		var userId pgtype.UUID
		err := userId.Scan(userIdPathParam)

		// bad request if parameter is not valid uuid
		if err != nil {
			resp.SendError(customErrors.Parameter.InvalidUUIDError, w)
			return
		}

		key := tokenKey("token_user_id")

		tokenUserId := request.Context().Value(key)
		if tokenUserId == nil {
			resp.SendError(customErrors.Auth.IdMissingInContextError, w)
			return
		}

		if tokenUserId != userIdPathParam {
			resp.SendError(customErrors.Auth.UnauthorizedError, w)
			return
		}
		next.ServeHTTP(w, request)
	})
}

func accessPublic(next http.Handler) http.Handler {
	// this is a nothing-wrapper, but explicit is better than implicit
	return http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		next.ServeHTTP(writer, request)
	})
}
