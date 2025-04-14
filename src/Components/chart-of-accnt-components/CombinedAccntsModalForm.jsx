import { Badge, Card, Checkbox, Modal } from "flowbite-react";
import { Label, TextInput } from "flowbite-react";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import mainAccountsDataJSON from "../../sample-data/mainAccountsData.json";
import { Search } from "lucide-react";
import {
  createAccount,
  getAllChildAccounts,
  getAllAccounts,
  updateAccount,
} from "../../services/systemaideService";

// Custom indeterminate checkbox component
function IndeterminateCheckbox({ checked, onChange, indeterminate }) {
  const checkboxRef = useRef(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return <Checkbox ref={checkboxRef} checked={checked} onChange={onChange} />;
}

export function CombinedAccntsModalForm({
  openModal,
  setOpenModal,
  accountData,
  setAccountData,
  accountsData,
  fetchAllParentAccounts,
}) {
  const [formData, setFormData] = useState({
    accountCode: "",
    accountName: "",
    subAccounts: [],
  });
  const [availableAccounts, setAvailableAccounts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAllChildAccounts = async () => {
    try {
      const response = accountData ? await getAllChildAccounts() : await getAllAccounts();
      if (!response?.success) console.log(response?.message);

      if (accountData) {
        // if accountData is not null, filter out the accountData from availableAccounts
        const filteredAccounts = response?.data?.filter(
          (account) => account?._id !== accountData?._id
        );
        setAvailableAccounts(filteredAccounts);
      } else {
        setAvailableAccounts(response?.data);
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const handleCloseModal = async () => {
    setOpenModal(false);
    setAccountData(null);
  };
  

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAccountToggle = (accountId) => {
    setFormData((prev) => {
      const subAccounts = prev.subAccounts.includes(accountId)
        ? prev.subAccounts.filter((id) => id !== accountId)
        : [...prev.subAccounts, accountId];

      return {
        ...prev,
        subAccounts,
      };
    });
  };

  const handleToggleAll = () => {
    setFormData((prev) => {
      // If all filtered accounts are selected, deselect them all
      const allFilteredIds = filteredAccounts.map((accnt) => accnt?._id);
      const allSelected = filteredAccounts.every((accnt) =>
        prev.subAccounts.includes(accnt?._id)
      );

      if (allSelected) {
        // Remove all filtered accounts
        return {
          ...prev,
          subAccounts: prev.subAccounts.filter(
            (id) => !allFilteredIds.includes(id)
          ),
        };
      } else {
        // Add all filtered accounts that aren't already selected
        const newSubAccounts = [...prev.subAccounts];

        for (const account of filteredAccounts) {
          if (!newSubAccounts.includes(account?._id)) {
            newSubAccounts.push(account?._id);
          }
        }

        return {
          ...prev,
          subAccounts: newSubAccounts,
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = null;
      if (accountData) {
        response = await updateAccount(
          accountData?._id,
          JSON.stringify(formData)
        );
      } else {
        response = await createAccount(JSON.stringify(formData));
        setFormData({
          accountCode: "",
          accountName: "",
          subAccounts: [],
        });
      }
      setOpenModal(false);
      fetchAllParentAccounts();
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  // Filter accounts based on search query
  const filteredAccounts = useMemo(() => {
    if (!searchQuery) return availableAccounts;

    return availableAccounts.filter(
      (accnt) =>
        (accnt?.accountName?.toLowerCase() || "").includes(
          searchQuery.toLowerCase()
        )
      // || p?._id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, availableAccounts]);

  // Calculate stats for the select all checkbox
  const getStats = () => {
    const total = filteredAccounts.length;
    const selected = filteredAccounts.filter((accnt) =>
      formData.subAccounts.includes(accnt?._id)
    ).length;
    return { total, selected };
  };

  const { total, selected } = getStats();
  const allSelected = total > 0 && selected === total;
  const isIndeterminate = selected > 0 && selected < total;

  useEffect(() => {
    fetchAllChildAccounts();
  }, [openModal, accountData]);

  useEffect(() => {
    if (accountData) {
      setFormData({
        accountCode: accountData?.accountCode || "",
        accountName: accountData?.accountName || "",
        subAccounts: accountData?.subAccounts?.map((accnt) => accnt?._id) || [],
      });
    } else {
      setFormData({
        accountCode: "",
        accountName: "",
        subAccounts: [],
      });
    }
  }, [accountData]);

  return (
    <Modal dismissible show={openModal} onClose={() => handleCloseModal()}>
      <Modal.Header>
        {accountData
          ? `Edit Account - ${accountData?.accountName}`
          : "Add New Main Account"}
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

          {/* {accountData ? null : (
            <div className="mt-2">
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="permissions" value="Sub-Accounts" />
                <Badge color="info">
                  {formData.subAccounts?.length || 0}/{availableAccounts.length}{" "}
                  selected
                </Badge>
              </div>

              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-4 h-4 text-gray-500" />
                </div>
                <TextInput
                  id="search"
                  placeholder="Search sub-accounts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Card>
                <div className="flex items-center justify-between mb-4 pb-2 border-b">
                  <div className="font-medium">All Available Sub-Accounts</div>
                  <div className="flex items-center gap-2">
                    <Badge color="gray">
                      {selected}/{total}
                    </Badge>
                    <IndeterminateCheckbox
                      checked={allSelected}
                      onChange={handleToggleAll}
                      indeterminate={isIndeterminate}
                    />
                  </div>
                </div>

                <div className="max-h-[400px] overflow-y-auto pr-2">
                  {filteredAccounts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {filteredAccounts.map((account) => (
                        <div
                          key={account?._id}
                          className="flex items-center gap-2"
                        >
                          <Checkbox
                            id={account?._id}
                            checked={formData.subAccounts.includes(
                              account?._id
                            )}
                            onChange={() => handleAccountToggle(account?._id)}
                          />
                          <Label
                            htmlFor={account?._id}
                            className="cursor-pointer"
                          >
                            {account?.accountName}
                          </Label>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-4">
                      No accounts match your search
                    </div>
                  )}
                </div>
              </Card>
            </div>
          )} */}

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