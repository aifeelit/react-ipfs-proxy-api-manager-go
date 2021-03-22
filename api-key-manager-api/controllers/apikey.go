package controllers

import (
	"time"

	"github.com/chrilnth/apikeymanager/models"
	"github.com/gofiber/fiber"
	"github.com/segmentio/ksuid"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type ApiKeyController struct {
	Collection mongo.Collection
}

func NewApiKeyController(collection *mongo.Collection) *ApiKeyController {
	return &ApiKeyController{
		Collection: *collection,
	}
}

func (ctr *ApiKeyController) GetAll(c *fiber.Ctx) error {
	query := bson.D{{}}

	cursor, err := ctr.Collection.Find(c.Context(), query)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"message": "Something went wrong",
			"error":   err.Error(),
		})
	}

	var apiKeys []models.ApiKey = make([]models.ApiKey, 0)

	err = cursor.All(c.Context(), &apiKeys)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"message": "Something went wrong",
			"error":   err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"success": true,
		"data": fiber.Map{
			"apiKeys": apiKeys,
		},
	})
}

func (ctr *ApiKeyController) Create(c *fiber.Ctx) error {

	data := new(models.ApiKey)

	data.ID = nil
	id := ksuid.New().String()
	var disabled bool = false
	data.ApiKey = &id
	data.Disabled = &disabled
	data.CreatedAt = time.Now()
	data.UpdatedAt = time.Now()

	result, err := ctr.Collection.InsertOne(c.Context(), data)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"message": "Cannot insert apikey",
			"error":   err,
		})
	}

	apiKey := &models.ApiKey{}
	query := bson.D{{Key: "_id", Value: result.InsertedID}}

	ctr.Collection.FindOne(c.Context(), query).Decode(apiKey)

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"success": true,
		"data": fiber.Map{
			"apiKey": apiKey,
		},
	})
}

func (ctr *ApiKeyController) GetById(c *fiber.Ctx) error {

	paramID := c.Params("id")

	apiKey := &models.ApiKey{}

	query := bson.D{{Key: "apikey", Value: paramID}}

	err := ctr.Collection.FindOne(c.Context(), query).Decode(apiKey)

	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"success": false,
			"message": "Apikey Not found",
			"error":   err,
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"success": true,
		"data": fiber.Map{
			"apiKey": apiKey,
		},
	})
}

func (ctr *ApiKeyController) Update(c *fiber.Ctx) error {
	paramID := c.Params("id")

	data := new(models.ApiKey)
	err := c.BodyParser(&data)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"message": "Cannot parse JSON",
			"error":   err,
		})
	}

	query := bson.D{{Key: "apikey", Value: paramID}}

	var dataToUpdate bson.D

	dataToUpdate = append(dataToUpdate, bson.E{Key: "updatedAt", Value: time.Now()})
	dataToUpdate = append(dataToUpdate, bson.E{Key: "disabled", Value: data.Disabled})

	update := bson.D{
		{Key: "$set", Value: dataToUpdate},
	}

	err = ctr.Collection.FindOneAndUpdate(c.Context(), query, update).Err()

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"success": false,
				"message": "Apikey Not found",
				"error":   err,
			})
		}

		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"message": "Cannot update apikey",
			"error":   err,
		})
	}

	apiKey := &models.ApiKey{}

	ctr.Collection.FindOne(c.Context(), query).Decode(apiKey)

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"success": true,
		"data": fiber.Map{
			"apiKey": apiKey,
		},
	})
}

func (ctr *ApiKeyController) Delete(c *fiber.Ctx) error {
	paramID := c.Params("id")

	query := bson.D{{Key: "apikey", Value: paramID}}

	err := ctr.Collection.FindOneAndDelete(c.Context(), query).Err()

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"success": false,
				"message": "Apikey Not found",
				"error":   err,
			})
		}

		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"message": "Cannot delete apikey",
			"error":   err,
		})
	}

	return c.Status(fiber.StatusNoContent).JSON("{}")
}
