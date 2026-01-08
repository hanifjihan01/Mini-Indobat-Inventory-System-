package repositories

import (
	"obat_crud/models"

	"gorm.io/gorm"
)

type OrderRepository interface {
	Create(tx *gorm.DB, order *models.Order) error
}

type orderRepository struct {
	db *gorm.DB
}

func NewOrderRepository(db *gorm.DB) OrderRepository {
	return &orderRepository{db}
}

func (r *orderRepository) Create(tx *gorm.DB, order *models.Order) error {
	return tx.Create(order).Error
}
