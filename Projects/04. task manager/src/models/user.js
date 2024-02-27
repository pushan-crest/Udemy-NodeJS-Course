const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./task");

// ================ Defining the Schema ==================

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    age: {
      // by default there is type validation in mongoose
      type: Number,
      min: 18,

      // Custom validation
      validate(val) {
        if (val < 0) {
          throw new Error("Invalid Input!! Cannot enter negative value");
        }
      },
    },

    email: {
      type: String,
      required: true,
      unique: true,

      // Using validator npm package
      validate(val) {
        if (!validator.isEmail(val)) {
          throw new Error("Enter valid Email");
        }
      },

      // convert to lowercase
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
      validate(val) {
        if (val.toLowerCase().includes("password")) {
          throw new Error("you cannot include 'password' in password");
        }
      },
    },

    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// =================== Find By Credentials - Login ==============

// schema.statics: These are methods that you define on the model itself. They are static methods that you can call directly on the model without needing to instantiate it. They are useful for operations that involve the entire collection or querying the database.

// We can define methods that can be used on the Model
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).send("User Not Found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(400).send("Invalid Password");
  }

  return user;
};

// ======================== hash the password =====================

// Doing Something before the user is saved - Hash the plaintext password
userSchema.pre("save", async function (next) {
  const user = this;

  // Checking if the password of the user is modified
  if (user.isModified("password")) {
    try {
      user.password = await bcrypt.hash(user.password, 8);
    } catch (error) {
      return next(error);
    }
  }

  // this method is used to end the pre task
  next();
});

//===================== JWT - JSON Web Tokens =========================

// schema.methods: These are methods that you define on the schema, but they are instance methods. They are accessible on individual document instances created from the model. They are useful for operations that are specific to a single document or involve manipulating the document's data.

// Token - ********.********.********
//          header . body . signature

// userSchema.methods.generateWebToken = async function () {
//   const user = this;
//   const token = jwt.sign({ _id: user._id.toString() }, "task-manager");
//   console.log(token);
//   return token;
// };
userSchema.method("generateWebToken", async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "task-manager");

  // storing the token in the user
  user.tokens = user.tokens.concat({ token });

  await user.save();
  return token;
});

// ===================== Displaying Public Information ==============

// this method is getPublicProfile but is name toJSON bcoz this will automatically apply to each and every field

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

// ====================== Deleting tasks with no user ===========

const deleteUserTasks = async (userId) => {
  try {
    await Task.deleteMany({ user: userId });
  } catch (error) {
    console.error("Error deleting tasks:", error);
    throw error;
  }
};

// ===================== Creating the Model =========================

// Model is like making the schema for a collection and nameing it
// collection: user_data
// second arguement: schema
const User = mongoose.model("user_data", userSchema);

// =================== Export =====================

module.exports = User;

// =============================================

// Adding a document to the collection
//   const me = new User({
//     name: "Andrew",
//     age: 32,
//     email: "andrew@gmail.com",
//     password: "andrew123",
//   });

// save() method is used to save the data in the database
//   me.save()
//     .then(() => {
//       console.log(me);
//     })
//     .catch((error) => {
//       console.log("Error!", error);
//     });

// ================== STRING METHODS ==============================

/*
 - lowercase: boolean, whether to always call .toLowerCase() on the value
 - uppercase: boolean, whether to always call .toUpperCase() on the value
 - trim: boolean, whether to always call .trim() on the value
 - match: RegExp, creates a validator that checks if the value matches the given regular expression
 - enum: Array, creates a validator that checks if the value is in the given array.
 - minLength: Number, creates a validator that checks if the value length is not less than the given number
 - maxLength: Number, creates a validator that checks if the value length is not greater than the given number
 - populate: Object, sets default populate options
*/
