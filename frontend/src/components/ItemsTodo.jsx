
import { useState } from "react";
import { Trash } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ItemsTodo = ({ handleMarkComplted, todoItems, onDeleteClick }) => {
  const { isDarkMode } = useTheme();
  const [filterByStatus, setFilterByStatus] = useState("all");
  const [filterByDateRange, setFilterByDateRange] = useState("all");
  const [filterByExactDate, setFilterByExactDate] = useState("");

  // ✅ Helper Functions
  const isSameDay = (d1, d2) => d1.toDateString() === d2.toDateString();

  const isThisWeek = (date) => {
    const now = new Date();
    const start = new Date(now);
    start.setDate(now.getDate() - now.getDay());
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return date >= start && date <= end;
  };

  const isOverdue = (due) => new Date(due) < new Date();

  // ✅ Filter Logic — applies to all items
  const filteredItems = todoItems.filter((item) => {
    const due = new Date(item.dueDate);

    // Filter by status
    if (filterByStatus === "completed" && !item.completed) return false;
    if (filterByStatus === "incomplete" && item.completed) return false;

    // Filter by date range
    if (filterByDateRange === "today" && !isSameDay(due, new Date()))
      return false;
    if (filterByDateRange === "thisWeek" && !isThisWeek(due)) return false;
    if (filterByDateRange === "upcoming" && isOverdue(due)) return false;
    if (filterByDateRange === "overdue" && !isOverdue(due)) return false;

    // Filter by exact date (calendar)
    if (filterByExactDate) {
      const selected = new Date(filterByExactDate);
      if (!isSameDay(due, selected)) return false;
    }

    return true;
  });

  // ✅ Separate by completion status (after filtering)
  const incompleteItems = filteredItems.filter((item) => !item.completed);
  const completedItems = filteredItems.filter((item) => item.completed);

  return (
    <div className="mt-4 space-y-4 px-4 py-4 mb-4 h-screen">
      {/* 🎛 Filter Controls */}
      <div className={`flex flex-col md:flex-row px-2 md:px-8 m-4  gap-4 mb-6 border ${isDarkMode?"bg-blue-500 ":" bg-yellow-400"} py-2 rounded-md justify-between`}>
        {/* Status Filter */}
        <div>
          <label className="px-4 font-semibold">Status:</label>
          <select
            value={filterByStatus}
            onChange={(e) => setFilterByStatus(e.target.value)}
            className={`border rounded-md px-6 ml-7 py-1 ${
              isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200"
            }`}
          >
            <option value="all">All</option>
            <option value="incomplete">Incomplete</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Date Range Filter */}
        <div>
          <label className="px-4 font-semibold">Goal DATE: </label>
          <select
            value={filterByDateRange}
            onChange={(e) => setFilterByDateRange(e.target.value)}
            className={`border rounded-md px-6 py-1 ${
              isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200"
            }`}
          >
            <option value="all">All</option>
            <option value="today">Today</option>
            <option value="thisWeek">This Week</option>
            <option value="upcoming">Upcoming</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        {/* 📅 Exact Date Picker */}
        <div>
          <label className="px-4 font-semibold">Pick Date:</label>
          <input
            type="date"
            value={filterByExactDate}
            onChange={(e) => setFilterByExactDate(e.target.value)}
            className={`border rounded-md px-2 py-1 outline-none ${
              isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200"
            }`}
          />
          {filterByExactDate && (
            <button
              onClick={() => setFilterByExactDate("")}
              className="ml-2 text-sm text-red-600 underline"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* 🧾 Incomplete Tasks */}
      {incompleteItems.length > 0 ? (
        <>
          <h2 className="text-2xl font-semibold text-gray-700 text-center border-b pb-1">
            Incomplete Tasks
          </h2>
          {incompleteItems.map((item) => (
            <div
              key={item.id}
              className={`flex items-center justify-between border px-4 py-4 rounded-lg shadow-sm ${
                item.completed ? "bg-gray-100" : ""
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => handleMarkComplted(item.id)}
                    className="w-5 h-5 text-blue-600 rounded cursor-pointer"
                  />
                  <span className="text-lg md:text-2xl font-medium">
                    {item.name}
                  </span>
                </div>
                {item.createdAt && (
                  <span className="text-xs text-gray-500">
                    Created:{" "}
                    {new Date(item.createdAt).toLocaleString("en-US", {
                      timeZone: "Asia/Dhaka",
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4">
                {item.dueDate && (
                  <span className="text-sm text-gray-500">
                    {new Date(item.dueDate).toLocaleString("en-US", {
                      timeZone: "Asia/Dhaka",
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>
                )}
                <button
                  onClick={() => onDeleteClick(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
                >
                  <Trash size={18} />
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="text-center text-gray-500 italic">
          No incomplete tasks for selected date or filters.
        </div>
      )}

      {/* ✅ Completed Tasks */}
      {completedItems.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold text-gray-700 text-center border-b pb-1 mt-6">
            Completed Tasks
          </h2>
          {completedItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border px-4 py-4 rounded-lg shadow-sm bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleMarkComplted(item.id)}
                  className="w-5 h-5  rounded cursor-pointer"
                />
                <span className="text-lg font-medium line-through text-gray-400">
                  {item.name}
                </span>
              </div>
              <button
                onClick={() => onDeleteClick(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
              >
                <Trash size={18} />
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ItemsTodo;
