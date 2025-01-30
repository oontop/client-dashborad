///usePatient.ts
import { useEffect, useState } from "react";
import { IPatient } from "../@types/types";
import { patientInfo } from "../services";

export const usePatients = () => {
    const [patients, setPatients] = useState<IPatient[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>();


    useEffect(() => {
        setError(null);
        setLoading(true);
        // patientInfo.getPatientInfo()
        //     .then((res) => {
        //         setPatients(res.data);
        //         setError(null);
        //     })
        //     .catch(() => {
        //         setError("Network error");
        //     })
        //     .finally(() => {
        //         setLoading(false);
        //     });
    }, []);

    return { patients, loading, error, setPatients };
};