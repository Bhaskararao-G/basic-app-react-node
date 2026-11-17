import { useCallback, useEffect, useState } from "react";
import { FaPlus, FaSearch, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import ServerApi from "../../service/membersService";
import memberService from "../../service/membersService";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  role: "User",
};

const Members = () => {
  const [members, setMembers] = useState([]);
  const [formData, setFormData] = useState(emptyForm);

  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch members on page load
  useEffect(() => {
    fetchMembers();
  }, []);

  // Handle API response
  const handleResponse = async (response) => {
    const text = await response.text();

    let data = {};

    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      throw new Error("Invalid server response. Check your API.");
    }

    if (!response.ok) {
      throw new Error(data.message || "API request failed");
    }

    return data;
  };

  // GET MEMBERS
  const fetchMembers = async (searchValue = "") => {
    setLoading(true);
    setError("");

    try {
      const response = await memberService.getAllMembers(searchValue);

      if (response && response.members) {
        setMembers(response.members);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // SEARCH MEMBERS
  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);
    fetchMembers(value);
  };

  // OPEN ADD MODAL
  const handleAdd = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setError("");
    setShowModal(true);
  };

  // OPEN EDIT MODAL
  const handleEdit = (id, memberData) => {
    const memberId = id || memberData?._id || memberData?.id;

    if (!memberId) {
      setError("Member ID not found.");
      return;
    }

    setEditingId(memberId);

    setFormData({
      name: memberData.name || "",
      email: memberData.email || "",
      phone: memberData.phone || memberData.mobile || "",
      role: memberData.role || "User",
    });

    setError("");
    setShowModal(true);
  };

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ADD MEMBER
  const handleAddMember = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(ServerApi.AddMember.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      await handleResponse(response);

      await fetchMembers(search);
      console.log(response);

      setShowModal(false);
      setFormData(emptyForm);
    } catch (error) {
      console.error("Add Member Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // UPDATE MEMBER
  const handleUpdate = async () => {
    try {
      if (!editingId) {
        setError("Member ID not found.");
        return;
      }

      setLoading(true);
      setError("");

      const response = await fetch(
        `${ServerApi.UpDateMember.url}/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      await handleResponse(response);

      await fetchMembers(search);
      console.log(response);

      setShowModal(false);
      setEditingId(null);
      setFormData(emptyForm);
    } catch (error) {
      console.error("Update Member Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // DELETE MEMBER
  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this member?")) {
        return;
      }

      setLoading(true);
      setError("");

      const response = await fetch(`${ServerApi.DeleteMember.url}/${id}`, {
        method: "DELETE",
      });

      await handleResponse(response);

      setMembers((prev) =>
        prev.filter((member) => member._id !== id && member.id !== id),
      );
    } catch (error) {
      console.error("Delete Member Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // SUBMIT FORM
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Name and email are required.");
      return;
    }

    if (editingId) {
      handleUpdate();
    } else {
      handleAddMember();
    }
  };

  // CLOSE MODAL
  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData(emptyForm);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Members Management
          </h1>

          <p className="text-gray-500">Manage all registered members</p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <FaPlus />
          Add Member
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-4 rounded-lg bg-red-100 p-3 text-red-700">
          {error}
        </div>
      )}

      {/* SEARCH */}
      <div className="mb-5 flex items-center gap-3 rounded-lg bg-white p-3 shadow">
        <FaSearch className="text-gray-400" />

        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search members..."
          className="w-full outline-none"
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Role</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading && members.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center">
                  Loading members...
                </td>
              </tr>
            ) : members.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No members found.
                </td>
              </tr>
            ) : (
              members.map((member) => (
                <tr
                  key={member._id || member.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-4">{member.name}</td>

                  <td className="p-4">{member.email}</td>

                  <td className="p-4">
                    {member.phone || member.mobile || "-"}
                  </td>

                  <td className="p-4">{member.role}</td>

                  <td className="p-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() =>
                          handleEdit(member._id || member.id, member)
                        }
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() => handleDelete(member._id || member.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">
                {editingId ? "Edit Member" : "Add Member"}
              </h2>

              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-red-600"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Name</label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter name"
                    className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Phone
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone"
                    className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Role</label>

                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg border px-4 py-2"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading
                    ? "Please wait..."
                    : editingId
                      ? "Update Member"
                      : "Add Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Members;
