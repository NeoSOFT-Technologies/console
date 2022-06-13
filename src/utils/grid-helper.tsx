import { h } from "gridjs";

// This will be used for overwriting pagination configuration for handling current selected page
export function setGridPage(paginationConfigs: any, _totalCount: number) {
  const selectedPage = document.querySelector(".gridjs-currentPage")?.innerHTML;

  let currentPage: number = +selectedPage!;
  currentPage = currentPage - 1;
  const limit = paginationConfigs.limit;
  const totalCount = _totalCount;
  const totalPages = Math.ceil(totalCount / limit) - 1;
  const startPage = 0;
  const lastPage = totalPages;
  const oneRecord = totalCount % limit;

  if (totalCount > limit) {
    // when Count of data is greater then limit
    if (currentPage !== startPage && currentPage !== lastPage) {
      // This will be used when we perform delete operation from middle pages  i.e currentPage is not the last page & not the starting page
      paginationConfigs.page = currentPage;
    } else if (currentPage === lastPage && oneRecord === 1) {
      // This will be used when lastPage has 1 record which is going to be deleted.
      paginationConfigs.page = lastPage - 1;
    } else if (currentPage === lastPage) {
      // This will be used when lastPage have more than 1 record.
      paginationConfigs.page = lastPage;
    }
  } else {
    // for page 1 - This will be used when totalCount <= limit
    if (currentPage === startPage) {
      paginationConfigs.page = startPage;
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
// This will be used when return total count of available data
export function checkCount(data: any) {
  if (data.count) {
    return data.count;
  } else if (data.TotalCount) {
    return data.TotalCount;
  } else {
    return 0;
  }
}
// This will be used when you request some formating on columns by using format function
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

// This will be used to set url with pagination to get server-side data
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

// This will be used when you want to navigate from column data
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
