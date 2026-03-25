import dotEnv from "dotenv";

dotEnv.config({ path: './.env' });


const PORT = process.env.PORT || 4000;

const MONGO_URI = process.env.MONGO_URI;

const APP_SECRET = process.env.APP_SECRET || "APP_SECRET";
const SALT_ROUNDS = 10;

export {
    PORT,

    APP_SECRET,
    SALT_ROUNDS,
    MONGO_URI
};
