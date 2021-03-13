'use strict'


module.exports = function(sequelize, DataTypes) {
    const Products = sequelize.define('Products', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },

        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'products',
        timestamps: false,
    });

    Products.associate = function(models) {

    };
    return Products;
};