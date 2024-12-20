package entity

import (
	"time"

	"gorm.io/gorm"
)

type Codes struct {

	gorm.Model

	CodeTopic		string		`json:"code_topic"`

	CodeDescription	string		`json:"code_description"`

	Discount		int			`json:"discount"`

	Quantity		int			`json:"quantity"`

	DateStart		time.Time	`json:"date_start"`

	DateEnd			time.Time	`json:"date_end"`

	CodeStatus		string		`json:"code_status"`

	CodePicture		string		`json:"code_picture"`




	CodeCollector []CodeCollectors `gorm:"foreignKey:code_id"`
}