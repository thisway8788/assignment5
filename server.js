/************************************************************************************
 *  WEB322 – Assignment 5 (Winter 2021)
 *  I declare that this assignment is my own work in accordance with Seneca Academic
 *  Policy. No part of this assignment has been copied manually or electronically from
 *  any other source (including web sites) or distributed to other students.
 * Name: Jeunghak Ham
 * Student ID: 110214194 Course: WEB322NDD
 ************************************************************************************/

const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const data = require("./data");
const bodyParser = require("body-parser");
const utils = require("./utils");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const clientSessions = require("client-sessions");
const { User } = require("./models/user");
const multer = require("multer");
const { Meal } = require("./models/meal");

const storage = multer.diskStorage({
  destination: "./assets/upload",
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

const saltRounds = 10;

const app = express();
app.engine(".hbs", exphbs({ extname: ".hbs", defaultLayout: "main" }));
app.set("view engine", ".hbs");

app.use(
  clientSessions({
    cookieName: "session",
    secret: "week10example_web322",
    duration: 10 * 60 * 1000,
    activeDuration: 1000 * 60,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://dbUser:&&Didwnfl1021@cluster0.air7g.mongodb.net/web322_as?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

const HTTP_PORT = process.env.PORT || 8080;
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

app.use(express.static(path.join(__dirname, "/")));

app.get("/", function (req, res) {
  // const topMeals = data.getTopMeals();

  Meal.find({ topmeal: true }, function (err, meals) {
    const topMeals = [];
    for (let meal of meals) {
      topMeals.push(meal.toObject());
    }

    res.render("index", {
      data: {
        topMeals,
        login: req.session.user ? true : false,
        firstName: req.session.user ? req.session.user.firstName : "",
        lastName: req.session.user ? req.session.user.lastName : "",
        clerk: req.session.user && req.session.user.role == 'clerk',
      },
    });
  });
});

app.get("/login", function (req, res) {
  res.render("login", {
    data: {},
  });
});

app.post("/login", function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const type = req.body.role;

  if (!email || !password) {
    res.render("login", {
      data: {
        email: req.body.email,
        password: req.body.password,

        emailError: req.body.email === null || req.body.email === "",

        passwordError: req.body.password === null || req.body.password === "",
      },
    });
  }

  User.findOne({
    email: email,
  })
    .exec()
    .then((user) => {
      console.log(user);
      if (!user) {
        //해당하는 유저가 없을때
        res.render("login", {
          data: {
            email: req.body.email,
            password: req.body.password,
            emailNotFoundError: true,
          },
        });
      } else {
        bcrypt.compare(password, user.password, function (err, result) {
          if (result) {
            req.session.user = {
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              role: type,
            };

            if (type === "clerk") {
              res.redirect("/clerk-dashboard");
            } else if (type === "customer") {
              res.redirect("/customer-dashboard");
            }
          } else {
            console.log("password doe not match");

            res.render("login", {
              data: {
                error: true,
              },
              layout: false,
            });
          }
        });
      }
    })

    .catch((error) => {
      console.log(error);
    });
});

app.post("/signup", function (req, res) {
  if (
    req.body.first === null ||
    req.body.first === "" ||
    req.body.last === null ||
    req.body.last === "" ||
    !utils.isEmail(req.body.email) ||
    !utils.isEmail(req.body.email)
  ) {
    res.render("signup", {
      data: {
        firstName: req.body.first,
        lastName: req.body.last,
        firstNameError: req.body.first === null || req.body.first === "",
        lastNameError: req.body.last === null || req.body.last === "",
        email: req.body.email,
        password: req.body.password,

        emailError: !utils.isEmail(req.body.email),

        passwordError: !utils.isPassword(req.body.password),
      },
    });
  } else {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(req.body.password, salt, function (err, hash) {
        const user = new User({
          email: req.body.email,
          password: hash,
          firstName: req.body.first,
          lastName: req.body.last,
        });

        user.save((err, userInfo) => {
          if (err) {
            console.log(err);
            if (err.code === 11000) {
              res.render("signup", {
                data: {
                  firstName: req.body.first,
                  lastName: req.body.last,
                  firstNameError:
                    req.body.first === null || req.body.first === "",
                  lastNameError: req.body.last === null || req.body.last === "",
                  email: req.body.email,
                  password: req.body.password,

                  emailError: !utils.isEmail(req.body.email),

                  passwordError: !utils.isPassword(req.body.password),

                  emailDuplicationError: true,
                },
              });
            }
          }
          
          else {
            const sgMail = require("@sendgrid/mail");
            sgMail.setApiKey(
              process.env.SENDGRID_API_KEY
            );
            const msg = {
              to: req.body.email, // Change to your recipient
              from: "motherfatherilu@gmail.com", // Change to your verified sender
              subject: `Welcome to Toronto Best Lunch Box`,
              text: `Thank you, ${req.body.first} ${req.body.last}`,
              html: `<strong>Thank you, ${req.body.first} ${req.body.last}</strong>`,
            };
            sgMail
              .send(msg)
              .then(() => {
                console.log("Email sent");
              })
              .catch((error) => {
                console.error(error);
              });
            res.redirect("/welcome");
          }
        });
      });
    });
  }
});

app.get("/welcome", function (req, res) {
  res.render("welcome", {
    data: {},
  });
});

app.get("/signup", function (req, res) {
  res.render("signup", {
    data: {},
  });
});

app.get("/onthemenu", function (req, res) {
  const lunchBoxMeals = data.getMealsByCategoryName("Lunch Box");
  const singleMeals = data.getMealsByCategoryName("Single");

  Meal.find({}, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      const categories = [];
      for (let meal of data) {
        if (!categories.includes(meal.category)) {
          categories.push(meal.category);
        }
      }

      const menus = [];
      for (let i = 0; i < categories.length; i++) {
        menus.push({
          group: categories[i],
          meals: [],
        });
        for (let j = 0; j < data.length; j++) {
          if (data[j].category === categories[i]) {
            menus[i].meals.push(data[j].toObject());
          }
        }
      }

      res.render("onthemenu", {
        data: {
          menus,
          login: req.session.user ? true : false,
          firstName: req.session.user ? req.session.user.firstName : "",
          lastName: req.session.user ? req.session.user.lastName : "",
          clerk: req.session.user && req.session.user.role == 'clerk',
        },
      });
    }
  });
});

app.get("/clerk-dashboard", function (req, res) {
  if (!req.session.user) {
    res.redirect("/login");
  } else if (req.session.user.role != "clerk") {
    res.send("Only visible for clerks");
  }

  const firstName = req.session.user.firstName;
  const lastName = req.session.user.lastName;

  Meal.find({})
    .sort({
      createdAt: -1,
    })
    .exec()
    .then((meals) => {
      meals = meals.map((value) => value.toObject());

      res.render("clerk-dashboard", {
        data: {
          firstName,
          lastName,
          login: true,
          meals,
          clerk: req.session.user && req.session.user.role == 'clerk',
        },
      });
    });
});

app.get("/addmeal", function (req, res) {
  if (!req.session.user) {
    res.redirect("/login");
  } else if (req.session.user.role != "clerk") {
    res.send("Only visible for clerks");
  }

  res.render("add-meal", {
    data: {
      firstName: req.session.user.firstName,
      lastName: req.session.user.lastName,
      login: req.session.user ? true : false,
      clerk: req.session.user && req.session.user.role == 'clerk',
    },
  });
});

app.post("/addmeal", upload.single("image"), function (req, res) {
  //Form ㅇㅡ로부터 데이터를 받는다
  const meal = req.body;

  meal.included = meal.included.split(",").map((s) => s.trim());
  meal.topmeal = meal.topmeal == "on" ? true : false;
  meal.image = req.file.filename;

  console.log(meal);

  const mealkit = new Meal(meal);
  mealkit.save((err, meal) => {
    if (err) {
      console.log("error (add a meal)");
      res.send("Fail");
    } else {
      console.log("success", meal);
      res.redirect("/clerk-dashboard");
    }
  });
});

app.get("/editmeal/:id", function (req, res) {
  if (!req.session.user) {
    res.redirect("/login");
  } else if (req.session.user.role != "clerk") {
    res.send("Only visible for clerks");
  }
//
  const id = req.params.id;
  Meal.findOne({ _id: id })
    .exec()
    .then((meal) => {
      meal = meal.toObject();
      meal.included = meal.included.join(",");
      res.render("edit-meal", {
        data: {
          firstName: req.session.user.firstName,
          lastName: req.session.user.lastName,
          login: req.session.user ? true : false,
          meal,
          clerk: req.session.user && req.session.user.role == 'clerk',

          root: "../",
        },
      });
    })

    .catch((err) => {});
});

app.post("/editmeal/:id", upload.single("image"), function (req, res) {
  if (!req.session.user) {
    res.redirect("/login");
  } else if (req.session.user.role != "clerk") {
    res.send("Only visible for clerks");
  }

  const meal = req.body;

  meal.included = meal.included.split(",").map((s) => s.trim());
  meal.topmeal = meal.topmeal == "on" ? true : false;
  if (req.file) {
    meal.image = req.file.filename;
  } else {
    meal.image = meal.image_original;
  }

  console.log(meal);

  const mealkit = new Meal(meal);

  const id = req.params.id;
  Meal.updateOne({ _id: id }, meal, function (err, docs) {
    if (err) {
      console.log(err);
      res.send("Fail");
    } else {
      console.log("success");
      res.redirect("/clerk-dashboard");
    }
  });
});

app.get("/customer-dashboard", function (req, res) {
  if (!req.session.user) {
    res.redirect("/login");
  } else if (req.session.user.role != "customer") {
    res.send("Only visible for customers");
  }
  const firstName = req.session.user.firstName;
  const lastName = req.session.user.lastName;
  res.render("customer-dashboard", {
    data: {
      firstName,
      lastName,
      login: true,
      clerk: req.session.user && req.session.user.role == 'clerk',
    },
  });
});

app.get("/logout", function (req, res) {
  req.session.reset();
  res.redirect("/login");
});

app.listen(process.env.PORT || 3000, onHttpStart);
