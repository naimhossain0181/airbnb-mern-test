const express =require("express")
const router =express.Router()
const test =require("../controllers/testController")
const AuthController =require("../controllers/AuthController")
const ProductController=require("../controllers/ProductController")


router.get("/",test.user)

router.post("/signup",AuthController.CreateUser)
router.post("/categoryAdd",ProductController.CategoryAdd)
router.post("/propertyAdd",ProductController.PropertyAdd)
router.post("/productAdd",ProductController.AddProduct)
router.get("/allcategory",ProductController.FindAllCategory)
router.get("/allproperty",ProductController.FindAllProperty)
router.get("/find",ProductController.FindProduct)
router.get("/findbycategory",ProductController.FindProductByCategory)
router.get("/findbydate",ProductController.FindProductByDate)
router.get("/findminmax",ProductController.FindMinMaxPrice)
router.get("/filters",ProductController.FiltersProducts)



module.exports = router;
