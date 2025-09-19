import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebHooks = async (req, res) => {
  console.log("Received Clerk Webhook");
  try {
    console.log(req.headers);
    console.log(JSON.stringify(req.body));

    //Create a Svix instance with clerk webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    //Getting Headers
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    console.log("Headers:", headers);

    await whook.verify(JSON.stringify(req.body), headers);
    const { data, type } = req.body;

    //Switch Cases for different Events

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          username: data.first_name + " " + data.last_name,
          image: data.image_url,
        };
        await User.create(userData);
        console.log("User Created:", userData);
        res.json({ success: true, message: "User Created" });
        break;
      }
      case "user.updated": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          username: data.first_name + " " + data.last_name,
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        break;
      }
      default:
        console.log("Unhandled webhook type:", type);
        break;
    }
    res.json({ success: true, message: "Webhook Recieved " });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export default clerkWebHooks;
