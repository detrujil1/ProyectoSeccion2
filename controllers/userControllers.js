import User from "../models/user.js";

async function register(req, res) {
    const data = req.body;
    try {
        const newUser = {
            document:data.document,
            name:data.name,
            lastName:data.lastName,
            email:data.email,
            password:data.password
        }
        const user = await User.create(newUser)
        res.send(user);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Error en el servidor"})
        
    }
    
}
export default register