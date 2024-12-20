package codes

import (

	"net/http"

	"github.com/gin-gonic/gin"
	"PROJECT_SE/config"
	"PROJECT_SE/entity"

)

func GetAll(c *gin.Context) {

	db := config.DB()

	var codes []entity.Codes

	db.Find(&codes)

	c.JSON(http.StatusOK, &codes)
}

func GetCodeById(c *gin.Context) {
	ID := c.Param("id")
	var code entity.Codes

	db := config.DB()
	results := db.First(&code, ID)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if code.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, code)
}

func CreateCode(c *gin.Context) {

    var newCode entity.Codes // สร้างตัวแปรสำหรับเก็บข้อมูล Code ใหม่

    // ผูก JSON ที่ส่งมาจาก Request Body กับตัวแปร newCode
    if err := c.ShouldBindJSON(&newCode); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // เชื่อมต่อกับฐานข้อมูล
    db := config.DB()

	nc := entity.Codes{

		CodeTopic:	newCode.CodeTopic,

		CodeDescription: newCode.CodeDescription,
	
		Discount:	newCode.Discount,

		Quantity: newCode.Quantity,

		DateStart: newCode.DateStart,

		DateEnd: newCode.DateEnd,

		CodeStatus: newCode.CodeStatus,

		CodePicture: newCode.CodePicture,
		
	}

    // บันทึกข้อมูลลงในฐานข้อมูล
    if err := db.Create(&nc).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    // ส่งข้อมูลที่สร้างสำเร็จกลับไป
    c.JSON(http.StatusCreated, gin.H {"message": "Code created successfully","code": nc})
}


func UpdateCode(c *gin.Context) {

	var code entity.Codes

	CodeID := c.Param("id")

	db := config.DB()
	result := db.First(&code, CodeID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&code); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&code)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}


func DeleteCode(c *gin.Context) {

	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM codes WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}
