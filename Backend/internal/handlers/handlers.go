package handlers

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
)

type PointsHandler struct{}
type AuthHandler struct{}

var dbCtx *context.Context
var dbConn *pgxpool.Pool

// this needs to be refactored into proper dependency injection in the future
func RegisterDatabaseConnection(ctx *context.Context, conn *pgxpool.Pool) {
	dbCtx = ctx
	dbConn = conn
}
