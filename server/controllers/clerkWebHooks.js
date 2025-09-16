import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebHooks = async (req, res) => {
    console.log("Clerk Webhook Hit");
    try {

        console.log(req.headers);
        console.log(req.body);

        //Create a Svix instance with clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        //Getting Headers
        const headers = {
            "svix-id":req.headers["svix-id"],
            "svix-timestamp":req.headers["svix-timestamp"],
            "svix-signature":req.headers["svix-signature"],
        };

        console.log("Headers:", headers);

        //Verifying Headers
        await whook.verify(req.body.toString(), headers)
        
        // const rawBody = req.body.toString();
        // await whook.verify(rawBody, headers);
        //GEtting Data from request body

        // Header varsa verify et
        // if (headers["svix-id"] && headers["svix-timestamp"] && headers["svix-signature"]) {
        //     await whook.verify(JSON.stringify(req.body), headers);
        //     console.log("Svix verification passed");
        // } else {
        //     console.log("Test mode: Svix headers yok, verify skipped");
        // }
        const {data, type} = JSON.parse(req.body.toString());

        const userData ={
            _id:data.id,
            email:data.email_addresses[0].email_address,
            username:data.first_name + " " + data.last_name,
            image: data.image_url,

        }
        console.log("User Data to Save:", userData);

        //Switch Cases for different Events
        
        switch (type) {
        case "user.created": {
            await User.create(userData);
            break;
        }
        case "user.updated": {
            await User.findByIdAndUpdate(data.id, userData, { new: true });
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
        res.json({success:true, message: "Webhook Recieved "})
    } catch (error) {
        console.error("Webhook işleme hatası:", error); 
        res.json({ success: false, message: "Webhook işlenirken bir hata oluştu." });
    }
}

export default clerkWebHooks;