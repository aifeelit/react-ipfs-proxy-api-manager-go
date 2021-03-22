package models

import (
	"time"
)

type Log struct {
	ID     *string   `json:"-" bson:"_id,omitempty"`
	Apikey *string   `json:"apikey"`
	Size   int       `json:"size"`
	Date   time.Time `json:"date"`
}
