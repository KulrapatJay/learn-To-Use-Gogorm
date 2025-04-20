package main

import (
 	// "strconv"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"	
	// "database/sql"
)

func helloWorld(c *fiber.Ctx) error {
	return c.SendString("hello world 🌈")
}

func infos(c * fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"msg":     "hello world 🚀",
		"go":      "fiber 🥦",
		"boolean": true,
		"number":  1234,
	})
}

func getFoods(c *fiber.Ctx) error {
	var foods []Food
	if err := db.Find(&foods).Error; err != nil {
	  return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(foods)
  }

func getFoodByID(c *fiber.Ctx) error {
	id := c.Params("id")
	var food Food
	if err := db.First(&food, id).Error; err != nil {
	  if err == gorm.ErrRecordNotFound {
		return c.Status(404).JSON(fiber.Map{"error": "Food not found"})
	  }
	  return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(food)
  }



// แบบเก่าก่อนใช้ Gorm
// func getFoods(c *fiber.Ctx) error {
// 	rows, err := db.Query("SELECT id, name, price FROM foods")
// 	if err != nil {
// 		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
// 	}
// 	defer rows.Close()

// 	var result []Food
// 	for rows.Next() {
// 		var food Food
// 		if err := rows.Scan(&food.ID, &food.Name, &food.Price); err != nil {
// 			return c.Status(500).JSON(fiber.Map{"error": err.Error()})
// 		}
// 		result = append(result, food)
// 	}
// 	return c.JSON(result)
// }

// func getFoodByID(c *fiber.Ctx) error {
// 	id := c.Params("id")

// 	idUint, err := strconv.ParseUint(id, 10, 32)
// 	if err != nil {
// 		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
// 			"error": "invalid id format",
// 		})
// 	}

// 	var food Food
// 	err = db.QueryRow("SELECT id, name, price FROM foods WHERE id = $1", idUint).Scan(&food.ID, &food.Name, &food.Price)

// 	if err == sql.ErrNoRows {
// 		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Food not found"})
// 	} else if err != nil {
// 		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
// 	}
// 	return c.JSON(food)
// }

//  type EditFood struct {
// 	Name  string `json:"name"`
// 	Price uint   `json:"price"`
//  }
 
//  var foods = []Food{
// 	{ID: 1, Name: "ต้มยำกุ้ง", Price: 140},
// 	{ID: 2, Name: "ไก่ทอด", Price: 100},
// 	{ID: 3, Name: "ก๋วยเตี๋ยว", Price: 30},
// 	{ID: 4, Name: "เบอร์เกอร์", Price: 149},
//  }