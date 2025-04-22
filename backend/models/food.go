package models

type Food struct {
	ID    uint   `gorm:"primaryKey" json:"id"`
	Name  string `json:"name" validate:"required,min=2"`
	Price uint   `json:"price" validate:"required"`
  }
