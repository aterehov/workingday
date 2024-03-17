import { Col, Container, Image, Row } from "react-bootstrap";
import optional from "../functions/optional";

function Notification(notif) {
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
          <p className="notif-on-doc">On Document - 3600</p>
          <p className="notif-text">{notif.text}</p>
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
