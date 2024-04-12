import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../../FirebaseConfig";

const useAuthenticatedUserData = () => {
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        // If user is logged in, extract the email from the user object
        const userEmail = user.email;
        setEmail(userEmail);
        setLoading(false); // Set loading to false once email is retrieved
      } else {
        // If no user is logged in, set email to null and loading to false
        setEmail(null);
        setLoading(false);
      }
    });

    // Cleanup function to unsubscribe from the authentication state changes
    return () => unsubscribe();
  }, []);

  return { email, loading };
};

export default useAuthenticatedUserData;

