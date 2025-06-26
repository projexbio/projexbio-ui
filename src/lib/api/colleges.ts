import api from "../utils/api";
import { College } from "@/types/college";

export class CollegeService {
  static async getAllColleges() {
    return api.get<College[]>("/colleges");
  }
}
