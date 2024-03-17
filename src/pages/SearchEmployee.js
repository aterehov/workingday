import { useEffect, useState } from "react";
import useAsync from "../functions/hooks/useAsync";
import getJsonWithErrorHandlerFunc from "../functions/getJsonWithErrorHandlerFunc";
import API from "../network/API";
import LeftPanel from "../components/LeftPanel/LeftPanel";
import TopPanel from "../components/TopPanel/TopPanel";
import { Drawer } from "@mui/material";
import Config from "../config/UserPageConfig";
import BellIcon from "../components/TopPanel/BellIcon";
import AngleDownIcon from "../components/TopPanel/AngleDownIcon";
import Function from "../components/TopPanel/Function";
import UserIcon from "../components/TopPanel/UserIcon";
import UnlockIcon from "../components/TopPanel/UnlockIcon";
import MoneyIcon from "../components/TopPanel/MoneyIcon";
import optional from "../functions/optional";
import { Button, Container, Form, Image, Row } from "react-bootstrap";
import "../styles/overlay_search.css";
import "../styles/search.css";
import getCachedLogin from "../functions/getCachedLogin";
import { useNavigate } from "react-router-dom";
import IconRender from "../components/IconRender/IconRender";

function SearchEmployee() {
  const [res, setRes] = useState([]);
  // useAsync(getJsonWithErrorHandlerFunc, setRes, [
  //   (args) => API.basicSearch(args),
  //   [{ search_key: "Илья" }],
  // ]);
  const [info, setInfo] = useState(false);
  useAsync(getJsonWithErrorHandlerFunc, setInfo, [
    (args) => API.infoEmployee(args),
    [getCachedLogin()],
  ]);
  console.log("SEARCH RESULT");
  console.log(res);

  const [request, setRequest] = useState("");
  // useEffect(() => {}, [res]);
  useEffect(() => {
    document.getElementById("sp-drawer").style.height =
      document.getElementById("search-panel-all").offsetHeight.toString() +
      "px";
  });

  const navigate = useNavigate();

  function logout() {
    API.logout();
    navigate("/login");
  }

  return (
    <div style={{ display: "flex", overflow: "hidden", maxWidth: "100vw" }}>
      <LeftPanel highlight="search" />
      <div>
        <Drawer
          id="sp-drawer"
          // style={{ width: "100%" }}
          sx={{
            // width: "100%",
            // height: Config.searchPanelWidth,
            // borderBottom: 0,
            // marginLeft: leftPanelWidth,
            // flexShrink: 0,
            "& .MuiDrawer-paper": {
              // height: Config.searchPanelWidth,
              // boxSizing: "border-box",
              zIndex: 1,
              borderBottom: 0,
            },
          }}
          variant="permanent"
          anchor="top"
        >
          <div
            id="search-panel-all"
            // className="top-panel-all"
            style={{ marginLeft: Config.leftPanelWidth }}
          >
            <div className="search-content">
              {/* <p className="top-panel-title">{"TITLE"}</p> */}
              <Form>
                <div className="overlay-container-search">
                  <Form.Control
                    className="overlay-bgimage-search search-field"
                    type="text"
                    placeholder="Поиск коллег"
                    onChange={(e) => setRequest(e.target.value)}
                  />
                  {/* <Button */}
                  <button
                    className="overlay-fgimage-search search-button"
                    onClick={async (e) => {
                      e.preventDefault();
                      let r = await getJsonWithErrorHandlerFunc(
                        (args) => API.basicSearch(args),
                        [{ search_key: request }]
                      );
                      if (r) {
                        setRes(r.employees);
                      }
                    }}
                  >
                    {/* <div
                      // id="a459dbb7a-2477-49cd-91fe-029499c81cc9"
                      style={{
                        display: "flex",
                        // justifyContent: "center",
                        // alignItems: "center",
                        width: "16px",
                        height: "16px",
                      }}
                    >
                      <svg
                        style={{
                          width: "16px",
                          height: "16px",
                          // overflow: "visible",
                          // opacity: 1,
                          // zIndex: 1,
                          // fill: "rgb(3, 3, 3)",
                        }}
                        viewBox="0 0 512 512"
                      >
                        <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                      </svg>
                    </div> */}
                    <IconRender
                      path="/images/icons/search.svg"
                      width="16px"
                      height="16px"
                      iwidth="16px"
                      iheight="16px"
                      addstyle={{ display: "flex" }}
                    />
                  </button>
                  {/* </Button> */}
                </div>
              </Form>
              {/* <Image
                  className="overlay-bgimage profpic"
                  src={optional(info.photo_link)}
                  width={80}
                  height={80}
                  roundedCircle
                /> */}
              {/* <div
              className="overlay-fgimage"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "24px",
                height: "24px",
                // padding: "0px",
                // cursor: "inherit",
                // overflow: "hidden",
                // opacity: 1,
                // color: "rgb(255, 255, 255)",
                backgroundColor: "rgb(71, 146, 167)",
                borderRadius: "2px",
                // boxShadow: "rgba(0, 0, 0, 0.08) 0px 0px 0px",
                // border: "0px",
              }}
            >
              <svg
                style={{
                  width: "14px",
                  height: "14px",
                  // overflow: "visible",
                  // opacity: "unset",
                  // zIndex: 0,
                  fill: "rgb(255, 255, 255)",
                }}
                viewBox="0 0 512 512"
              >
                <path d="M421.7 220.3L188.5 453.4L154.6 419.5L158.1 416H112C103.2 416 96 408.8 96 400V353.9L92.51 357.4C87.78 362.2 84.31 368 82.42 374.4L59.44 452.6L137.6 429.6C143.1 427.7 149.8 424.2 154.6 419.5L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3zM492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75z"></path>
              </svg>
            </div> */}
              {/* <button
                  className="overlay-fgimage image-button"
                  onClick={() => photo_input.current.click()}
                >
                  <PencilIcon />
                </button>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  ref={photo_input}
                  className="hidden"
                  onChange={readPhoto}
                />
              </div> */}
              {/* <Form>
                <Form.Control type="text" placeholder="Поиск коллег" />
              </Form> */}
              <div className="search-controls">
                <BellIcon />
                {optional(
                  info.photo_link,
                  <Image
                    className="top-panel-profpic"
                    src={info.photo_link}
                    width={40}
                    height={40}
                    roundedCircle
                  />
                )}
                <p className="top-panel-mp-link">My Profile</p>
                {/* <AngleDownIcon /> */}
                <Button variant="outline-danger" onClick={logout}>
                  Выйти
                </Button>
              </div>
            </div>

            {/* <div className="top-panel-functions">
              <Function
                image={<UserIcon />}
                text="Редактировать профиль"
                width="128px"
              />

              <Function
                image={<UnlockIcon />}
                text="Изменить пароль"
                width="178px"
              />

              <Function image={<MoneyIcon />} text="Зарплата" width="114px" />
              
            </div> */}
          </div>
        </Drawer>

        <p className="search-title">Коллеги</p>
        <div className="search-results-wrapper">
          <div className="search-results">
            {res.map((user) => {
              return (
                <div className="search-result">
                  <Image
                    className="search-result-profpic"
                    src={user.photo_link}
                    width={80}
                    height={80}
                    roundedCircle
                  />
                  <a href={"/user/" + user.id} className="search-result-label">
                    {/* {user.name + " " + user.surname} */}
                    <p className="search-result-label-p">{user.surname}</p>
                    <p className="search-result-label-p">{user.name}</p>
                    <p className="search-result-label-p">
                      {optional(user.patronymic)}
                    </p>
                  </a>
                </div>
              );
            })}
            {/* <div className="search-result">
              <Image
                // className="top-panel-profpic"
                src={info.photo_link}
                width={80}
                height={80}
                roundedCircle
              />
              <p className="search-result-label">John Smith</p>
            </div>
            <div className="search-result">
              <Image
                // className="top-panel-profpic"
                src={info.photo_link}
                width={80}
                height={80}
                roundedCircle
              />
              <p className="search-result-label">John Smith</p>
            </div>
            <div className="search-result">
              <Image
                // className="top-panel-profpic"
                src={info.photo_link}
                width={80}
                height={80}
                roundedCircle
              />
              <p className="search-result-label">John Smith</p>
            </div>
            <div className="search-result">
              <Image
                // className="top-panel-profpic"
                src={info.photo_link}
                width={80}
                height={80}
                roundedCircle
              />
              <p className="search-result-label">John Smith</p>
            </div>
            <div className="search-result">
              <Image
                // className="top-panel-profpic"
                src={info.photo_link}
                width={80}
                height={80}
                roundedCircle
              />
              <p className="search-result-label">John Smith</p>
            </div>
            <div className="search-result">
              <Image
                // className="top-panel-profpic"
                src={info.photo_link}
                width={80}
                height={80}
                roundedCircle
              />
              <p className="search-result-label">John Smith</p>
            </div>
            <div className="search-result">
              <Image
                // className="top-panel-profpic"
                src={info.photo_link}
                width={80}
                height={80}
                roundedCircle
              />
              <p className="search-result-label">John Smith</p>
            </div>
            <div className="search-result">
              <Image
                // className="top-panel-profpic"
                src={info.photo_link}
                width={80}
                height={80}
                roundedCircle
              />
              <p className="search-result-label">John Smith</p>
            </div>
            <div className="search-result">
              <Image
                // className="top-panel-profpic"
                src={info.photo_link}
                width={80}
                height={80}
                roundedCircle
              />
              <p className="search-result-label">John Smith</p>
            </div>
            <div className="search-result">
              <Image
                // className="top-panel-profpic"
                src={info.photo_link}
                width={80}
                height={80}
                roundedCircle
              />
              <p className="search-result-label">John Smith</p>
            </div>
            <div className="search-result">
              <Image
                // className="top-panel-profpic"
                src={info.photo_link}
                width={80}
                height={80}
                roundedCircle
              />
              <p className="search-result-label">John Smith</p>
            </div>
            <div className="search-result">
              <Image
                // className="top-panel-profpic"
                src={info.photo_link}
                width={80}
                height={80}
                roundedCircle
              />
              <p className="search-result-label">John Smith</p>
            </div>
            <div className="search-result">
              <Image
                // className="top-panel-profpic"
                src={info.photo_link}
                width={80}
                height={80}
                roundedCircle
              />
              <p className="search-result-label">John Smith</p>
            </div> */}
          </div>
          {/* <div></div> */}
          {/* <div className="search-results">
            {res.map((user) => {
              return (
                <div className="search-result">
                  <Image
                    // className="top-panel-profpic"
                    src={res.photo_link}
                    width={80}
                    height={80}
                    roundedCircle
                  />
                  <p className="search-result-label">res.name</p>
                </div>
              );
            })} */}
          {/* <div className="search-result">
              <Image
                // className="top-panel-profpic"
                src={info.photo_link}
                width={80}
                height={80}
                roundedCircle
              />
              <p className="search-result-label">John Smith</p>
            </div>
            <div className="search-result">
              <Image
                // className="top-panel-profpic"
                src={info.photo_link}
                width={80}
                height={80}
                roundedCircle
              />
              <p className="search-result-label">John Smith</p>
            </div>
            <div className="search-result">
              <Image
                // className="top-panel-profpic"
                src={info.photo_link}
                width={80}
                height={80}
                roundedCircle
              />
              <p className="search-result-label">John Smith</p>
            </div>
            <div className="search-result">
              <Image
                // className="top-panel-profpic"
                src={info.photo_link}
                width={80}
                height={80}
                roundedCircle
              />
              <p className="search-result-label">John Smith</p>
            </div>
            <div className="search-result">
              <Image
                // className="top-panel-profpic"
                src={info.photo_link}
                width={80}
                height={80}
                roundedCircle
              />
              <p className="search-result-label">John Smith</p>
            </div>
            <div className="search-result">
              <Image
                // className="top-panel-profpic"
                src={info.photo_link}
                width={80}
                height={80}
                roundedCircle
              />
              <p className="search-result-label">John Smith</p>
            </div>
            <div className="search-result">
              <Image
                // className="top-panel-profpic"
                src={info.photo_link}
                width={80}
                height={80}
                roundedCircle
              />
              <p className="search-result-label">John Smith</p>
            </div>
            <div className="search-result">
              <Image
                // className="top-panel-profpic"
                src={info.photo_link}
                width={80}
                height={80}
                roundedCircle
              />
              <p className="search-result-label">John Smith</p>
            </div>
            <div className="search-result">
              <Image
                // className="top-panel-profpic"
                src={info.photo_link}
                width={80}
                height={80}
                roundedCircle
              />
              <p className="search-result-label">John Smith</p>
            </div>
            <div className="search-result">
              <Image
                // className="top-panel-profpic"
                src={info.photo_link}
                width={80}
                height={80}
                roundedCircle
              />
              <p className="search-result-label">John Smith</p>
            </div>
            <div className="search-result">
              <Image
                // className="top-panel-profpic"
                src={info.photo_link}
                width={80}
                height={80}
                roundedCircle
              />
              <p className="search-result-label">John Smith</p>
            </div>
            <div className="search-result">
              <Image
                // className="top-panel-profpic"
                src={info.photo_link}
                width={80}
                height={80}
                roundedCircle
              />
              <p className="search-result-label">John Smith</p>
            </div>
            <div className="search-result">
              <Image
                // className="top-panel-profpic"
                src={info.photo_link}
                width={80}
                height={80}
                roundedCircle
              />
              <p className="search-result-label">John Smith</p>
            </div> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default SearchEmployee;
