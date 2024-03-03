import "./styles/main.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store/store.ts";
import { MouseEvent, KeyboardEvent, useState } from "react";
import { add, done, remove, undone } from "../redux/slices/toDoSlice.ts";

function App() {
  const tasks = useSelector((state: RootState) => state.tasks);

  const [value, setValue] = useState<string>("");

  const dispatch = useDispatch();

  function addTask(
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>,
    text: string,
  ) {
    event.preventDefault();
    if (text.trim().length > 0) {
      dispatch(
        add({
          id: tasks.length,
          text,
          done: false,
        }),
      );
      setValue("");
    }
  }
  function removeTask(id: number) {
    dispatch(remove(id));
  }
  function undoneTask(id: number) {
    dispatch(undone(id));
  }
  function doneTask(id: number) {
    dispatch(done(id));
  }

  return (
    <div className="wrapper">
      <div className="main__addTask">
        <label className="main__addTask-label">
          <input
            type="text"
            className="main__addTask-input"
            placeholder="Добавьте задачу..."
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") addTask(event, value);
            }}
          />
        </label>
        <button
          type="submit"
          className="main__addTask-button"
          onClick={(event) => addTask(event, value)}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.92 5.62C11.8724 5.49725 11.801 5.38511 11.71 5.29L6.71 0.290002C6.61676 0.196764 6.50607 0.122803 6.38425 0.0723429C6.26243 0.0218825 6.13186 -0.00408936 6 -0.00408936C5.7337 -0.00408936 5.4783 0.101699 5.29 0.290002C5.19676 0.383241 5.1228 0.493931 5.07234 0.615753C5.02188 0.737575 4.99591 0.868143 4.99591 1C4.99591 1.2663 5.1017 1.5217 5.29 1.71L8.59 5H1C0.734784 5 0.48043 5.10536 0.292893 5.2929C0.105357 5.48043 0 5.73479 0 6C0 6.26522 0.105357 6.51957 0.292893 6.70711C0.48043 6.89465 0.734784 7 1 7H8.59L5.29 10.29C5.19627 10.383 5.12188 10.4936 5.07111 10.6154C5.02034 10.7373 4.9942 10.868 4.9942 11C4.9942 11.132 5.02034 11.2627 5.07111 11.3846C5.12188 11.5064 5.19627 11.617 5.29 11.71C5.38296 11.8037 5.49356 11.8781 5.61542 11.9289C5.73728 11.9797 5.86799 12.0058 6 12.0058C6.13201 12.0058 6.26272 11.9797 6.38458 11.9289C6.50644 11.8781 6.61704 11.8037 6.71 11.71L11.71 6.71C11.801 6.6149 11.8724 6.50275 11.92 6.38C12.02 6.13654 12.02 5.86346 11.92 5.62Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
      <div className="main__tasks-info">
        <div className="main__tasks-title">Задачи</div>
      </div>
      <div className="main__tasks">
        {tasks.map((task) => (
          <div className="task" key={task.id}>
            <span className={!task.done ? "task__text" : "task__done"}>
              {task.text}
            </span>
            <div className="task__buttons">
              <button
                onClick={
                  task.done
                    ? () => undoneTask(task.id)
                    : () => doneTask(task.id)
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  id="check"
                >
                  <path
                    fill="#000000"
                    d="M18.71,7.21a1,1,0,0,0-1.42,0L9.84,14.67,6.71,11.53A1,1,0,1,0,5.29,13l3.84,3.84a1,1,0,0,0,1.42,0l8.16-8.16A1,1,0,0,0,18.71,7.21Z"
                  ></path>
                </svg>
              </button>
              <button onClick={() => removeTask(task.id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  id="times"
                >
                  <path
                    fill="#000000"
                    d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
