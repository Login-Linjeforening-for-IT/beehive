/**
Denne har alle structen for event api
*/
package models

import "time"

// Model for the preview of an event (listing)
type EventPreview struct {
	EventID			int 			`json:"eventID"`
	Parent			int 			`json:"parent"`
	Organizer   string 		`json:"organizer"`
	Name        string 		`json:"eventname"`
	StartT      time.Time `json:"startt"`
	Audience    string 		`json:"audience"`
	Category    string 		`json:"category"`
	Image       string 		`json:"image"`
	FbLink      string 		`json:"fblink"`
	DiscordLink string 		`json:"discordlink"`
	RoomNo				string    `json:"roomno"`
	Campus 				string 		`json:"campus"`
	Street 				string 		`json:"street"`
	Postcode 			string		`json:"postcode"`
	City 					string 		`json:"city"`
}

// Model for a single event
type Event struct {
	EventID 			int 			`json:"eventID"`
	Parent 				int 			`json:"parent"`
	Organizer 		string 		`json:"organizer"`
	Name 					string 		`json:"eventname"`
	StartT				time.Time	`json:"startt"`
	EndT 					time.Time `json:"endt"`
	PublishT 			time.Time `json:"publisht"`
	Description 	string 		`json:"description"`
	Audience 			string 		`json:"audience"`
	Category 			string  	`json:"category"`
	Image 				string 		`json:"image"`
	FBLink 				string		`json:"fblink"`
	DiscordLink 	string 		`json:"discordlink"`	
	OrganizerLogo string    `json:"organizerlogo"`
	OrganizerLink string    `json:"organizerlink"`
	RoomNo				string    `json:"roomno"`
	Campus 				string 		`json:"campus"`
	MazeRef 			string 		`json:"mazeref"`
	Street 				string 		`json:"street"`
	Postcode 			string		`json:"postcode"`
	City 					string 		`json:"city"`
}


// Model for category
type Category struct {
	Name				string 	`json:"Name"`
	Color				string 	`json:"Color"`
	Description	string 	`json:"Description"`
}
