import { h } from "gridjs";

// This will check if grid rendered
export function checkGridRendered() {
  let flag = false;
  const grid = document.querySelector(".gridjs")!;
  if (grid) {
    flag = true;
  }
  return flag;
}

// This will add page size dropdown in grid
export function renderPageSizeDropdown(
  list: number[],
  setPageLimit: (size: number) => void,
  size: number
) {
  const paginationFooter = document.querySelector(".gridjs-pages")!;
  // Create Dropdown
  const dropdown = document.createElement("select");
  for (const index in list) {
    const opt = document.createElement("option");
    opt.value = list[index].toString();
    opt.innerHTML = list[index].toString();
    opt.selected = size === list[index];
    dropdown.append(opt);
  }
  dropdown.className = "gridjs-pagesize";
  // Bind Event Handler
  dropdown.addEventListener("change", function () {
    const value = this.value;
    setPageLimit(Number.parseInt(value));
  });
  const button = document.createElement("button");
  button.append(dropdown);
  // Add Dropdown in Grid Pagination Footer
  paginationFooter.append(button);
}

// This will be used for handling current selected page after we refresh grid
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

  // when Count of data is greater then limit
  if (totalCount > limit) {
    // This will be used when we perform delete operation from middle pages
    // i.e currentPage is not the last page & not the starting page
    if (currentPage !== startPage && currentPage !== lastPage) {
      paginationConfigs.page = currentPage;
    }
    // when user is on the last page
    else if (currentPage === lastPage) {
      //  we are checking the last page has one record or more than one record
      paginationConfigs.page = oneRecord === 1 ? lastPage - 1 : lastPage;
    }
  } else {
    // when user is on the first page
    if (currentPage === startPage) {
      paginationConfigs.page = startPage;
    }
  }
}

export function checkResponse(data: any) {
  const checkData = data;
  const currentURL = window.location.pathname.split("/");
  switch (currentURL[1]) {
    case "tenant":
      if (checkData.data) {
        return checkData.data;
      }
      break;
    case "gateway":
      if (checkData.Data.Apis) {
        return checkData.Data.Apis;
      } else if (checkData.Data.Keys) {
        return checkData.Data.Keys;
      } else if (checkData.Data.Policies) {
        return checkData.Data.Policies;
      }
      break;
    default:
      break;
  }
}
// This will be used when return total count of available data
export function checkCount(data: any) {
  let totalCount = 0;
  const currentURL = window.location.pathname.split("/");
  switch (currentURL[1]) {
    case "tenant":
      totalCount = data.count;
      break;

    case "gateway":
      totalCount = data.TotalCount;
      break;

    default:
      break;
  }
  return totalCount;
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
