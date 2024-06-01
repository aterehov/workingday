import { useEffect, useState } from "react";
import API from "../network/API";
import useAsync from "../functions/hooks/useAsync";
import getJsonWithErrorHandlerFunc from "../functions/getJsonWithErrorHandlerFunc";
import getCachedLogin from "../functions/getCachedLogin";
import LeftPanel from "../components/LeftPanel/LeftPanel";
import TopPanel from "../components/TopPanel/TopPanel";
import { Col, Container, Dropdown, Form, Image, Row } from "react-bootstrap";
import "../styles/doc_notifications.css"; //изменено
import SearchByDateToggle from "../components/SearchByDateToggle";
import Notification from "../components/Notification";
import notifFilter from "../functions/notifFilter";
import arrayInsDel from "../functions/arrayInsDel";
import notifSort from "../functions/notifSort";
import Document from "../components/Document";
import "../styles/viewdocuments.css";

function ViewDocuments() {
  const [data, setData] = useState(null);
  const [info, setInfo] = useState(null);
  useAsync(getJsonWithErrorHandlerFunc, setInfo, [
    (args) => API.infoEmployee(args),
    [getCachedLogin()],
  ]);
  // useAsync(getJsonWithErrorHandlerFunc, setData, [
  //   (args) => API.notifications(args),
  //   [{}],
  // ]);
  useAsync(getJsonWithErrorHandlerFunc, setData, [
    (args) => API.listDocuments(args),
    [],
  ]);
  // let show_types = [
  //   "vacation_request",
  //   "vacation_approved",
  //   "vacation_denied",
  //   "attendance_added",
  // ];
  // const [showTypes, setShowTypes] = useState([
  //   "vacation_request",
  //   "vacation_approved",
  //   "vacation_denied",
  //   "attendance_added",
  // ]);

  // function changeShowState(type) {
  //   setShowTypes([...arrayInsDel(showTypes, type)]);
  // }

  // console.log("NOTIFICATIONS DATA");
  // console.log(data);

  // const [processed, setProcessed] = useState(null);
  // useEffect(() => {
  //   if (!data) {
  //     return;
  //   }
  //   setProcessed(notifSort(notifFilter(data.notifications, showTypes)));
  // }, [data, showTypes]);

  return !data || !info ? null : (
    <div style={{ display: "flex" }}>
      <LeftPanel highlight="viewdoc" />
      <div>
        <TopPanel
          title="Мои документы"
          profpic={info.photo_link}
          showfunctions={false}
          username={info.name}
        />
        <div className="main-content">
          {/* <h1 className="notif-main-header">Documents</h1> */}
          <Container>
            <Row>
              <div
                className="notifications-area"
                // style={{ border: "1px solid red" }}
              >
                {/* <div className="notif-section-title"> */}
                {/* <Container className="notif-section-title">
                  <Row>
                    <h2 className="notif-sub-header">New Documents</h2>
                    <Dropdown className="search-by-date">
                      <Dropdown.Toggle
                        id="by-date-dropdown-toggle"
                        className="by-date-dropdown-toggle"
                        icon={SearchByDateToggle}
                      >
                        Search by Date
                      </Dropdown.Toggle>
                    </Dropdown>
                  </Row>
                </Container> */}
                {/* </div> */}
                {/* {data.notifications.map((notif) => Notification(notif))} */}
                {/* {processed.map((notif) => Notification(notif))} */}
                {/* {Document({
                  name: "An interesting document",
                  description:
                    "This document might be very interesting to you.",
                })} */}
                {data.documents.map((doc) => Document(doc))}
              </div>

              {/* <div className="filter-area">
                <h2 className="filter-header">Filter</h2>
                <Form>
                  <Container>
                    <Row>
                      <Col>
                        <Form.Check
                          // className="notif-filter-check"
                          type="checkbox"
                          id="f_vacation_request"
                          label="Запрос отпуска"
                          defaultChecked={true}
                          onChange={() => changeShowState("vacation_request")}
                        />
                        <Form.Check
                          type="checkbox"
                          id="f_vacation_approved"
                          label="Отпуск одобрен"
                          defaultChecked={true}
                          onChange={() => changeShowState("vacation_approved")}
                        />
                        <Form.Check
                          type="checkbox"
                          id="f_vacation_denied"
                          label="Отпуск отклонен"
                          defaultChecked={true}
                          onChange={() => changeShowState("vacation_denied")}
                        />
                        <Form.Check
                          type="checkbox"
                          id="f_attendance_added"
                          label="Добавлена информация о рабочем времени"
                          defaultChecked={true}
                          onChange={() => changeShowState("attendance_added")}
                        />
                      </Col>
                    </Row>
                  </Container>
                </Form>
                <button
                  onClick={() => {
                    setShowTypes([]);
                  }}
                >
                  Clear All
                </button>
                <button onClick={() => console.log(showTypes)}>
                  Show show_types
                </button>
              </div> */}
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default ViewDocuments;
