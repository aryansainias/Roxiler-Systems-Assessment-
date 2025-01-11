import productModel from "../Models/productModel.js";
import axios from "axios";

const intializeDatabase = async (req, res) => {
    const { month } = req.query;

    try {
        const dataCount = await productModel.find({}); 

        if (dataCount.length === 0) {
            let data;
            try {
                const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
                data = response.data;
            } catch (err) {
                console.error("Error fetching data: ", err.message);
                return res.status(404).send(err.message);
            }

            if (data) {  
                await productModel.create(data);
                return res.send({
                    success: true,
                    message: "Database initialization successful done"
                });
            } else {
                return res.status(500).send("Failed to fetch data sorry please");
            }
        } else {
            return res.send("Database already initialized");
        }
    } catch (error) {
        console.error("Error in DB initialization: ", error.message);
        return res.status(500).send(error.message);
    }
};

export default intializeDatabase;
