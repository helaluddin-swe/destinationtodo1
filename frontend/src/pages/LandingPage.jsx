import { useEffect, useState } from "react";


import Header from "../components/Header";
import AddTodo from "../components/AddTodo";
import WelcomeMessage from "../components/WelcomeMessage";
import ItemsTodo from "../components/ItemsTodo";
import { deletedFromServer, getItemFromServer, markedCompletedOnServer } from "../services/addItemToServer";
import Footer from "../components/Footer";
import Background from "../components/Background";

const LandingPage = () => {
    const [todoItems, setTodoItems] = useState([]);

    const handleNewItem = (newItem) => {
        if (newItem) {
            setTodoItems([...todoItems, newItem]);
        }
    };
    // useEffect for get all items from server 
    useEffect(() => {
        getItemFromServer().then(initialItems => {
            setTodoItems(initialItems)
        })

    }, [])
    const handleMarkComplted = async (id) => {
        await markedCompletedOnServer(id)
        const updatedItems = todoItems.map((item) => {
            if (item.id === id) {
                return { ...item, completed: !item.completed }; // toggle
            }
            return item

        });
     
        setTodoItems(updatedItems)
    }


    // delete items from server 
    const handleDeleteItem = async (id) => {
        setTodoItems((prevItems) => prevItems.filter((item) => item.id !== id));
        await deletedFromServer(id)



    };

    return (
        <div className="relative overflow-hidden">
            <Header />
            <Background/>
            <AddTodo onNewItem={handleNewItem} />
            {todoItems.length === 0 && <WelcomeMessage />}
            <ItemsTodo todoItems={todoItems} handleMarkComplted={handleMarkComplted} onDeleteClick={handleDeleteItem} />
            <Footer/>
        </div>
    );
};

export default LandingPage;
