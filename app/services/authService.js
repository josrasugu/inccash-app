import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API_URL = "http://192.168.0.113:8000"; // Replace with your actual API endpoint

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/user/token`, {
      email,
      password,
    });
    const data = {
      success: true,
      access_token: response.data.access_token,
      expires_in: response.data.expires_in,
      token_type: response.data.token_type,
    };
    return data;
  } catch (error) {
    const data = { success: false, message: "Login error" };
    return data;
  }
};
export const registerUser = async (userDetails) => {
  const first_name = userDetails.first_name;
  const middle_name = userDetails.middle_name;
  const last_name = userDetails.last_name;
  const email = userDetails.email;
  const password = userDetails.password;
  const phone = userDetails.phone;
  const role_id = userDetails.role_id;
  const entity_type = userDetails.entity_type;
  const active = userDetails.active;
  try {
    const response = await axios.post(`${API_URL}/api/users/register`, {
      first_name,
      middle_name,
      last_name,
      email,
      password,
      phone,
      role_id,
      entity_type,
      active,
    });
    if (response.data.success === true) {
      const data = {
        success: true,
        message: response.data.message,
        // access_token: response.data.access_token,
        // expires_in: response.data.expires_in,
        // token_type: response.data.token_type,
      };
      console.log(data);
      return data;
    } else {
      const data = { success: false, message: response.data.message };
      console.log(response.data);
      return data;
    }
  } catch (error) {
    const data = {
      success: false,
      message: "Something went wrong when creating account. Please try again.",
    };
    console.log(error);
    return data;
  }
};

export const userDetails = async () => {
  try {
    const token = SecureStore.getItem("access_token");
    if (!token) {
      setError("No token found");
      setLoading(false);
      return;
    }
    const response = await axios.get(`${API_URL}/api/account`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = {
      success: true,
      firstName: response.data.first_name,
      middleName: response.data.middle_name,
      lastName: response.data.last_name,
      email: response.data.email,
      balance: response.data.balance,
    };
    return data;
  } catch (error) {
    const data = { success: false, message: "Login error" };
    return data;
  }
};
