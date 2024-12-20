package entity

import (

	"time"

	"gorm.io/gorm"
)

type Users struct {

	gorm.Model

	FirstName 	string    	`json:"first_name"`

   	LastName  	string    	`json:"last_name"`

  	Email     	string    	`json:"email"`

   	PhoneNumber	string		`json:"phone_number"`

   	Password  	string    	`json:"password"`

   	BirthDay  	time.Time 	`json:"birthday"`

	Role		string		`json:"role"`



	
	CodeCollector []CodeCollectors `gorm:"foreignKey:user_id"`
}