import React, { useState } from 'react';
import { FaCalendarAlt, FaUser } from 'react-icons/fa';
import meetingService, {type Meeting} from '../services/Meeting';
import { useUser } from "@clerk/clerk-react";

enum SearchMode {
    ByDates = 1,
    ByPatientName = 2,
    ByPatientNameAndDates = 3
}

const MonthlyDisplay: React.FC = () => {
    // const [openCardIndex, setOpenCardIndex] = useState<number | null>(null);
    const [patientName, setPatientName] = useState<string>('');
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [searchMode, setSearchMode] = useState<SearchMode>(SearchMode.ByDates);
    const { user } = useUser();
    
    const fetchMeetings = async () => {
        console.log("🚀 ~ searchMode:", searchMode)
        if (user?.id) {
            const filteredMeetings = await meetingService.meetingFilterByPatientName(user.id, patientName, startDate, endDate);
            setMeetings(filteredMeetings);
        }
    };
    
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
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    placeholder="Enter patient name"
                    // disabled={}
                />
            </div>

            <div className="mb-4">
                <label className="flex items-center space-x-2 text-blue-600">
                    <input
                        type="radio"
                        name="searchType"
                        value="byDates"
                        onChange={() => {
                            setPatientName('');
                            setStartDate(new Date());
                            setEndDate(new Date());
                            setSearchMode(SearchMode.ByDates);
                        }}
                    />
                    <span>Search by Dates</span>
                </label>
                <label className="flex items-center space-x-2 text-blue-600">
                    <input
                        type="radio"
                        name="searchType"
                        value="byPatientName"
                        onChange={() => {
                            setStartDate(new Date());
                            setEndDate(new Date());
                            setSearchMode(SearchMode.ByPatientName);
                        }}
                    />
                    <span>Search by Patient Name</span>
                </label>
                <label className="flex items-center space-x-2 text-blue-600">
                    <input
                        type="radio"
                        name="searchType"
                        value="byPatientNameAndDates"
                        defaultChecked
                        onChange={() => {
                            setPatientName('');
                            setSearchMode(SearchMode.ByPatientNameAndDates);
                        }}
                    />
                    <span>Search by Patient Name and Dates</span>
                </label>
            </div>
            <div>
                <button
                    onClick={fetchMeetings}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Submit
                </button>
            </div>
            {meetings.length > 0 && <div className="overflow-x-auto">
                <div className="min-w-full bg-white">
                    <div className="grid grid-cols-4 gap-4 border-b border-gray-200 py-2 px-4">
                        <div>Date</div>
                        <div>Time</div>
                        <div>Patient</div>
                        <div>Doctor</div>
                    </div>
                    {meetings.map((meeting, index) => (
                        <div key={index} className="grid grid-cols-4 gap-4 border-b border-gray-200 py-2 px-4 hover:bg-gray-100">
                            <div>{meeting.startDate ? meeting.startDate.toLocaleDateString() : 'N/A'}</div>
                            <div>{meeting.endDate ? meeting.endDate.toLocaleDateString() : 'N/A'}</div>
                            <div>{meeting.patientData.name}</div>
                            <div>{meeting.patientData.dob!.toLocaleDateString()}</div>
                        </div>
                    ))}
                </div>
            </div>}
            
        </div>
    );
}

export default MonthlyDisplay;
