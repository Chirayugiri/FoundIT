const express = require('express');
const {
    getAllProducts, 
    getCategoryProducts, 
    uploadProduct, 
    deleteProduct, 
    getRecentProducts, 
    getLostReports,
    changeProductStatus,
    getAllLostReports,
    getProductByID
} = require('../controller/productController');
const {addUser, getAllUsers, deleteUser, getUser, addClaimRequest, getClaimRequests, isClaimRequestSent} = require('../controller/userController');
const cloudinaryUpload = require('../multerSetup.js');

const productRouter = express.Router();
const userRouter = express.Router();

// /product/ 
productRouter.get('/allproducts', getAllProducts);
productRouter.get('/recent', getRecentProducts);
productRouter.get('/category/', getCategoryProducts);
productRouter.post('/upload',  cloudinaryUpload.single('file'), uploadProduct);
productRouter.delete('/:id', deleteProduct);
productRouter.get('/reports/:uid', getLostReports);
productRouter.post('/:uid', changeProductStatus);
productRouter.get('/lost', getAllLostReports);
productRouter.get('/item/:id', getProductByID);


// /user/
userRouter.post('/addUser', addUser);
userRouter.get('/all', getAllUsers);
userRouter.get('/:uid', getUser);
userRouter.delete('/:uid', deleteUser);
userRouter.post('/claim', addClaimRequest);
userRouter.get('/claim/:currUserDocId', getClaimRequests);
userRouter.post('/isrequested/', isClaimRequestSent);

module.exports = {
    productRouter,  userRouter
}
