import { h } from "gridjs";

export function checkResponse(data: any) {
  const checkData = data;
  if (checkData.Data.Apis) {
    return checkData.Data.Apis;
  } else if (checkData.Data.Keys) {
    return checkData.Data.Keys;
  } else if (checkData.Data.Policies) {
    console.log(checkData.Data.Policies);
    return checkData.Data.Policies;
  } else {
    return checkData.data;
  }
}
export function checkCount(data: any) {
  if (data.count) {
    return data.count;
  } else if (data.TotalCount) {
    return data.TotalCount;
  } else {
    return 0;
  }
}
export const checkFormat = (headings: any, _data: any) => {
  console.log(_data);
  let listData: any[] = [];
  for (const column of headings) {
    if (column.format) {
      for (const item of _data) {
        listData.push(column.format(item));
      }
      _data = listData;
      listData = [];
    }
  }
  return _data;
};
export const handleNavigation = (cell: any, row: any, heading: any) => {
  return h(
    "text",
    heading.navigate!
      ? {
          onClick: () => heading.navigate!(row),
          style: {
            cursor: "pointer",
            color: "blue",
          },
        }
      : {},
    cell
  );
};
