import mongoose from "mongoose"

let alreadyDone = false;

export const dbConnect = () => {
    if (alreadyDone) {
        return;
    }
    alreadyDone = true;
    mongoose.connect('mongodb+srv://saad76:EKrYWkWPUSQHTLLn@cluster0.wgmqb0q.mongodb.net/',
        { dbName: "Coursedb" });
}