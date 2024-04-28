import { useEffect, useState } from "react";
import useAsync from "../functions/hooks/useAsync";
import getJsonWithErrorHandlerFunc from "../functions/getJsonWithErrorHandlerFunc";
import API from "../network/API";
import formatDate from "../functions/formatDate";
import getCachedLogin from "../functions/getCachedLogin";
import { addDays, addMonths, subDays } from "date-fns";
import LeftPanel from "../components/LeftPanel/LeftPanel";
import TopPanel from "../components/TopPanel/TopPanel";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { DatePicker, MonthCalendar } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import MonthPicker from "@mui/lab/MonthPicker";
import getDaysInMonth from "../functions/getDaysInMonth";
import optional from "../functions/optional";
import "../styles/attendanceview.css";
import { Button } from "react-bootstrap";

function AttendanceView() {
  const [date, setDate] = useState(
    (() => {
      let d = new Date();
      d.setDate(1);
      d.setHours(0, 0, 0, 0);
      return d;
    })()
  );
  const [employees, setEmployees] = useState({});
  const [time, setTime] = useState({});
  // const [timePrepared, setTimePrepared] = useState(false);
  const [pretime, setPretime] = useState(null);
  useAsync(
    getJsonWithErrorHandlerFunc,
    setPretime,
    [
      (args) => API.listAllAttendance(args),
      [{ from: formatDate(date), to: formatDate(addMonths(date, 1)) }],
    ],
    [date]
  );

  useEffect(() => {
    if (pretime === null) {
      return;
    }

    if (Object.keys(time).length != 0) {
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
    let ptime = {};
    // let pretime = await API.listAllAttendance(formatDate(date), formatDate(date));
    // console.log("LENGTH");
    // console.log(employees.length);

    // for (let index = 0; index < Object.keys(employees).length; index++) {
    Object.values(employees).forEach((element) => {
      // const element = employees[index];
      // console.log(element);
      let etime = {};

      for (
        let day = 1;
        day <= getDaysInMonth(date.getMonth(), date.getFullYear());
        day++
      ) {
        let citem = pretime.attendances.find((item) => {
          return (
            item.employee.id == element.id &&
            new Date(Date.parse(item.start_date)).getDate() == day
          );
        });

        let start = citem
          ? new Date(Date.parse(citem["start_date"]))
          : new Date();
        let end = citem ? new Date(Date.parse(citem["end_date"])) : start;

        let j = {
          start: start,
          end: end,
          absense: end < start,
        };

        etime[day] = j;
      }

      ptime[element.id] = etime;
      // let start = new Date(
      //   Date.parse(
      //     pretime.attendances.find((item) => {
      //       return item.employee.id == element.id;
      //     })["start_date"]
      //   )
      // );

      // let end = new Date(
      //   Date.parse(
      //     pretime.attendances.find((item) => {
      //       return item.employee.id == element.id;
      //     })["end_date"]
      //   )
      // );

      // let j = {
      //   start: start,
      //   // time && time[element.id] && time[element.id]["start"]
      //   //   ? time[element.id]["start"]
      //   //   : null,
      //   end: end,
      //   // time && time[element.id] && time[element.id]["end"]
      //   //   ? time[element.id]["end"]
      //   //   : null,
      //   absense: end < start,
      //   // time && time[element.id] && time[element.id]["absense"]
      //   //   ? time[element.id]["absense"]
      //   //   : false,
      //   // setStart: undefined,
      //   // setEnd: undefined,
      // };
      // ptime[element.id] = j;
    });
    setTime(ptime);
    // setTimePrepared(true);
  }, [pretime, time]);

  // function setStart(v, emp_id) {
  //   // console.log("V");
  //   // console.log(v);
  //   let d = new Date(v);
  //   // let xxxx = dayjs(d);
  //   // console.log("XXXXXXXXXXXXXXXX");
  //   // console.log(xxxx);
  //   time[emp_id]["start"] = new Date(
  //     new Date(date).setHours(d.getHours(), d.getMinutes())
  //   );
  // }

  // function setEnd(v, emp_id) {
  //   let d = new Date(v);
  //   time[emp_id]["end"] = new Date(
  //     new Date(date).setHours(d.getHours(), d.getMinutes())
  //   );
  // }

  // function changeAbsense(emp_id) {
  //   let ntime = { ...time };
  //   ntime[emp_id]["absense"] = !ntime[emp_id]["absense"];
  //   setTime(ntime);
  // }

  // async function saveAttendance(e, emp_id) {
  //   await API.addAttendance({
  //     employee_id: emp_id,
  //     start_date: formatDate(
  //       time[emp_id]["absense"] ? date : time[emp_id]["start"]
  //     ),
  //     end_date: formatDate(
  //       time[emp_id]["absense"] ? subDays(date, 1) : time[emp_id]["end"]
  //     ),
  //   });
  // }

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

  useEffect(() => {
    console.log("TIME USEEFFECT");
    console.log(time);
  }, [time]);

  useEffect(() => {}, [date]);

  return !myInfo || !time ? null : (
    <div style={{ display: "flex" }}>
      {/* {console.log(optional(info.phones, info.phones[0]))} */}
      <LeftPanel highlight="viewattendance" />
      <div>
        <TopPanel
          title="Информация от табельщиков"
          profpic={myInfo.photo_link}
          showfunctions={false}
          username={myInfo.name}
        />
        <div>
          <div className="attendance-title-container">
            <Typography
              className="attendance-title"
              variant="h1"
              display="inline"
              style={{ fontSize: "32px" }}
            >
              Посещения за месяц
            </Typography>
            {/* <MonthCalendar /> */}
            {/* <MonthPicker /> */}
            <DatePicker
              className="datepicker"
              format="MM/YY"
              views={["month", "year"]}
              defaultValue={dayjs(date)}
              onChange={(v) => {
                const date = new Date(v);
                date.setDate(1);
                console.log("DATEPICKER");
                console.log(date);
                // const formdate = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSX");
                // const formdate = dayjs(v).format("yyyy-MM-dd");

                setPretime(null);
                setTime({});
                setDate(date);
              }}
            />
            {/* <button onClick={() => console.log(date)}>Show date</button> */}
            <Button
              className="attendance-search-employee-button"
              sx={{ marginLeft: "auto" }}
            >
              Поиск сотрудника
            </Button>
          </div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="attendance-view-cell">
                    <Typography variant="subtitle1">ФИО</Typography>
                  </TableCell>
                  {[
                    ...Array(
                      getDaysInMonth(date.getMonth(), date.getFullYear()) + 1
                    ).keys(),
                  ]
                    .slice(1)
                    .map((day) => (
                      <TableCell className="attendance-view-cell">
                        <Typography variant="subtitle1">{day}</Typography>
                      </TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.values(employees).map((emp) => (
                  <TableRow>
                    <TableCell className="attendance-view-cell">
                      <Typography variant="body1">
                        {emp.surname +
                          " " +
                          emp.name +
                          " " +
                          optional(emp.patronymic)}
                      </Typography>
                    </TableCell>
                    {console.log("TIME!!!")}
                    {console.log(time)}
                    {!time || Object.keys(time).length == 0 ? (
                      <div></div>
                    ) : (
                      Object.keys(time[emp.id]).map((day) => (
                        <TableCell
                          className={
                            "attendance-view-cell" +
                            ([0, 6].includes(
                              new Date(new Date(date).setDate(day)).getDay()
                            )
                              ? " attendance-view-cell-weekend"
                              : "")
                          }
                        >
                          <Typography variant="body1">
                            {time[emp.id][day]["absense"]
                              ? "Н"
                              : (() => {
                                  let delta =
                                    time[emp.id][day]["end"] -
                                    time[emp.id][day]["start"];
                                  if (delta == 0) {
                                    return "";
                                  }
                                  let minutes = (delta % 3600000) / 60000;
                                  let hours =
                                    (delta - (delta % 3600000)) / 3600000;
                                  return (
                                    hours.toString() +
                                    ":" +
                                    (minutes < 10
                                      ? "0" + minutes.toString()
                                      : minutes.toString())
                                  );
                                })()}
                          </Typography>
                        </TableCell>
                      ))
                    )}
                    {/* {[
                    ...Array(
                      getDaysInMonth(date.getMonth(), date.getFullYear()) + 1
                    ).keys(),
                  ]
                    .slice(1)
                    .map((day) => (

                    ))} */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default AttendanceView;
