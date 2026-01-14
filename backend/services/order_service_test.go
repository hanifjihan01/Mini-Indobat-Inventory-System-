package services

import (
	"errors"
	"obat_crud/models"
	"testing"

	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"
)

// ===== MOCK REPOSITORIES =====
type mockProductRepo struct {
	product *models.Product
	err     error
}

func (m *mockProductRepo) FindByIDForUpdate(tx *gorm.DB, id uint) (*models.Product, error) {
	if m.err != nil {
		return nil, m.err
	}
	return m.product, nil
}

func (m *mockProductRepo) Update(tx *gorm.DB, product *models.Product) error {
	m.product = product // update di memory
	return nil
}

// methods tambahan supaya implement ProductRepository
func (m *mockProductRepo) FindAll() ([]models.Product, error) {
	return nil, nil
}

func (m *mockProductRepo) Create(product *models.Product) error {
	return nil
}

type mockOrderRepo struct {
	err error
}

func (m *mockOrderRepo) Create(tx *gorm.DB, order *models.Order) error {
	return m.err
}
func (m *mockOrderRepo) FindRecent() ([]models.Order, error) {
	return []models.Order{}, nil
}

func (m *mockProductRepo) Delete(tx *gorm.DB, id uint) error {
	// cukup return nil karena ini mock, tidak perlu hapus apa-apa
	return nil
}

// ===== UNIT TESTS =====

func TestCreateOrder_Success(t *testing.T) {
	product := &models.Product{
		Model: gorm.Model{ID: 1},
		Stock: 10,
		Price: 10000,
	}

	service := NewOrderService(nil, &mockProductRepo{product: product}, &mockOrderRepo{})

	total, err := service.CreateOrder(1, 2, 10) // beli 2 dengan diskon 10%
	assert.NoError(t, err)
	assert.Equal(t, float64(18000), total) // 20000 - 10%
	assert.Equal(t, 8, product.Stock)      // stock berkurang
}

func TestCreateOrder_StockNotEnough(t *testing.T) {
	product := &models.Product{
		Model: gorm.Model{ID: 1},
		Stock: 1,
		Price: 10000,
	}

	service := NewOrderService(nil, &mockProductRepo{product: product}, &mockOrderRepo{})

	_, err := service.CreateOrder(1, 5, 0) // minta 5, stock cuma 1
	assert.Error(t, err)
	assert.Equal(t, "stock not enough", err.Error())
	assert.Equal(t, 1, product.Stock) // stock tetap sama
}

func TestCreateOrder_ProductNotFound(t *testing.T) {
	service := NewOrderService(nil, &mockProductRepo{err: errors.New("not found")}, &mockOrderRepo{})

	_, err := service.CreateOrder(99, 1, 0)
	assert.Error(t, err)
	assert.Equal(t, "product not found", err.Error())
}
