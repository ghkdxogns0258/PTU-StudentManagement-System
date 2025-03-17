import http from '../http';

export interface ProfileCardData {
  photoUrl: string;
  studentId: string;
  name: string;
  grade: number;
  projectExperience: { text: string; link?: string }[];
  desiredJobField: string;
}

export const getProfileCardData = async (id: string): Promise<ProfileCardData> => {
    const res = await http.get<ProfileCardData>(`/widgets/profile-card/${id}`);
    return res.data;
};