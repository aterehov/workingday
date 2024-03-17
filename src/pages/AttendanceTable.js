import { CheckBox, TableChart } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import optional from "../functions/optional";
import { addDays, format, subDays } from "date-fns";
import dayjs from "dayjs";
import API from "../network/API";
import formatDate from "../functions/formatDate";
import getCachedLogin from "../functions/getCachedLogin";
import useAsync from "../functions/hooks/useAsync";
import getJsonWithErrorHandlerFunc from "../functions/getJsonWithErrorHandlerFunc";
import LeftPanel from "../components/LeftPanel/LeftPanel";
import TopPanel from "../components/TopPanel/TopPanel";
import "../styles/attendance.css";

function AttendanceTable() {
  const [date, setDate] = useState(new Date().setHours(0, 0, 0, 0));
  const [employees, setEmployees] = useState([]);
  const [time, setTime] = useState(null);
  const [timePrepared, setTimePrepared] = useState(false);
  const [pretime, setPretime] = useState(null);
  useAsync(
    getJsonWithErrorHandlerFunc,
    setPretime,
    [
      (args) => API.listAllAttendance(args),
      [{ from: formatDate(date), to: formatDate(addDays(date, 1)) }],
    ],
    [date]
  );

  useEffect(() => {
    if (pretime === null) {
      return;
    }
    console.log("PRETIME");
    console.log(pretime);
    let emp = [];
    pretime.attendances.forEach((element) => {
      emp.push(element.employee);
    });
    setEmployees(emp);
    let ptime = {};
    // let pretime = await API.listAllAttendance(formatDate(date), formatDate(date));
    console.log("LENGTH");
    console.log(employees.length);
    for (let index = 0; index < employees.length; index++) {
      const element = employees[index];
      console.log(element);
      let start = new Date(
        Date.parse(
          pretime.attendances.find((item) => {
            return item.employee.id == element.id;
          })["start_date"]
        )
      );

      let end = new Date(
        Date.parse(
          pretime.attendances.find((item) => {
            return item.employee.id == element.id;
          })["end_date"]
        )
      );

      let j = {
        start: start,
        // time && time[element.id] && time[element.id]["start"]
        //   ? time[element.id]["start"]
        //   : null,
        end: end,
        // time && time[element.id] && time[element.id]["end"]
        //   ? time[element.id]["end"]
        //   : null,
        absense: end < start,
        // time && time[element.id] && time[element.id]["absense"]
        //   ? time[element.id]["absense"]
        //   : false,
        // setStart: undefined,
        // setEnd: undefined,
      };
      ptime[element.id] = j;
    }
    setTime(ptime);
    setTimePrepared(true);
  }, [pretime]);

  function setStart(v, emp_id) {
    // console.log("V");
    // console.log(v);
    let d = new Date(v);
    // let xxxx = dayjs(d);
    // console.log("XXXXXXXXXXXXXXXX");
    // console.log(xxxx);
    time[emp_id]["start"] = new Date(
      new Date(date).setHours(d.getHours(), d.getMinutes())
    );
  }

  function setEnd(v, emp_id) {
    let d = new Date(v);
    time[emp_id]["end"] = new Date(
      new Date(date).setHours(d.getHours(), d.getMinutes())
    );
  }

  function changeAbsense(emp_id) {
    let ntime = { ...time };
    ntime[emp_id]["absense"] = !ntime[emp_id]["absense"];
    setTime(ntime);
  }

  async function saveAttendance(e, emp_id) {
    await API.addAttendance({
      employee_id: emp_id,
      start_date: formatDate(
        time[emp_id]["absense"] ? date : time[emp_id]["start"]
      ),
      end_date: formatDate(
        time[emp_id]["absense"] ? subDays(date, 1) : time[emp_id]["end"]
      ),
    });
  }

  const my_id = getCachedLogin();
  const [myInfo, setMyInfo] = useState(null);
  useAsync(getJsonWithErrorHandlerFunc, setMyInfo, [
    (args) => API.infoEmployee(args),
    [my_id],
  ]);
  // employees.forEach((element) => {
  //   console.log(element);
  //   let j = {
  //     start: null,
  //     end: null,
  //     // setStart: undefined,
  //     // setEnd: undefined,
  //   };
  //   // [j.start, j.setStart] = useState({});
  //   // [j.end, j.setEnd] = useState({});
  //   ptime[element.id] = j;
  // });

  // (() => {
  //   let ptime = {};
  //   employees.forEach((element) => {
  //     let j = {
  //       start: null,
  //       end: null,
  //       // setStart: undefined,
  //       // setEnd: undefined,
  //     };
  //     // [j.start, j.setStart] = useState({});
  //     // [j.end, j.setEnd] = useState({});
  //     ptime[element.id] = j;
  //   });
  //   return ptime;
  // })()
  // );

  // let time = {};
  // useEffect(() => {
  // employees.forEach((element) => {
  //   let j = {
  //     start: undefined,
  //     end: undefined,
  //     setStart: undefined,
  //     setEnd: undefined,
  //   };
  //   [j.start, j.setStart] = useState({});
  //   [j.end, j.setEnd] = useState({});
  //   time[element.id] = j;
  // });
  // }, []);
  // useEffect(() => {}, [date]);

  return !myInfo || !time ? null : (
    <div style={{ display: "flex" }}>
      {/* {console.log(optional(info.phones, info.phones[0]))} */}
      <LeftPanel highlight="attendance" />
      <div>
        <TopPanel
          title="Учет рабочего времени"
          profpic={myInfo.photo_link}
          showfunctions={false}
        />
        <div>
          <button onClick={() => console.log(date)}>Show date</button>
          <button onClick={() => console.log(time)}>Show time</button>
          <div className="attendance-title-container">
            <Typography
              className="attendance-title"
              variant="h1"
              display="inline"
              style={{ fontSize: "32px" }}
            >
              Посещения на
            </Typography>
            <DatePicker
              format="DD.MM.YYYY"
              defaultValue={dayjs(date)}
              onChange={(v) => {
                const date = new Date(v);
                // const formdate = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSX");
                // const formdate = dayjs(v).format("yyyy-MM-dd");
                setDate(date);
              }}
            />
          </div>
          {/* {date ? ( */}
          <TableContainer component={"div"}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1">ФИО</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">Статус</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!time || Object.keys(time).length == 0 ? (
                  <div></div>
                ) : (
                  employees.map((emp) => (
                    <TableRow>
                      {/* {console.log("EMP ID")} */}
                      {/* {console.log(emp.id)} */}
                      {/* {console.log("TIME EMP ID")} */}
                      {/* {console.log(time[emp.id])} */}
                      {/* {console.log("TIME")} */}
                      {/* {console.log(time)} */}
                      <TableCell>
                        <Typography variant="body1">
                          {emp.surname +
                            " " +
                            emp.name +
                            " " +
                            optional(emp.patronymic)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Container>
                          <Row>
                            <Col>
                              <Typography variant="body1">Начало</Typography>
                              <TimePicker
                                ampm={false}
                                value={dayjs(time[emp.id]["start"])}
                                // defaultValue={(() => {
                                //   console.log("TIME:");
                                //   console.log(time[emp.id]["start"].toJSON());
                                //   return time[emp.id]["start"].toJSON();
                                // })()}
                                disabled={time[emp.id]["absense"]}
                                // disabled={(() => {
                                //   console.log("DATE");
                                //   console.log(date);
                                //   console.log("PRETIME");
                                //   console.log(pretime);
                                //   console.log("TIME");
                                //   console.log(time);
                                //   console.log();
                                //   return time[emp.id]["absense"];
                                // })()}
                                onChange={(v) => setStart(v, emp.id)}
                              />
                            </Col>
                            <Col>
                              <Typography variant="body1">Конец</Typography>
                              <TimePicker
                                ampm={false}
                                value={dayjs(time[emp.id]["end"])}
                                disabled={time[emp.id]["absense"]}
                                onChange={(v) => setEnd(v, emp.id)}
                              />
                            </Col>

                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={time[emp.id]["absense"]}
                                  onChange={() => changeAbsense(emp.id)}
                                />
                              }
                              label="Отсутствие"
                            />

                            <button
                              onClick={() => {
                                console.log(time[emp.id]["start"]);
                              }}
                            >
                              Start Date
                            </button>
                            <button
                              onClick={() => {
                                console.log(time[emp.id]["end"]);
                              }}
                            >
                              End Date
                            </button>

                            <Button onClick={(e) => saveAttendance(e, emp.id)}>
                              Сохранить
                            </Button>
                          </Row>
                        </Container>
                      </TableCell>
                    </TableRow>
                  ))
                )}
                {/* <TableRow>
                  <TableCell>
                    <Typography variant="body1">Сидоров</Typography>
                  </TableCell>
                  <TableCell>
                    <Container>
                      <Row>
                        <Col>
                          <Typography variant="body1">Начало</Typography>
                          <TimePicker ampm={false} />
                        </Col>
                        <Col>
                          <Typography variant="body1">Конец</Typography>
                          <TimePicker ampm={false} />
                        </Col>
                        
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Отсутствие"
                        />
                        
                        <Button>Сохранить</Button>
                      </Row>
                    </Container>
                  </TableCell>
                </TableRow> */}
              </TableBody>
            </Table>
          </TableContainer>
          {/* ) : (
            <div></div>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default AttendanceTable;
