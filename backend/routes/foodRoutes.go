package routes

import (
	"github.com/gofiber/fiber/v2"
	"backend/controllers"
)

func FoodRoutes(app *fiber.App) {
	api := app.Group("/api")
	api.Post("/food", controllers.CreateFood)
	api.Get("/foods", controllers.GetFoods)
	api.Get("/food/:id", controllers.GetFoodByID)
	api.Put("/food/:id", controllers.UpdateFood)
	api.Delete("/food/:id", controllers.DeleteFood)
}
