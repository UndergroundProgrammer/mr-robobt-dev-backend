const Joi = require('joi').extend(require('@joi/date'));
const { objectId } = require('./custom.validation');

const subPermission = Joi.object({
    route: Joi.string(),
    create: Joi.boolean(),
    delete: Joi.boolean(),
    update: Joi.boolean(),
    view: Joi.boolean(),
    _id: Joi.custom(objectId),
});
const addPermission = {
    body: Joi.object({
        groupName: Joi.string().required(),
        permissions: Joi.array().items(subPermission),
    }),
};
const updatePermission = {
    params: Joi.object({
        groupId: Joi.string().custom(objectId),
    }),
    body: Joi.object({
        groupName: Joi.string().trim(),
        permissions: Joi.array().items(subPermission),
    }),
};
const PermissionById = {
    params: Joi.object({
        groupId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    addPermission,
    updatePermission,
    PermissionById,
};
