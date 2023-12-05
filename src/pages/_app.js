import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, 
    getAuth, 
    onAuthStateChanged, 
    sendPasswordResetEmail, 
    signInWithEmailAndPassword, 
    signOut, } from "firebase/auth";
import Header from "@/app/components/Header";
import firebaseConfig from "@/app/components/firebaseConfig";
import { useCallback } from "react";

export default function MyApp({ Component, pageProps}) {
    const [appInitialized, setAppInitialized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInformation, setUserInformation] = useState(null);
    const [error, setError] = useState(null);

    const createUser = useCallback(
        (e) => {
            e.preventDefault();
            const email = e.currentTarget.email.value;
            const password = e.currentTarget.password.value;
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setIsLoggedIn(true);
                    setUserInformation(user);
                    setError(null);

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.warn({ error, errorCode, errorMessage});
                setError(errorMessage);
            });
            },
            [setError, setIsLoggedIn, setUserInformation]
    );


    const loginUser = useCallback(
        (e) => {
            e.preventDefault();
            const email = e.currentTarget.email.value;
            const password = e.currentTarget.password.value;
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setIsLoggedIn(true);
                    setUserInformation(user);
                    setError(null);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.warn({ error, errorCode, errorMessage});
                    setError(errorMessage);
            });
    }, [setError, setIsLoggedIn, setUserInformation]);

    const logoutUser = useCallback(() => {
        const auth = getAuth();
        signOut(auth)
        .then(() => {
            setUserInformation(null);
            setIsLoggedIn(false);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.warn({ error, errorCode, errorMessage});
            setError(errorMessage);
        });

    }, [setError, setIsLoggedIn, setUserInformation]);

    //Initialize Firebase
    useEffect(() => {
        initializeApp(firebaseConfig);
        setAppInitialized(true);
    }, []);

    //User has loaded page, check their status and state accordingly
    useEffect(() => {
        if (appInitialized) {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // User is signed in, see docs for a list of available properties
                    setUserInformation(user);
                    setIsLoggedIn(true);
                } else {
                    // User is signed out
                    setUserInformation(null);
                    setIsLoggedIn(false);
                }
                //setLoading to false when everything is complete
                setIsLoading(false);
            });
        }
    }, [appInitialized]);

    if (isLoading) return null;

    return (
        <>
        <Header isLoggedIn={isLoggedIn} logoutUser={logoutUser} />
        <Component
            {...pageProps}
            createUser={createUser}
            isLoggedIn={isLoggedIn}
            loginUser={loginUser}
            userInformation={userInformation}
        />
        <p>{error}</p>
        </>
    );
    }