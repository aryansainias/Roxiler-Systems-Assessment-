import express  from "express";
import { getAllTransactions, getBarChart, getCombineResponse, getPieChart, getSalesByMonth, getStatistics, searchTransaction} from "../Controllers/transactionController.js";

const Router = express.Router(); 

Router.get('/product_transactions', getAllTransactions)

Router.get('/sales_by_month', getSalesByMonth)

Router.get('/search_transaction', searchTransaction);

Router.get('/getStatistics', getStatistics);

Router.get('/getBarchart', getBarChart);

Router.get('/getPiechart', getPieChart);

Router.get('/getCombineResponse', getCombineResponse);

export default Router;
