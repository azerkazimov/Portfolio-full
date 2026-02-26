const Service = require('../model/services.model');

const getAllServices = async (req, res)=>{
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getServiceById = async (req, res)=>{
    try {
        const { id } = req.params;
        const service = await Service.findById(id);
        if(!service){
            return res.status(404).json({ message: "Service not found" });
        }
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createService = async (req, res)=>{
    try {
        const { name, description } = req.body;

        if(!name || !name.az || !name.en || !name.ru || !description || !description.az || !description.en || !description.ru){
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingService = await Service.findOne({ name: { $in: [name.az, name.en, name.ru] } });
        if(existingService){
            return res.status(400).json({ message: "Service already exists" });
        }
        const newService = {
            name: {
                az: name.az,
                en: name.en,
                ru: name.ru
            },
            description: {
                az: description.az,
                en: description.en,
                ru: description.ru
            }
        }

        const service = await Service.create(newService);

        res.status(201).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateService = async (req, res)=>{
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        if(!name || !name.az || !name.en || !name.ru || !description || !description.az || !description.en || !description.ru){
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingService = await Service.findById(id);
        if(!existingService){
            return res.status(404).json({ message: "Service not found" });
        }
        const updatedService = {
            name: {
                az: name.az,
                en: name.en,
                ru: name.ru
            },
            description: {
                az: description.az,
                en: description.en,
                ru: description.ru
            }
        };
        const service = await Service.findByIdAndUpdate(id, updatedService, { returnDocument: 'after' });
        if(!service){
            return res.status(404).json({ message: "Service not found" });
        }
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteService = async (req, res)=>{
    try {
        const { id } = req.params;
        const service = await Service.findByIdAndDelete(id);
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService
}