import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        openapi: "3.0.0",
        info: {
            title: "Smart Task API",
            version: "1.0.0",
            description: "API documention for Smart Task Management Backend",
        },
        servers: [
            {
                url: "http://localhost: 5000",
            },
        ],
    },
    apis: ["./src/routes/*.js"] // reads routes comments
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;