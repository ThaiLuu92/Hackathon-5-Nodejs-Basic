import { getData } from "../utils/util.js";



export function checkUserExistsByEmail(req, res, next) {
  const emailToCheck = req.body.email;
  const getAllUser = getData("users");
  const isEmailExists = getAllUser.some((user) => user.email === emailToCheck);

  if (isEmailExists) {
    return res.status(409).json({
      success: false,
      message: "Email đã tồn tại",
    });
  } else {
    next(); 
  }
}

