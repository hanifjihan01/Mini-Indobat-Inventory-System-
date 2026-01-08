package repositories

import (
	"obat_crud/models"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type ProductRepository interface {
	FindAll() ([]models.Product, error)
	FindByIDForUpdate(tx *gorm.DB, id uint) (*models.Product, error)
	Update(tx *gorm.DB, product *models.Product) error
	Create(product *models.Product) error
	Delete(tx *gorm.DB, id uint) error
}

type productRepository struct {
	db *gorm.DB
}

func NewProductRepository(db *gorm.DB) ProductRepository {
	return &productRepository{db}
}

func (r *productRepository) FindAll() ([]models.Product, error) {
	var products []models.Product
	err := r.db.Find(&products).Error
	return products, err
}

func (r *productRepository) FindByIDForUpdate(tx *gorm.DB, id uint) (*models.Product, error) {
	var product models.Product
	err := tx.Clauses(clause.Locking{Strength: "UPDATE"}).
		First(&product, id).Error
	return &product, err
}

func (r *productRepository) Update(tx *gorm.DB, product *models.Product) error {
	return tx.Save(product).Error
}

func (r *productRepository) Create(product *models.Product) error {
	return r.db.Create(product).Error
}

func (r *productRepository) Delete(tx *gorm.DB, id uint) error {
	return tx.Delete(&models.Product{}, id).Error
}
