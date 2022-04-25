export function setNestedState(e: any, state: any) {
  const path = e.target.name.split(".");
  const value =
    e.target.type === "checkbox" ? e.target.checked : e.target.value;
  const depth = path.length;
  const oldstate = state.data.form;
  const newstate = { ...oldstate };
  let newStateLevel = newstate;
  let oldStateLevel = oldstate;

  for (let i = 0; i < depth; i += 1) {
    if (i === depth - 1) {
      newStateLevel[path[i]] = value;
    } else {
      newStateLevel[path[i]] = { ...oldStateLevel[path[i]] };
      oldStateLevel = oldStateLevel[path[i]];
      newStateLevel = newStateLevel[path[i]];
    }
  }
  return newstate;
}
