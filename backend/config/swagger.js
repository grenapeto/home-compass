const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'This is the API documentation for My API.',
      license: {
        name: 'Licensed Under MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Developer',
        url: '',
        email: 'developer@example.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/v1',
        description: 'Development server',
      },
    ],
  };
  
  const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/routes.js'], // Adjust the path according to your project structure
  };
  
  export default options;
  