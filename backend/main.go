package main

import (
	"obat_crud/config"
	"obat_crud/models"
	"obat_crud/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	config.ConnectDB()

	// AUTO MIGRATION
	config.DB.AutoMigrate(
		&models.Product{},
		&models.Order{},
	)

	r := gin.Default()
	routes.SetupRoutes(r)
	r.Run(":8080")
}
