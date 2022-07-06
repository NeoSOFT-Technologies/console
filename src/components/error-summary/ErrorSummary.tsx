import React from "react";
function generateBullets(key: any, value: any, check?: any, name?: any) {
  const checkFlag = typeof check === "boolean" ? !check : check === 1;
  return value !== "" ? (
    <>
      <div key={key}>
        <>
          <ul>
            {name === undefined ? (
              <li>
                {key} : {value!}
              </li>
            ) : checkFlag ? (
              <>
                <li>
                  <b>{name}</b>
                  <ul>
                    <li>
                      {key} : {value}
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <ul>
                <li>
                  {key} : {value}
                </li>
              </ul>
            )}
          </ul>
          {typeof check === "boolean" ? (check = true) : (check = checkFlag)}
        </>
      </div>
    </>
  ) : undefined;
}
// export default function ErrorSummary(errors: any, data?: any) {
export const errorSummary = (errors: any, data?: any) => {
  let list1: any;
  let check1: any;
  let check2: any;
  let check3: any;
  let objCounter = 0;
  const list: any = Object.entries(errors).map(([key, value], index) => {
    if (typeof value === "string") {
      if (value !== "") {
        check1 = true;
      }
      return generateBullets(key, value);
    } else if (typeof value === "object" && !Array.isArray(value!)) {
      list1 = Object.entries(value!).map(([key1, value1], index1) => {
        if (value1 !== "") {
          check2 = true;
        }
        if (value1 !== "") {
          objCounter = objCounter + 1;
        }
        return generateBullets(key1, value1, objCounter, key);
      });
    } else if (Array.isArray(value!)) {
      list1 = Object.entries(value).map(([key1, value1], index1) => {
        if (typeof value1 === "object") {
          const { ApiId, ApiName, ...rest } = value1;
          let checkEmpty = Object.values(value1).every(
            (x) => x === null || x === ""
          );
          const list2: any = Object.entries(rest).map(
            ([key2, value2], index2) => {
              if (value2 !== "") {
                check3 = true;
              }

              const a = generateBullets(key2, value2, checkEmpty, ApiName);
              checkEmpty = true;
              return a;
            }
          );

          return list2;
        } else if (typeof value1 === "string") {
          if (value1 !== "") {
            check3 = true;
          }

          return check3 ? (
            <div key={index1}>
              <>
                <ul>
                  <>
                    {value1 !== "" && value1 !== undefined ? (
                      <li>
                        <>
                          <b>{data[index1]}</b>
                        </>
                        <ul>
                          <li>
                            <>{value1}</>
                          </li>
                        </ul>
                      </li>
                    ) : (
                      <></>
                    )}
                  </>
                </ul>
              </>
            </div>
          ) : undefined;
        } else {
          return <></>;
        }
      });
    }
    return list1;
  });

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
