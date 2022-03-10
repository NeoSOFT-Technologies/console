export function getTenantDataList(schema, type, _page, name_like) {
  let count;
  if (_page) {
    let datalist = schema.db.tenant.where({ type });
    // this variable stores list of all tenant
    if (name_like !== " ") {
      const reg = new RegExp(name_like);
      datalist = datalist.filter((ele) => reg.test(ele.userid));
      // filter out userid which have name_like
    }
    count = Math.ceil(datalist.length / 10);
    // count total entries and have a round number for pagination.
    const start = (_page - 1) * 10;
    // calculate start of array to be sent according to page number.
    datalist = datalist.splice(start, 10);
    // array now contains list according to pagination.
    return { datalist, count };
  }
}

export function getTenantUserDataList(schema, _page, name_like) {
  let count;
  if (_page) {
    let datalist = schema.db.tenantUser.where({});
    // this variable stores list of all tenant
    if (name_like !== " ") {
      const reg = new RegExp(name_like);
      console.log(datalist, name_like);
      datalist = datalist.filter((ele) => {
        console.log(ele);
        return reg.test(ele.userName);
      });
      console.log(datalist, name_like);
      // filter out userid which have name_like
    }
    count = Math.ceil(datalist.length / 10);
    // count total entries and have a round number for pagination.
    const start = (_page - 1) * 10;
    // calculate start of array to be sent according to page number.
    datalist = datalist.splice(start, 10);
    // array now contains list according to pagination.
    return { datalist, count };
  }
}

export function updateTenant(schema, params, requestBody) {
  requestBody = JSON.parse(requestBody);
  return schema.db.tenant.update(params, requestBody);
}

export function loginTenant(schema, requestBody) {
  requestBody = JSON.parse(requestBody);
  return schema.db.tenant.where(requestBody);
}

export function deleteTenant(schema, id) {
  return schema.db.tenant.remove(id);
}

export function addTenant(schema, requestBody) {
  requestBody = JSON.parse(requestBody);
  return schema.db.tenant.insert(requestBody);
}
// teant user
export function addTenantUser(schema, requestBody) {
  requestBody = JSON.parse(requestBody);
  return schema.db.tenantUser.insert(requestBody);
}
