package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/go-playground/validator/v10"
	"gorm.io/gorm"
	"backend/models"
	"backend/config"
)

var validate = validator.New()

func GetFoods(c *fiber.Ctx) error {
	var foods []models.Food
	if err := config.DB.Find(&foods).Error; err != nil {
	  return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(foods) 	
}

func GetFoodByID(c *fiber.Ctx) error {
	id := c.Params("id")
	var food models.Food
	if err := config.DB.First(&food, id).Error; err != nil {
	  if err == gorm.ErrRecordNotFound {
		return c.Status(404).JSON(fiber.Map{"error": "Food not found"})
	  }
	  return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(food)
}

func CreateFood(c *fiber.Ctx) error {
	var input models.Food
	if err := c.BodyParser(&input); err != nil {
	  return c.Status(400).JSON(fiber.Map{"error": "Invalid input"})
	}

	if err:= validate.Struct(input); err != nil{
		validationErrors, ok := err.(validator.ValidationErrors)
		if !ok {
			return c.Status(500).JSON(fiber.Map{"error": "Validation failed unexpectedly"})
		}
		error := make(map[string]string)
		for _, err := range validationErrors{
			field := err.Field()
			switch err.Tag(){
				case "required":
					error[field] = field + " is required"
				case "min":
					error[field] = field + " must be " + err.Param() + " characters long"
				case "gte":
					error[field] = field + " must be greater than " + err.Param()
				default: 
					error[field] = "Invalid validation error" + field
			}
		}  
		return c.Status(400).JSON(fiber.Map{"Validation error": error})
	}
	if err := config.DB.Create(&input).Error; err != nil {
	  return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(201).JSON(input)
}

func UpdateFood(c *fiber.Ctx) error {
	id := c.Params("id")
	var food models.Food
	if err := config.DB.First(&food, id).Error; err != nil {
	   return c.Status(404).JSON(fiber.Map{"error": "Food not found"})
	}
	var input models.Food
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid input"})
	}
	if err := config.DB.Model(&food).Updates(input).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(food)
}

func DeleteFood(c *fiber.Ctx) error {
	id := c.Params("id")
	if err := config.DB.Delete(&models.Food{}, id).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(200).JSON(fiber.Map{"message": "Food deleted successfully"})
}
