import { useState } from "react";
export default function TodoApp() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Do coding challenges", active: true },
    { id: 2, text: "Do coding challenges", active: true },
    { id: 3, text: "Do coding challenges", active: false },
  ]);
  const [tab, setTab] = useState("all");
  const [input, setInput] = useState("");

  const filtered = tasks.filter((t) => {
    if (tab === "active") return t.active;
    if (tab === "completed") return !t.active;
    return true;
  });

  const handleAdd = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), text, active: true },
    ]);
    setInput("");
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, active: !t.active } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const deleteAllCompleted = () => {
    setTasks((prev) => prev.filter((t) => t.active));
  };

  const tabs = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "completed", label: "Completed" },
  ];

  return (
    <div className="max-w-md mx-auto mt-10 px-6 font-sans">
      <h1 className="text-center text-3xl font-bold mb-6">#todo</h1>

      <div className="flex justify-between border-b border-gray-200 mb-6">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`pb-2 text-sm flex-1 ${tab === t.key
              ? "text-blue-600 border-b-2 border-blue-600 font-medium"
              : "text-gray-500"
              }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {(tab === "all" || tab === "active") && (
        <form onSubmit={handleAdd} className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="add details"
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
          >
            Add
          </button>
        </form>
      )}

      <ul className="space-y-3">
        {filtered.length === 0 && (
          <li className="text-center text-gray-400 text-sm py-4">
            No tasks
          </li>
        )}
        {filtered.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between gap-2"
          >
            <label className="flex items-center gap-2 cursor-pointer flex-1">
              <input
                type="checkbox"
                checked={!task.active}
                onChange={() => toggleTask(task.id)}
                className="w-4 h-4 accent-blue-600"
              />
              <span
                className={`text-sm ${!task.active ? "line-through text-gray-400" : "text-gray-800"
                  }`}
              >
                {tab === "completed" && !task.active ? "Task done" : task.text}
              </span>
            </label>
            {tab === "completed" && (
              <button
                onClick={() => deleteTask(task.id)}
                className="text-gray-400 hover:text-red-500"
                aria-label="Delete task"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            )}
          </li>
        ))}
      </ul>

      {tab === "completed" && filtered.length > 0 && (
        <div className="flex justify-end mt-6">
          <button
            onClick={deleteAllCompleted}
            className="bg-red-500 text-white text-sm px-4 py-2 rounded-md hover:bg-red-600"
          >
            <i className="fa-solid fa-trash"></i>
            delete all
          </button>
        </div>
      )}
    </div>
  );
}
