import express from 'express';
import {sequelize} from './database/models/index.js'
import router from './Routes/routes.js';
import cors from 'cors'
const app = express();
app.use(cors())
app.use(router);

app.listen(3000, async()=>{
    console.log("Server listining on port 3000");
    await sequelize.authenticate();
    console.log("Database connected");
})

export default app