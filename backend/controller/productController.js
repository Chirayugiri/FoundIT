const { auth, db, storage, foundCollectionRef, lostCollectionRef } = require('../config.js');
const { doc, getDocs, addDoc, deleteDoc, Timestamp, query, where, getDoc, updateDoc } = require('firebase/firestore');

async function getAllProducts(req, res) {
    try {
        const querySnap = await getDocs(foundCollectionRef);
        const foundItems = querySnap.docs.map((doc) => ({
            id: doc.id, // Include the document ID
            ...doc.data()
        }));

        res.status(200).json(foundItems);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
}

async function getRecentProducts(req, res) {
    try {
        const currentDate = new Date();
        const fiveDaysAgo = new Date();
        fiveDaysAgo.setDate(currentDate.getDate() - 5);

        // fetch documents of last 5 days
        const querySnap = await getDocs(
            query(foundCollectionRef, where("date", ">=", Timestamp.fromDate(fiveDaysAgo)))
        );

        const recentItems = querySnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        res.json(recentItems);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

async function getCategoryProducts(req, res) {
    const { category } = req.query;
    if (!category) {
        return res.status(400).json({ error: "Category is required" });
    }
    try {
        const querySnap = await getDocs(foundCollectionRef);
        const filteredItems = querySnap.docs.map((doc) => doc.data()).filter((item) => item.itemType === category);

        res.json(filteredItems);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function uploadProduct(req, res) {
    try {
        const isFoundItem = req.body.isFoundItem;
        console.log('is FOund: ', isFoundItem);
        // req.file contains the file uploaded to Cloudinary
        const file = req.file || null;
        if (!file && isFoundItem === true) {
            console.log('No file');
            return res.status(400).send("No file uploaded.");
        }
        
        const formData = {
            uid: req.body.uid,
            title: req.body.title,
            location: req.body.location,
            desc: req.body.desc,
            itemType: req.body.itemType,
            imageUrl: file ? file.path : "NA", 
            status: "pending", // Default status
            date: Timestamp.fromDate(new Date())
        };

        // Store data in firestore 
        if(isFoundItem === true){
            const docSnap = await addDoc(foundCollectionRef, formData);
            console.log('uploaded in Found collection')
        }
        else{
            const docSnap = await addDoc(lostCollectionRef, formData);
            console.log('uploaded in lost collection')
        }

        // Respond with the uploaded image URL
        res.json({
            message: 'Product Reported!'
        });

    } catch (err) {
        console.log(err);
        res.json(err);
    }
}

async function deleteProduct(req, res) {
    try {
        const { id } = req.params;
        const docRef = await doc(db, foundCollectionRef, id);
        await deleteDoc(docRef);

        res.json({ message: `Document with ID ${id} deleted successfully` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getLostReports(req,res) {
    try{
        const { uid } = req.params;
        if (!uid) {
            return res.status(400).json({ error: "uid is required" });
        }

        const querySnap = await getDocs(
            query(lostCollectionRef, where("uid", "==", uid))
        );
        const filteredReports = querySnap.docs.map((doc) => doc.data());
        console.log(filteredReports)

        res.json(filteredReports);
    } catch(err){
        console.log(err);
        res.json(err);
    }
    // res.json('work');
}

async function getAllLostReports(req,res) {
    console.log("executing"); 
    try{
        const querySnap = await getDocs(lostCollectionRef);
        if(querySnap.empty){
            res.json("No docs exists");
        }
        console.log("The query snap is: ",querySnap.docs);
        const data = querySnap.docs.map((doc) =>doc.data());
        console.log("The data is: ", data);
        res.status(200).json(data);
    } catch(err){
        console.log(err);
        res.status(501).json(err);
    }
}

async function changeProductStatus(req, res) {
    try{
        const { uid } = req.params;
        console.log(uid);
        const docRef = await doc(foundCollectionRef, uid);
        await updateDoc(docRef, {
            status: "returned"
        });
        res.status(200).json("Retuned item successfully");
    } catch(err){
        console.log(err);
        res.status(501).json(err);
    }
}

async function getProductByID(req, res){
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Item ID is required' });
  }

  try {
    const itemRef = doc(db, "foundReport", id);
    const itemDoc = await getDoc(itemRef);

    if (!itemDoc.exists) {
      return res.status(404).json({ message: 'Item not found' });
    }

    return res.status(200).json({ item: { id: itemDoc.id, ...itemDoc.data() } });
  } catch (error) {
    console.error('Error fetching item:', error); 
    return res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
    getAllProducts, 
    getCategoryProducts, 
    uploadProduct, 
    deleteProduct,
    getRecentProducts, 
    getLostReports, 
    changeProductStatus, 
    getAllLostReports,
    getProductByID
}