const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan')
const winston = require('winston')
const fs = require('fs')

const app = express();

const logStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})

// Middleware to parse form data
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: logStream }))
app.use(morgan('combined'))
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

 


// Configure Multer storage options
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
  }
});
const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter 
});

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/foodDeliveryApp', {

});


// Define a schema and model for Product
const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  isListed: Boolean,
  stock: Number,
  imagepath: String // Store the path to the image
});

const Product = mongoose.model('Product', productSchema);

// Endpoint to render the form
app.get('/',(req,res)=>{
    res.render('upload');
})

// Endpoint to handle form submission
app.post('/add-product', upload.single("imageInput"), async (req, res) => {
  try {
    console.log('reached inside post route')

    if (!req.file) {
      throw new Error('File not uploaded or invalid file type');
    }

    const { name, category, price, isListed, stock } = req.body;
   const imagepath= `/uploads/${req.file.filename}`


   console.log("this is the imagepath from the post (add product route ) ", imagepath)
   console.log("thisis the name from the post (add product route ) ", name)

   
    const newProduct = new Product({
      name,
      category,
      price,
      isListed: isListed === 'on', // Handle checkbox value
      stock, 
      imagepath  
    });

    await newProduct.save();
    console.log("Reached the post route")
   res.render('thepostpart')
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding product', error });
  }
});


app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();

    res.render('products', { products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting products', error });
  }
});




// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});