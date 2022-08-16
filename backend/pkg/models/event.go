/**
Denne har alle structen for event api
*/
package models

import "time"
import "database/sql"

// Model for the preview of an event (listing)
type EventPreview struct {
	EventID			int 			`json:"eventID"`
	Parent			int 			`json:"parent"`
	Organizer   sql.NullString 		`json:"organizer"`
	Name        sql.NullString 		`json:"eventname"`
	StartT      time.Time `json:"startt"`
	Audience    sql.NullString 		`json:"audience"`
	Category    sql.NullString 		`json:"category"`
	Image       sql.NullString 		`json:"image"`
	FbLink      sql.NullString 		`json:"fblink"`
	DiscordLink sql.NullString 		`json:"discordlink"`
	RoomNo				sql.NullString    `json:"roomno"`
	Campus 				sql.NullString 		`json:"campus"`
	Street 				sql.NullString 		`json:"street"`
	Postcode 			sql.NullString		`json:"postcode"`
	City 					sql.NullString 		`json:"city"`
}

// Model for a single event
type Event struct {
	EventID 			int 			`json:"eventID"`
	Parent 				int 			`json:"parent"`
	Organizer 		sql.NullString 		`json:"organizer"`
	Name 					sql.NullString 		`json:"eventname"`
	StartT				time.Time	`json:"startt"`
	EndT 					time.Time `json:"endt"`
	PublishT 			time.Time `json:"publisht"`
	Description 	sql.NullString 		`json:"description"`
	Audience 			sql.NullString 		`json:"audience"`
	Category 			sql.NullString  	`json:"category"`
	Image 				sql.NullString 		`json:"image"`
	FBLink 				sql.NullString		`json:"fblink"`
	DiscordLink 	sql.NullString 		`json:"discordlink"`	
	OrganizerLogo sql.NullString    `json:"organizerlogo"`
	OrganizerLink sql.NullString    `json:"organizerlink"`
	RoomNo				sql.NullString    `json:"roomno"`
	Campus 				sql.NullString 		`json:"campus"`
	MazeRef 			sql.NullString 		`json:"mazeref"`
	Street 				sql.NullString 		`json:"street"`
	Postcode 			sql.NullString		`json:"postcode"`
	City 					sql.NullString 		`json:"city"`
}


// Model for category
type Category struct {
	Name				sql.NullString 	`json:"Name"`
	Color				sql.NullString 	`json:"Color"`
	Description	sql.NullString 	`json:"Description"`
}
