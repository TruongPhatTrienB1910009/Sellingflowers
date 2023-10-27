import express from 'express';
const router = express.Router();
const adminUserController = require('../../controllers/admin/admin.user.controller');

router.route("/")
    .get(adminUserController.getAllUsers)


router.route("/:id")
    .get(adminUserController.getDetailsUserByAdmin)

module.exports = router