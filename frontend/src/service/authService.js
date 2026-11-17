import { BASE_URL } from "./api";

const ServerApi = {
  Register: {
    url: `${BASE_URL}/auth/register`,
  },

  Login: {
    url: `${BASE_URL}/auth/login`,
  },

  ForgotPassword: {
    url: `${BASE_URL}/auth/forgot-password`,
  },

  // Members Api

  AllMembers:{
    url:`${BASE_URL}/members/all-members`
  },
  AddMember:{
    url:`${BASE_URL}/members/add-member`
  },
  UpDateMember:{
    url:`${BASE_URL}/members/update/:id`
  },
  DeleteMember:{
    url:`${BASE_URL}/members/delete/:id`
  }
};

export default ServerApi;