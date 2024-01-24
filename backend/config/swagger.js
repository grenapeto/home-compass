const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Home compass API',
    version: '1.0.0',
    description: 'This is the API documentation for Home compass.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'Peter Jakubow',
      url: '',
      email: 'grenapeto@gmail.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/v1',
      description: 'Development server',
    },
  ],
  tags: [
    {
      name: 'Auth',
      description: 'Authentication related routes'
    },
    {
      name: 'Recipes',
      description: 'Routes for managing recipes'
    },
    {
      name: 'Ingredients',
      description: 'Routes for handling ingredients'
    },
    {
      name: 'Inventory',
      description: 'Inventory management routes'
    },
    {
      name: 'Meal Plans',
      description: 'Routes for meal plan operations'
    },
    {
      name: 'Grocery Lists',
      description: 'Routes for managing grocery lists'
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: ['./routes/routes.js'],
};

export default options;
