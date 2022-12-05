const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const { validateBody, authenticate } = require("../../middlewares");
const ctrl = require("../../controllers/auth");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);
router.post(
  "/login",
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.login)
);

router.get("/current", authenticate, ctrlWrapper(ctrl.current));
router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

module.exports = router;
