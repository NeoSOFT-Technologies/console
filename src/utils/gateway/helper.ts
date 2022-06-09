import moment from "moment";

export const formatStatus = (item: any) => {
  const listObj = Object.create(item);
  listObj.Status = listObj.IsActive === true ? "Active" : "In-Active";
  return listObj;
};
export const formatDate = (item: any) => {
  const listObj = Object.create(item);
  listObj.CreatedDateTxt =
    listObj.CreatedDate !== ""
      ? moment(listObj.CreatedDate).format("DD/MM/YYYY")
      : "";
  return listObj;
};
export const formatCommaSeparated = (item: any) => {
  const listObj = Object.create(item);

  listObj.ApisTxt = listObj.Apis !== [] ? listObj.Apis.join(", ") : "";
  return listObj;
};
