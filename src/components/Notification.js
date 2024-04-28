import { Button, Col, Container, Image, Row } from "react-bootstrap";
import optional from "../functions/optional";
import API from "../network/API";

function Notification(notif) {
  async function send_verdict(approve) {
    let res = await API.verdictAbsence({
      action_id: notif.action_id,
      notification_id: notif.id,
      approve: approve,
    });
    if (res && res.ok) {
      alert("Решение об отпуске принято");
    } else {
      alert("Не удалось отправить решение об отпуске");
    }
  }

  return (
    <Container className="notification">
      <Row>
        <Col className="notif-img-col">
          <Image
            className="notif-sender-profpic"
            width={48}
            height={48}
            src={notif.sender.photo_link}
            roundedCircle
          />
        </Col>
        <Col className="notif-info-col">
          <p className="notif-sender">
            {notif.sender.name +
              " " +
              notif.sender.surname +
              " " +
              optional(notif.sender.patronymic)}
          </p>
          {/* <p className="notif-on-doc">On Document - 3600</p> */}
          <p className="notif-text">{notif.text}</p>
          {notif.type == "vacation_request" ? (
            <div>
              <Button onClick={() => send_verdict(true)}>Согласовать</Button>
              <Button onClick={() => send_verdict(false)}>Отклонить</Button>
            </div>
          ) : null}
        </Col>
        <Col className="notif-datetime-col">
          {/* <Row> */}
          {/* <p className="notif-datetime">{notif.created}</p>
            <div className="read-square"></div> */}
          {(() => {
            let crs = notif.created.split("T");
            return (
              <Row>
                <Col className="notif-datetime-inner-col">
                  <p className="notif-datetime">{crs[0]}</p>
                  <p className="notif-datetime">{crs[1].slice(0, 8)}</p>
                </Col>
                <div className="read-square"></div>
              </Row>
            );
          })()}
          {/* </Row> */}
        </Col>
        {/* <hr /> */}
      </Row>
    </Container>
  );
}

export default Notification;
