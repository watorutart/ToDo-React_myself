import { useState } from "react";
import "./styles.css";

export default function App() {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState(["あああ", "いいい"]);
  const [completeTodos, setCompleteTodos] = useState(["ううう"]);

  const onChangeText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    const newIncompleteTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newIncompleteTodos);
    setTodoText("");
  };

  const onClickComplete = (index) => {
    // 未完了リストから削除
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);
    // 完了タスクに追加
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];

    // 再レンダリング
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const onClickDelete = (index) => {
    // 未完了リストから削除
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);

    // 再レンダリング
    setIncompleteTodos(newIncompleteTodos);
  };

  const onClickBack = (index) => {
    // 完了リストから削除
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    // 未完了リストに追加
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];

    // 再レンダリング
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  return (
    <>
      <div className="inputTodo">
        <input
          placeholder="ToDoを入力"
          value={todoText}
          onChange={onChangeText}
        />
        <button onClick={onClickAdd}>追加</button>
      </div>
      <div className="incompleteList">
        <p className="title">未完了タスク</p>
        <ul>
          {incompleteTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickComplete(index)}>完了</button>
                <button onClick={() => onClickDelete(index)}>削除</button>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="completeList">
        <p className="title">完了タスク</p>
        <ul>
          {completeTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickBack(index)}>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}
