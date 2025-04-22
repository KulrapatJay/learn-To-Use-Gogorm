package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB

type Food struct {
	ID    uint   `gorm:"primaryKey" json:"id"`
	Name  string `json:"name" validate:"required,min=2"`
	Price uint   `json:"price" validate:"required"`
  }

func initDB() {
	var err error
	fmt.Println("Connecting to DB:", os.Getenv("DB_HOST"), os.Getenv("DB_NAME"))
	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
	)
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})	
	if err != nil {
		log.Fatal("Error connecting to the database:", err)
	}
	if err := db.AutoMigrate(&Food{}); err != nil {
		log.Fatal("Error pinging the database:", err)
	}
}


func main() {

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	app := fiber.New()
	app.Use(recover.New())
	initDB()
	
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*", // Adjust this to be more restrictive if needed
		AllowMethods: "GET,POST,HEAD,PUT,DELETE,PATCH",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	// routes
	app.Get("/", helloWorld)
	app.Get("/info", infos)
	app.Get("/foods", getFoods)
	app.Get("/foods/:id", getFoodByID)
	app.Post("/foods", createFood)
	app.Put("/foods/:id", updateFood)
	app.Delete("/foods/:id", deleteFood)
	

	// app listening at PORT: 3000
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}
	app.Listen(":" + port)
}

