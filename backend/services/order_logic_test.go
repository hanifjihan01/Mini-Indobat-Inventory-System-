package services

import (
	"obat_crud/models"
	"testing"

	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"
)

// Mock repository sederhana
type simpleMockProductRepo struct {
	product *models.Product
}

func (m *simpleMockProductRepo) FindByIDForUpdate(tx *gorm.DB, id uint) (*models.Product, error) {
	return m.product, nil
}

func (m *simpleMockProductRepo) Update(tx *gorm.DB, product *models.Product) error {
	m.product = product
	return nil
}

func (m *simpleMockProductRepo) FindAll() ([]models.Product, error)   { return nil, nil }
func (m *simpleMockProductRepo) Create(product *models.Product) error { return nil }

type simpleMockOrderRepo struct{}

func (m *simpleMockOrderRepo) Create(tx *gorm.DB, order *models.Order) error { return nil }
func (m *simpleMockProductRepo) Delete(tx *gorm.DB, id uint) error           { return nil }
func (m *simpleMockOrderRepo) FindRecent() ([]models.Order, error) {
	return []models.Order{}, nil
}

// ===== TEST LOGIC HITUNG =====

func TestCalculateTotalPriceAndStock(t *testing.T) {
	// Siapkan product mock
	product := &models.Product{
		Model: gorm.Model{ID: 1},
		Stock: 10,
		Price: 5000, // harga per item
	}

	service := NewOrderService(nil, &simpleMockProductRepo{product: product}, &simpleMockOrderRepo{})

	// Test beli 3 item dengan diskon 20%
	total, err := service.CreateOrder(1, 3, 20)
	assert.NoError(t, err)

	// Hitung expected manually: 5000 * 3 = 15000, diskon 20% = 3000, total = 12000
	assert.Equal(t, float64(12000), total)

	// Pastikan stok berkurang 3
	assert.Equal(t, 7, product.Stock)
}

func TestNoStockChangeIfNotEnough(t *testing.T) {
	product := &models.Product{
		Model: gorm.Model{ID: 2},
		Stock: 2,
		Price: 10000,
	}

	service := NewOrderService(nil, &simpleMockProductRepo{product: product}, &simpleMockOrderRepo{})

	_, err := service.CreateOrder(2, 5, 0) // minta 5, stock cuma 2
	assert.Error(t, err)
	assert.Equal(t, "stock not enough", err.Error())

	// Stok harus tetap sama
	assert.Equal(t, 2, product.Stock)
}
