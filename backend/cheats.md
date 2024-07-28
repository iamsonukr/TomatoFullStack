packages used
npm i 
express // backed 
mongoose // mongodb operations
jsonwebtoken //user login 
bcrypt  //securing password from beign hacked
cors  // make communication between frontend and backend
dotenv  // securing URLS and token ids
body-parser // parse the data coming from the user
multer // uploading and managing files
stripe // payment gateway integration
validator  // validating emails or passwords
nodemon  // run the server automatically after save 

//this line in first section to use import as react
"type": "module",
// this line in scripts to automate nodemon
"server": "nodemon server"

// Routing
routing request starts with server.js file where 
1
server.js 
app.use('/api/food',foodRouter)
2
food.routes.js
foodRouter.post('/addfood',addFood)
3
food.controller.js
const addFood = async (req, res) => {}



