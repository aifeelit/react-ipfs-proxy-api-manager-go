package controllers

import (
	"time"

	"github.com/chrilnth/apikeymanager/models"
	"github.com/gofiber/fiber"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type LogController struct {
	Collection mongo.Collection
}

func NewLogController(collection *mongo.Collection) *LogController {
	return &LogController{
		Collection: *collection,
	}
}

func (ctr *LogController) GetAll(c *fiber.Ctx) error {
	var id = c.Params("id")
	query := bson.M{"apikey": id}

	cursor, err := ctr.Collection.Find(c.Context(), query)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"message": "Something went wrong",
			"error":   err.Error(),
		})
	}

	var logs []models.Log = make([]models.Log, 0)

	err = cursor.All(c.Context(), &logs)
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
			"request": logs,
		},
	})
}

func (ctr *LogController) Create(c *fiber.Ctx) error {

	data := new(models.Log)
	data.Date = time.Now()

	err := c.BodyParser(&data)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"message": "Cannot parse JSON",
			"error":   err,
		})
	}

	data.ID = nil

	result, err := ctr.Collection.InsertOne(c.Context(), data)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"message": "Cannot insert request",
			"error":   err,
		})
	}

	log := &models.Log{}
	query := bson.D{{Key: "_id", Value: result.InsertedID}}

	ctr.Collection.FindOne(c.Context(), query).Decode(log)

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"success": true,
		"data": fiber.Map{
			"request": log,
		},
	})
}

func (ctr *LogController) GetById(c *fiber.Ctx) error {

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"success": true,
		"data": fiber.Map{
			"message": "Not implemented",
		},
	})
}

func (ctr *LogController) Update(c *fiber.Ctx) error {
	return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
		"success": false,
		"message": "Not implemented",
	})
}

func (ctr *LogController) Delete(c *fiber.Ctx) error {
	return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
		"success": false,
		"message": "Not implemented",
	})
}
