import "./App.css";
import { useReducer } from "react";

const values = ["constant", "arguments", "and", "or"];

const primaryOptions = (
  <>
    <option defaultValue>select...</option>
    {values.map((value) => (
      <option key={value} value={value}>
        {value}
      </option>
    ))}
  </>
);

function App() {
  const argsArray = [{ id: 1, name: "myarg", value: "My Arg" }];

  const [event, updateEvent] = useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    {
      result: "undefined",
      determinant: null,
      args: argsArray,
      addedArgument: argsArray[0].value,
    }
  );

  const { result, determinant, args, addedArgument } = event;

  const handleAddArg = () => {
    // if (determinant === "arguments") {
    //   const newArgument = {
    //     id: args.length + 1,
    //     name: addedArgument.toLowerCase(),
    //     value: addedArgument,
    //   };
    //   updateEvent({
    //     ...event,
    //     args: [...args, newArgument],
    //     addedArgument: newArgument.value,
    //   });
    // }
    if (determinant === "arguments") {
      updateEvent({
        ...event,
        args: [
          ...args,
          { id: args.length + 1, name: addedArgument, value: addedArgument },
        ],
      });
    }
  };

  function onChangeHandler(e) {
    const { name, value } = e.target;
    // console.log("Name:", name, "Value:", value);
    if (determinant === "constant") {
      updateEvent({ determinant: "constant", result: value });
    }

    if (determinant === "arguments") {
      const selectedArg = args.find((arg) => arg.value === value);
      updateEvent({
        // determinant: "arguments",
        result: selectedArg ? selectedArg.value : "undefined",
      });
      // updateEvent({ determinant: "arguments", result: value });
    }
  }

  return (
    <div className="app">
      <div className="args" id="arguments">
        {args.map((arg) => (
          <div key={arg.id}>
            <input
              value={arg.value}
              name={arg.value}
              onChange={(e) =>
                updateEvent({
                  args: args.map((a) =>
                    a.id === arg.id
                      ? {
                          ...a,
                          value: e.target.value,
                          name: e.target.value.toLowerCase(),
                        }
                      : a
                  ),
                })
              }
            />
            <select name={arg.name} onChange={onChangeHandler}>
              <option value="false">false</option>
              <option value="true">true</option>
            </select>
          </div>
        ))}

        <br />
        <button onClick={handleAddArg}>+ add arg</button>
      </div>

      <div id="primary">
        {determinant === "constant" ? (
          <select name="constant" onChange={onChangeHandler}>
            <option value="false">false</option>
            <option value="true">true</option>
          </select>
        ) : determinant === "arguments" ? (
          <select name="arguments" onChange={onChangeHandler}>
            {args.map((arg) => (
              <option key={arg.id} value={arg.value}>
                {arg.value}
              </option>
            ))}
          </select>
        ) : determinant === "and" || determinant === "or" ? (
          <div className="and_or__operations">
            <div className="and_or__selector">
              <select onChange={onChangeHandler}>
                <option>and</option>
                <option>or</option>
              </select>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  updateEvent({ determinant: null, result: "undefined" });
                }}
              >
                x
              </button>
            </div>
            <div className="ops">
              <div>
                <select onChange={onChangeHandler}>{primaryOptions}</select>
                <button onClick={(e) => e.preventDefault()}>x</button>
              </div>
              <div>
                <select>{primaryOptions}</select>
                <button>x</button>
              </div>
              <button onClick={(e) => e.preventDefault()}>+ add op</button>
            </div>
          </div>
        ) : (
          <select
            name="primary"
            onChange={(e) => updateEvent({ determinant: e.target.value })}
          >
            {primaryOptions}
          </select>
        )}

        {(determinant === "constant" ||
          determinant === "arguments" ||
          determinant === null) && (
          <button
            onClick={(e) => {
              e.preventDefault();
              updateEvent({ determinant: null, result: "undefined" });
            }}
          >
            x
          </button>
        )}
      </div>

      <p>result: {result}</p>
    </div>
  );
}

export default App;
