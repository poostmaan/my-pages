const { Router } = require("express");
const {
  getUsers,
  getUser,
  createUser,
  putUser,
  deleteUser,
  signin,
} = require("../controllers/users");
const router = Router();

router.post("/signin", signin);
router.get("/:id", getUser);
router.get("/", getUsers);
router.post("/", createUser);
router.put("/:id", putUser);
router.delete("/:id", deleteUser);

module.exports = router;
