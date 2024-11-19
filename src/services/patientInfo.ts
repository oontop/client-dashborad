import axios from 'axios';
import config from './config';

interface PatientInfo {
    id: string;
    createdAt?: Date,
    firstName?: string;
    lastName?: string;
    organizationId?: string;
    gender?: string;
    dob?: Date;
    email?: string;
    mobile?: string;
    phone?: string;
    postalCode?: string;
    behavidencePaitentCode?: string;
    medicalPlatformsIds?: string[];
    whiteLabelsPlatformsIds?: string[];
}

const patientInfo = {
  async getPatientInfo(patientId: string): Promise<PatientInfo> {
    try {
      // use patient-info
      const response = await axios.get<PatientInfo>(`${config.baseUrl}/patient-info/${patientId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching patient info:', error);
      throw error;
    }
  },
};

export default patientInfo;