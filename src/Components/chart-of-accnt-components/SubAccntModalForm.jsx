import { Label, Modal, TextInput } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { createAccount, updateAccount } from "../../services/systemaideService";
import ChartOfAccntContext from "../../context/ChartOfAccntContext";

export function SubAccntModalForm({ openModal, setOpenModal, accountData, fetchChildAccounts }) {

    const { selectedAccount } = useContext(ChartOfAccntContext);
    const [formData, setFormData] = useState({
        parentAccount: selectedAccount?._id || "",
        accountCode: "",
        accountName: "",
    });

    const handleChange = async (e) => {
      const { name, value } = e.target;
      //   if name is parentAccount, set the value to the parentAccount?._id
      if (name === "parentAccount") {
        setFormData((prev) => ({
          ...prev,
          [name]: selectedAccount?._id,
        }));
        return;
      }
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (accountData) {
                await updateAccount(accountData?._id, JSON.stringify(formData));
            } else {
                await createAccount(JSON.stringify(formData));
                setFormData({
                  parentAccount: "",
                  accountCode: "",
                  accountName: "",
                });
            }
            setOpenModal(false);
            fetchChildAccounts();
        } catch (error) {
            console.error("Error creating account:", error);
        }
    };

    useEffect(() => {
      if (accountData) {
        setFormData({
          parentAccount: selectedAccount?._id || "",
          accountCode: accountData?.accountCode || "",
          accountName: accountData?.accountName || "",
        });
      } else {
        setFormData({
          parentAccount: selectedAccount?._id || "",
          accountCode: "",
          accountName: "",
        });
      }
    }, [accountData, selectedAccount]);

    return (
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          {accountData
            ? `Edit Sub-Account - ${accountData?.accountName}`
            : "Add New Sub-Account"}
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="parentAccount" value="Account Class" />
              </div>
              <TextInput
                id="parentAccount"
                name="parentAccount"
                type="text"
                required={true}
                value={selectedAccount?.accountName || ""}
                readOnly={true}
                color="failure"
                hidden={true}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="accountName" value="Account Name" />
              </div>
              <TextInput
                id="accountName"
                name="accountName"
                type="text"
                placeholder="Enter account name"
                required={true}
                value={formData?.accountName}
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="accountCode" value="Account Code" />
              </div>
              <TextInput
                id="accountCode"
                name="accountCode"
                type="text"
                placeholder="Enter account code"
                required={true}
                value={formData?.accountCode}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center text-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              {accountData ? "Save" : "Add"}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    );
}