package models

import "gorm.io/gorm"

type Order struct {
	gorm.Model
	ProductID       uint
	Quantity        int
	DiscountPercent int
	TotalPrice      float64

	Product Product `gorm:"foreignKey:ProductID"`
}
