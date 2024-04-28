import { Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import API from "../network/API";
import formatDate from "../functions/formatDate";
import LeftPanel from "../components/LeftPanel/LeftPanel";
import TopPanel from "../components/TopPanel/TopPanel";
import getCachedLogin from "../functions/getCachedLogin";
import useAsync from "../functions/hooks/useAsync";
import getJsonWithErrorHandlerFunc from "../functions/getJsonWithErrorHandlerFunc";

function AbsenseRequest() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  async function send_request() {
    if (!startDate || !endDate) {
      alert("Выберите даты начала и конца отпуска");
      return;
    }
    let res = await API.requestAbsence({
      start_date: formatDate(startDate),
      end_date: formatDate(endDate),
      type: "vacation",
    });
    if (res && res.ok) {
      alert("Запрос отправлен");
    } else {
      alert("Не удалось запросить отпуск");
    }
  }

  const my_id = getCachedLogin();
  const [myInfo, setMyInfo] = useState(null);
  useAsync(getJsonWithErrorHandlerFunc, setMyInfo, [
    (args) => API.infoEmployee(args),
    [my_id],
  ]);

  return !myInfo ? null : (
    <div style={{ display: "flex" }}>
      {/* {console.log(optional(info.phones, info.phones[0]))} */}
      <LeftPanel highlight="absenserequest" />
      <div>
        <TopPanel
          title="Запрос отпуска"
          profpic={myInfo.photo_link}
          showfunctions={false}
          username={myInfo.name}
        />
        <div>
          <Container>
            <Row>
              <Typography variant="h5">Выберите дату отпуска</Typography>
            </Row>
            <Row>
              <DatePicker
                format="DD.MM.YYYY"
                slotProps={{ textField: { placeholder: "Начало" } }}
                // defaultValue={dayjs(date)}
                // className="attendance-table-datepicker"
                // sx={{ marginLeft: "15px" }}
                onChange={(v) => {
                  const date = new Date(v);
                  // const formdate = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSX");
                  // const formdate = dayjs(v).format("yyyy-MM-dd");
                  // setPretime(null);
                  // setTime({});
                  setStartDate(date);
                }}
              />
            </Row>
            <Row>
              <DatePicker
                format="DD.MM.YYYY"
                slotProps={{ textField: { placeholder: "Конец" } }}
                // defaultValue={dayjs(date)}
                // className="attendance-table-datepicker"
                // sx={{ marginLeft: "15px" }}
                onChange={(v) => {
                  const date = new Date(v);
                  // const formdate = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSX");
                  // const formdate = dayjs(v).format("yyyy-MM-dd");
                  // setPretime(null);
                  // setTime({});
                  setEndDate(date);
                }}
              />
            </Row>
            <Row>
              <Button onClick={send_request}>Запросить отпуск</Button>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default AbsenseRequest;
