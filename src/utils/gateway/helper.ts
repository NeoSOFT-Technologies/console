import moment from "moment";

// This will be used when you want to update status
export const formatStatus = (item: any) => {
  const listObj = Object.create(item);
  listObj.Status = listObj.IsActive === true ? "Active" : "In-Active";
  return listObj;
};

// This will be used when you request date formating on columns in perticular format
export const formatDate = (item: any) => {
  const listObj = Object.create(item);
  listObj.CreatedDateTxt =
    listObj.CreatedDate !== ""
      ? moment(listObj.CreatedDate).format("DD/MM/YYYY")
      : "";
  return listObj;
};

// This will be used when you want to display comma separated  values in paticular column
export const formatCommaSeparated = (item: any) => {
  const listObj = Object.create(item);

  listObj.ApisTxt = listObj.Apis !== [] ? listObj.Apis.join(", ") : "";
  return listObj;
};
