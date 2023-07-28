const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUsers,
  getUser,
  createUser,
  putUser,
  deleteUser,
  signin,
} = require("../controllers/users");
const { validateUser } = require("../middlewares/users");
const router = Router();

router.post("/signin", 
  check("user", "User is not defined or its value it is not correct").notEmpty(),
  check("password")
    .notEmpty().withMessage("Password is not defined or its value it is not correct")
    .isLength({ min: 2, max: 16}).withMessage("Password must contain min 2 and max 16 characters"),
  validateUser
, signin);
router.get("/:id", getUser);
router.get("/", getUsers);
router.post("/", createUser);
router.put("/:id", putUser);
router.delete("/:id", deleteUser);

module.exports = router;
