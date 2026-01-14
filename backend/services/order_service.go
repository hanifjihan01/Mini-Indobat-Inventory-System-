package services

import (
	"errors"
	"obat_crud/models"
	"obat_crud/repositories"

	"gorm.io/gorm"
)

type OrderService interface {
	CreateOrder(productID uint, qty int, discount int) (float64, error)
	GetRecentOrders() ([]models.Order, error)
}

type orderService struct {
	db          *gorm.DB
	productRepo repositories.ProductRepository
	orderRepo   repositories.OrderRepository
}

func NewOrderService(
	db *gorm.DB,
	productRepo repositories.ProductRepository,
	orderRepo repositories.OrderRepository,
) OrderService {
	return &orderService{db, productRepo, orderRepo}
}

func (s *orderService) CreateOrder(productID uint, qty int, discount int) (float64, error) {
	var tx *gorm.DB
	if s.db != nil {
		tx = s.db.Begin()
		defer func() {
			if r := recover(); r != nil && tx != nil {
				tx.Rollback()
			}
		}()
	}

	product, err := s.productRepo.FindByIDForUpdate(tx, productID)
	if err != nil {
		if tx != nil {
			tx.Rollback()
		}
		return 0, errors.New("product not found")
	}

	if product.Stock < qty {
		if tx != nil {
			tx.Rollback()
		}
		return 0, errors.New("stock not enough")
	}

	total := product.Price * float64(qty)
	discountValue := total * float64(discount) / 100
	finalPrice := total - discountValue

	product.Stock -= qty
	if err := s.productRepo.Update(tx, product); err != nil {
		if tx != nil {
			tx.Rollback()
		}
		return 0, err
	}

	order := models.Order{
		ProductID:       productID,
		Quantity:        qty,
		DiscountPercent: discount,
		TotalPrice:      finalPrice,
	}

	if err := s.orderRepo.Create(tx, &order); err != nil {
		if tx != nil {
			tx.Rollback()
		}
		return 0, err
	}

	if tx != nil {
		tx.Commit()
	}

	return finalPrice, nil
}

// services/order_service.go

func (s *orderService) GetRecentOrders() ([]models.Order, error) {
	return s.orderRepo.FindRecent()
}

// services/order_service.go
