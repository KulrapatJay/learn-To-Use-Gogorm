package config

import (
	"fmt"
	"log"
	"os"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"backend/models"
)

var DB *gorm.DB

func ConnectDB() {
	//สร้างตัวแปรสำหรับเชื่อมต่อกับฐานข้อมูล
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	//ส่วนของการเชื่อมต่อกับฐานข้อมูล
	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
	)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Error connecting to database")
	}
	DB = db
	db.AutoMigrate(&models.Food{})
	if err := db.AutoMigrate(&models.Food{}); err != nil {
		log.Fatal("Failed to migrate:", err)
	}
	log.Println("Connected to database")
}
