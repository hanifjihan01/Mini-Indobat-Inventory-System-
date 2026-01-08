package controllers

import (
	"net/http"
	"obat_crud/services"

	"github.com/gin-gonic/gin"
)

type OrderController struct {
	service services.OrderService
}

func NewOrderController(service services.OrderService) *OrderController {
	return &OrderController{service}
}

func (h *OrderController) CreateOrder(c *gin.Context) {
	var req struct {
		ProductID       uint `json:"product_id"`
		Quantity        int  `json:"quantity"`
		DiscountPercent int  `json:"discount_percent"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	total, err := h.service.CreateOrder(
		req.ProductID,
		req.Quantity,
		req.DiscountPercent,
	)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message":     "Order success",
		"total_price": total,
	})
}
