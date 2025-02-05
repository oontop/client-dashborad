import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaChevronDown, FaChevronUp, FaClock, FaGenderless, FaUser, FaUserMd } from 'react-icons/fa';

// import { RiProfileLine } from "react-icons/ri";
// import { Tooltip as ReactTooltip } from 'react-tooltip';
// import 'react-tooltip/dist/react-tooltip.css';
// import { Line } from 'react-chartjs-2';
// import 'chart.js/auto';
// import { getTotalAndPercentageDurations } from '../utils/getTotalDuration';
// import { calculateDuration } from '../utils/utils';
// import { usePatients } from '../hooks/usePatients';
// import { IPatient } from '../@types/types';
// import { formatDate } from '../utils/dateUtils';


const MonthlyDisplay: React.FC = () => {
    // const [selectedMonth, setSelectedMonth] = useState<number>(0);
    // const [genderFilter, setGenderFilter] = useState<string>('');
    // const [providerFilter, setProviderFilter] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [openCardIndex, setOpenCardIndex] = useState<number | null>(null);
    // const [currentMonthPatients, setCurrentMonthPatients] = useState<IPatient[]>([]);
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());

    // useEffect(() => {
    //     const filteredPatients = patients.filter(patient => {
    //         const matchesMonth = selectedMonth === 0 || new Date(patient.treatmentDate).getMonth() + 1 === selectedMonth;
    //         const matchesSearch = `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchQuery.toLowerCase());
    //         const matchesGender = genderFilter === '' || patient.patientGender === genderFilter;
    //         const matchesProvider = providerFilter === '' || patient.providers.includes(providerFilter);
    //         return matchesMonth && matchesSearch && matchesGender && matchesProvider;
    //     });
    //     setCurrentMonthPatients(filteredPatients);
    // }, [selectedMonth, searchQuery, genderFilter, providerFilter, patients]);


    return (
        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
            <div className="mb-4">
                <label className="flex items-center space-x-2 text-blue-600">
                    <FaCalendarAlt />
                    <span>Start Date</span>
                </label>
                <input 
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                type="date" id="startDate"
                 name="trip-start"/>
            </div>

            <div className="mb-4">
                <label className="flex items-center space-x-2 text-blue-600">
                    <FaCalendarAlt />
                    <span>End Date</span>
                </label>
                <input 
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                type="date" id="endDate"
                 name="endDate"/>
            </div>

            <div className="mb-4">
                <label className="flex items-center space-x-2 text-blue-600">
                    <FaUser />
                    <span>Patient Name</span>
                </label>
                <input
                    id="search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    placeholder="Enter patient name"
                />
            </div>

            {/* <div className="mb-4">
                <label className="flex items-center space-x-2 text-blue-600">
                    <FaGenderless />
                    <span>Gender</span>
                </label>
                <select
                    id="gender-filter"
                    value={genderFilter}
                    onChange={(e) => setGenderFilter(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                    <option value="">All</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div> */}

            {/* <div className="mb-4">
                <div className="flex flex-col space-y-2">
                    <label className="flex items-center space-x-2 text-blue-600">
                        <FaUserMd />
                        <span>Providers</span>
                    </label>
                    <select
                        value={providerFilter}
                        onChange={e => setProviderFilter(e.target.value)}
                        className="p-2 border border-gray-300 rounded w-full"
                    >
                        <option value="">All Providers</option>
                        <option value="eCW">eCW</option>
                        <option value="AMD">AMD</option>
                        <option value="Quest">Quest</option>
                        <option value="Behavidance">Behavidance</option>
                    </select>
                </div>
            </div> */}

            <div>
                <button
                    onClick={() => console.log('Submit button clicked')}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default MonthlyDisplay;
