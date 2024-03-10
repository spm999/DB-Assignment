// Import necessary modules
const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with your database credentials
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql', // We can use other dialects like 'postgres', 'sqlite', etc.
  logging: false // Disable logging SQL queries to console
});

// Define Product table schema
const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  desc: {
    type: DataTypes.TEXT
  },
  SKU: {
    type: DataTypes.STRING
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Product_Category',
      key: 'id'
    }
  },
  inventory_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Product_Inventory',
      key: 'id'
    }
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  discount_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Discount',
      key: 'id'
    }
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  modified_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  deleted_at: {
    type: DataTypes.DATE
  }
});

// Define Product_Inventory table schema
const ProductInventory = sequelize.define('ProductInventory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  modified_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  deleted_at: {
    type: DataTypes.DATE
  }
});

// Define Discount table schema
const Discount = sequelize.define('Discount', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  desc: {
    type: DataTypes.TEXT
  },
  discount_percent: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  modified_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  deleted_at: {
    type: DataTypes.DATE
  }
});

// Define Product_Category table schema
const ProductCategory = sequelize.define('ProductCategory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  desc: {
    type: DataTypes.TEXT
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  modified_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  deleted_at: {
    type: DataTypes.DATE
  }
});

// Define relationships between tables
Product.belongsTo(ProductCategory, { foreignKey: 'category_id' });
Product.belongsTo(Discount, { foreignKey: 'discount_id' });
Product.belongsTo(ProductInventory, { foreignKey: 'inventory_id' });

// Sync the schema with the database
sequelize.sync()
  .then(() => {
    console.log('Database schema synchronized.');
  })
  .catch(err => {
    console.error('Error synchronizing database schema:', err);
  });

// Export models if needed
module.exports = {
  Product,
  ProductInventory,
  Discount,
  ProductCategory
};
