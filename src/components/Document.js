import { Button, Col, Container, Image, Row } from "react-bootstrap";
import optional from "../functions/optional";
import getJsonWithErrorHandlerFunc from "../functions/getJsonWithErrorHandlerFunc";
import API from "../network/API";

function Document(doc) {
  async function download() {
    let url = await getJsonWithErrorHandlerFunc(
      (args) => API.downloadDocuments(args),
      [doc.id]
    );
    // console.log("URL");
    // console.log(url.url);
    window.open(url.url, "_blank");
  }

  async function sign() {
    let res = await API.signDocuments(doc.id);
    if (res && res.ok) {
      alert("Документ успешно подписан");
    } else {
      alert("Не удалось подписать документ");
    }
  }

  return (
    <Container className="notification">
      <Row>
        {/* <Col className="notif-img-col">
          <Image
            className="notif-sender-profpic"
            width={48}
            height={48}
            src={notif.sender.photo_link}
            roundedCircle
          />
        </Col> */}
        <Col className="notif-info-col">
          <p className="notif-sender">
            {/* {notif.sender.name +
              " " +
              notif.sender.surname +
              " " +
              optional(notif.sender.patronymic)} */}
            {doc.name}
          </p>
          {/* <p className="notif-on-doc">On Document - 3600</p> */}
          {/* <p className="notif-text">{notif.text}</p> */}
          <pre className="viewdoc-description">{doc.description}</pre>
        </Col>
        <Col className="doc-buttons-col">
          <Button className="viewdoc-button" onClick={download}>
            Просмотреть
          </Button>
          {/* <Button className="viewdoc-button">Подписать</Button> */}
          {optional(
            doc.sign_required,
            <Button className="viewdoc-button" onClick={sign}>
              Подписать
            </Button>
          )}
        </Col>
        {/* {optional(doc.sign_required, <Button>Подписать</Button>)} */}
        {/* <Col className="notif-datetime-col"> */}
        {/* <Row> */}
        {/* <p className="notif-datetime">{notif.created}</p>
            <div className="read-square"></div> */}
        {/* {(() => {
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
          })()} */}
        {/* </Row> */}
        {/* </Col> */}
        {/* <hr /> */}
      </Row>
    </Container>
  );
}

export default Document;
