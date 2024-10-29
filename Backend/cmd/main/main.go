package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/2024-CMPU9010-GROUP-3/PROJECT/internal/handlers"
	"github.com/2024-CMPU9010-GROUP-3/PROJECT/internal/middleware"
	"github.com/2024-CMPU9010-GROUP-3/PROJECT/internal/routes"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
	"github.com/rs/cors"

	pgxgeom "github.com/twpayne/pgx-geom"
)

const defaultPort = "8080"
const portEnv = "MAGPIE_PORT"
const dbUrlEnv = "MAGPIE_DB_URL"
const corsAllowedOriginsEnv = "MAGPIE_CORS_ALLOWED_ORIGINS"
const corsAllowedMethodsEnv = "MAGPIE_CORS_ALLOWED_METHODS"

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Warning: No .env file found")
	}

	port := os.Getenv(portEnv)
	if len(port) == 0 {
		port = defaultPort
	}

	dbUrl := os.Getenv(dbUrlEnv)
	if len(dbUrl) == 0 {
		// Try to build the connection string from individual components in case we are running in Kubernetes
		log.Printf("Could not find connection string in environment variables, trying to build from components")
		dbUser := os.Getenv("LOGIN")
		dbPassword := os.Getenv("PASSWORD")
		dbHost := os.Getenv("HOST")
		dbName := os.Getenv("DATABASE_NAME")

		if len(dbUser) == 0 || len(dbPassword) == 0 || len(dbHost) == 0 || len(dbName) == 0 {
			log.Fatal("Database connection parameters are missing in environment variables")
			os.Exit(1)
		}

		dbUrl = fmt.Sprintf("postgresql://%s:%s@%s/%s", dbUser, dbPassword, dbHost, dbName)
		log.Printf("%s\n", dbUrl)
	}

	allowedOriginsEnv := os.Getenv(corsAllowedOriginsEnv)
	if len(allowedOriginsEnv) == 0 {
		log.Printf("Warning: Could not find allowed origins for CORS in environment variables")
	}
	allowedMethodsEnv := os.Getenv(corsAllowedMethodsEnv)
	if len(allowedMethodsEnv) == 0 {
		log.Printf("Warning: Could not find allowed methods for CORS in environment variables")
	}

	allowedOrigins := strings.Split(allowedOriginsEnv, " ")
	allowedMethods := strings.Split(allowedMethodsEnv, " ")

	corsManager := cors.New(cors.Options{
		AllowedOrigins: allowedOrigins,
		AllowedMethods: allowedMethods,
		AllowCredentials: true, // needed for login
	})

	middlewares := middleware.CreateMiddlewareStack(
		middleware.Logging,
		corsManager.Handler,
	)
	router := routes.Router

	ctx := context.Background()

	poolConfig, err := pgxpool.ParseConfig(dbUrl)
	if err != nil {
		log.Fatalf("Could not parse pool config: %+v\n", err)
		os.Exit(1)
	}

	poolConfig.AfterConnect = func(ctx context.Context, c *pgx.Conn) error {
		log.Printf("After connect called\n")
		err = pgxgeom.Register(ctx, c)
		if err != nil {
			log.Fatalf("Could not register geo datatype: %v\n", err)
		} else {
			log.Printf("Registered geom data types on database connection")
		}
		return err
	}

	dbPool, err := pgxpool.NewWithConfig(ctx, poolConfig)
	if err != nil {
		log.Fatalf("Could not connect to database: %v\n", err)
		os.Exit(1)
	} else {
		log.Println("Successfully connected to database")
	}
	defer dbPool.Close()

	// err = pgxgeos.Register(ctx, connFromPool.Conn(), geos.)

	handlers.RegisterDatabaseConnection(&ctx, dbPool)

	server := http.Server{
		Addr:    fmt.Sprintf(":%v", port),
		Handler: middlewares(router),
	}

	log.Printf("Listening on port %v\n", port)
	err = server.ListenAndServe()
	if err != nil {
		log.Printf("Server: %v\n", err)
	}
}
