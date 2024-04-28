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
import "../styles/useradd.css";
import { useEffect, useState } from "react";
import useAsync from "../functions/hooks/useAsync";
import getJsonWithErrorHandlerFunc from "../functions/getJsonWithErrorHandlerFunc";
import API from "../network/API";
import formatDate from "../functions/formatDate";
import { addMonths } from "date-fns";
import optional from "../functions/optional";
import LeftPanel from "../components/LeftPanel/LeftPanel";
import SearchPanel from "../components/SearchPanel";
import { useNavigate } from "react-router-dom";

function UserAdd() {
  const [receivers, setReceivers] = useState([]);
  const [employees, setEmployees] = useState({});
  const [pretime, setPretime] = useState(null);

  const navigate = useNavigate();

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

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [midname, setMidname] = useState("");

  function handleChange(e) {
    setReceivers(
      // On autofill we get a stringified value.
      typeof e.target.value === "string"
        ? e.target.value.split(",")
        : e.target.value
    );
  }

  const [login, setLogin] = useState(null);
  const [password, setPassword] = useState(null);

  async function addEmployee() {
    if (!name || !surname) {
      alert("Введите имя и фамилию");
      return;
    }
    let addres = await API.addEmployee({
      name: name,
      surname: surname,
      patronymic: midname,
      role: role,
    });
    let addresjson = await addres.json();
    setLogin(addresjson.login);
    setPassword(addresjson.password);
    if (!addres || !addres.ok) {
      alert("Не удалось создать пользователя");
      return;
    }
    if (receivers.length > 0) {
      let addheadres = await API.addHeadEmployee({
        employee_id: addres.login,
        head_id: receivers[0],
      });
      // let addheadresjson = await addreshead.json()
      if (!addheadres || !addheadres.ok) {
        alert("Не удалось назначить руководителя");
        return;
      }
    }
    alert(`Пользователь успешно добавлен
    Логин: ${addresjson.login}
    Пароль: ${addresjson.password}`);
  }

  // useEffect(() => {}, [login, password]);

  function refresh() {
    window.location.reload();
  }

  const [role, setRole] = useState("user");

  return (
    <div style={{ display: "flex", overflow: "hidden", maxWidth: "100vw" }}>
      <LeftPanel highlight="search" />
      <div>
        <SearchPanel setOuterRequest={(e) => {}} searchFunc={(e) => {}} />
        <Container className="user-add-container">
          <Form>
            <Row
            // className="user-add-row"
            >
              <Col className="useradd-left-col">
                {/* <Row> */}
                <Typography variant="body1">Фамилия</Typography>
                {/* </Row> */}
              </Col>
              <Col className="useradd-right-col">
                <Form.Control
                  type="text"
                  onChange={(e) => setSurname(e.target.value)}
                />
              </Col>
            </Row>
            <Row
            // className="user-add-row"
            >
              <Col className="useradd-left-col">
                {/* <Row> */}
                <Typography variant="body1">Имя</Typography>
                {/* </Row> */}
              </Col>
              <Col className="useradd-right-col">
                <Form.Control
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>
            </Row>
            <Row
            // className="user-add-row"
            >
              <Col className="useradd-left-col">
                {/* <Row> */}
                <Typography variant="body1">Отчество</Typography>
                {/* </Row> */}
              </Col>
              <Col className="useradd-right-col">
                <Form.Control
                  type="text"
                  onChange={(e) => setMidname(e.target.value)}
                />
              </Col>

              {/* <Col>
          <Form>
            <Row>
              
            </Row>
            <Row>
              <Form.Control type="text" />
            </Row>
            <Row>
              <Form.Control type="text" />
            </Row>
          </Form>
        </Col> */}
            </Row>
            <Row>
              <Col className="useradd-left-col">
                <Typography variant="body1">Добавить руководителя</Typography>
              </Col>
              <Col className="useradd-right-col">
                {/* <Form.Control type="text" /> */}
                <FormControl
                  sx={{
                    // minWidth: "300px",
                    width: "100%",
                  }}
                  // className="useradd-col"
                >
                  <InputLabel id="receivers-label">Руководитель</InputLabel>
                  <Select
                    fullWidth
                    // sx={{ width: "100%" }}
                    // style={{ width: "100%" }}
                    className="receivers-select"
                    labelId="receivers-label"
                    // placeholder="Получатели"
                    // multiple
                    value={receivers}
                    input={
                      <OutlinedInput
                        id="select-multiple-chip"
                        label="Получатели"
                      />
                    }
                    // renderValue={(selected) => (
                    //   <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    //     {/* {console.log("SELECTED")} */}
                    //     {/* {console.log(selected)} */}
                    //     {selected.map((value) => (
                    //       <Chip
                    //         key={value}
                    //         label={(() => {
                    //           let thisemp = Object.values(employees).find((emp) => {
                    //             return value == emp.id;
                    //           });
                    //           return (
                    //             thisemp.surname +
                    //             " " +
                    //             thisemp.name +
                    //             " " +
                    //             optional(thisemp.patronymic)
                    //           );
                    //         })()}
                    //       />
                    //     ))}
                    //   </Box>
                    // )}
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
              </Col>
            </Row>

            <Row>
              <Col className="useradd-left-col">
                <Typography variant="body1">Роль</Typography>
              </Col>
              <Col className="useradd-right-col">
                {/* <Form.Control type="text" /> */}
                <FormControl
                  sx={{
                    // minWidth: "300px",
                    width: "100%",
                  }}
                  // className="useradd-col"
                >
                  <InputLabel id="receivers-label">Выберите роль</InputLabel>
                  <Select
                    fullWidth
                    // sx={{ width: "100%" }}
                    // style={{ width: "100%" }}
                    className="receivers-select"
                    labelId="receivers-label"
                    // placeholder="Получатели"
                    // multiple
                    value={role}
                    input={
                      <OutlinedInput id="select-multiple-chip" label="Роль" />
                    }
                    // renderValue={(selected) => (
                    //   <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    //     {/* {console.log("SELECTED")} */}
                    //     {/* {console.log(selected)} */}
                    //     {selected.map((value) => (
                    //       <Chip
                    //         key={value}
                    //         label={(() => {
                    //           let thisemp = Object.values(employees).find((emp) => {
                    //             return value == emp.id;
                    //           });
                    //           return (
                    //             thisemp.surname +
                    //             " " +
                    //             thisemp.name +
                    //             " " +
                    //             optional(thisemp.patronymic)
                    //           );
                    //         })()}
                    //       />
                    //     ))}
                    //   </Box>
                    // )}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    {/* {Object.values(employees).map((emp) => (
                      <MenuItem key={emp.id} value={emp.id}>
                        {emp.surname +
                          " " +
                          emp.name +
                          " " +
                          optional(emp.patronymic)}
                      </MenuItem>
                    ))} */}
                    <MenuItem key="user" value="user">
                      Сотрудник
                    </MenuItem>
                    <MenuItem key="manager" value="manager">
                      Табельщик
                    </MenuItem>
                    <MenuItem key="admin" value="admin">
                      Бухгалтер
                    </MenuItem>
                  </Select>
                </FormControl>
              </Col>
            </Row>
          </Form>
          <Button onClick={addEmployee}>Добавить сотрудника</Button>
          <Button onClick={refresh}>Очистить поля</Button>
          <Button
            onClick={() => {
              navigate("/search");
            }}
          >
            Назад
          </Button>
          <Typography variant="body1">{"Логин: " + optional(login)}</Typography>
          <Typography variant="body1">
            {"Пароль: " + optional(password)}
          </Typography>
        </Container>
      </div>
    </div>
  );
}

export default UserAdd;
