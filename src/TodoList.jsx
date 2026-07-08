import { useState, useEffect } from "react"; // 1. Added useEffect
import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";
import "./TodoList.css";
import { FaTrashAlt, FaDice } from "react-icons/fa";

export default function TodoList() {
    // 2. Initialize state by reading from localStorage
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("my-todo-list");
        return savedTodos ? JSON.parse(savedTodos) : [
            { task: "Buy groceries", id: uuidv4(), isDone: false },
            { task: "Finish homework", id: uuidv4(), isDone: false },
            { task: "Call a friend", id: uuidv4(), isDone: false },
            { task: "Clean the room", id: uuidv4(), isDone: false },
            { task: "Drink 2 liters of water", id: uuidv4(), isDone: false },
        ];
    });

    // 3. Save to localStorage whenever 'todos' changes
    useEffect(() => {
        localStorage.setItem("my-todo-list", JSON.stringify(todos));
    }, [todos]);

    const [newTask, setNewTask] = useState("");

    const update = (e) => {
        setNewTask(e.target.value);
    };

    const add = () => {
        if (newTask.trim() === "") return;

        setTodos((prev) => [
            ...prev,
            {
                task: newTask,
                id: uuidv4(),
                isDone: false,
            },
        ]);

        setNewTask("");
    };

    const del = (id) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    const done = (id) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id
                    ? { ...todo, isDone: !todo.isDone }
                    : todo
            )
        );
    };

    const randomTask = () => {
        const task = `${faker.word.verb()} ${faker.word.noun()}`;
        setNewTask(
            task.charAt(0).toUpperCase() + task.slice(1)
        );
    };

    return (
        <div className="todo-container">
            <h1> Todo List</h1>

            <div className="input-box">
                <input
                    type="text"
                    placeholder="Enter a task..."
                    value={newTask}
                    onChange={update}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") add();
                    }}
                />

                <button
                    className="dice-btn"
                    onClick={randomTask}
                    title="Random Task"
                >
                    <FaDice />
                </button>

                <button onClick={add}>
                    Add Task
                </button>
            </div>

            <hr />

            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <input
                            type="checkbox"
                            checked={todo.isDone}
                            onChange={() => done(todo.id)}
                        />

                        <span
                            style={{
                                textDecoration: todo.isDone
                                    ? "line-through"
                                    : "none",
                                opacity: todo.isDone ? 0.6 : 1,
                            }}
                        >
                            {todo.task}
                        </span>

                        <button
                            className="delete-btn"
                            onClick={() => del(todo.id)}
                            title="Delete Task"
                        >
                            <FaTrashAlt />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}