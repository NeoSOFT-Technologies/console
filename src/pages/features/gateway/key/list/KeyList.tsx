import React, { useState, useEffect } from "react";
// import { Button } from "react-bootstrap";
import RenderList from "../../../../components/list/RenderList";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../store";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { getKeyList } from "../../../../store/features/key/list/slice";
import Spinner from "../../../../components/loader/Loader";
import {
  IKeyData,
  IKeyListState,
  IKeyDataList,
} from "../../../../store/features/key/list";

import statusAndDateHelper from "../../../../utils/helper";
import { ToastAlert } from "../../../../components/ToasterAlert/ToastAlert";
import { deleteKey } from "../../../../store/features/key/delete/slice";

export default function KeyList() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(1);
  // const [search, setSearch] = useState(" ");
  const dispatch = useAppDispatch();
  const keyList: IKeyListState = useAppSelector(
    (state: RootState) => state.keyListState
  );
  const failure: any = () => ToastAlert(keyList.error!, "error");
  // const [checkactive, setCheckactive] = useState({
  //   btn1: false,
  //   btn2: false,
  //   btn3: true,
  // });
  const [datalist, setDataList] = useState<IKeyDataList>({
    list: [],
    fields: [],
  });
  const mainCall = (currentPage: number) => {
    dispatch(getKeyList({ currentPage }));
  };
  useEffect(() => {
    // console.log("UseEffect", keyList.data);
    if (keyList.data && keyList.data?.Keys?.length > 0) {
      const listKey: IKeyData[] = [];
      keyList.data?.Keys.forEach((item) => {
        const key = statusAndDateHelper(item);
        listKey.push(key);
      });
      setDataList({
        list: [...listKey],
        fields: ["Id", "KeyName", "Status", "CreatedDateTxt"],
      });
    }
  }, [keyList.data]);

  useEffect(() => {
    mainCall(1);
  }, []);

  const handlePageClick = (pageSelected: number) => {
    mainCall(pageSelected);
    setSelected(pageSelected);
  };

  const searchFilter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setSelected(1);
    mainCall(1);
  };
  const NavigateCreateKey = (
    val: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    val.preventDefault();
    navigate("/key/create");
  };
  //   const handleUserDetails = (val: ITenantUserData) => {
  //     console.log(val);
  //     // navigate("/userdetails");
  //     navigate(`/userdetails/${val.id}`, { state: { ...val } });
  //   };

  function deleteKeyFromState(id: string) {
    const newState = datalist.list.filter((item) => item.Id !== id);
    // console.log(newState);
    const pageCount = keyList.data?.TotalCount;
    if (newState.length === 0 && pageCount !== 1) {
      mainCall(selected - 1);
      setSelected(selected - 1);
    } else mainCall(selected);

    setDataList({
      list: [...newState],
      fields: ["Id", "KeyName", "Status", "CreatedDateTxt"],
    });
  }
  const deleteKeyFunction = async (val: IKeyData) => {
    if (val.Id) {
      if (window.confirm("Are you sure you want to delete this Key ?")) {
        const result = await dispatch(deleteKey(val.Id));

        if (result.meta.requestStatus === "rejected") {
          await ToastAlert(result.payload.message, "error");
        } else {
          deleteKeyFromState(val.Id);
          await ToastAlert("Key Deleted Successfully", "success");
        }
      }
    }
  };
  const headings = [
    { title: "Key ID" },
    { title: "Key Name" },
    { title: "Status" },
    { title: "Created Date" },
    { title: "Action", className: "text-center" },
  ];
  const actions = [
    {
      className: "btn btn-sm btn-light",
      iconClassName: "bi bi-pencil-square menu-icon",
    },
    {
      className: "btn btn-sm btn-light",
      iconClassName: "bi bi-trash-fill menu-icon",
      // buttonFunction: () => setDeleteshow(true),
      buttonFunction: deleteKeyFunction,
    },
  ];
  return (
    <>
      <div className="col-lg-12 grid-margin stretch-card">
        {keyList.loading ? (
          <Spinner />
        ) : !keyList.loading && keyList.error !== null ? (
          <div>{failure()}</div>
        ) : (
          <div className="card">
            <div
              className="card-header mt-4 mb-3 bg-white"
              style={{ padding: "0.5rem 2.5rem" }}
            >
              <div className="align-items-center">
                <div>
                  <button
                    className=" btn  btn-success btn-sm d-flex float-right mb-4"
                    onClick={(e) => NavigateCreateKey(e)}
                  >
                    {" "}
                    Create Key &nbsp;
                    <span className="bi bi-plus-lg"></span> &nbsp;
                  </button>
                  <h5>
                    <b>KEY LIST</b>
                  </h5>
                </div>
              </div>
            </div>
            <div className="card-body pt-4">
              <div className="align-items-center">
                <div className="search-field justify-content-around">
                  <form className="h-50">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control bg-parent border-1"
                        placeholder="Search Key"
                        // onChange={(e) => setSearch(e.target.value)}
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
              {keyList.loading && <Spinner />}
              <div className="table-responsive">
                {!keyList.loading && keyList.data && (
                  <RenderList
                    headings={headings}
                    data={datalist}
                    actions={actions}
                    handlePageClick={handlePageClick}
                    pageCount={keyList.data.TotalCount}
                    selected={selected}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
