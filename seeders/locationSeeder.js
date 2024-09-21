import database from "../config/database.js";
import location from "../models/location.js";

database();

async function locationSeeder() {

    await Location.create({
        
    id:"5246",
        city: "Cali",
        zipCode: "10910",
        address: "cra 102 # 124 -30"
       
    })
    await Location.create({
        id:"5246",
        city: "Cali",
        zipCode: "10910",
        address: "cra 102 # 124 -30"

    })
    await Location.create({
        id:"5246",
        city: "Cali",
        zipCode: "10910",
        address: "cra 102 # 124 -30"

    })
    console.log("sedder en funcionamiento ")
    
}

locationSeeder();