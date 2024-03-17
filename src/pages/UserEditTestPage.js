import { Col, Container, Image, Row } from "react-bootstrap";
import LeftPanel from "../components/LeftPanel/LeftPanel";
import TopPanel from "../components/TopPanel/TopPanel";
import "../styles/usereditpage.css";
import "../styles/overlay_editimage.css";
import PencilIcon from "../components/UserEditPage/PencilIcon";

function UserEditTestPage() {
  return (
    <div style={{ display: "flex" }}>
      <LeftPanel />
      <div>
        <TopPanel title="Настройки аккаунта" />
        <div className="main-content">
          <div className="overlay-container">
            <Image
              className="overlay-bgimage profpic"
              src="/images/d95e6719-816d-4f6f-87f4-542d8be35616.png"
              width={80}
              height={80}
              roundedCircle
            />
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
            <PencilIcon className="overlay-fgimage" />
          </div>

          <form id="edit-profile-form">
            <Container className="form-container" fluid>
              <Row>
                <Col className="form-col">
                  <label for="name">First Name</label>
                  <br />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    defaultValue="Петр"
                  />
                </Col>
                <Col className="form-col">
                  <label for="patronymic">Middle Name</label>
                  <br />
                  <input
                    type="text"
                    id="patronymic"
                    name="patronymic"
                    defaultValue="Иванович"
                  />
                </Col>
                <Col className="form-col">
                  <label for="surname">Last Name</label>
                  <br />
                  <input
                    type="text"
                    id="surname"
                    name="surname"
                    defaultValue="Иванов"
                  />
                </Col>
              </Row>
              <Row>
                <Col className="form-col">
                  <label for="birthday">Birthday</label>
                  <br />
                  <input
                    type="date"
                    id="birthday"
                    name="birthday"
                    defaultValue="2000-01-02"
                  />
                </Col>
              </Row>
              <Row>
                <Col className="form-col">
                  <label for="email">Email</label>
                  <br />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    defaultValue="johndoe@example.com"
                  />
                </Col>
              </Row>
              <Row>
                <Col className="form-col">
                  <label for="phone">Phone Number</label>
                  <br />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    pattern="\+[0-9]{1,3} [0-9]{3} [0-9]{3} [0-9]{4}"
                    defaultValue="+1 123 456 7890"
                  />
                </Col>
              </Row>
              <Row>
                <Col className="form-col">
                  <label for="telegram_id">Telegram ID</label>
                  <br />
                  <input
                    type="text"
                    id="telegram_id"
                    name="telegram_id"
                    defaultValue="@johndoe"
                  />
                </Col>
                <Col className="form-col">
                  <label for="vk_id">VK ID</label>
                  <br />
                  <input
                    type="text"
                    id="vk_id"
                    name="vk_id"
                    defaultValue="@id123123123"
                  />
                </Col>
              </Row>
              <Row>
                <Col className="form-col">
                  <label for="job">Job Title</label>
                  <br />
                  <input
                    type="text"
                    id="job"
                    name="job"
                    defaultValue="Software Engineer"
                  />
                </Col>
              </Row>
              <Row>
                <Col className="form-col">
                  <label for="department">Department</label>
                  <br />
                  <input
                    type="text"
                    id="department"
                    name="department"
                    defaultValue="Engineering"
                  />
                </Col>
                <Col className="form-col">
                  <label for="officeloc">Office Location</label>
                  <br />
                  <input
                    type="text"
                    id="officeloc"
                    name="officeloc"
                    defaultValue="New York"
                  />
                </Col>
              </Row>
              <Row>
                <Col className="form-col">
                  <label for="country">Country</label>
                  <br />
                  <input
                    type="text"
                    id="country"
                    name="country"
                    defaultValue="United States"
                  />
                </Col>
                <Col className="form-col">
                  <label for="lang">Preferred Language</label>
                  <br />
                  <input
                    type="text"
                    id="lang"
                    name="lang"
                    defaultValue="English"
                  />
                </Col>
              </Row>
              <Row>
                <Col className="form-col">
                  {/* <input type="submit" value="Save Changes" /> */}
                  <button type="submit">Save Changes</button>
                </Col>
              </Row>
            </Container>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserEditTestPage;
