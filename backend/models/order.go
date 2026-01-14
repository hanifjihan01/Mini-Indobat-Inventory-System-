// models/order.go
package models

import "gorm.io/gorm"

type Order struct {
	gorm.Model
	ProductID       uint
	Quantity        int
	DiscountPercent int
	TotalPrice      float64
	Status          string `gorm:"type:varchar(20);default:'Success'"`

	Product Product `gorm:"foreignKey:ProductID"`
}
