import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API_URL = "http://10.13.8.157:8000";

export const exchangeRates = async () => {
  try {
    const token = SecureStore.getItem("access_token");
    if (!token) {
      setError("No token found");
      setLoading(false);
      return;
    }
    const response = await axios.get(`${API_URL}/api/exchange-rates`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    const data = { success: false, message: "Login error" };
    return data;
  }
};

export const beneficiaries = async () => {
  try {
    const token = SecureStore.getItem("access_token");
    if (!token) {
      setError("No token found");
      setLoading(false);
      return;
    }
    const response = await axios.get(`${API_URL}/api/beneficiaries`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    const data = { success: false, message: "Login error" };
    return data;
  }
};

export const AddBeneficiary = async (formData) => {
  const token = SecureStore.getItem("access_token");
  if (!token) {
    setError("No token found");
    setLoading(false);
    return;
  }
  try {
    const response = await axios.post(`${API_URL}/api/beneficiary`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = {
      success: true,
      id: response.data.id,
      first_name: response.data.first_name,
      last_name: response.data.last_name,
    };
    return data;
  } catch (error) {
    const data = { success: false, message: "Login error" };
    return data;
  }
};
