// firebaseUtils.js

import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, getDoc, setDoc, query, where } from 'firebase/firestore';
import { firebaseDB } from '../../FirebaseConfig';

export const useFirestoreData = (email) => {
  const [userData, setUserData] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetchDataFromFirestore = async () => {
    setLoader(true);
    try {
      const usersCollection = collection(firebaseDB, "users");
      const querySnapshot = await getDocs(usersCollection);
      const fetchedData = [];
      querySnapshot.forEach((doc) => {
        const userData = doc.data(); // Log entire document data
        if (userData && userData.email === email) {
          fetchedData.push({ id: doc.id, ...userData });
        }
      });

      setUserData(fetchedData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchDataFromFirestore();
  }, [email]);

  return { userData, loader };
};

export const updateUserData = async (uid, updatedData) => {
  try {
    const userDocRef = doc(firebaseDB, 'users', uid);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      // Document exists, update the data
      await updateDoc(userDocRef, updatedData);
      console.log('Document updated successfully');
    }
  } catch (error) {
    console.error('Error updating document:', error);
  }
};

export const fetchLocationsFromFirestore = () => {
  const [locationData, setLocationData] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetchDataFromFirestore = async () => {
    setLoader(true);
    try {
      const locationCollection = collection(firebaseDB, "locations");
      const querySnapshot = await getDocs(locationCollection);
      const fetchedData = [];
      for (const doc of querySnapshot.docs) {
        const locationData = doc.data();
        const subcollectionsData = [];
        if (locationData) {
          const subcollectionQuery = query(
            collection(locationCollection, doc.id, "locations")
          );
          const subcollectionSnapshot = await getDocs(subcollectionQuery);
          subcollectionSnapshot.forEach((subDoc) => {
            subcollectionsData.push({ id: subDoc.id, ...subDoc.data() });
          });
          fetchedData.push({ id: doc.id, ...locationData, subcollections: subcollectionsData });
        }
      }
      setLocationData(fetchedData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchDataFromFirestore();
  }, [])

  return { locationData, loader };
};
