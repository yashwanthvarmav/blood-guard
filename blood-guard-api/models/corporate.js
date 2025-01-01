'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Corporate extends Model {
    static associate(models) {
      // Establishing relationship with Organization model
      Corporate.belongsTo(models.Organization, {
        foreignKey: 'organization_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      });
    }
  }

  Corporate.init(
    {
      corporate_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      organization_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Organizations',
          key: 'id'
        }
      },
      corporate_company_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      corporate_company_branch: {
        type: DataTypes.STRING,
        allowNull: false
      },
      corporate_camp_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      corporate_spoc_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      corporate_spoc_designation: {
        type: DataTypes.STRING,
        allowNull: false
      },
      corporate_email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      corporate_phone_number: {
        type: DataTypes.STRING,
        allowNull: false
      },
      corporate_address_line_one: {
        type: DataTypes.STRING,
        allowNull: true
      },
      corporate_address_line_two: {
        type: DataTypes.STRING,
        allowNull: true
      },
      corporate_city: {
        type: DataTypes.STRING,
        allowNull: true
      },
      corporate_state: {
        type: DataTypes.STRING,
        allowNull: false
      },
      corporate_zip_code: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      corporate_message: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      support_status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['Pending', 'Approved', 'Rejected']]
        }
      },
      support_remarks: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'Corporate',
      tableName: 'Corporates',
      timestamps: true,
      paranoid: true,
      underscored: true
    }
  );

  return Corporate;
};
