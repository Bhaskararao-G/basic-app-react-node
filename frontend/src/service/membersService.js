import { BASE_URL } from "./api";

const ServerApi = {

  AllMembers:{
    url:`${BASE_URL}/members/all-members`
  },
  AddMember:{
    url:`${BASE_URL}/members/add-member`
  },
  UpDateMember:{
    url:`${BASE_URL}/members/update`
  },
  DeleteMember:{
    url:`${BASE_URL}/members/delete`
  }
};

export default ServerApi;