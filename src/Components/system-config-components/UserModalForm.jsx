import { Label, Modal, Select, TextInput } from "flowbite-react";
import { createUser, getAllRoles, updateUser } from "../../services/systemaideService";
import { useEffect, useState } from "react";

export function UserModalForm({ openModal, setOpenModal, userData, fetchAllUsers }) {

  const [rolesSelectOptions, setRolesSelectOptions] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "regular",
  });

  const fetchAllRoles = async () => {
    try {
      const response = await getAllRoles();
      if (!response?.success) console.log(response?.message);
      setRolesSelectOptions(response?.data);
    } catch (error) {
      console.error("Error fetching Roles:", error);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userData) {
        await updateUser(userData?._id, JSON.stringify(formData));
      } else {
        await createUser(JSON.stringify(formData));
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          role: "regular",
        });
      }
      setOpenModal(false);
      fetchAllUsers();
    } catch (error) {
      console.error("Error creating User:", error);
    }
  };
//try
  useEffect(() => {
    fetchAllRoles();
  }, [openModal]);

  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData?.firstName || "",
        lastName: userData?.lastName || "",
        email: userData?.email || "",
        password: "",
        role: userData?.role || "regular",
      });
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "regular",
      });
    }
  }, [userData]);

  return (
    <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>
        {userData
          ? `Edit User - ${userData?.firstName} ${userData?.lastName}`
          : "Add New User"}
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="firstName" value="First Name" />
            </div>
            <TextInput
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Enter first name"
              value={formData?.firstName}
              required={true}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="lastName" value="Last Name" />
            </div>
            <TextInput
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Enter last name"
              value={formData?.lastName}
              required={true}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput
              id="email"
              name="email"
              type="text"
              placeholder="Enter email"
              value={formData?.email}
              required={true}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" />
            </div>
            <TextInput
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              required={userData ? false : true}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="role" value="Role" />
            </div>
            <Select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required={true}
            >
              {rolesSelectOptions.map((role, index) => (
                <option key={index + 1} value={role?.name}>
                  {role?.name.toUpperCase()}
                </option>
              ))}
            </Select>
          </div>
          <button
            type="submit"
            className="flex items-center justify-center text-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            {userData ? "Save" : "Add"}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}