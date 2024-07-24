import MasterCbase from "../models/MCbaseModel.js";

export const getMCbase = async(req, res) =>{
    try {
        const response = await MasterCbase.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getMcbasebyId = async(req, res) =>{
    try {
        const response = await MasterCbase.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}