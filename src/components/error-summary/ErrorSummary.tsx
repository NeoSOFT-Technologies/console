import React from "react";

export const errorSummary = (state: any) => {
  let list1: any;
  let check1: any;
  let check2: any;
  let check3: any;
  const list: any = Object.entries(state).map(([key, value]) => {
    console.log(`${key}: ${value}`);
    if (typeof value === "string") {
      // console.log(`${key}: ${value}`);

      if (value !== "") {
        check1 = true;
      }
      // console.log("check1:", check1);
      return value !== "" ? (
        <div key={key}>
          <>
            <ul>
              <li>
                {" "}
                {key} : {value!}
              </li>
            </ul>
            {/* {key} : {value!} */}
            {/* <Alert
              key={key}
              variant="warning"
              // dismissible
            >
              {key} : {value!}
            </Alert> */}
          </>
        </div>
      ) : undefined;
    } else if (typeof value === "object" && !Array.isArray(value!)) {
      // console.log(
      //   "is object?",
      //   typeof value === "object" && !Array.isArray(value!)
      // );
      list1 = Object.entries(value!).map(([key1, value1]) => {
        // console.log(`${key1}: ${value1}`);
        if (value1 !== "") {
          check2 = true;
        }
        // console.log("check2:", check2);

        // if ((key === "GlobalLimit") && value2 !== "") {
        //   return (
        //     <div key={key2}>
        //       <>
        //         <ul>
        //           <li>
        //             <>
        //               {key2} : {value2!}
        //             </>
        //           </li>
        //         </ul>
        //         {/* {key2} : {value2!} */}
        //       </>
        //     </div>
        //   );
        // }
        // console.log("check3:", check3);

        return value1 !== "" ? (
          <div key={key1}>
            <>
              <ul>
                <li>
                  {" "}
                  {key1} : {value1!}
                </li>
              </ul>

              {/* {key1} : {value1!} */}
              {/* <Alert key={key1} variant="warning">
                {key1} : {value1!}
              </Alert> */}
            </>
          </div>
        ) : undefined;
      });
    } else if (Array.isArray(value!)) {
      console.log("value:", value);
      list1 = Object.entries(value).map(([key1, value1]) => {
        console.log(`${key1}`);
        const list2: any = Object.entries(value1).map(([key2, value2]) => {
          // console.log(`${key2}: ${value2}`);
          if (value2 !== "") {
            check3 = true;
          }

          // if ((key === "Versions" || key === "PerApiLimit") && value2 !== "") {
          //   return (
          //     <div key={key2}>
          //       <>
          //         <ul>
          //           <li>
          //             <>
          //               {key2} : {value2!}
          //             </>
          //           </li>
          //         </ul>
          //         {/* {key2} : {value2!} */}
          //       </>
          //     </div>
          //   );
          // }
          // console.log("check3:", check3);

          return value2 !== "" ? (
            <div key={key2}>
              <>
                <ul>
                  <li>
                    <>
                      {key2} : {value2!}
                    </>
                  </li>
                </ul>
                {/* {key2} : {value2!} */}
              </>
            </div>
          ) : undefined;
        });
        return list2;
      });
    }
    return list1;
  });

  // return list;
  console.log("list:", list);
  return (
    <div>
      {check1 || check2 || check3 ? (
        <div
          className="border rounded mb-3  p-3"
          style={{
            color: "red",
            backgroundColor: "#fff3cd",
            borderColor: "#ffeeba",
          }}
        >
          {" "}
          <b>Please fix following errors:</b>
          <br />
          <br />
          {list}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
