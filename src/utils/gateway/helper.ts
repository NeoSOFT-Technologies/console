import moment from "moment";

const statusAndDateHelper = (item: any) => {
  const listObj = Object.create(item);
  if (item.Apis) {
    listObj.ApisTxt = listObj.Apis !== [] ? listObj.Apis.join(", ") : "";
  }
  listObj.Status = listObj.IsActive === true ? "Active" : "In-Active";
  listObj.CreatedDateTxt =
    listObj.CreatedDate !== ""
      ? moment(listObj.CreatedDate).format("DD/MM/YYYY")
      : "";
  return listObj;
};
export default statusAndDateHelper;
