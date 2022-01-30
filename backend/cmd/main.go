package main

import (
    "github.com/gin-gonic/gin"
    "logntnu.no/beehive/pkg/spa"
)

func main() {
    r := gin.Default()
    r.Use(spa.Middleware("/", "./web/build"))
    r.Run()
}
