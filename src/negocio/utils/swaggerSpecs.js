import swaggerJsDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "CRUD de Productos",
            description: "NOTA: GraphQL no admite los métodos PUT y DELETE, ambos deben ser realizados con el método POST",
        },
    },
    apis: [ './docs/**/*.yaml' ],
};

const swaggerSpecs = swaggerJsDoc(options);

export { swaggerSpecs }