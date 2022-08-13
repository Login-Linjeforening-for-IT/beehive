package main

import (
	"context"
	"errors"
	"flag"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v4/pgxpool"
	"logntnu.no/beehive/cmd/handler"
	"logntnu.no/beehive/pkg/spa"
)

func main() {
	// parse arguments
	databaseString := flag.String("d", "", "A connection string for the database on the form \"postgres://username:password@localhost:5432/database_name\"")
	production := flag.Bool("p", false, "Specifies that the instance is running in a production environment")
	flag.Parse()

	// Set up store for sessions
	storeSecret := os.Getenv("BH_SECRET")
	store := cookie.NewStore([]byte(storeSecret))

	// start the webserver
	WWWRouter := gin.Default()
	WWWRouter.Use(spa.Middleware("/", "./web/build"))
	go WWWRouter.Run("0.0.0.0:8080")

	// get db connection details from environment
	password := os.Getenv("DB_PASSWORD")
	dbHost := os.Getenv("BH_DB_HOST")
	dbPort := os.Getenv("BH_DB_PORT")
	dbUser := os.Getenv("BH_DB_USER")
	dbName := os.Getenv("BH_DB_NAME")

	// connect to database
	// urlExample := "postgres://username:password@localhost:5432/database_name"
	var dbURL string
	if len(*databaseString) > 0 {
		dbURL = *databaseString
	} else {
		dbURL = fmt.Sprintf("postgres://%s:%s@%s:%s/%s", dbUser, password, dbHost, dbPort, dbName)
	}
	conn, err := pgxpool.Connect(context.Background(), dbURL)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Beehive: Could not connect to database: %v", err)
		os.Exit(1)
	}
	defer conn.Close()

	APIRouter := gin.Default()

	// configure the API
	if *production {
		APIRouter.Use(cors.New(cors.Config{
			AllowOrigins:			[]string{"http://localhost:3000"},
			AllowMethods:     []string{"GET", "PUT", "PATCH"},
			AllowHeaders:     []string{"Origin"},
			ExposeHeaders:    []string{"Content-Length"},
			AllowCredentials: true,
			MaxAge: 12 * time.Hour,
		}))
	} else {
		APIRouter.Use(cors.Default())
	}

	APIRouter.Use(sessions.Sessions("beehiveAPI", store))

	// API routes
	APIRouter.GET("/events", func(c *gin.Context) { handler.GetEvents(c, conn) })
	APIRouter.POST("/events", func(c *gin.Context) { if VerifySession(c) != nil { c.AbortWithStatus(http.StatusUnauthorized) } else { handler.CreateEvent(c, conn) } })
	APIRouter.GET("/events/:eventID", func(c *gin.Context) { handler.GetEvent(c, conn) })
	APIRouter.PATCH("/events/:eventID", func(c *gin.Context) { if VerifySession(c) != nil { c.AbortWithStatus(http.StatusUnauthorized) } else {handler.UpdateEvent(c, conn) } })
	APIRouter.DELETE("/events/:eventID", func(c *gin.Context) { if VerifySession(c) != nil { c.AbortWithStatus(http.StatusUnauthorized) } else { handler.DeleteEvent(c, conn) } })
	APIRouter.GET("/categories", func(c *gin.Context) { handler.GetCategories(c, conn) })
	APIRouter.POST("/login", func(c *gin.Context) { handler.Login(c) })

	// start the API
	APIRouter.Run("0.0.0.0:4000")
}

func VerifySession(c *gin.Context) error {
	// Retrieve the session
	session := sessions.Default(c)

	// Fetch the expiry times
	exp := session.Get("exp")
	max := session.Get("max")
	
	if exp == nil {
		return errors.New("No active session")
	}

	// Convert the expiry times to time.Time
	expTime, err := time.Parse(time.RFC3339, exp.(string))
	if err != nil {
		return errors.New("Invalid time format")
	}
	maxTime, err := time.Parse(time.RFC3339, max.(string))
	if err != nil {
		return errors.New("Invalid time format")
	}

	fmt.Printf("%T\n%T\n", expTime, maxTime)


	// Verify that the session is still valid
	t := time.Now()
	if expTime.Before(t) || maxTime.Before(t) {
		return errors.New("Session expired")
	}

	// Update the expiry of the session
	session.Set("exp", t.Add(time.Minute * 15).Format(time.RFC3339))
	session.Save()

	return nil
}
