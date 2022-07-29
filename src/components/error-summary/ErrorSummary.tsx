import React from "react";
function generateBullets(key: any, value: any, check?: any, name?: any) {
  const checkFlag = typeof check === "boolean" ? !check : check === 1;
  return value !== "" ? (
    <>
      <div key={key}>
        <>
          <ul>
            {(() => {
              if (name === undefined) {
                return (
                  <li>
                    {key} : {value || ""}
                  </li>
                );
              } else if (checkFlag) {
                return (
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
                );
              } else {
                return (
                  <ul>
                    <li>
                      {key} : {value}
                    </li>
                  </ul>
                );
              }
            })()}
          </ul>
          {(() => {
            return typeof check === "boolean"
              ? () => (check = true)
              : () => (check = checkFlag);
          })()}
        </>
      </div>
    </>
  ) : undefined;
}
function displayValue(value: any, check: any) {
  if (value !== "") {
    check = true;
  }
  return check;
}
function arrayString(value1: any, index1: number, data: any, check3: any) {
  check3 = displayValue(value1, check3);
  return check3 ? (
    <div key={index1}>
      <>
        <ul>
          <>
            {(() => {
              return value1 !== "" && value1 !== undefined ? (
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
              );
            })()}
          </>
        </ul>
      </>
    </div>
  ) : undefined;
}
function arraySummary(
  value1: any,
  key1: any,
  index1: number,
  data: any,
  check3: any
) {
  if (typeof value1 === "object") {
    const { ApiId, ApiName, ...rest } = value1;
    console.log(key1, ApiId);
    let checkEmpty = Object.values(value1).every((x) => x === null || x === "");
    const list2: any = Object.entries(rest).map(([key2, value2]) => {
      check3 = displayValue(value2, check3);
      const a = generateBullets(key2, value2, checkEmpty, ApiName);
      checkEmpty = true;
      return a;
    });

    return list2;
  } else if (typeof value1 === "string") {
    return arrayString(value1, index1, data, check3);
  } else {
    return <></>;
  }
}
function counter(value1: any, objCounter: number) {
  if (value1 !== "") {
    objCounter = objCounter + 1;
  }
  return objCounter;
}
export const errorSummary = (errors: any, data?: any) => {
  let list1: any;
  let check1: any;
  let check2: any;
  let check3: any;
  let objCounter = 0;
  const list: any = Object.entries(errors).map(([key, value]) => {
    if (typeof value === "string") {
      check1 = displayValue(value, check1);
      return generateBullets(key, value);
    } else if (typeof value === "object" && !Array.isArray(value || "")) {
      list1 = Object.entries(value || "").map(([key1, value1]) => {
        check2 = displayValue(value1, check2);
        objCounter = counter(value1, objCounter);
        return generateBullets(key1, value1, objCounter, key);
      });
    } else if (Array.isArray(value)) {
      // look
      list1 = Object.entries(value).map(([key1, value1], index1) => {
        return arraySummary(value1, key1, index1, data, check3);
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
