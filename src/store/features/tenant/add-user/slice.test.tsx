import store from "../../../../store/index";
import { addNewUser } from "./slice";

test("Deletes a book from list with id", async () => {
  let state = store.getState().addNewUser;

  expect(state.loading).toBeFalsy();

  await store.dispatch(
    addNewUser({
      username: "deepthi",
      email: "deepthi@gmail.com",
      password: "deepthi123",
      tenantname: "deepthi",
    })
  );

  state = store.getState().addNewUser;
  if (state.loading === false) {
    expect(state.isAdded).toBeTruthy();
  }
});
// test("Deletes a book from list with id", async () => {
//   let state = store.getState().addNewUser;

//   expect(state.isAdded).toBeTruthy();

//   await store.dispatch(
//     addNewUser({
//       username: "deepthi",
//       email: "deepthi@gmail.com",
//       password: "deepthi123",
//       tenantname: "deepthi",
//     })
//   );

//   state = store.getState().addNewUser;
//   if (state.loading === false) {
//     expect(state.isAdded).toBeFalsy();
//   }
// });
