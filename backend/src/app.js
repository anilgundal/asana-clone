const express = require('express');
const fileUpload = require('express-fileupload');
const helmet = require('helmet');
const path = require('path');
const cors = require('cors');
const config = require('./config');
const loaders = require('./loaders');
const events = require('./scripts/events');
const errorHandler = require("./middlewares/errorHandler");
const { ProjectRoutes, UserRoutes, SectionRoutes, TaskRoutes } = require('./routes');
const PORT = process.env.NODE_DOCKER_PORT || 8080;


config();
loaders();
events();

const app = express();
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "./", "uploads")));
app.use(express.json());
app.use(helmet());
app.use(fileUpload());


app.listen(PORT, () => {
    console.log(`Sunucu çalıştı. ${PORT}`);
    app.use("/projects", ProjectRoutes);
    app.use("/users", UserRoutes);
    app.use("/sections", SectionRoutes);
    app.use("/tasks", TaskRoutes);

    app.use((req, res, next) => {
        const error = new Error("Aradığınız sayfa bulunamadı!");
        error.status = 404;
        next(error);
    });
    // Error handling
    app.use(errorHandler);
});