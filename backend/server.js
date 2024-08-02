const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const rootRouter = require("./router/index")

app.use(cors());
app.use(express.json());

app.use("/api/v1",rootRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})