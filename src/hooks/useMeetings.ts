import { useEffect, useState } from "react";
import { meetingService } from "../services";

export const useMeeting = () => {
    const [meetings, setMeetings] = useState<IMeeting[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMeetings = async () => {
            setError(null);
            setLoading(true);
            try {
                const res = await meetingService.getMeetings();
                setMeetings(res.data);
            } catch {
                setError("Network error");
            } finally {
                setLoading(false);
            }
        };

        fetchMeetings();
    }, []);

    return { meetings, loading, error, setMeetings };
};
