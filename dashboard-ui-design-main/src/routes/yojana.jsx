import React, { useEffect, useState } from "react";
import { Footer } from "@/layouts/footer";
import { PencilLine, Trash } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const Yojana = () => {
    const { theme } = useTheme();
    const [yojanaData, setYojanaData] = useState([]); // Store fetched data

    // Fetch Yojana data from the backend
    useEffect(() => {
        const fetchYojana = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/yojana");
                const data = await response.json();
                setYojanaData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchYojana();
    }, []);

    return (
        <div className="flex flex-col gap-y-4">
            <h1 className="title">Yojana</h1>
            <div className="card">
                <div className="card-header">
                    <p className="card-title">Top Orders</p>
                </div>
                <div className="card-body p-0">
                    <div className="relative h-[500px] w-full overflow-auto rounded-none [scrollbar-width:_thin]">
                        <table className="table">
                            <thead className="table-header">
                                <tr className="table-row">
                                    <th className="table-head">ID</th>
                                    <th className="table-head">Yojana Type</th>
                                    <th className="table-head">Status</th>
                                    <th className="table-head">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="table-body">
                                {yojanaData.length > 0 ? (
                                    yojanaData.map((yojana) => (
                                        <tr key={yojana.id} className="table-row">
                                            <td className="table-cell">{yojana.yojana_type_id}</td>
                                            <td className="table-cell">{yojana.yojana_type}</td>
                                            <td className="table-cell px-4 py-2">
                                                <span
                                                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium w-fit
                                                    ${yojana.status === "Active" ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"}`}
                                                >
                                                    {yojana.status}
                                                </span>
                                            </td>

                                            <td className="table-cell">
                                                <div className="flex items-center gap-x-4">
                                                    <button className="text-blue-500 dark:text-blue-600">
                                                        <PencilLine size={20} />
                                                    </button>
                                                    <button className="text-red-500">
                                                        <Trash size={20} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center p-4">No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Yojana;
