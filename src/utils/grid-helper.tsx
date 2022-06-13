import { h } from "gridjs";

export function setGridPage(pageLimit: number, _count: number) {
  const selectedPage = document.querySelector(".gridjs-currentPage")?.innerHTML;

  const currentPage: number = +selectedPage!;
  const limit = pageLimit;
  const totalCount = _count;
  const totalPages = Math.ceil(totalCount / limit) - 1;
  const startPage = 0;
  let pageNum = 0;
  const lastPage = totalPages;
  const oneRecord = totalCount % limit;

  if (totalCount > limit) {
    // 4> 2
    if (currentPage !== startPage && currentPage - 1 !== lastPage) {
      //  if more then zero records  & not last page & not 1st page
      pageNum = currentPage - 1;
      return pageNum;
    } else if (currentPage - 1 === lastPage && oneRecord === 1) {
      // last page woking more than 1 record
      pageNum = lastPage - 1;
      return pageNum;
    } else if (currentPage - 1 === lastPage) {
      // 3 :3 last page woking more than 1 record
      pageNum = lastPage;
      return pageNum;
    } else if (totalPages + 1 === currentPage) {
      // page != 1 & having more then 1 record on same page
      pageNum = totalPages;
      return pageNum;
    }
  } else {
    // working for page 1
    // if : totalcount <= limit
    if (currentPage - 1 === startPage) {
      pageNum = startPage;
      return pageNum;
    }
  }
}
export function checkResponse(data: any) {
  const checkData = data;
  if (checkData.Data.Apis) {
    return checkData.Data.Apis;
  } else if (checkData.Data.Keys) {
    return checkData.Data.Keys;
  } else if (checkData.Data.Policies) {
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

export function checkPaginationUrl(prev: string, page: number, limit: number) {
  let paginationURL = "";
  const currentURL = window.location.pathname.split("/");
  switch (currentURL[1]) {
    case "tenant":
      paginationURL = `${prev}page=${page + 1}`;
      break;
    case "gateway":
      paginationURL = `${prev}pageNum=${page + 1}&pageSize=${limit}`;
      break;
    default:
      break;
  }
  return paginationURL;
}

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
