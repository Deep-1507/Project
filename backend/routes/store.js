const express = require("express");
const router = express.Router();
const zod = require("zod");
const { User, Stores, SessionDetails } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const bcrypt = require("bcrypt");
const { authMiddleware } = require("../middleware");

const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  location: zod.string(),
  password: zod.string().min(6), // Ensure password has a minimum length
});

router.post("/signup", async (req, res) => {
  try {
    // Input validation check
    const result = signupBody.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Input specified in incorrect format",
      });
    }

    // Existing user check
    const existingUser = await Stores.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(409).json({
        message: "Existing user",
      });
    }

    const hashedpassword = await bcrypt.hash(req.body.password, 10);

    // When both checks are successful, add user to the database
    const user = await Stores.create({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      location:req.body.location,
      password: hashedpassword
    });

    const userId = user._id;
    const token = jwt.sign({ userId }, JWT_SECRET);

    res.status(201).json({
      message: "Store created successfully",
      token: token,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Error during Store signup:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

//signin route

const signinBody = zod.object({
  uid:zod.string(),
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      message: "Input specified in incorrect format",
    });
  }

  const test_user = await Stores.findOne({
    username: req.body.username,
  });

  if (!test_user) {
    return res.status(401).json({
      message: "Not a registered Store",
    });
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    test_user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        userId: test_user._id,
      },
      JWT_SECRET
    );

    return res.status(200).json({
      message: "Welcome Store, you are logged in",
      token: token,
      user: {
        id: test_user._id,
        username: test_user.username,
      
      },
    });
  }

  res.status(401).json({
    message: "Password incorrect",
  });
});








router.get("/get-users-details", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";

  try {
    const users = await User.find({
      username: {
        $regex: filter, 
        $options: "i"
      }
    });

    res.json({
      user: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/details", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId; //took userId from token and this userId was snet by authMiddleware
    const storeDetails = await Stores.findById(userId);

    if (!storeDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      store: {
        username: storeDetails.username,
        firstName: storeDetails.firstName,
        lastName: storeDetails.lastName,
        _id: storeDetails._id,
        location:storeDetails.location
      },
    });
  } catch (error) {
    console.error("Error fetching store details:", error);
    res.status(500).json({ message: "Server error" });
  }
}); 

 
router.post('/create-session', async (req, res) => {
  try {
      // Extract data from request body
      const { sessionDate, sessionTime, storeId, userId, Items, billingAmount,storeHandlersName,customersName } = req.body;

      // Validate the required fields
      if (!sessionDate || !sessionTime || !storeId || !userId || !Items || !billingAmount) {
          return res.status(400).json({ message: 'All fields are required' });
      }

      // Create a new session document
      const newSession = new SessionDetails({
          sessionDate,
          sessionTime,
          storeId,
          userId,
          Items,
          billingAmount,
          storeHandlersName,
          customersName
      });

      // Save the document to the database
      const savedSession = await newSession.save();

      // Respond with the saved session data
      res.status(201).json(savedSession);
  } catch (error) {
      console.error('Error creating session:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});






//update route

// const updateBody = zod.object({
//     password:zod.string().optional(),
//     firstName:zod.string().optional(),
//     lastName:zod.string().optional(),
// })

// router.put("/update",authMiddleware,async(req,res) => {
//     const {success} = updateBody.safeParse(req.body)

//     if(!success){
//         return res.status(411).json({
//              message: "Input specified in wrong format"
//         })
//     }

//     await User.updateOne({_id:req.userId}, req.body);

//     res.json({
//         message:"Details updated successfully"
//     })
// })



//Route to send the details of the users to appear on the user's page according to searching


router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";
  const userPositionIndex = req.query.userPositionIndex;
  const userid = req.query.userid;

  const users = await User.find({
    $and: [
      {
        $or: [
          {
            firstName: {
              $regex: filter,
            },
          },
          {
            lastName: {
              $regex: filter,
            },
          },
        ],
      },
      {
        positionseniorityindex: { $lte: userPositionIndex },
      },
      {
        _id: { $ne: userid },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
      position: user.position,
      positionseniorityindex: user.positionseniorityindex,
    })),
  });
});

module.exports = router;
