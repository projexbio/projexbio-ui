import api from "../utils/api";

export interface College {
  id: string;
  name: string;
  slug: string;
  logoFileId?: string;
  coverImgFileId?: string;
  description?: string;
  location?: string;
  website?: string;
  domains: string[];
}

export class CollegeService {
  static async getAllColleges() {
    return api.get<College[]>("/colleges");
  }
}
