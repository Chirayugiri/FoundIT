const { auth, db, storage, foundCollectionRef, usersCollectionRef} = require('../config.js');
const {collection, doc, getDocs, getDoc, addDoc, deleteDoc, setDoc, arrayUnion, updateDoc} = require('firebase/firestore'); 


async function addUser(req,res) {
    try{
        const { uid, email, username, mob, branch, year } = req.body;
        // Check if all required fields are provided
        if (!uid || !email || !username || !mob || !branch || !year) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const formData = {
            uid,
            email,
            username,
            mob,
            branch,
            year,
            date: new Date().toString()
        };
        const docRef = await doc(usersCollectionRef, uid);
        await setDoc(docRef, formData);
        res.status(201).json({ message: 'user created'});
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

async function getUser(req,res){
    try{
        const uid = req.params.uid;
        const docRef = await doc(usersCollectionRef, uid)
        const user = (await getDoc(docRef)).data();

        res.json(user);
    } catch(err){
        console.log(err);
        res.json({"error": err});
    }
}

async function getAllUsers(req,res){
    try{
        const querySnap = await getDocs(usersCollectionRef);
        const users = querySnap.docs.map((doc)=> doc.data());

        res.json(users);
    } catch(err){
        res.json({"error": err});
    }
}

async function deleteUser(req,res) {
    try{
        const {id} = req.params;
        const docRef = await doc(db, usersCollectionRef, id);
        await deleteDoc(docRef);

        res.json({ message: `Document with ID ${id} deleted successfully` });
    } catch(err){
        res.status(500).json({ error: err.message });
    }
}

async function addClaimRequest(req,res) {
    try{
        const { currUserDocId, itemDocId } = req.body;
        // Validate inputs
        if (!currUserDocId || !itemDocId) {
            return res.status(400).json({ error: "Document ID and User ID are required" });
        }
        console.log(`data: ${currUserDocId}, ${itemDocId}`)
        const docRef = await doc(db, "users", currUserDocId);
        await updateDoc(docRef, {
            claimRequests: arrayUnion(itemDocId)
        });

        res.status(200).json({"uid": itemDocId});
    } catch(err){
        console.log(err);
        res.status(501).json(err);
    }
}

async function getClaimRequests(req,res) {
    try {
        const { currUserDocId } = req.params; // Get user ID from request
        const userDocRef = doc(db, "users", currUserDocId); // Reference to user document
        const userDoc = await getDoc(userDocRef); // Fetch user document

        if (!userDoc.exists()) {
            return res.status(404).json({ message: "User not found" });
        }

        const claimRequests = userDoc.data().claimRequests || []; // Get claimRequest array
        if (claimRequests.length === 0) {
            return res.status(200).json({ message: "No claim requests" });
        }

        // Fetch all documents from claimRequests array
        const items = await Promise.all(
            claimRequests.map(async (docId) => {
                const itemDoc = await getDoc(doc(db, "foundReport", docId)); // Fetch each document
                return itemDoc.exists() ? { id: itemDoc.id, ...itemDoc.data() } : null; // Add data if it exists
            })
        );

        res.status(200).json(items.filter(Boolean)); // Filter out null and return items
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching claimed documents", error: err });
    }
}

async function isClaimRequestSent(req,res) {
    try{
        const {currUserDocId, itemDocId} = req.body;
        const userDoc = await getDoc(doc(db, "users", currUserDocId));
        if(!userDoc.exists()){
            res.status(400).json("User doc does not exists");
        }
        const claimRequest = userDoc.data().claimRequests;

        if(claimRequest.includes(itemDocId)){
            res.status(200).json({exists: true});
        }
        else{
            res.status(200).json({exists: false});
        }

    } catch(err){
        console.error(err);
        res.status(501).json(err);
    }
}

module.exports = {
    addUser, deleteUser, getAllUsers, getUser, addClaimRequest, getClaimRequests, isClaimRequestSent
}