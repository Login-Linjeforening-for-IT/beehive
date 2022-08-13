/*******************************************************************************************
The authentication package provides an interface for authentication towards our LDAP server

Author: 	Alexander P. Roaas
Created: 	09.07.22
Updated:  09.07.22
*******************************************************************************************/
package authentication

import (
	"os"
	"fmt"
	"errors"
	"crypto/tls"
	"github.com/go-ldap/ldap/v3"
)

var bindUsername string = "uid=beehive,cn=sysaccounts,cn=etc,dc=logntnu,dc=no"
var bindPassword string = os.Getenv("BH_LDAP_BIND_PW") 
var baseDN string = "cn=users,cn=accounts,dc=logntnu,dc=no"
var filter string = "(&(objectClass=inetOrgPerson)(uid=%s))"

func AuthenticateUser(username string, password string) error {
	// Dial the LDAP server
	l, err := ldap.DialURL("ldap://ipa1.logntnu.no:389")
	if err != nil {
		fmt.Fprintf(os.Stderr, "Could not dial LDAP server: %v", err)
		return errors.New(fmt.Sprintf("Could not dial LDAP server: %v", err))
	}

	defer l.Close()

	// Configuration for connection with TLS.
	// REMEMBER TO INSTALL THE CA CERTIFICATE FROM THE IPA SERVER! (/etc/ipa/ca.crt)
	conf := tls.Config{
		InsecureSkipVerify: false,
		ServerName: "ipa1.logntnu.no",
	}

	// Reconnect with TLS
	err = l.StartTLS(&conf)
	if err != nil {
		return errors.New(fmt.Sprintf("Could not establish TLS with LDAP server: %v", err))
	}

	// Bind with a read only user
	err = l.Bind(bindUsername, bindPassword)
	if err != nil {
		return errors.New(fmt.Sprintf("Could not bind with LDAP user: %v", err))
	}

	// Search for the given username
	searchRequest := ldap.NewSearchRequest(
		baseDN,
		ldap.ScopeWholeSubtree, ldap.NeverDerefAliases, 0, 0, false,
		fmt.Sprintf(filter, ldap.EscapeFilter(username)),
		[]string{"dn"},
		nil,
	)

	sr, err := l.Search(searchRequest)
	if err != nil {
		return errors.New(fmt.Sprintf("Eror performing search: %v", err))
	}

	if len(sr.Entries) == 0 {
		return errors.New(fmt.Sprintf("Invalid user for login attempt: %v", err))
	}
	userdn := sr.Entries[0].DN

	// Bind as the user to verify the password
	err = l.Bind(userdn, password)
	if err != nil {
		return errors.New(fmt.Sprintf("Could not authenticate user: %v\n", err))
	}

	return nil
}
