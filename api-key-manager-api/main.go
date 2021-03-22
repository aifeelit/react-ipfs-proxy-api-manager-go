package main

import (
	"github.com/chrilnth/apikeymanager/config"
	"github.com/chrilnth/apikeymanager/routes"
	"github.com/gofiber/cors"
	"github.com/gofiber/fiber"
)

const port = 8000

func setupRoutes(app *fiber.App) {

	app.Get("", func(c *fiber.Ctx) {
		c.Status(fiber.StatusOK).JSON(fiber.Map{
			"success": true,
			"message": "OK",
		})
	})

	app.Use(cors.New())

	var apiRoutes = app.Group("/api/v1")

	routes.ConfigRoutes(apiRoutes)
}

func main() {
	app := fiber.New()

	config.ConnectDB()

	setupRoutes(app)

	app.Listen(port)
}
