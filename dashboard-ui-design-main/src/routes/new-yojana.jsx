import { useRef } from "react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/utils/cn"; 



const AddyojanaForm = ({ yojanaType, onAddyojana }) => {
  const { theme } = useTheme();
  const nameInputRef = useRef();
  const linkInputRef = useRef();
  const detailsInputRef = useRef();
  const eligibilityInputRef = useRef();

  const submitFormHandler = async (e) => {
    e.preventDefault();

    const newyojana = {
      type: yojanaType,
      name: nameInputRef.current.value,
      link: linkInputRef.current.value,
      details: detailsInputRef.current.value,
      eligibility: eligibilityInputRef.current.value,
      addedOn: new Date().toLocaleDateString(),
    };

    // Send data to backend
    try {
      const response = await fetch("http://localhost:5000/api/new-yojana", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newyojana),
      });

      if (!response.ok) {
        throw new Error("Failed to add yojana");
      }

      onAddyojana(newyojana); // Update UI

      // Clear input fields
      nameInputRef.current.value = "";
      linkInputRef.current.value = "";
      detailsInputRef.current.value = "";
      eligibilityInputRef.current.value = "";
    } catch (error) {
      console.error("Error adding yojana:", error);
    }
  };

  return (
    <div className="flex flex-col gap-y-4 w-[600px] ">
      <h1 className="title">Add New Yojana</h1>
            <form
            onSubmit={submitFormHandler}
            className={cn(
                "p-4 rounded-lg border shadow-md space-y-4",
                theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-100 border-gray-300 text-black"
            )}
            >
            <input
                ref={nameInputRef}
                type="text"
                placeholder="New Yojana Name"
                required
                className={cn(
                "w-full p-2 rounded-md border focus:outline-none",
                theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-400 text-black"
                )}
            />
            <input
                ref={linkInputRef}
                type="text"
                placeholder="Links"
                required
                className={cn(
                "w-full p-2 rounded-md border focus:outline-none",
                theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-400 text-black"
                )}
            />
            <textarea
                ref={detailsInputRef}
                placeholder="Details"
                required
                className={cn(
                "w-full p-2 rounded-md border resize-none focus:outline-none h-24",
                theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-400 text-black"
                )}
            />
            <textarea
                ref={eligibilityInputRef}
                placeholder="Eligibility"
                className={cn(
                "w-full p-2 rounded-md border resize-none focus:outline-none h-24",
                theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-400 text-black"
                )}
            />
            <button
                type="submit"
                className={cn(
                "w-full py-2 rounded-md font-bold transition-all",
                theme === "dark"
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                )}
            >
                Add yojana
            </button>
            </form>
    </div>
    


            
  );
};

export default AddyojanaForm;
