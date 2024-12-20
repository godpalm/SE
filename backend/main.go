package main


import (

   "net/http"


   "github.com/gin-gonic/gin"


   "PROJECT_SE/config"


   "PROJECT_SE/controller/codes"


   "PROJECT_SE/controller/users"


   "PROJECT_SE/middlewares"
  

)


const PORT = "8000"


func main() {


   // open connection database

   config.ConnectionDB()


   // Generate databases

   config.SetupDatabase()


   r := gin.Default()


   r.Use(CORSMiddleware())

    // Auth Route

    r.POST("/signup", users.SignUp)

    r.POST("/signupadmin", users.SignUpAdmin)

    r.POST("/signin", users.SignIn)



   router := r.Group("/")

   {

        router.Use(middlewares.Authorizes())

       // User Route

	   router.GET("/codes", codes.GetAll)          // ดึงข้อมูล Codes ทั้งหมด
       router.GET("/codes/:id", codes.GetCodeById)     
	   router.POST("/codes", codes.CreateCode)    // สร้าง Code ใหม่
	   router.PUT("/codes/:id", codes.UpdateCode)  // อัปเดต Code ตาม ID
	   router.DELETE("/codes/:id", codes.DeleteCode)

       router.PUT("/user/:id", users.Update)
       router.GET("/users", users.GetAll)
       router.GET("/user/:id", users.Get)
       router.DELETE("/user/:id", users.Delete)

       router.GET("/admins", users.GetAdmin)

   }

   
   r.GET("/", func(c *gin.Context) {

       c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)

   })


   // Run the server


   r.Run("localhost:" + PORT)


}


func CORSMiddleware() gin.HandlerFunc {

   return func(c *gin.Context) {

       c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

       c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

       c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")

       c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")


       if c.Request.Method == "OPTIONS" {

           c.AbortWithStatus(204)

           return

       }


       c.Next()

   }

}