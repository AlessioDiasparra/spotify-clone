"use client";

interface UserProviderProps {
  children: React.ReactNode;
}

import { useEffect, useState, createContext } from "react";
import { useUser as useSupaUser, useSessionContext, User } from "@supabase/auth-helpers-react";
import { UserDetails, Subscription } from "@/types";
import { supabaseClient } from "@/app/supabaseClient";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export interface Props {
  children: React.ReactNode;
}

function UserContextProvider(props: Props) {

  const [user, setUser] = useState<User | null>(null);

  const { session, isLoading: isLoadingUser } = useSessionContext();

  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsloadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  //dettagli utente da supabase
  const getUserDetails = () => supabaseClient.from("users").select("*").single();
  const getSubscription = () =>
  supabaseClient
      .from("subscriptions")
      .select("*, prices(*, products(*))")
      .in("status", ["trialing", "active"])
      .single();

  useEffect(() => {
    //fetcha l'utente
    (async () =>{
      const {data} = await supabaseClient.auth.getUser();
      console.log('data :>> ', data);
      setUser(data?.user);
    })();

    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsloadingData(true);
      Promise.allSettled([getUserDetails(), getSubscription()]).then(results => {
        const userDetailsPromise = results[0];
        const subscriptionPromise = results[1];

        if (userDetailsPromise.status === "fulfilled") {
          setUserDetails(userDetailsPromise.value.data as unknown as UserDetails);
        }

        if (subscriptionPromise.status === "fulfilled") {
          setSubscription(subscriptionPromise.value.data as unknown as Subscription);
        }
        setIsloadingData(false);
      });
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, []);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription
  };
  
  return <UserContext.Provider value={value} {...props} />;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  return <UserContextProvider>{children}</UserContextProvider>;
};
export default UserProvider;
