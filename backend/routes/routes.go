package routes

import (
	"obat_crud/config"
	"obat_crud/controllers"
	"obat_crud/repositories"
	"obat_crud/services"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	// ===== CORS Middleware =====
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"}, // atau "*" untuk semua origin dev
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// =======================
	// Dependency Injection
	// =======================
	db := config.DB

	// repositories
	productRepo := repositories.NewProductRepository(db)
	orderRepo := repositories.NewOrderRepository(db)

	// services
	productService := services.NewProductService(db, productRepo)
	orderService := services.NewOrderService(db, productRepo, orderRepo)

	// controllers
	productController := controllers.NewProductController(productService)
	orderController := controllers.NewOrderController(orderService)

	// =======================
	// ROUTES
	// =======================
	// PRODUCTS
	r.GET("/products", productController.GetProducts)
	r.POST("/products", productController.CreateProduct)
	r.PUT("/products/:id", productController.UpdateProduct)
	r.DELETE("/products/:id", productController.DeleteProduct)

	// ORDERS
	r.POST("/orders", orderController.CreateOrder)
}
