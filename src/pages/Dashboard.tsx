import React, { useState } from 'react';
import 'react-tooltip/dist/react-tooltip.css';
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import MonthlyDisplay from '../components/MonthlyDisplay';

const Dashboard: React.FC = () => {

    // const { user } = useUser();
    // console.log("🚀 ~ user:", user)

    // const { patients, loading, error } = usePatients();

    // const [openCardIndex, setOpenCardIndex] = useState<number | null>(null);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // if (error) {
    //     return <div>Error: {error}</div>;
    // }


    return (
        <div className="p-6 bg-gray-100 min-h-screen">
             <SignedIn>
                <MonthlyDisplay />
                {/* show paitents data in the future  */}
             </SignedIn>
             <SignedOut>
                    <div className="oontop-extension-auth-button">
                        Please Login to view this page
                    </div>
             </SignedOut>
        </div>
    );
}

export default Dashboard;
