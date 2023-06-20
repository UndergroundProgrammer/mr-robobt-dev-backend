const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Permission } = require('../models');
const addPermission = async (permissionData) => {
    const permission = await Permission.create(permissionData);
    if (!permission) {
        throw new ApiError(500, 'Something went wrong');
    }
    return permission;
};
const getPermissions = async (filters, options) => {
    const permissions = await Permission.paginate(filters, options);
    if (!permissions) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No Permission Found!');
    }
    return permissions;
};
const updatePermission = async (permissionId, newPermission) => {
    const permission = await Permission.findByIdAndUpdate(
        permissionId,
        {
            $set: {
                groupName: newPermission.groupName,
                ...newPermission.permissions.reduce(
                    (acc, permission, index) => ({
                        ...acc,
                        [`permissions.${index}`]: permission,
                    }),
                    {}
                ),
            },
        },
        {
            arrayFilters: newPermission.permissions.map((p) => ({
                'elem.route': p.route,
            })),
            new: true,
        }
    );

    if (!permission) throw new ApiError(httpStatus.NOT_FOUND, 'No group Found');

    return permission;
};
const deletePermission = async (permissionId) => {
    const permission = await Permission.findByIdAndDelete(permissionId);
    if (!permission)
        throw new ApiError(httpStatus.NOT_FOUND, 'Permission not Found');
    return true;
};
const getPermissionById = async (permissionId) => {
    const permission = await Permission.findById(permissionId);
    if (!permission)
        throw new ApiError(httpStatus.NOT_FOUND, 'Permission not found!');
    return permission;
};
module.exports = {
    addPermission,
    getPermissions,
    getPermissionById,
    deletePermission,
    updatePermission,
};
