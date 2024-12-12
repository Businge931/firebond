import { useState } from "react";

function Test() {
  const argsArray = [{ id: 1, name: "myarg", value: "My Arg" }];
  const [event, updateEvent] = useState({
    result: "undefined",
    determinant: "",
    args: argsArray,
    addedArgument: "",
  });
  const { result, determinant, args, addedArgument } = event;

  const handleAddArg = (e) => {
    e.preventDefault();
    if (determinant === "arguments") {
      updateEvent((prevState) => ({
        ...prevState,
        args: [
          ...args,
          { id: args.length + 1, name: addedArgument, value: addedArgument },
        ],
      }));
    }
  };

  const handleSelectChange = (e) => {
    const selectedDeterminant = e.target.value;
    updateEvent((prevState) => ({
      ...prevState,
      determinant: selectedDeterminant,
    }));
  };

  return (
    <div className="args">
      {args.map((arg) => (
        <div key={arg.id}>
          <input
            value={arg.value}
            name={arg.value}
            onChange={(e) =>
              updateEvent((prevState) => ({
                ...prevState,
                args: args.map((a) =>
                  a.id === arg.id ? { ...a, value: e.target.value } : a
                ),
              }))
            }
          />
        </div>
      ))}
      <select
        id="determinant"
        value={determinant}
        onChange={handleSelectChange}
      >
        <option>-- Select Determinant --</option>
        {args.map((arg) => (
          <option key={arg.id} value={arg.value}>
            {arg.value}
          </option>
        ))}
      </select>
      {result && <p>Selected Option: {result}</p>}
      <br />
      <button onClick={handleAddArg}>+ add arg</button>
    </div>
  );
}

export default Test;
