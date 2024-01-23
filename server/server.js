const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(cookieParser());

require("./config/mongoose.config");
require('dotenv').config();

require("./routes/user.routes")(app);
require("./routes/event.routes")(app);
require("./routes/message.routes")(app);
require("./routes/location.routes")(app);

app.listen(port, ()=> console.log(`Express is listening on port ${port}`));