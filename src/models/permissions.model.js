const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const subPermission = {
    route: {
        type: String,
        trim: true,
    },
    create: {
        type: Boolean,
    },
    delete: {
        type: Boolean,
    },
    update: {
        type: Boolean,
    },
    view: {
        type: Boolean,
    },
};

const permissionsSchema = mongoose.Schema(
    {
        groupName: {
            type: String,
            trim: true,
            unique: true,
            validate: {
                validator: async function (value) {
                    const existingGroup = await this.constructor.findOne({
                        groupName: value,
                    });
                    return !existingGroup;
                },
                message: 'Permission group with the same name already exists.',
            },
        },
        permissions: [subPermission],
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
permissionsSchema.plugin(toJSON);
permissionsSchema.plugin(paginate);

/**
 * @typedef User
 */
const Permission = mongoose.model('Permissions', permissionsSchema);

module.exports = Permission;
