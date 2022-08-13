/*******************************************************************
The authentication handlers is responsible for user authentication

Author:		Alexander P. Roaas
Created: 	09.07.2022
Updated: 	09.07.2022

*******************************************************************/

package handler

import (
	"os"
	"fmt"
	"time"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/sessions"

	"logntnu.no/beehive/pkg/authentication"
)

// Struct for the user credentials
type credentials struct {
	Username 	string
	Password 	string
}

/*
Login
This endpoint receives usename and password as JSON in a POST request and verifies the credentials in LDAP.
If the credentials are valid it issues a session token that is valid for 15min.

c - The go-gin context
*/

func Login(c *gin.Context) {
	// Declare struc to hold the credentials
	var user credentials

	// Parse the request body for the credentials
	err := c.BindJSON(&user)
	if err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
		fmt.Fprintf(os.Stderr, "Authentication: Invalid JSON: %v", err)
		return
	}

	// Authenticate towards LDAP
	err = authentication.AuthenticateUser(user.Username, user.Password)
	if err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
		fmt.Fprintf(os.Stderr, "Authentication: %v", err)
		return
	}

	// Create session
	session := sessions.Default(c)

	t := time.Now()
	session.Set("exp", t.Add(time.Minute * 15).Format(time.RFC3339))
	session.Set("max", t.Add(time.Hour * 24).Format(time.RFC3339))
	
	err = session.Save()
	if err != nil {
		fmt.Fprintf(os.Stderr, "ERR: %v", err)
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}
	c.Status(http.StatusOK)
}
