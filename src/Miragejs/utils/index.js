export function getDataList(schema, type, _page, name_like) {
  let count;
  if (_page) {
    let datalist = schema.db.user.where({ type });
    //this variable stores list of all tenant
    if (name_like != " ") {
      let reg = new RegExp(name_like);
      datalist = datalist.filter((ele) => reg.test(ele.userid));
      //filter out userid which have name_like
    }
    count = Math.ceil(datalist.length / 10);
    //count total entries and have a round number for pagination.
    let start = (_page - 1) * 10;
    //calculate start of array to be sent according to page number.
    datalist = datalist.splice(start, 10);
    //array now contains list according to pagination.
    return { datalist, count };
  }
}

export function updateUser(schema, params, requestBody) {
  requestBody = JSON.parse(requestBody);
  return schema.db.user.update(params, requestBody);
}

export function userLogin(schema, requestBody) {
  requestBody = JSON.parse(requestBody);
  return schema.db.user.where(requestBody);
}

export function userDelete(schema, id) {
  return schema.db.user.remove(id);
}

export function userAdd(schema, requestBody) {
  requestBody = JSON.parse(requestBody);
  return schema.db.user.insert(requestBody);
}
