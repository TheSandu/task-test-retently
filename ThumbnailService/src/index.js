import CONFIG from "./config.js";

import Router from "./Routes/ThumbnailRouter.js";

import express from 'express';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`Time:  ${ Date.now() } | ${ req.path }`);
    next();
});

app.use("/thumbnail", Router);

app.listen(CONFIG.PORT, async() => {
    console.log(`Example app listening on port ${ CONFIG.PORT }`);
});