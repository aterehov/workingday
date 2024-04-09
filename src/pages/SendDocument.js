import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import LeftPanel from "../components/LeftPanel/LeftPanel";
import TopPanel from "../components/TopPanel/TopPanel";
import { useEffect, useRef, useState } from "react";
import useAsync from "../functions/hooks/useAsync";
import getJsonWithErrorHandlerFunc from "../functions/getJsonWithErrorHandlerFunc";
import API from "../network/API";
import getCachedLogin from "../functions/getCachedLogin";
import "../styles/senddocument.css";
import optional from "../functions/optional";
import formatDate from "../functions/formatDate";
import { addMonths } from "date-fns";

function SendDocument() {
  const [info, setInfo] = useState(false);
  useAsync(getJsonWithErrorHandlerFunc, setInfo, [
    (args) => API.infoEmployee(args),
    [getCachedLogin()],
  ]);

  const [receivers, setReceivers] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  function handleChange(e) {
    setReceivers(
      // On autofill we get a stringified value.
      typeof e.target.value === "string"
        ? e.target.value.split(",")
        : e.target.value
    );
  }

  const document_input = useRef(null);
  const [documentData, setDocumentData] = useState(null);
  const [documentName, setDocumentName] = useState(null);

  function readDoc(e) {
    let files = e.target.files;
    // console.log("FILES");
    // console.log(files);
    setDocumentName(files[0].name);
    let reader = new FileReader();
    // reader.readAsDataURL(files[0]);
    // reader.readAsBinaryString(files[0]);
    reader.readAsArrayBuffer(files[0]);
    reader.onload = (e) => {
      // console.log("image data: ", e.target.result.split(",", 2)[1]);
      // setPhotoData(e.target.result.split(",", 2)[1]);
      // console.log("doc data: ", e.target.result);
      setDocumentData(e.target.result);
    };
    // setPhotoData(e.target.result);
    // setSelectedFile(e.target.value);
    // console.log(documentData);
  }

  const [needSignature, setNeedSignature] = useState(false);

  const [employees, setEmployees] = useState({});
  const [pretime, setPretime] = useState(null);
  useAsync(getJsonWithErrorHandlerFunc, setPretime, [
    (args) => API.listAllAttendance(args),
    [
      {
        from: formatDate(new Date()),
        to: formatDate(addMonths(new Date(), 1)),
      },
    ],
  ]);

  useEffect(() => {
    if (pretime === null) {
      return;
    }
    // console.log("PRETIME");
    // console.log(pretime);
    // let emp = [];
    let emp = {};
    pretime.attendances.forEach((element) => {
      // emp.push(element.employee);
      emp[element.employee.id] = element.employee;
    });
    setEmployees(emp);
    // let ptime = {};
    // let pretime = await API.listAllAttendance(formatDate(date), formatDate(date));
    // console.log("LENGTH");
    // console.log(employees.length);

    // for (let index = 0; index < Object.keys(employees).length; index++) {
    // Object.values(employees).forEach((element) => {
    //   // const element = employees[index];
    //   // console.log(element);
    //   let etime = {};

    //   for (
    //     let day = 1;
    //     day <= getDaysInMonth(date.getMonth(), date.getFullYear());
    //     day++
    //   ) {
    //     let citem = pretime.attendances.find((item) => {
    //       return (
    //         item.employee.id == element.id &&
    //         new Date(Date.parse(item.start_date)).getDate() == day
    //       );
    //     });

    //     let start = citem
    //       ? new Date(Date.parse(citem["start_date"]))
    //       : new Date();
    //     let end = citem ? new Date(Date.parse(citem["end_date"])) : start;

    //     let j = {
    //       start: start,
    //       end: end,
    //       absense: end < start,
    //     };

    //     etime[day] = j;
    //   }

    //   ptime[element.id] = etime;
    //   // let start = new Date(
    //   //   Date.parse(
    //   //     pretime.attendances.find((item) => {
    //   //       return item.employee.id == element.id;
    //   //     })["start_date"]
    //   //   )
    //   // );

    //   // let end = new Date(
    //   //   Date.parse(
    //   //     pretime.attendances.find((item) => {
    //   //       return item.employee.id == element.id;
    //   //     })["end_date"]
    //   //   )
    //   // );

    //   // let j = {
    //   //   start: start,
    //   //   // time && time[element.id] && time[element.id]["start"]
    //   //   //   ? time[element.id]["start"]
    //   //   //   : null,
    //   //   end: end,
    //   //   // time && time[element.id] && time[element.id]["end"]
    //   //   //   ? time[element.id]["end"]
    //   //   //   : null,
    //   //   absense: end < start,
    //   //   // time && time[element.id] && time[element.id]["absense"]
    //   //   //   ? time[element.id]["absense"]
    //   //   //   : false,
    //   //   // setStart: undefined,
    //   //   // setEnd: undefined,
    //   // };
    //   // ptime[element.id] = j;
    // });
    // setTime(ptime);
    // setTimePrepared(true);
  }, [pretime]);

  // const [employees, setEmployees] = useState([
  //   { id: "cadebc7c66b14028b9125593ade2a8c6", name: "Иван", surname: "Иванов" },
  //   { id: "4d79384ca6fc4515a5e8e1ab068c0bfa", name: "Петр", surname: "Петров" },
  //   { id: "d5f94f0015bf4bd391203d835a956eea", name: "Иван", surname: "Петров" },
  //   {
  //     id: "58c9f263d5cc403782d0cf6956ab9e12",
  //     name: "Александр",
  //     surname: "Александров",
  //   },
  //   {
  //     id: "daa8c47392a04279bf7eb524e45d1afb",
  //     name: "Александр",
  //     surname: "Петров",
  //   },
  //   { id: "b9d3246235f9496fb66fdd6c97b3997b", name: "Петр", surname: "Иванов" },
  // ]);

  async function send(e) {
    e.preventDefault();
    if (receivers.length == 0 || !documentData) {
      return;
    }
    let upload = await getJsonWithErrorHandlerFunc(
      (args) => API.uploadDocuments(args),
      []
    );
    let resupload = await API.xfetch({
      path: upload.url,
      isabsolute: true,
      method: "PUT",
      body: new File([documentData], documentName),
      bodyisjson: false,
    });
    let send = await API.sendDocuments({
      doc_id: upload.id,
      doc_name: name,
      doc_sign_required: needSignature,
      doc_description: description,
      employee_ids: receivers,
    });
    if (resupload && send && resupload.ok && send.ok) {
      alert("Документ отправлен");
    } else {
      alert("Не удалось отправить документ");
    }
  }

  return (
    <div style={{ display: "flex" }}>
      <LeftPanel highlight="senddoc" />
      <div>
        <TopPanel
          title="Отправка документов"
          profpic={info.photo_link}
          showfunctions={false}
          username={info.name}
        />
        {/* <Container> */}
        {/* <Row> */}
        {/* <Typography variant="h1">Отправление документов</Typography> */}
        <Form>
          <Container className="send-documents-container">
            <Row>
              <Col>
                <Form.Control
                  className="senddoc-name"
                  type="text"
                  placeholder="Название"
                  onChange={(e) => setName(e.target.value)}
                />
                <Form.Control
                  type="text"
                  as="textarea"
                  rows={5}
                  placeholder="Описание"
                  onChange={(e) => setDescription(e.target.value)}
                />
                {/* <button
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(name);
                  }}
                >
                  Show name
                </button> */}
                {/* <button
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(description);
                  }}
                >
                  Show description
                </button> */}
              </Col>
              <Col>
                <Row className="senddoc-attach-row">
                  <Button onClick={() => document_input.current.click()}>
                    Прикрепить документ
                  </Button>
                  <Typography sx={{ marginLeft: "5px" }} variant="body1">
                    {documentName ? documentName : "Файл не выбран"}
                  </Typography>
                </Row>
                <input
                  type="file"
                  id="doc"
                  name="doc"
                  ref={document_input}
                  className="hidden"
                  onChange={readDoc}
                />
                <Form.Check
                  className="senddoc-signrequired"
                  type="checkbox"
                  label="Требуется подпись сотрудников"
                  onChange={() => setNeedSignature(!needSignature)}
                />
                {/* <button
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(needSignature);
                  }}
                >
                  Show needSignature
                </button> */}
                <Row className="senddoc-receivers-row">
                  <FormControl className="receivers-formcontrol">
                    <InputLabel id="receivers-label">Получатели</InputLabel>
                    <Select
                      fullWidth
                      // sx={{ width: "100%" }}
                      // style={{ width: "100%" }}
                      className="receivers-select"
                      labelId="receivers-label"
                      // placeholder="Получатели"
                      multiple
                      value={receivers}
                      input={
                        <OutlinedInput
                          id="select-multiple-chip"
                          label="Получатели"
                        />
                      }
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {/* {console.log("SELECTED")} */}
                          {/* {console.log(selected)} */}
                          {selected.map((value) => (
                            <Chip
                              key={value}
                              label={(() => {
                                let thisemp = Object.values(employees).find(
                                  (emp) => {
                                    return value == emp.id;
                                  }
                                );
                                return (
                                  thisemp.surname +
                                  " " +
                                  thisemp.name +
                                  " " +
                                  optional(thisemp.patronymic)
                                );
                              })()}
                            />
                          ))}
                        </Box>
                      )}
                      onChange={handleChange}
                    >
                      {Object.values(employees).map((emp) => (
                        <MenuItem key={emp.id} value={emp.id}>
                          {emp.surname +
                            " " +
                            emp.name +
                            " " +
                            optional(emp.patronymic)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    className="senddoc-sendtoall"
                    onClick={(e) => {
                      e.preventDefault();
                      setReceivers(
                        Object.values(employees).map((emp) => emp.id)
                      );
                    }}
                  >
                    Отправить всем
                  </Button>
                </Row>
                {/* <button
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(receivers);
                  }}
                >
                  Show receivers
                </button> */}
                <Button className="senddoc-sendbutton" onClick={(e) => send(e)}>
                  Отправить
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
        {/* </Row> */}
        {/* </Container> */}
      </div>
    </div>
  );
}

export default SendDocument;
