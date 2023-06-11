const express = require('express');
const validate = require('../middlewares/validate');
const { permissionsValidation } = require('../validations');
const { permissionController } = require('../controllers');

const router = express.Router();

router
    .route('/')
    .post(
        validate(permissionsValidation.addPermission),
        permissionController.addpermission
    )
    .get(permissionController.getAllpermissions);
router
    .route('/:groupId')
    .get(
        validate(permissionsValidation.PermissionById),
        permissionController.getpermission
    )
    .put(
        validate(permissionsValidation.updatePermission),
        permissionController.updatepermission
    )
    .delete(
        validate(permissionsValidation.PermissionById),
        permissionController.deletepermission
    );

module.exports = router;
