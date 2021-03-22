package models

import (
	"time"
)

type ApiKey struct {
	ID        *string   `json:"-" bson:"_id,omitempty"`
	ApiKey    *string   `json:"apikey"`
	Disabled  *bool     `json:"disabled"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}
