import dbConnect from "../dbConnect";
import User from "../../models/User";
// import { User, Account } from "next-auth";

export type ReqUser = {
  id: string;
  email: string;
  name: string;
  image: string;
  provider: string;
};

export type userTokens = {
  id: string;
  firebaseUid: string;
};

export type ResUser = ReqUser & {
  isAdmin: boolean;
};

export const getUser = async (id: string) => {
  await dbConnect();
  const user = await User.findOne({ id }).exec();
  console.log(user, "USER");
  return user;
};

export const createUser = async (user: ReqUser) => {
  await dbConnect();
  var newUser = new User({
    ...user,
    completed: false,
    createdAt: new Date(),
  });  console.log("CREATE USER")

  // const response = db.collection("users").insertOne({
  //   ...user,
  //   completed: false,
  //   createdAt: new Date(),
  // });
   // Create new user
 var usercreated = await newUser.save();
 console.log(usercreated, "usercreated");

 return usercreated;

};
