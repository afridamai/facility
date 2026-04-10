import axios from "axios";
import { OrganizationLoginDto, CreateOrganizationDto, AuthResponse, VerifyCodeDto } from "@/lib/types";


/**
 * 🛡️ AFRIDAM INFRASTRUCTURE SYNC
 * Version: 2026.01.26
 * Fix: Forced token sanitation to prevent double-quote JSON errors.
 */
const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://afridam-backend-prod-107032494605.us-central1.run.app/api";
const aiURL = "https://afridam-ai2-api-131829695574.us-central1.run.app/api/v1";

const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authApi = {
  registerOrganization: async (data: CreateOrganizationDto) => {
    const response = await apiClient.post("/auth/organization/register", data);
    return response.data;
  },

  verifyOrganizationCode: async (data: VerifyCodeDto) => {
    const response = await apiClient.post("/auth/register/verify", data);
    return response.data;
  },

  login: async (data: OrganizationLoginDto): Promise<AuthResponse> => {
    const response = await apiClient.post("/auth/login", data);
    return response.data;
  }
};

export default apiClient;
