package routes

import (
	"github.com/chrilnth/apikeymanager/config"
	"github.com/chrilnth/apikeymanager/controllers"
	"github.com/gofiber/fiber"
)

func ConfigRoutes(route fiber.Router) {

	route.Get("/apikeys", GetAllApikey)
	route.Get("/apikeys/:id", GetApiKeyByid)
	route.Put("/apikeys/:id", UpdateApikey)
	route.Post("/apikeys", CreateApiKey)

	route.Get("/apikeys/:id/requests", GetAllRequestByApiKey)
	route.Post("/apikeys/:id/requests", CreateRequestByApiKey)

	route.Put("/apikeys/:id", func(c *fiber.Ctx) {
		c.SendStatus(fiber.StatusNotFound)
	})

	route.Delete("/apikeys", func(c *fiber.Ctx) {
		c.SendStatus(fiber.StatusNotFound)
	})
}

func GetAllRequestByApiKey(c *fiber.Ctx) {
	requestCollection := config.MI.DB.Collection("requests")
	requestController := controllers.NewLogController(requestCollection)

	requestController.GetAll(c)
}
func CreateRequestByApiKey(c *fiber.Ctx) {
	requestCollection := config.MI.DB.Collection("requests")
	requestController := controllers.NewLogController(requestCollection)

	requestController.Create(c)
}

func GetApiKeyByid(c *fiber.Ctx) {
	apiKeyCollection := config.MI.DB.Collection("apikeys")
	apiKeyController := controllers.NewApiKeyController(apiKeyCollection)

	apiKeyController.GetById(c)
}

func GetAllApikey(c *fiber.Ctx) {
	apiKeyCollection := config.MI.DB.Collection("apikeys")
	apiKeyController := controllers.NewApiKeyController(apiKeyCollection)

	apiKeyController.GetAll(c)
}

func CreateApiKey(c *fiber.Ctx) {
	apiKeyCollection := config.MI.DB.Collection("apikeys")
	apiKeyController := controllers.NewApiKeyController(apiKeyCollection)

	apiKeyController.Create(c)
}

func UpdateApikey(c *fiber.Ctx) {
	apiKeyCollection := config.MI.DB.Collection("apikeys")
	apiKeyController := controllers.NewApiKeyController(apiKeyCollection)

	apiKeyController.Update(c)
}
