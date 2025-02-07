import React, { useState } from 'react';
import { FaCalendarAlt, FaUser } from 'react-icons/fa';
import meetingService, {type Meeting} from '../services/Meeting';
import { useUser } from "@clerk/clerk-react";

enum SearchMode {
    ByDates = 1,
    ByPatientName = 2,
    ByPatientNameAndDates = 3
}

// {meetings.map((meeting, index) => {
//     console.log("🚀 ~ {meetings.map ~ meeting:", meeting)
    
//     return <div key={index} className="grid grid-cols-4 gap-4 border-b border-gray-200 py-2 px-4 hover:bg-gray-100">
//             <div>{meeting.patientData.name} </div>
//             {/* <div>{meeting?.startDate ? new Date(meeting.startDate).toLocaleDateString() : 'N/A'}</div>
//             <div>{meeting?.endDate ? new Date(meeting.endDate).toLocaleDateString() : 'N/A'}</div>
//             <div>{meeting?.patientData.name}</div>
//             <div>{meeting?.patientData.dob ? new Date(meeting.patientData.dob).toLocaleDateString() : 'N/A'}</div> */}
//         </div>
//     }
// )}
// {/* {meetings.map((meeting, index) => (
//     <div key={index} className="grid grid-cols-4 gap-4 border-b border-gray-200 py-2 px-4 hover:bg-gray-100">
//         <div>{meeting.startDate ? meeting.startDate.toLocaleDateString() : 'N/A'}</div>
//         <div>{meeting.endDate ? meeting.endDate.toLocaleDateString() : 'N/A'}</div>
//         <div>{meeting.patientData.name}</div>
//         <div>{meeting.patientData.dob!.toLocaleDateString()}</div>
//     </div>
// ))} */}


const MonthlyDisplay: React.FC = () => {
    const [patientName, setPatientName] = useState<string>('');
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [searchMode, setSearchMode] = useState<SearchMode>(SearchMode.ByDates);

    const { user } = useUser();
    
    const fetchMeetings = async () => {
        if (user?.id) {
            let filteredMeetings: Meeting[] = [];

            switch (searchMode) {
                case SearchMode.ByDates:
                    filteredMeetings = await meetingService.meetingFilterByDates(user.id, startDate, endDate);
                    break;
                case SearchMode.ByPatientName:
                    filteredMeetings = await meetingService.meetingFilterByPatientName(user.id, patientName);
                    break;
                case SearchMode.ByPatientNameAndDates:
                    filteredMeetings = await meetingService.meetingFilterByPatientIdAndDates(user.id, patientName, startDate, endDate);
                    break;
                default:
                    break;
            }

            setMeetings(filteredMeetings.map(meeting => ({
                    ...meeting,
                    startDate: new Date(meeting.startDate || new Date()),
                    endDate: new Date(meeting.endDate || new Date()),
                    // patientData: {
                    //     ...meeting.patientData,
                    //     dob: meeting.patientData?.dob ? new Date(meeting.patientData.dob) : null
                    // }
                })
            ));
            
        }
    };
    
    return (
        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
            {(searchMode === SearchMode.ByPatientNameAndDates || searchMode === SearchMode.ByDates) && 
            <>
                <div className="mb-4">
                    <label className="flex items-center space-x-2 text-blue-600">
                        <FaCalendarAlt />
                        <span>Start Date</span>
                    </label>
                    <input 
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        type="date" id="startDate"
                        onChange={(e) => setStartDate(new Date(e.target.value))}
                        value={startDate.toISOString().split('T')[0]}
                        name="startDate"
                    />
                </div>

                <div className="mb-4">
                    <label className="flex items-center space-x-2 text-blue-600">
                        <FaCalendarAlt />
                        <span>End Date</span>
                    </label>
                    <input 
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        type="date" id="endDate"
                        name="endDate"
                        onChange={(e) => setEndDate(new Date(e.target.value))}
                        value={endDate.toISOString().split('T')[0]}
                    />
                </div>
            </>}

            {(searchMode === SearchMode.ByPatientName || searchMode === SearchMode.ByPatientNameAndDates) && <div className="mb-4">
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
                />
            </div>}

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
                        <div>Meeting Date</div>
                        <div>Meeting Time</div>
                        <div>Patient Name</div>
                        <div>Patient Date of birth</div>
                    </div>
                        {meetings.map((meeting, index) => 
                            <div key={`patient-${index}`}  className="grid grid-cols-4 gap-4 border-b border-gray-200 py-2 px-4">
                                <div>{meeting.startDate ? meeting.startDate.toLocaleDateString() : 'N/A'}</div>
                                <div>{meeting.totalTime ? `${Math.floor(meeting.totalTime / 3600)}h ${Math.floor((meeting.totalTime % 3600) / 60)}m ${meeting.totalTime % 60}s` : 'N/A'}</div>
                                <div>{meeting.patientData?.name}</div>
                                <div>{meeting.patientData?.dob ? new Date(meeting.patientData.dob).toLocaleDateString('en-CA') : 'N/A'}</div>
                            </div>
                        )}
                </div>
            </div>}
            
        </div>
    );
}

export default MonthlyDisplay;
