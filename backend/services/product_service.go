package services

import (
	"obat_crud/models"
	"obat_crud/repositories"

	"gorm.io/gorm"
)

type ProductService interface {
	GetProducts() ([]models.Product, error)
	CreateProduct(product *models.Product) error
	UpdateProduct(id uint, updated *models.Product) error
	DeleteProduct(id uint) error
}

type productService struct {
	repo repositories.ProductRepository
	db   *gorm.DB
}

// db harus dikirim dari luar
func NewProductService(db *gorm.DB, repo repositories.ProductRepository) ProductService {
	return &productService{repo: repo, db: db}
}

func (s *productService) GetProducts() ([]models.Product, error) {
	return s.repo.FindAll()
}

func (s *productService) CreateProduct(product *models.Product) error {
	return s.repo.Create(product)
}

// ------------------ UPDATE ------------------
func (s *productService) UpdateProduct(id uint, updated *models.Product) error {
	tx := s.db.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	product, err := s.repo.FindByIDForUpdate(tx, id)
	if err != nil {
		tx.Rollback()
		return err
	}

	product.Name = updated.Name
	product.Stock = updated.Stock
	product.Price = updated.Price

	if err := s.repo.Update(tx, product); err != nil {
		tx.Rollback()
		return err
	}

	return tx.Commit().Error
}

// ------------------ DELETE ------------------
func (s *productService) DeleteProduct(id uint) error {
	tx := s.db.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	if err := s.repo.Delete(tx, id); err != nil {
		tx.Rollback()
		return err
	}

	return tx.Commit().Error
}
