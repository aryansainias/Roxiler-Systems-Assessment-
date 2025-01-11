import { parse } from "dotenv";
import productModel from "../Models/productModel.js";
import getTransactionByMonth from "../Utils/dataUtils.js";


export const getAllTransactions = async(req, res) => {
    try {
        let product_transactions = await productModel.find({}).sort({id:1}) 


        if(product_transactions){
            return res.send(product_transactions)
        }
        
    } catch (error) {
        console.log({error: error.message}); 
        res.status(500).send(error.message)

    }
}

export const getSalesByMonth = async(req, res ) => {
    try {
        const { month } = req.query;
    
        const monthNumber = parseInt(month, 10);

        if(isNaN(monthNumber)||monthNumber > 12 || monthNumber < 1){
            return res.status(400).send({error: 'Invalid month parameter. Must be between 1 and 12'});
        }
        
        const allData = await productModel.find();
    
        const filteredData = allData.filter((item) => {
          return item.dateOfSale.getMonth() + 1 === monthNumber; 
        });
    
        res.json(filteredData);
      } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message });
      }
}

export const searchTransaction = async(req, res) => {
    try {
        const { searchQuery } = req.query;
        let searchResult = [];

        if(isNaN(searchQuery)){ 
            searchResult = await productModel.find({
                $or: [
                    {title : {$regex: `\\b${searchQuery}\\b`, $options: 'i'}},  
                    {description: {$regex: `\\b${searchQuery}\\b`, $options: 'i'}}, // case sensitive handle by i
                ] 
            }) 
        }

        else{
            searchResult = await productModel.find({price: searchQuery});
        }

        if(searchResult.length == 0){
            return res.send({err: "no transaction found"})
        }

        res.send(searchResult);
        
    } catch (error) {
        console.log({error: error.message});
        res.send({error: error.message})
    }
}


export const getStatistics = async(req, res, forCombine = false) => {
    try {

        const { month } = req.query;

        const transactionsInMonth = await getTransactionByMonth(month);
        
        const soldItems = transactionsInMonth.filter((transaction) => {
            return transaction.sold == true;
        })

        let totalSales = 0;
        const gettotal = soldItems.map((transaction)=> {
            totalSales += transaction.price
        })
       
        const unsoldItems = transactionsInMonth.filter((transaction) => {
            return transaction.sold == false;
        })

        if(forCombine == false){ 
            return {
                totalSales: totalSales,
                soldItems: soldItems.length,
                unsoldItems: unsoldItems.length
            }
        }
        else{
            res.send({
                totalSales: totalSales,
                soldItems: soldItems.length,
                unsoldItems: unsoldItems.length
            });
        }


    } catch (error) {
        console.log({error: error.message});
        res.send({error: error.message})
    }
}


export const getBarChart = async(req, res, forCombine = false) => {
    try {
        const {month} = req.query;

        const transactionsInMonth = await getTransactionByMonth(month);

        const priceRange = [
            {min: 0, max:100},
            {min: 101, max: 200},
            {min: 201, max: 300},
            {min: 301, max: 400},
            {min: 401, max: 500},
            {min: 501, max: 600},
            {min: 601, max: 700},
            {min: 701, max: 800},
            {min: 801, max: 900},
            {min: 901, max: 1000},
        ]

        const priceRangeData = priceRange.map((range)=>({
            range: `${range.min} - ${range.max}`,
            count: transactionsInMonth.filter((item) => item.price >= range.min && item.price <= range.max).length,
        }));

        if(forCombine == false){  
            return priceRangeData; 
        }
        else{
            res.send(priceRangeData);
        }
        
    } catch (error) {
        res.send({error: error.message});
        console.log(error.message)
    }
}



export const getPieChart = async(req, res, forCombine = false) => {
    try {

        const { month } = req.query;

        const transactionsInMonth =  await getTransactionByMonth(month);

        let categories = []

        const getUniqueCategory = transactionsInMonth.map((transaction)=>{
            let currCategory = transaction.category;
            if(!categories.includes(currCategory)){
                categories.push(currCategory);
            }
        });

        const categoryData = categories.map((category)=>({
            category: category, items:  transactionsInMonth.filter(transaction => transaction.category == category).length
        })
        )

        if(forCombine == false){ 
            return categoryData 
        }
        else{
            res.send(categoryData);
        }

    } catch (error) {
        res.send({error: error.message});
    }
}


export const getCombineResponse = async (req, res) => {
    try {
        const [statistics, barChart, pieChart] = await Promise.all([
            getStatistics(req, res, true),
            getBarChart(req, res, true),
            getPieChart(req, res, true)
           
        ]);

        const combineResponse = {
            barChart, 
            statistics, 
            pieChart
        };

        res.send(combineResponse);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
