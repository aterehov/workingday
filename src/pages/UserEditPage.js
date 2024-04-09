import { Col, Container, Image, Row } from "react-bootstrap";
import LeftPanel from "../components/LeftPanel/LeftPanel";
import TopPanel from "../components/TopPanel/TopPanel";
import "../styles/usereditpage.css";
import "../styles/overlay_editimage.css";
import "../styles/hidden.css";
import PencilIcon from "../components/UserEditPage/PencilIcon";
import { useEffect, useRef, useState } from "react";
import useAsync from "../functions/hooks/useAsync";
import getJsonWithErrorHandlerFunc from "../functions/getJsonWithErrorHandlerFunc";
import API from "../network/API";
import { useNavigate, useParams } from "react-router-dom";
import optional from "../functions/optional";
import convertNull from "../functions/convertNull";

function UserEditPage({ get_id = useParams }) {
  const { id } = get_id();
  const navigate = useNavigate();
  const [info, setInfo] = useState(null);
  useAsync(getJsonWithErrorHandlerFunc, setInfo, [
    (args) => API.infoEmployee(args),
    [id],
  ]);

  // const [name, setName] = useState("");
  // const [patronymic, setPatronymic] = useState("");
  // const [surname, setSurname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [telegram_id, setTelegramId] = useState("");
  const [vk_id, setVkId] = useState("");
  const [photoData, setPhotoData] = useState("");

  const photo_input = useRef(null);

  useEffect(() => {
    if (!info) {
      return;
    }
    // setName(info.name);
    // setPatronymic(optional(info.patronymic));
    // setSurname(info.surname);
    setBirthday(optional(info.birthday));
    setEmail(optional(info.email));
    setPhone(optional(info.phones, optional(info.phones[0])));
    setTelegramId(optional(info.telegram_id));
    setVkId(optional(info.vk_id));
    // setPhoto(optional(info.photo_link));
  }, [info]);

  // console.log("INFO");
  // console.log(info);

  async function onClick(event) {
    event.preventDefault();
    // console.log("name");
    // console.log(name);
    // console.log("surname");
    // console.log(surname);
    // console.log("patronymic");
    // console.log(patronymic);
    // console.log("birthday");
    // console.log(birthday);
    // console.log("email");
    // console.log(email);
    // console.log("phone");
    // console.log(phone);
    // console.log("telegram_id");
    // console.log(telegram_id);
    // console.log("vk_id");
    // console.log(vk_id);
    // console.log("photo data");
    // console.log(photoData);
    let resphoto;
    if (photoData) {
      let url = (await (await API.uploadPhotoProfile()).json()).url;
      // console.log("PHOTO DATA");
      // console.log(photoData);
      let file = new File([photoData], "image.jpg");
      // console.log("FILE");
      // console.log(file);
      resphoto = await API.xfetch({
        path: url,
        isabsolute: true,
        method: "PUT",
        body: file,
        bodyisjson: false,
      });
    }
    let resdata = await API.editProfile({
      phones: optional(phone, [phone], []),
      email: convertNull(email),
      birthday: convertNull(birthday),
      // password: undefined,
      telegram_id: convertNull(telegram_id),
      vk_id: convertNull(vk_id),
      // team: convertNull(team),
    });
    if (!resdata.ok || (photoData && !resphoto.ok)) {
      alert("Не удалось обновить информацию");
    }
    navigate("./..");
  }

  const readPhoto = (e) => {
    let files = e.target.files;
    let reader = new FileReader();
    // reader.readAsDataURL(files[0]);
    // reader.readAsBinaryString(files[0]);
    reader.readAsArrayBuffer(files[0]);
    reader.onload = (e) => {
      // console.log("image data: ", e.target.result.split(",", 2)[1]);
      // setPhotoData(e.target.result.split(",", 2)[1]);
      // console.log("image data: ", e.target.result);
      setPhotoData(e.target.result);
    };
    // setPhotoData(e.target.result);
    // setSelectedFile(e.target.value);
    // console.log(photoData);
  };

  return !info ? null : (
    <div style={{ display: "flex" }}>
      <LeftPanel highlight="user" />
      <div>
        <TopPanel
          title="Настройки аккаунта"
          profpic={info.photo_link}
          username={info.name}
          showfunctions={false}
        />
        <div className="main-content">
          <div className="overlay-container">
            <Image
              className="overlay-bgimage profpic"
              src={optional(info.photo_link)}
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
            <button
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
          </div>

          <form id="edit-profile-form">
            <Container className="form-container" fluid>
              {/* <Row>
                <Col className="form-col">
                  <label className="edit-label" for="name">
                    First Name
                  </label>
                  <br />
                  <input
                    className="edit-input"
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={info.name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Col>
                <Col className="form-col">
                  <label className="edit-label" for="patronymic">
                    Middle Name
                  </label>
                  <br />
                  <input
                    className="edit-input"
                    type="text"
                    id="patronymic"
                    name="patronymic"
                    defaultValue={optional(info.patronymic)}
                    onChange={(e) => setPatronymic(e.target.value)}
                  />
                </Col>
                <Col className="form-col">
                  <label className="edit-label" for="surname">
                    Last Name
                  </label>
                  <br />
                  <input
                    className="edit-input"
                    type="text"
                    id="surname"
                    name="surname"
                    defaultValue={info.surname}
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </Col>
              </Row> */}
              <Row>
                <Col className="form-col">
                  <label className="edit-label" for="birthday">
                    Birthday
                  </label>
                  <br />
                  <input
                    className="edit-input"
                    type="date"
                    id="birthday"
                    name="birthday"
                    defaultValue={optional(info.birthday)}
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="form-col">
                  <label className="edit-label" for="email">
                    Email
                  </label>
                  <br />
                  <input
                    className="edit-input"
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={optional(info.email)}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="form-col">
                  <label className="edit-label" for="phone">
                    Phone Number
                  </label>
                  <br />
                  <input
                    className="edit-input"
                    type="tel"
                    id="phone"
                    name="phone"
                    pattern="\+[0-9]{1,3} [0-9]{3} [0-9]{3} [0-9]{4}"
                    defaultValue={optional(info.phones, info.phones[0])}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="form-col">
                  <label className="edit-label" for="telegram_id">
                    Telegram ID
                  </label>
                  <br />
                  <input
                    className="edit-input"
                    type="text"
                    id="telegram_id"
                    name="telegram_id"
                    defaultValue={optional(info.telegram_id)}
                    onChange={(e) => setTelegramId(e.target.value)}
                  />
                </Col>
                <Col className="form-col">
                  <label className="edit-label" for="vk_id">
                    VK ID
                  </label>
                  <br />
                  <input
                    className="edit-input"
                    type="text"
                    id="vk_id"
                    name="vk_id"
                    defaultValue={optional(info.vk_id)}
                    onChange={(e) => setVkId(e.target.value)}
                  />
                </Col>
              </Row>
              {/* <Row>
                <Col className="form-col">
                  <label className="edit-label" for="job">
                    Job Title
                  </label>
                  <br />
                  <input
                    className="edit-input"
                    type="text"
                    id="job"
                    name="job"
                    defaultValue="Software Engineer"
                  />
                </Col>
              </Row> */}
              {/* <Row>
                <Col className="form-col">
                  <label className="edit-label" for="department">
                    Department
                  </label>
                  <br />
                  <input
                    className="edit-input"
                    type="text"
                    id="department"
                    name="department"
                    defaultValue="Engineering"
                  />
                </Col>
                <Col className="form-col">
                  <label className="edit-label" for="officeloc">
                    Office Location
                  </label>
                  <br />
                  <input
                    className="edit-input"
                    type="text"
                    id="officeloc"
                    name="officeloc"
                    defaultValue="New York"
                  />
                </Col>
              </Row> */}
              {/* <Row>
                <Col className="form-col">
                  <label className="edit-label" for="country">
                    Country
                  </label>
                  <br />
                  <input
                    className="edit-input"
                    type="text"
                    id="country"
                    name="country"
                    defaultValue="United States"
                  />
                </Col>
                <Col className="form-col">
                  <label className="edit-label" for="lang">
                    Preferred Language
                  </label>
                  <br />
                  <input
                    className="edit-input"
                    type="text"
                    id="lang"
                    name="lang"
                    defaultValue="English"
                  />
                </Col>
              </Row> */}
              <Row>
                <Col className="form-col">
                  {/* <input type="submit" value="Save Changes" /> */}
                  <button
                    type="submit"
                    className="edit-save-button"
                    onClick={onClick}
                  >
                    Save Changes
                  </button>
                </Col>
              </Row>
            </Container>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserEditPage;
