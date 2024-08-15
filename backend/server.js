const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const rootRouter = require("./router/index")
const bodyParser = require('body-parser');

app.use(cors({
  origin: 'http://localhost:5173', // Replace with your client’s origin
  credentials: true,
}));

app.use(express.json());

// Configure body-parser middleware with increased limit
app.use(bodyParser.json({ limit: '100mb' })); // Increase the limit as needed
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

app.use("/api/v1",rootRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})