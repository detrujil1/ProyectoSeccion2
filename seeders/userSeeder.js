import database from "../config/database.js";
import User from "../models/user.js";

database();

async function userSeeder() {

    await User.create({

        document:"76456",
        name: "narancia",
        lastName: "vito",
        email: "narancia@vito.com",
        password: "Helicopter234"
    })
    await User.create({
        document:"80521",
        name: "alesi",
        lastName: "martini",
        email: "alesi@martini.com",
        password: "Helicopter234"
    })
    await User.create({
        document:"641380",
        name: "barella",
        lastName: "capone",
        email: "barella@capone.com",
        password: "Helicopter234"
    })
    console.log("sedder en funcionamiento ")
    
}

userSeeder();

