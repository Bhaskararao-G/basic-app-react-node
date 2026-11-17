import { BASE_URL, apiRequest } from "./api";

const API_URLS = {
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

// Member Service methods for interacting with the API
const memberService = {
  getAllMembers: (searchValue = "") => {
    const apiUrl = `${API_URLS.AllMembers.url}`;
    const params = new URLSearchParams({
      search: searchValue,
    });

    return apiRequest(
      `${apiUrl}?${params.toString()}`,
      {
        method: "GET",
      }
    );
  },

  addMember: (memberData) => {
    const apiUrl = `${API_URLS.AddMember.url}`;

    return apiRequest(
      apiUrl,
      {
        method: "POST",
        body: JSON.stringify(memberData),
      }
    );
  },
};

export default memberService;