import React, { useState } from 'react';
import { usePatients } from '../hooks/usePatients';
import { calculateTreatmentDurations, calculateMonthlyCounts, calculateDuration } from '../utils/utils';

// import { FaDollarSign, FaUser, FaCalendarAlt, FaUserCheck, FaInfoCircle, FaUserClock, FaClock, FaUsers, FaChevronDown, FaChevronUp } from 'react-icons/fa';
// import { Line, Doughnut } from 'react-chartjs-2';
// import 'chart.js/auto';
// import { getTotalAndPercentageDurations } from '../utils/getTotalDuration';
// import { calculateMonthlyDurations } from '../utils/calculateMonthlyDurations';
// import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import MonthlyDisplay from '../components/MonthlyDisplay';

import { SignedIn, SignedOut, /*SignInButton, SignOutButton, useUser*/ } from "@clerk/clerk-react";

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

    // const treatmentDurationCounts = calculateTreatmentDurations(patients);
    // const monthlyCounts = calculateMonthlyCounts(patients);
    // const monthlyDurations = calculateMonthlyDurations(patients);
    // const { durationsAndPercentages, totalDuration } = getTotalAndPercentageDurations(patients);

    // const totalPatients = patients.length;
    // const patientsWithZeroMinutes = treatmentDurationCounts['0-10 min'];
    // const patientsWithMoreThanTenMinutes = treatmentDurationCounts['10-20 min'];
    // const patientsReachedGoal = treatmentDurationCounts['20+ min'];

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
