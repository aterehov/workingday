import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { Drawer } from "@mui/material";
import TitleField from "../components/UserPage/TitleField";
import LeftPanel from "../components/LeftPanel/LeftPanel";
import TopPanel from "../components/TopPanel/TopPanel";
import Config from "../config/UserPageConfig";
import "../styles/userpage.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../network/API";
import useAsync from "../functions/hooks/useAsync";
import optional from "../functions/optional";
import requestErrorHandler from "../functions/requestErrorHandler";
import getJson from "../functions/getJson";
import getJsonWithErrorHandlerFunc from "../functions/getJsonWithErrorHandlerFunc";
import getCachedLogin from "../functions/getCachedLogin";
import "../styles/clearfix.css";

function UserPage({ get_id = useParams }) {
  // console.log("GET ID");
  // console.log(get_id);
  const { id } = get_id();
  const my_id = getCachedLogin();
  // console.log("ID");
  // console.log(id);
  const navigate = useNavigate();
  // const [end, setEnd] = useState(false);
  // const [data, setData] = useState(undefined);

  // useEffect(() => {
  //   const f = async () => {
  //     const d = await API.infoEmployee(id);
  //     setData(d);
  //     setEnd(true);
  //   };

  //   f();
  // }, []);

  // console.log("DATA");
  // console.log(data);
  const [myInfo, setMyInfo] = useState(null);
  useAsync(getJsonWithErrorHandlerFunc, setMyInfo, [
    (args) => API.infoEmployee(args),
    [my_id],
  ]);
  const [info, setInfo] = useState(null);
  useAsync(
    // async (args) =>
    //   await getJson(
    //     await requestErrorHandler((args) => API.infoEmployee(...args), args)
    //   ),
    // async (args) => await getJsonWithErrorHandlerFunc(API.infoEmployee, args),
    // async (args) => await getJsonWithErrorHandlerFunc(...args),
    // !IMPORTANT! ================================
    // async (args) => await (await API.infoEmployee(...args)).json(),
    // ============================================
    // async (args) =>
    //   (
    //     await (async () => {
    //       const d = await API.infoEmployee(...args);
    //       if (!d.ok) {
    //         alert("ERROR!!!");
    //       }
    //       return d;
    //     })()
    //   ).json(),
    getJsonWithErrorHandlerFunc,
    setInfo,
    [(args) => API.infoEmployee(args), [id]]
    // [id]
  );
  // console.log("DATA");
  // console.log(data);
  // let info = data.json();
  // let info = data;
  // if (data && !data.ok) {
  // alert("Не удалось выполнить запрос");
  // return;
  // }
  // if (data && !data.bodyUsed) {
  // info = data.json();
  // }
  console.log("INFO");
  console.log(info);
  // info.photo_link = "/images/photo-1492633423870-43d1cd2775eb.jpg";
  // console.log("PHONES");
  // console.log(optional(info.phones, info.phones[0]));
  return !info || !myInfo ? null : (
    <div style={{ display: "flex" }}>
      {/* {console.log(optional(info.phones, info.phones[0]))} */}
      <LeftPanel highlight="user" />
      <div>
        <TopPanel
          title={my_id == id ? "Мой профиль" : "Профиль сотрудника"}
          profpic={myInfo.photo_link}
          showfunctions={false}
          username={myInfo.name}
        />
        <Container className="main-body" fluid>
          <Row>
            <Col md="auto">
              <h1 className="user-page-name">
                {info.name +
                  " " +
                  optional(info.patronymic) +
                  " " +
                  info.surname}
              </h1>
              {/* <div className="user-page-position">
                <h2 className="no-margin font-props-inherit">Стажер</h2>
                <h2 className="no-margin font-props-inherit">Проктолог</h2>
              </div> */}
              <TitleField
                title="Электронная почтв"
                value={optional(info.email)}
              />
              <TitleField
                title="Номер телефона"
                value={optional(info.phones, info.phones[0])}
              />
              <Row>
                <Col className="user-page-col-padding">
                  {/* <TitleField title="Department" value="Engineering" /> */}
                  <TitleField
                    title="День рождения"
                    value={optional(info.birthday)}
                  />
                </Col>
                <Col className="user-page-col-padding">
                  {/* <TitleField title="Office Location" value="New York" /> */}
                  <TitleField
                    title="Telegram ID"
                    value={optional(info.telegram_id)}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="user-page-col-padding">
                  {/* <TitleField title="Country" value="United States" /> */}
                  <TitleField title="Команда" value={optional(info.team)} />
                </Col>
                <Col className="user-page-col-padding">
                  {/* <TitleField title="Preferred Language" value="English" /> */}
                  <TitleField title="VK ID" value={optional(info.vk_id)} />
                </Col>
              </Row>
              {optional(
                my_id == id,
                <Button
                  className="edit-button"
                  onClick={() => navigate("./edit")}
                >
                  Изменить личную информацию
                </Button>
              )}
            </Col>
            <Col className="img-col" md="auto">
              {optional(
                info.photo_link,
                <Image
                  className="img"
                  src={info.photo_link}
                  width={370}
                  height={358}
                  roundedCircle
                />
              )}
              {/* <Image
                className="img"
                src={optional(info.photo_link)}
                width={370}
                height={358}
                roundedCircle
              /> */}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default UserPage;
