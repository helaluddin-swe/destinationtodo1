

import { addItemToServer } from "../services/addItemToServer";



const AddTodo = ({ onNewItem }) => {

  

  const handleSubmit = async (e) => {
    // 1. Prevent the form from reloading the page
    e.preventDefault();

    // 2. Get the form element from the event
    const form = e.target;

    // 3. Read values from the input fields using their "name" attributes
    const task = form.task.value; // value of the input with name="task"
    const date = form.date.value; // value of the input with name="date"

    // 4. Optional: check if both fields are filled
    if (!task || !date) {
      alert("Please fill both Task and Date fields");
      return;
    }

    // 5. Send the data to the backend server and wait for response
    const newItem = await addItemToServer(task, date);

    // 6. If the server successfully saved the item
    if (newItem) {
      onNewItem(newItem); // Add the new item to the parent component's list
      form.reset();       // Clear the form inputs
    } else {
      // 7. If there was a problem saving the item
      alert("Failed to add item. Try again.");
    }
  };


  return (
    <form onSubmit={handleSubmit} className=" py-8 px-8  gap-4 justify-center md:justify-bewtween items-center  md:flex">


      <input type="text" name="task" className="border w-full px-6 py-3 mb-2 rounded" placeholder="Enter Daily Task" />

      <br />

      <input
        type="date"
      
        name="date"
        placeholder="Select Date"
        className="border w-full px-6 py-3 mb-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
      />


      <br />
      <button type="submit" className="bg-blue-500 w-full md:w-50  font-bold text-white items-center   hover:bg-gray-400 px-6 py-3 rounded-md ">
        Add TODO
      </button>
    </form>
  );
};

export default AddTodo;
