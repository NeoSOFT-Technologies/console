import store from "../../../../store/index";
import { deleteTenant } from "./slice";
test("Deletes a book from list with id", async () => {
  let state = store.getState().deleteTenant;

  expect(state.isDeleted).toBeFalsy();

  await store.dispatch(deleteTenant(9));

  state = store.getState().deleteTenant;
  if (state.loading === false) {
    // console.log(state);
    expect(state.isDeleted).toBeTruthy();
  }

  // expect(state.deleteTenant.length).toBeLessThan(initialBookCount); // Checking if new length smaller than inital length, which is 3
});
test("Deletes a book from list with id", async () => {
  let state = store.getState().deleteTenant;

  expect(state.isDeleted).toBeTruthy();

  await store.dispatch(deleteTenant(9));

  state = store.getState().deleteTenant;
  console.log(state);
  if (state.loading === true) {
    console.log(state);
    expect(state.isDeleted).toBeFalsy();
  }

  // expect(state.deleteTenant.length).toBeLessThan(initialBookCount); // Checking if new length smaller than inital length, which is 3
});
// test("Deletes a book from list with id", () => {
//   // const state = store.getState().deleteTenant;

//   // expect(state.isDeleted).toBeFalsy();

//   store.dispatch(deleteTenant(900)).then((res) => {
//     console.log(res);
//     // state = store.getState().deleteTenant;
//     if (res.loading === false) {
//       console.log(res);
//       expect(res.isDeleted).toBeFalsy();
//     }
//   });
// });
