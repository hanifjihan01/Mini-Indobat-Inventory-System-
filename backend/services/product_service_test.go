package services

import (
	"testing"

	"obat_crud/models"

	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"
)

type mockProductRepo2 struct {
	products []models.Product
}

func (m *mockProductRepo2) FindAll() ([]models.Product, error) {
	return m.products, nil
}

func (m *mockProductRepo2) Create(product *models.Product) error {
	m.products = append(m.products, *product)
	return nil
}

func (m *mockProductRepo2) FindByIDForUpdate(tx *gorm.DB, id uint) (*models.Product, error) {
	for i := range m.products {
		if m.products[i].ID == id {
			return &m.products[i], nil
		}
	}
	return nil, gorm.ErrRecordNotFound
}

func (m *mockProductRepo2) Update(tx *gorm.DB, product *models.Product) error {
	for i := range m.products {
		if m.products[i].ID == product.ID {
			m.products[i] = *product
			return nil
		}
	}
	return gorm.ErrRecordNotFound
}

func (m *mockProductRepo2) Delete(tx *gorm.DB, id uint) error {
	// cukup return nil karena ini mock
	return nil
}

func TestGetProducts(t *testing.T) {
	repo := &mockProductRepo2{
		products: []models.Product{
			{
				Model: gorm.Model{ID: 1},
				Name:  "Paracetamol",
			},
		},
	}

	service := NewProductService(nil, repo)

	products, err := service.GetProducts()

	assert.NoError(t, err)
	assert.Len(t, products, 1)
	assert.Equal(t, uint(1), products[0].ID)
}

func TestCreateProduct(t *testing.T) {
	repo := &mockProductRepo2{}
	service := NewProductService(nil, repo)

	product := &models.Product{Name: "Amoxicillin"}
	err := service.CreateProduct(product)

	assert.NoError(t, err)
}
