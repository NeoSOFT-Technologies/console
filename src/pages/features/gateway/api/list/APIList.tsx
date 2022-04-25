import React, { useState, useEffect } from "react";
import { useErrorHandler } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import RenderList from "../../../../../components/gateway/list/RenderList";

import Spinner from "../../../../../components/loader/Loader";
import { ToastAlert } from "../../../../../components/toast-alert/toast-alert";
import { RootState } from "../../../../../store";
import { deleteApi } from "../../../../../store/features/gateway/api/delete/slice";
import {
  IApiData,
  IApiListState,
  IApiDataList,
} from "../../../../../store/features/gateway/api/list";
import { getApiList } from "../../../../../store/features/gateway/api/list/slice";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
// import moment from "moment";
import statusAndDateHelper from "../../../../../utils/gateway/helper";

function Bomb() {
  // console.log("");
  // throw new Error("Boom");
}

export default function APIList() {
  const handleError = useErrorHandler();
  try {
    Bomb();
  } catch (error) {
    handleError(error);
  }
  const navigate = useNavigate();
  const [selected, setSelected] = useState(1);
  const [search, setSearch] = useState(" ");
  const dispatch = useAppDispatch();
  const apiList: IApiListState = useAppSelector(
    (state: RootState) => state.apiListState
  );
  // handleError(apiList.error);
  const failure: any = () => ToastAlert(apiList.error!, "error");
  const [datalist, setDataList] = useState<IApiDataList>({
    list: [],
    fields: [],
  });

  const mainCall = async (currentPage: number, pageSize: number) => {
    dispatch(getApiList({ currentPage, pageSize }));
    // handleError(resp.payload);
  };
  useEffect(() => {
    if (apiList.data && apiList.data?.Apis?.length > 0) {
      const listAPI: IApiData[] = [];
      for (const item of apiList.data?.Apis) {
        const api = statusAndDateHelper(item);
        listAPI.push(api);
      }
      setDataList({
        list: [...listAPI],
        fields: ["Name", "TargetUrl", "Status", "CreatedDateTxt"],
      });
    }
  }, [apiList.data]);

  useEffect(() => {
    mainCall(1, 4);
  }, []);

  const handlePageClick = (pageSelected: number) => {
    mainCall(pageSelected, 4);
    setSelected(pageSelected);
  };

  const searchFilter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const newSearchList = datalist.list.filter((item) =>
      item.Name.toLocaleLowerCase().includes(search)
    );

    setDataList({
      list: [...newSearchList],
      fields: ["Name", "TargetUrl", "Status", "CreatedDateTxt"],
    });
  };
  const NavigateCreateApi = (
    val: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    val.preventDefault();
    navigate("/gateway/apis/create");
  };

  const NavigateUpdate = (val: IApiData) => {
    if (val.Id) {
      navigate(`/gateway/apis/update/${val.Id}`);
    }
  };

  function deleteApiFromState(id: string) {
    const newState = datalist.list.filter((item) => item.Id !== id);
    // console.log(newState);
    const pageCount = apiList.data?.TotalCount;
    if (newState.length === 0 && pageCount !== 1) {
      mainCall(selected - 1, 4);
      setSelected(selected - 1);
    } else mainCall(selected, 4);

    setDataList({
      list: [...newState],
      fields: ["Name", "TargetUrl", "Status", "CreatedDateTxt"],
    });
  }
  const deleteApiFunction = async (val: IApiData) => {
    if (
      val.Id &&
      window.confirm("Are you sure you want to delete this Api ?")
    ) {
      const result = await dispatch(deleteApi(val.Id));

      if (result.meta.requestStatus === "rejected") {
        await ToastAlert(result.payload.message, "error");
      } else {
        deleteApiFromState(val.Id);
        await ToastAlert("Api Deleted Successfully", "success");
      }
    }
  };
  const headings = [
    { title: "Name" },
    { title: "Target Url" },
    { title: "Status" },
    { title: "Created Date" },
    { title: "Action" },
  ];
  const actions = [
    {
      className: "btn btn-sm btn-light",
      iconClassName: "bi bi-pencil-square menu-icon",
      buttonFunction: NavigateUpdate,
    },
    {
      className: "btn btn-sm btn-light",
      iconClassName: "bi bi-trash-fill menu-icon",
      // buttonFunction: () => setDeleteshow(true),
      buttonFunction: deleteApiFunction,
    },
  ];

  useEffect(() => {
    console.log(apiList);
  }, [apiList.data, apiList.error]);
  return (
    <>
      <div className="col-lg-12 grid-margin stretch-card">
        {apiList.loading ? (
          <Spinner />
        ) : apiList.error ? (
          <div>{failure()}</div>
        ) : (
          <div className="card">
            <div
              className="card-header mt-2 bg-white"
              style={{ padding: "0.5rem 1.5rem" }}
            >
              <div className="align-items-center">
                <button
                  className=" btn btn-sm btn-success btn-sm d-flex float-right mb-2"
                  onClick={(e) => NavigateCreateApi(e)}
                >
                  {" "}
                  Create API &nbsp;
                  <span className="bi bi-plus-lg"></span> &nbsp;
                </button>
                <span>
                  <b>API LIST</b>
                </span>
              </div>
            </div>
            <div className="card-body pt-4">
              <div className="align-items-center">
                <div className="search-field justify-content-around ">
                  <form className="h-50">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control bg-parent border-1"
                        placeholder="Search Api"
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <button
                        className=" btn  btn-success btn-sm"
                        onClick={(e) => searchFilter(e)}
                      >
                        <i className=" bi bi-search"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <br />
              {apiList.loading && <Spinner />}
              <div className="table-responsive">
                {!apiList.loading && !apiList.error && apiList.data && (
                  <RenderList
                    headings={headings}
                    data={datalist}
                    actions={actions}
                    handlePageClick={handlePageClick}
                    pageCount={apiList.data.TotalCount}
                    selected={selected}
                  />
                )}
              </div>
              {/* {!apiList.loading && apiList.error !== null}
            <div>{failure()}</div> */}
            </div>{" "}
          </div>
        )}
      </div>
    </>
  );
}
