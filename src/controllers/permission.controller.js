const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { permissionServices, userService } = require('../services');

const addpermission = catchAsync(async (req, res) => {
    const permission = await permissionServices.addPermission(req.body);
    if (!permission) {
        throw new ApiError(500, 'Something went wrong');
    }
    res.status(httpStatus.OK).send(permission);
});
const getAllpermissions = catchAsync(async (req, res) => {
    const filter = pick(req.query, []);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const permissions = await permissionServices.getPermissions(
        filter,
        options
    );
    if (!permissions) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Something went wrong');
    }
    res.status(httpStatus.OK).send(permissions);
});
const deletepermission = catchAsync(async (req, res) => {
    const permission = await permissionServices.deletePermission(
        req.params.groupId
    );
    res.status(httpStatus.OK).send({
        message: 'Permission deleted successfully!',
    });
});
const updatepermission = catchAsync(async (req, res) => {
    const permission = await permissionServices.updatePermission(
        req.params.groupId,
        req.body
    );
    res.status(httpStatus.OK).send(permission);
});
const getpermission = catchAsync(async (req, res) => {
    const permission = await permissionServices.getPermissionById(
        req.params.groupId
    );
    res.status(httpStatus.OK).send(permission);
});
const getGroupUsers = catchAsync(async (req, res) => {
    const users = await userService.getAllUsersByGroupId(req.params.groupId);
    res.status(httpStatus.OK).send(users);
});

module.exports = {
    addpermission,
    getAllpermissions,
    updatepermission,
    deletepermission,
    getpermission,
    getGroupUsers,
};
