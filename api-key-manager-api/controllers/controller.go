package controllers

import (
	"github.com/gofiber/fiber"
)
type Controller interface{
	GetAll(c *fiber.Ctx)
	Create(c *fiber.Ctx)
	GetById(c *fiber.Ctx)
	Update(c *fiber.Ctx)
	Delete(c *fiber.Ctx)
}