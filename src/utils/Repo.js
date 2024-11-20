import { get, ref, push, set, update, remove } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
    getStorage,
    uploadBytesResumable,
    getDownloadURL,
    ref as ref_storage,
    deleteObject,
  } from "firebase/storage";
import { firebaseGetDB, firebaseAurth } from "./Firebase";
import { categories, brands, stationData, products, items, models } from "./SeedData";
import { generateQRCode } from './QRCodeGenerator'; // Import the QR code generator

const db = firebaseGetDB;

//DB is lowercase and storage is uppercase
const paths = {
    uptainers: "uptainers",
    Uptainers: "Uptainers/",//for storage
    brands: "brands",
    categories: "categories",
    models: "models",
    items: "items",
    Items: "Items/",        //for storage
    products: "products",
    users: "users",
    Profils: "Profils/",    //for storage
  };

export async function seedCheck() {
    try {
        const snapshot = await get(ref(db, '/'));
        if (snapshot.exists()) {
            console.log("Data available");
        } else {
            console.log("No data available");
            await createSeedData();
        }
    } catch (error) {
        console.error("Error checking seed data:", error);
    }
}
async function createSeedData() {
    console.log("Creating brands");
    await Promise.all(brands.map(brand => createBrand(brand)));

    console.log("Creating categories");
    await Promise.all(categories.map(category => createCategory(category)));

    console.log("Creating uptainers");
    await Promise.all(stationData.map(station => createUptainer(station)));

    console.log("Creating products");
    await Promise.all(products.map(product => createProduct(product)));

    const brandList     = await getAllBrands();
    //const categoryList  = await getAllCategories();
    //const uptainerList  = await getAllUptainers();
    //const productList   = await getAllProducts();

    console.log("Creating models");
    await Promise.all(models.map(model => createModel(model, brandList[0].brandId)));

    //const modelsList = await getAllModels();

    console.log("Creating items");
    items.forEach((item, index) => {
        try {
            const categoryId = categories.find(category => category.categoryName === item.categoryId);
            const productId = products.find(product => product.productName === item.productId);
            const brandId = brands.find(brand => brand.brandName === item.brandId);
            const modelId = models.find(model => model.modelName === item.modelId);
            const uptainerId = stationData.find(stationData => stationData.uptainerName === item.UptainerId);
            createItemSeedata(item, categoryId, productId, brandId, modelId, uptainerId);
        } catch (error) {
            console.error(`Error creating item at index ${index}:`, error);
            console.log("Problematic item:", item);
        }
    });
    console.log("Done creating data");
}

        /********************/
        /***** Create *******/
        /********************/

export async function createUptainer(data) {
    const newUptainerKey = push(ref(db, paths.uptainers)).key;
    const uptainerQRCode = generateQRCode(data.uptainerQR);
    const uptainerData = {
        uptainerId: newUptainerKey,
        uptainerName: data.uptainerName,
        uptainerStreet: data.uptainerStreet,
        uptainerZip: data.uptainerZip,
        uptainerCity: data.uptainerCity,
        uptainerImage: data.uptainerImage,
        uptainerDescription: data.uptainerDescription,
        uptainerLat: data.uptainerLat,
        uptainerLong: data.uptainerLong,
        uptainerQR: uptainerQRCode, // Use the generated QR code

    };
    await writeToDatabase(paths.uptainers + '/' + newUptainerKey, uptainerData);
}


export async function createItem(brandId = "", categoryId = "", itemDescription = "", itemImage = "", itemModel = "", itemproduct = "", itemcondition = "", uptainerQRCode = "") {
    const newItemKey = push(ref(db, paths.items)).key;
    let newImagePath = "Default.jpg"
    if(itemImage != ""){
        try{
        const fileExtension = itemImage.uri.substr(itemImage.uri.lastIndexOf('.') + 1);
        newImagePath = newItemKey +"."+ fileExtension;
        const uploadResp = await uploadToFirebase(itemImage.uri, newImagePath, paths.Items, (v) =>
            console.log("progress: ",v)
            );
        
        console.log(uploadResp); 
        console.log(newImagePath); 
        } catch (error) {
            console.log("can not upload image. Error: ", error);
        }

    }
    try{
        const user = await getCurrentUser();
        const UptainerId = await QRCodeExists(uptainerQRCode); //function to check if QR code exists if not, saved as draft
        const itemData = {
            itemId: newItemKey,
            itemproduct: itemproduct,
            itemBrand: brandId,
            itemModel: itemModel,
            itemTaken: false,
            itemCategory: categoryId,
            itemImage: paths.Items + newImagePath,
            itemDescription: itemDescription,
            itemcondition: itemcondition,
            itemUser: user.id,
            itemUptainer: UptainerId,
        };
        await writeToDatabase(paths.items + '/' + newItemKey, itemData);
    } catch (error) {
        console.log("can not upload item to DB. Error: ", error);
    }
    
}


export async function createBrand(name) {
    const newBrandKey = push(ref(db, paths.brands)).key;
    const brandData = {
        brandName: name,
    };
    await writeToDatabase(paths.brands + '/' + newBrandKey, brandData);
}
export async function createCategory(name) {
    const newCategoryKey = push(ref(db, paths.categories)).key;
    const categoryData = {
        categoryName: name,
    };
    await writeToDatabase(paths.categories + '/' + newCategoryKey, categoryData);
}
export async function createModel(data, brand) {
    const newModelKey = push(ref(db, paths.models)).key;
    const modelData = {
        modelName: data.name,
        brandId: brand,
    };
    await writeToDatabase(paths.models + '/' + newModelKey, modelData);
}


export async function createItemSeedata(item, categories, products, brands, uptainers, models) {


    const newItemKey = push(ref(db, paths.items)).key;
    const itemQRCode = generateQRCode(item.itemQR);
    const itemData = {
        itemId: newItemKey,
        itemproduct: products,
        itemBrand: brands,
        itemModel: models,
        itemCategory: categories,
        itemImage: item.itemImage,
        itemDescription: item.itemDescription,
        itemcondition: item.itemCondition,
        itemUptainer: uptainers,
        itemQR: itemQRCode, // Use the generated QR code
    };
    await writeToDatabase(paths.items + '/' + newItemKey, itemData);
}

export async function createProduct(data) {
    const newProductKey = push(ref(db, paths.products)).key;
    const productData = {
        productId: newProductKey,
        productName: data.name,
        co2Footprint: data.co2Footprint,
    };
    await writeToDatabase(paths.products + '/' + newProductKey, productData);
}

export async function createItemDraft(productId = "", brandId = "", modelId = "", categoryId = "", itemImage = "", itemDescription = "", itemCondition = "") {
    const newItemKey = push(ref(db, paths.items)).key;
    try {
        let newImagePath = "Default.jpg"
        
        console.log("itemImage", itemImage);
        if(itemImage != ""){
            try{
            const fileExtension = itemImage.uri.substr(itemImage.uri.lastIndexOf('.') + 1);
            newImagePath = newItemKey +"."+ fileExtension;
            const uploadResp = await uploadToFirebase(itemImage.uri, newImagePath, paths.Items, (v) =>
                console.log("progress: ",v)
                );
            
            console.log(uploadResp); 
            console.log(newImagePath); 
            } catch (error) {
                console.log("can not upload image. Error: ", error);
            }

    } 
        const user = await getCurrentUser();
        
        const itemData = {
            itemId: newItemKey,
            itemproduct: productId,
            itemBrand: brandId,
            itemModel: modelId,
            itemCategory: categoryId,
            itemImage: paths.Items + newImagePath,
            itemDescription: itemDescription,
            itemcondition: itemCondition,
            itemUptainer: "Draft",
            itemUser: user.id,
            itemTaken: false,
        };
    await writeToDatabase(paths.items + '/' + newItemKey, itemData);
    } catch (error) {
        console.error("Error creating item draft:", error);
    }
    

}

function writeToDatabase(refPath, data) {
    const reference = ref(db, refPath);
    try {
        set(reference, data);
        console.log(`Data written to ${refPath} successfully.`);
    } catch (error) {
        console.error(`Error writing data to ${refPath}: ${error.message}`);
    }

}


        /********************/
        /******* Get ********/
        /********************/

export async function getUptainerFromQR(QRcode){
    const uptainerId = await QRCodeExists(QRcode);
    if(uptainerId != "Draft")
    {
        return uptainerId;
    }else{
        return null;
    }
}


export async function getAllCategories() {
    const db = firebaseGetDB;
    const reference = ref(db, '/categories');

    try {
        const snapshot = await get(reference);
        const categories = [];
        snapshot.forEach((childSnapshot) => {
            const categoryId = childSnapshot.key;
            const categoryName = childSnapshot.val().categoryName;
            categories.push({
                categoryId: categoryId,
                categoryName: categoryName
            });
        });
        return categories;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}
export async function getCategoryById(categoryId) {
    const db = firebaseGetDB;
    const reference = ref(db, `/categories/${categoryId}`);

    try {
        const snapshot = await get(reference);
        const categoryData = snapshot.val();

        if (categoryData) {
            return {
                categoryId,
                categoryName: categoryData.categoryName
            };
        } else {
            console.log(`Category with ID ${categoryId} not found.`);
            return categoryId;
        }
    } catch (error) {
        console.error(`Error fetching data for category with ID ${categoryId}:`, error);
        return null;
    }
}
export async function getAllBrands() {
    const db = firebaseGetDB;
    const reference = ref(db, '/brands');

    try {
        const snapshot = await get(reference);
        const brands = [];
        snapshot.forEach((childSnapshot) => {
            const brandId = childSnapshot.key;
            const brandName = childSnapshot.val().brandName;
            brands.push({
                brandId: brandId,
                brandName: brandName
            });
        });
        return brands;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}
export async function getBrandById(brandId) {
    const db = firebaseGetDB;
    const reference = ref(db, `/brands/${brandId}`);

    try {
        const snapshot = await get(reference);
        const brandData = snapshot.val();

        if (brandData) {
            return {
                brandId,
                brandName: brandData.brandName
            };
        } else {
            console.log(`Brand with ID ${brandId} not found.`);
            return brandId;
        }
    } catch (error) {
        console.error(`Error fetching data for brand with ID ${brandId}:`, error);
        return null;
    }
}

export async function getAllUptainers() {
    const db = firebaseGetDB;
    const reference = ref(db, '/uptainers');

    try {

        const snapshot = await get(reference);
        const uptainers = [];

        snapshot.forEach((childSnapshot) => {
            const uptainerData = childSnapshot.val();
            const uptainer = {
                uptainerId: uptainerData.uptainerId,
                uptainerName: uptainerData.uptainerName,
                uptainerQR: uptainerData.uptainerQR,
                uptainerStreet: uptainerData.uptainerStreet,
                uptainerZip: uptainerData.uptainerZip,
                uptainerCity: uptainerData.uptainerCity,
                uptainerImage: uptainerData.uptainerImage,
                uptainerDescription: uptainerData.uptainerDescription,
                uptainerLatitude: uptainerData.uptainerLat,
                uptainerLongitude: uptainerData.uptainerLong,
            };
            uptainers.push(uptainer);
        });
        return uptainers;
    } catch (error) {
        console.error("Error fetching uptainer data:", error);
        return [];
    }
}
export async function getUptainerById(uptainerId) {
    const db = firebaseGetDB;
    const reference = ref(db, `/uptainers/${uptainerId}`);

    try {
        const snapshot = await get(reference);
        const uptainerData = snapshot.val();

        if (uptainerData) {
            return {
                uptainerId: uptainerId,
                uptainerName: uptainerData.uptainerName,
                uptainerQR: uptainerData.uptainerQR,
                uptainerStreet: uptainerData.uptainerStreet,
                uptainerZip: uptainerData.uptainerZip,
                uptainerCity: uptainerData.uptainerCity,
                uptainerImage: uptainerData.uptainerImage,
                uptainerDescription: uptainerData.uptainerDescription,
                uptainerLat: uptainerData.uptainerLat,
                uptainerLong: uptainerData.uptainerLong,
            };
        } else {
            console.log(`Uptainer with ID ${uptainerId} not found.`);
            return uptainerId;
        }
    } catch (error) {
        console.error(`Error fetching data for uptainer with ID ${uptainerId}:`, error);
        return null;
    }
}
export async function getUptainersByLocation(location) {
    const db = firebaseGetDB;
    const uptainersRef = ref(db, '/uptainers');

    try {
        const snapshot = await get(uptainersRef);
        const uptainers = [];

        snapshot.forEach((childSnapshot) => {
            const uptainerData = childSnapshot.val();
            // Assuming location filtering based on uptainerStreet
            if (uptainerData.uptainerStreet === location) {
                uptainers.push({
                    uptainerId: childSnapshot.key,
                    uptainerName: uptainerData.uptainerName,
                    uptainerQR: uptainerData.uptainerQR,
                    uptainerStreet: uptainerData.uptainerStreet,
                    uptainerZip: uptainerData.uptainerZip,
                    uptainerCity: uptainerData.uptainerCity,
                    uptainerImage: uptainerData.uptainerImage,
                    uptainerDescription: uptainerData.uptainerDescription,
                    uptainerLat: uptainerData.uptainerLat,
                    uptainerLong: uptainerData.uptainerLong,
                });
            }
        });

        if (uptainers.length > 0) {
            return uptainers;
        } else {
            console.log(`No uptainers found at ${location}.`);
            return [];
        }
    } catch (error) {
        console.error(`Error fetching uptainers at ${location}:`, error);
        return null;
    }
}


export async function getAllModels() {
    const db = firebaseGetDB;
    const reference = ref(db, '/models');

    try {
        const snapshot = await get(reference);
        const models = [];
        snapshot.forEach((childSnapshot) => {
            const modelId = childSnapshot.key;
            const modelName = childSnapshot.val().modelName;
            const brandId = childSnapshot.val().brandId;
            models.push({
                modelId: modelId,
                modelName: modelName,
                brandId: brandId
            });
        });
        return models;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}
export async function getModelById(modelId) {
    const db = firebaseGetDB;
    const reference = ref(db, `/models/${modelId}`);
    try {
        const snapshot = await get(reference);
        const modelData = snapshot.val();

        if (modelData) {
            return {
                modelId,
                modelName: modelData.modelName,
                brandId: modelData.brandId
            };
        } else {
            console.log(`Model with ID ${modelId} not found.`);
            return modelId;
        }
    } catch (error) {
        console.error(`Error fetching data for model with ID ${modelId}:`, error);
        return null;
    }
}
export async function getItemsInUptainer(uptainerId) {
    let items = [];
    try {
        // TODO doesnt filter out itemTaken yet should be with this when data in DB is corret
        // items = (await getAllItems()).filter(item => item.itemUptainer === uptainerId && item.itemTaken === false);
        items = (await getAllItems()).filter(item => item.itemUptainer === uptainerId);

        return items;

    } catch (error) {
      // Handle error
      console.error('Error fetching items:', error);
      throw error;
    }
  }

export async function getAllProducts() {
    const db = firebaseGetDB;
    const reference = ref(db, '/products');

    try {
        const snapshot = await get(reference);
        const products = [];
        snapshot.forEach((childSnapshot) => {
            const productId = childSnapshot.key;
            const productName = childSnapshot.val().productName;
            const co2Footprint = childSnapshot.val().co2Footprint;
            products.push({
                productId: productId,
                productName: productName,
                co2Footprint: co2Footprint
            });
        });
        return products;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}
export async function getProductById(productId) {
    const db = firebaseGetDB;
    const reference = ref(db, `/products/${productId}`);

    try {
        const snapshot = await get(reference);
        const productData = snapshot.val();

        if (productData) {
            return {
                productId,
                productName: productData.productName,
                co2Footprint: productData.co2Footprint
            };
        } else {
            console.log(`Product with ID ${productId} not found.`);
            return productId;
        }
    } catch (error) {
        console.error(`Error fetching data for product with ID ${productId}:`, error);
        return null;
    }
}
export async function getAllItems() {
    const db = firebaseGetDB;
    const reference = ref(db, '/items');

    try {
        const snapshot = await get(reference);
        const items = [];
        snapshot.forEach((childSnapshot) => {
            const itemId = childSnapshot.key;
            const itemproduct = childSnapshot.val().itemproduct;
            const itemBrand = childSnapshot.val().itemBrand;
            const itemModel = childSnapshot.val().itemModel;
            const itemCategory = childSnapshot.val().itemCategory;
            const itemImage = childSnapshot.val().itemImage;
            const itemDescription = childSnapshot.val().itemDescription;
            const itemcondition = childSnapshot.val().itemcondition;
            const itemUptainer = childSnapshot.val().itemUptainer;
            const itemUser = childSnapshot.val().itemUser;
            const itemTaken = childSnapshot.val().itemTaken;
            const itemTakenDate = childSnapshot.val().itemTakenDate;
            const itemTakenUser = childSnapshot.val().itemTakenUser;
            items.push({
                itemId: itemId,
                itemproduct: itemproduct,
                itemBrand: itemBrand,
                itemModel: itemModel,
                itemCategory: itemCategory,
                itemImage: itemImage,
                itemDescription: itemDescription,
                itemcondition: itemcondition,
                itemUptainer: itemUptainer,
                itemUser: itemUser,
                itemTaken: itemTaken,
                itemTakenDate: itemTakenDate,
                itemTakenUser: itemTakenUser,
            });
        });
        return items;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}
export async function getItemById(itemId) {
    const db = firebaseGetDB;
    const reference = ref(db, `/items/${itemId}`);

    try {
        const snapshot = await get(reference);
        const itemData = snapshot.val();

        if (itemData) {
            return {
                itemId,
                itemproduct: itemData.itemproduct,
                itemBrand: itemData.itemBrand,
                itemModel: itemData.itemModel,
                itemCategory: itemData.itemCategory,
                itemImage: itemData.itemImage,
                itemDescription: itemData.itemDescription,
                itemcondition: itemData.itemcondition,
                itemUptainer: itemData.itemUptainer
            };
        } else {
            console.log(`Item with ID ${itemId} not found.`);
            return itemId;
        }
    } catch (error) {
        console.error(`Error fetching data for item with ID ${itemId}: `, error);
        return null;
    }
}
export async function getDraftFromUser(userId) {
    const itemList = await getAllItems()
    
    const draftList = itemList.filter(item => item.itemUser === userId && item.itemUptainer === "Draft")
    ///not tested yet
    return draftList
}
//To be tested
//Retrieve all user items
export async function getItemsFromUser(userId) {
    const itemList = await getAllItems()
    
    const itemsUserList = itemList.filter(item => item.itemUser === userId)
    ///not tested yet
    return itemsUserList
}

    /********************/
    /***** Delete *******/
    /********************/

export async function deleteCategoryById(categoryId) {
    const reference = ref(db, `/categories/${categoryId}`);
    try {
        remove(reference);
        console.log(`Category with ID ${categoryId} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting category with ID ${categoryId}:`, error);
    }
}
export async function deleteBrandById(brandId) {
    const reference = ref(db, `/brands/${brandId}`);
    try {
        remove(reference);
        console.log(`Brand with ID ${brandId} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting brand with ID ${brandId}:`, error);
    }
}
export async function deleteUptainerById(uptainerId) {
    const reference = ref(db, `/uptainers/${uptainerId}`);
    try {
        remove(reference);
        console.log(`Uptainer with ID ${uptainerId} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting uptainer with ID ${uptainerId}:`, error);
    }
}
export async function deleteItemById(itemId) {
    const reference = ref(db, `/items/${itemId}`);
    try {
        remove(reference);
        console.log(`Item with ID ${itemId} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting item with ID ${itemId}:`, error);
    }
}
export async function deleteModelById(modelId) {
    const reference = ref(db, `/models/${modelId}`);
    try {
        remove(reference);
        console.log(`Model with ID ${modelId} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting model with ID ${modelId}:`, error);
    }
}
export async function deleteProductById(productId) {
    const reference = ref(db, `/products/${productId}`);
    try {
        remove(reference);
        console.log(`Product with ID ${productId} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting product with ID ${productId}:`, error);
    }
}

export async function deleteImage(imagePath){
    const storage = getStorage();
    const desertRef = ref_storage(storage, imagePath);
    deleteObject(desertRef).then(() => {
        // File deleted successfully
        console.log("Image deleted successfully, image file path: ", imagePath);
    }).catch((error) => {
        alert("Error deleting image", error);
        // Uh-oh, an error occurred!
    });
}

        /**********************/
        /****** Update ********/
        /**********************/

export async function updateModelById(modelId, newData) {
    const reference = ref(db, `/models/${modelId}`);
    try {
        update(reference, newData);
        console.log(`Model with ID ${modelId} updated successfully.`);
    } catch (error) {
        console.error(`Error updating model with ID ${modelId}:`, error);
    }
}

export async function updateUptainerById(uptainerId, newData) {
    const reference = ref(db, `/uptainers/${uptainerId}`);
    try {
        update(reference, newData);
        console.log(`Uptainer with ID ${uptainerId} updated successfully.`);
    } catch (error) {
        console.error(`Error updating uptainer with ID ${uptainerId}:`, error);
    }
}

export async function updateItemById(itemId, newData) {
    const reference = ref(db, `/items/${itemId}`);
    try {
        update(reference, newData);
        console.log(`Item with ID ${itemId} updated successfully.`);
    } catch (error) {
        console.error(`Error updating item with ID ${itemId}:`, error);
    }
}
export async function updateItemfromDraft(itemId, uptainerId) {
    const reference = ref(db, `/items/${itemId}`);
    try {
        update(reference, {itemUptainer: uptainerId});
        console.log(`Item with ID ${itemId} updated successfully.`);
    } catch (error) {
        console.error(`Error updating item with ID ${itemId}:`, error);
    }
}

export async function updateBrandById(brandId, newData) {
    const reference = ref(db, `/brands/${brandId}`);
    try {
        update(reference, newData);
        console.log(`Brand with ID ${brandId} updated successfully.`);
    } catch (error) {
        console.error(`Error updating brand with ID ${brandId}:`, error);
    }
}

export async function updateCategoryById(categoryId, newData) {
    const reference = ref(db, `/categories/${categoryId}`);
    try {
        update(reference, newData);
        console.log(`Category with ID ${categoryId} updated successfully.`);
    } catch (error) {
        console.error(`Error updating category with ID ${categoryId}:`, error);
    }
}

export async function updateProductById(productId, newData) {
    const reference = ref(db, `/products/${productId}`);
    try {
        update(reference, newData);
        console.log(`Product with ID ${productId} updated successfully.`);
    } catch (error) {
        console.error(`Error updating product with ID ${productId}:`, error);
    }
}
export async function updateItemToTaken(itemId){
    const reference = ref(db, `/items/${itemId}`);
    try {
        update(reference, {itemTaken: true});
        console.log(`Item with ID ${itemId} updated successfully.`);
    } catch (error) {
        console.error(`Error updating item with ID ${itemId}:`, error);
    }
}

/****************/
/**** Upload ****/
/****************/
const uploadToFirebase = async (uri, name, path, onProgress) => {
    const fetchResponse = await fetch(uri);
    const theBlob = await fetchResponse.blob();
    const storage = getStorage();
    const imageRef = ref_storage(storage, `${path}${name}`);
    const uploadTask = uploadBytesResumable(imageRef, theBlob);
    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress && onProgress(progress);
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
          reject(error);
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({
            downloadUrl,
            metadata: uploadTask.snapshot.metadata,
          });
        }
      );
    });
  };
/****************/
/***** Auth *****/
/****************/
export async function signInUser(email, password, navigation){
    signInWithEmailAndPassword(firebaseAurth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('User logged in:', user);
      navigation.navigate("Homepage");
    })
    .catch((error) => {
        authErrors(error);
    });
}

export async function createUser(email, password, navigation ,name = "John Doe") {
    try {

        let isAdmin = false;

        // admin email
        if (email === "admin@updropp.dk") {
          isAdmin = true;
        }

      const userCredential = await createUserWithEmailAndPassword(
        firebaseAurth,
        email,
        password
      );

      if (userCredential) {
        const userData = {
          name: name,
          email: email,
          uuid: userCredential.user.uid,
          isAdmin: isAdmin,
         
        };
        await writeToDatabase(paths.users + "/" + userCredential.user.uid, userData);
        navigation.navigate("Homepage");
      }
    } catch (error) {
        authErrors(error);
    }
  }


export async function getCurrentUser() {
  try {

    const id = firebaseAurth.currentUser.uid;
    const reference = ref(db, paths.users);

    const snapshot = await get(reference);
    const modelData = snapshot.val();


    if (modelData) {
        return{
            id,
            name: modelData.name,
            email: modelData.email
        }
    }
  } catch (error) {
    authErrors(error);
    return error;
  }
}

// ToDo find user data and implement it to the function
export async function updateAuthData(email, password, phoneNumber) {
    const user = firebaseAurth.currentUser;

    if (email && email !== user.email) {
      await user.updateEmail(email);
    }

    if (password) { // Password should always be updated if provided, as we can't retrieve the current password
      await user.updatePassword(password);
    }

    if (phoneNumber && phoneNumber !== user.phoneNumber) {
      await user.updatePhoneNumber(phoneNumber);
    }
  }


 
  //add more info if needed
  export async function updateUserData(email, password, phoneNumber, name, profilePic) {
    await updateAuthData(email, password, phoneNumber);
    await updateDatabaseData(name, profilePic);
  }
  
  export async function deleteUser(navigation) {
    const user = firebaseAurth.currentUser;
    // Delete the user from Firebase Authentication
    user
        .delete()
        .then(() => console.log("User deleted"))
        .catch((error) => console.log(error));

    // Delete the user from Realtime Database   
    const reference = ref(db, 'users/' + user.uid);
    try {
        remove(reference);
        console.log('User deleted from Realtime Database');
        navigation.navigate("Sign in");
    } catch (error) {
        console.error('Error deleting user from Realtime Database:', error);
        alert('Error', 'Error deleting user from Realtime Database: ' + error.message);
      }
  }


    /**************/
    /*** Checks ***/
    /**************/

    async function QRCodeExists(qrCode) {
        const uptainerList  = await getAllUptainers();
        const item = uptainerList.find(uptainer => uptainer.uptainerQR === qrCode);
        if (item) {
            return item.uptainerId;
        } else {
            alert("QR Code not found, saved to draft instead");
            return "Draft";
        }
    }

/**************/
/*** Errors ***/
/**************/

function authErrors(error) {
    const errorMessages = {
        'auth/claims-too-large': 'The claims payload provided exceeds the maximum allowed size of 1000 bytes.',
        'auth/email-already-exists': 'The provided email is already in use by an existing user. Each user must have a unique email.',
        'auth/id-token-expired': 'The provided Firebase ID token is expired.',
        'auth/id-token-revoked': 'The Firebase ID token has been revoked.',
        'auth/insufficient-permission': 'The credential used to initialize the Admin SDK has insufficient permission to access the requested Authentication resource. Refer to Set up a Firebase project for documentation on how to generate a credential with appropriate permissions and use it to authenticate the Admin SDKs.',
        'auth/internal-error': 'The Authentication server encountered an unexpected error while trying to process the request. The error message should contain the response from the Authentication server containing additional information. If the error persists, please report the problem to our Bug Report support channel.',
        'auth/invalid-argument': 'An invalid argument was provided to an Authentication method. The error message should contain additional information.',
        'auth/invalid-claims': 'The custom claim attributes provided to setCustomUserClaims() are invalid.',
        'auth/invalid-continue-uri': 'The continue URL must be a valid URL string.',
        'auth/invalid-creation-time': 'The creation time must be a valid UTC date string.',
        'auth/invalid-credential': 'The credential used to authenticate the Admin SDKs cannot be used to perform the desired action. Certain Authentication methods such as createCustomToken() and verifyIdToken() require the SDK to be initialized with a certificate credential as opposed to a refresh token or Application Default credential. See Initialize the SDK for documentation on how to authenticate the Admin SDKs with a certificate credential.',
        'auth/invalid-disabled-field': 'The provided value for the disabled user property is invalid. It must be a boolean.',
        'auth/invalid-display-name': 'The provided value for the displayName user property is invalid. It must be a non-empty string.',
        'auth/invalid-dynamic-link-domain': 'The provided dynamic link domain is not configured or authorized for the current project.',
        'auth/invalid-email': 'The provided value for the email user property is invalid. It must be a string email address.',
        'auth/invalid-email-verified': 'The provided value for the emailVerified user property is invalid. It must be a boolean.',
        'auth/invalid-hash-algorithm': 'The hash algorithm must match one of the strings in the list of supported algorithms.',
        'auth/invalid-hash-block-size': 'The hash block size must be a valid number.',
        'auth/invalid-hash-derived-key-length': 'The hash derived key length must be a valid number.',
        'auth/invalid-hash-key': 'The hash key must a valid byte buffer.',
        'auth/invalid-hash-memory-cost': 'The hash memory cost must be a valid number.',
        'auth/invalid-hash-parallelization': 'The hash parallelization must be a valid number.',
        'auth/invalid-hash-rounds': 'The hash rounds must be a valid number.',
        'auth/invalid-hash-salt-separator': 'The hashing algorithm salt separator field must be a valid byte buffer.',
        'auth/invalid-id-token': 'The provided ID token is not a valid Firebase ID token.',
        'auth/invalid-last-sign-in-time': 'The last sign-in time must be a valid UTC date string.',
        'auth/invalid-page-token': 'The provided next page token in listUsers() is invalid. It must be a valid non-empty string.',
        'auth/invalid-password': 'The provided value for the password user property is invalid. It must be a string with at least six characters.',
        'auth/invalid-password-hash': 'The password hash must be a valid byte buffer.',
        'auth/invalid-password-salt': 'The password salt must be a valid byte buffer.',
        'auth/invalid-phone-number': 'The provided value for the phoneNumber is invalid. It must be a non-empty E.164 standard compliant identifier string.',
        'auth/invalid-photo-url': 'The provided value for the photoURL user property is invalid. It must be a string URL.',
        'auth/invalid-provider-data': 'The providerData must be a valid array of UserInfo objects.',
        'auth/invalid-provider-id': 'The providerId must be a valid supported provider identifier string.',
        'auth/invalid-oauth-responsetype': 'Only exactly one OAuth responseType should be set to true.',
        'auth/invalid-session-cookie-duration': 'The session cookie duration must be a valid number in milliseconds between 5 minutes and 2 weeks.',
        'auth/invalid-uid': 'The provided uid must be a non-empty string with at most 128 characters.',
        'auth/invalid-user-import': 'The user record to import is invalid.',
        'auth/maximum-user-count-exceeded': 'The maximum allowed number of users to import has been exceeded.',
        'auth/missing-android-pkg-name': 'An Android Package Name must be provided if the Android App is required to be installed.',
        'auth/missing-continue-uri': 'A valid continue URL must be provided in the request.',
        'auth/missing-hash-algorithm': 'Importing users with password hashes requires that the hashing algorithm and its parameters be provided.',
        'auth/missing-ios-bundle-id': 'The request is missing a Bundle ID.',
        'auth/missing-uid': 'A uid identifier is required for the current operation.',
        'auth/missing-oauth-client-secret': 'The OAuth configuration client secret is required to enable OIDC code flow.',
        'auth/operation-not-allowed': 'The provided sign-in provider is disabled for your Firebase project. Enable it from the Sign-in Method section of the Firebase console.',
        'auth/phone-number-already-exists': 'The provided phoneNumber is already in use by an existing user. Each user must have a unique phoneNumber.',
        'auth/project-not-found': 'No Firebase project was found for the credential used to initialize the Admin SDKs. Refer to Set up a Firebase project for documentation on how to generate a credential for your project and use it to authenticate the Admin SDKs.',
        'auth/reserved-claims': 'One or more custom user claims provided to setCustomUserClaims() are reserved. For example, OIDC specific claims such as (sub, iat, iss, exp, aud, auth_time, etc) should not be used as keys for custom claims.',
        'auth/session-cookie-expired': 'The provided Firebase session cookie is expired.',
        'auth/session-cookie-revoked': 'The Firebase session cookie has been revoked.',
        'auth/too-many-requests': 'The number of requests exceeds the maximum allowed.',
        'auth/uid-already-exists': 'The provided uid is already in use by an existing user. Each user must have a unique uid.',
        'auth/unauthorized-continue-uri': 'The domain of the continue URL is not whitelisted. Whitelist the domain in the Firebase Console.',
        'auth/user-not-found': 'There is no existing user record corresponding to the provided identifier.',
    };
    const errorMessage = errorMessages[error.code] || 'An unknown error occurred during authentication.';
    alert(errorMessage);
}
