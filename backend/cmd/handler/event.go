/**
event handler henter event data fra databasen vår
@author Simon, Sebastian, Alexander
@date 15/06/2022
*/
package handler

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"time"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v4"
	"github.com/jackc/pgx/v4/pgxpool"
	"logntnu.no/beehive/pkg/models"
)

/**
GetEvents
This endpoint retrieves information about all (future) events in the database.
*/
func GetEvents(c *gin.Context, conn *pgxpool.Pool) {
	// Declare an array to hold all the events
	var events []models.EventPreview
	var limit = 50
	
	// Check for supplied limiter query parameter
	if queryParam, ok := c.GetQuery("lim"); ok {
		if queryParam == "" {
			fmt.Fprintf(os.Stderr, "Empty limiter string")
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}
		queryParamInt, err := strconv.Atoi(queryParam)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Invalid limiter string")
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}
		limit = queryParamInt
	}

	// Construct the query and send it to the DB
	query := `
		SELECT eventid, parent, organizer, eventname, startt, audience, category, image, fblink, discordlink, roomno, campus, street, postcode, name
		FROM eventDetails
		WHERE endt >= $1
		AND publishT <= $1
		ORDER BY startt ASC
		LIMIT $2
	`
	rows, err := conn.Query(context.Background(), query, time.Now(), limit)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error sending the query: %v", err)
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	// Scan the data into the struct and add them to the array
	for rows.Next() {
		var evt models.EventPreview
		err = rows.Scan(&evt.EventID, &evt.Parent, &evt.Organizer, &evt.Name, &evt.StartT, &evt.Audience, &evt.Category, &evt.Image, &evt.FbLink, &evt.DiscordLink, &evt.RoomNo, &evt.Campus, &evt.Street, &evt.Postcode, &evt.City)
		if err != nil && err == pgx.ErrNoRows {
			c.AbortWithStatus(http.StatusNoContent)
		} else if err != nil {
			fmt.Fprintf(os.Stderr, "Error scanning data: %v", err)
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}
		events = append(events, evt)
	}

	// Send the response with the results
	if len(events) == 0 {
		c.AbortWithStatus(http.StatusNoContent)
		return
	}
	c.IndentedJSON(http.StatusOK, events)
	
}

/**
CreateEvent
This endpoint creates a new event
*/
func CreateEvent(c *gin.Context, conn *pgxpool.Pool) {

}

/**
GetEvent
This endpoint retrieves all information about a specific event.
*/
func GetEvent(c *gin.Context, conn *pgxpool.Pool) {
	// Declare a variable to hold the event information
	var event models.Event

	// Construct the query and send it to the DB
	query := `
	SELECT * 
	FROM eventDetails
	WHERE eventDetails.eventid = $1
	AND eventDetails.publishT <= $2
	`
	
	res := conn.QueryRow(context.Background(), query, c.Param("eventID"), time.Now())
	err := res.Scan(&event.EventID, &event.Parent, &event.Organizer, &event.Name, &event.StartT, &event.EndT, &event.PublishT, &event.Description, &event.Audience, &event.Category, &event.Image, &event.FBLink, &event.DiscordLink, &event.OrganizerLogo, &event.OrganizerLink, &event.RoomNo, &event.Campus, &event.MazeRef, &event.Street, &event.Postcode, &event.City)

	if err != nil && err == pgx.ErrNoRows {
		c.AbortWithStatus(http.StatusNoContent)
	} else if err != nil {
		fmt.Fprintf(os.Stderr, "Error scanning data: %v", err)
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	// Send the response with the result
	if (models.Event{}) == event {
		c.AbortWithStatus(http.StatusNoContent)
		return
	}
	
	c.IndentedJSON(http.StatusOK, event)
}


/**
UpdateEvent
This endpoint updates the contents of a specific event
*/
func UpdateEvent(c *gin.Context, conn *pgxpool.Pool) {

}


/**
DeleteEvent
This endpoint deletes a specific event

c 	 - The go-gin context
conn - A pgxpool connection pool 
*/
func DeleteEvent(c *gin.Context, conn *pgxpool.Pool) {
	// Construct the query and send it to the DB
	query := `
		DELETE FROM event
		WHERE eventid = $1
	`
	res, err := conn.Exec(context.Background(), query, c.Param("eventID"))
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error executing statement: %v", err)
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	// Return the result
	if res.RowsAffected() == 0 {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	c.AbortWithStatus(http.StatusOK)
}

func GetCategories(c *gin.Context, conn * pgxpool.Pool) {
	var categories []models.Category
	// Construct the query and send it to the DB
	query := `
		SELECT * FROM category
	`
	rows, err := conn.Query(context.Background(), query)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error executing statement: %v", err)
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	// Scan the data into the struct and add them to the array
	for rows.Next() {
		var cat models.Category
		err = rows.Scan(&cat.Name, &cat.Color, &cat.Description)
		if err != nil && err == pgx.ErrNoRows {
			c.AbortWithStatus(http.StatusNoContent)
		} else if err != nil {
			fmt.Fprintf(os.Stderr, "Error scanning data: %v", err)
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}
		categories = append(categories, cat)
	}
	
	// Return the result
	c.IndentedJSON(http.StatusOK, categories)
}
