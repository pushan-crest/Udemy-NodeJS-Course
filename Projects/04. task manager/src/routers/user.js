const express = require("express");
const router = new express.Router();
const isAuth = require("../middleware/auth");

// connecting the models
const User = require("../models/user");

// ========================== Creating New User ==============================

router.post("/users", async (req, res) => {
  // adding the user
  const new_user = new User(req.body);
  try {
    await new_user.save();
    console.log("user inserted");
    const token = await new_user.generateWebToken();

    // const publicDisplay = new_user.getPublicProfile();
    res.status(201).send({ new_user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// =================== Getting info about current users =================

router.get("/users/me", isAuth, async (req, res) => {
  res.status(201).send(req.user);
});

// ===================== Getting info about a user by ID =====================

// router.get("/users/:id", isAuth, async (req, res) => {
//   // req.params is used to get the parameters passed in the URL (here id)
//   const _id = req.params.id;
//   try {
//     const user = await User.findById(_id);
//     if (!user) {
//       res.status(404).send("User Not Found");
//     }
//     res.status(201).send(user);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });

// ===================== Updating the  User ==========================

router.patch("/users/me", isAuth, async (req, res) => {
  const update_fields = Object.keys(req.body);
  const allowed_keys = ["name", "email", "password", "age"];

  const validoperation = update_fields.every((field) => {
    return allowed_keys.includes(field);
  });

  if (!validoperation) {
    return res.status(400).send("Not authorised for this update operation");
  }
  try {
    const user = req.user;

    update_fields.forEach((update) => {
      user[update] = req.body[update];
    });
    console.log(`user updated`);
    await user.save();

    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

// =========================  Deleting the user ======================

router.delete("/users/me", isAuth, async (req, res) => {
  const _id = req.user._id;
  try {
    await User.findOneAndDelete({ _id });
    // if (!user) {
    //   res.status(404).send(`User not found`);
    // }
    // await req.user.remove();

    // deleting the tasks asssociated with the user
    // await deleteUserTasks(_id);
    res.status(200).send(`Data Deleted`);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

// ====================== Login =================================

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateWebToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// ===================== Logout Current Instance =================================

router.post("/users/logout", isAuth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

// ==================== Logout All ===================================

router.post("/users/logoutall", isAuth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

// ===================================================================

module.exports = router;
