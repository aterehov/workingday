import * as React from "react";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { useEffect } from "react";
import { Circle } from "@mui/icons-material";
import "../styles/calendar.css";
import { useState } from "react";
import useAsync from "../functions/hooks/useAsync";
import getJsonWithErrorHandlerFunc from "../functions/getJsonWithErrorHandlerFunc";
import API from "../network/API";
import formatDate from "../functions/formatDate";
import { addMonths } from "date-fns";
import date_leq from "../functions/date_leq";
import arrayIns from "../functions/arrayIns";
import { OverlayTrigger } from "react-bootstrap";
import { Tooltip, Typography } from "@mui/material";
import LeftPanel from "../components/LeftPanel/LeftPanel";
import TopPanel from "../components/TopPanel/TopPanel";
import getCachedLogin from "../functions/getCachedLogin";

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

/**
 * Mimic fetch with abort controller https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
 * ⚠️ No IE11 support
 */
function fakeFetch(date, { signal }) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      const daysToHighlight = [1, 2, 3].map(() =>
        getRandomNumber(1, daysInMonth)
      );

      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException("aborted", "AbortError"));
    };
  });
}

// const initialValue = dayjs("2022-04-17");

function CalendarDay(props) {
  // console.log("PROPS");
  // console.log(props);
  const {
    highlightedDays = {},
    day,
    outsideCurrentMonth,
    renderedBadges,
    setRenderedBadges,
    ...other
  } = props;

  let events = highlightedDays[props.day.date()];

  const isSelected =
    !props.outsideCurrentMonth &&
    // highlightedDays.indexOf(props.day.date()) >= 0;
    events.length > 0;

  if (isSelected) {
    console.log("PROPS");
    console.log(props);
  }

  return (
    <Tooltip
      title={
        isSelected ? (
          <div>
            {events.map((event) => (
              <Typography variant="body1">
                {(() => {
                  if (event.type == "vacation") {
                    return (
                      "Отпуск с " +
                      // event.start_date.slice(0, 10) +
                      new Date(
                        Date.parse(event.start_date)
                      ).toLocaleDateString() +
                      " по " +
                      // event.end_date.slice(0, 10)
                      new Date(Date.parse(event.end_date)).toLocaleDateString()
                    );
                  } else if (event.type == "attendance") {
                    return (
                      "Посещение с " +
                      event.start_date.slice(11, 16) +
                      " по " +
                      event.end_date.slice(11, 16)
                    );
                  }
                  return "";
                })()}
              </Typography>
            ))}
          </div>
        ) : undefined
      }
      followCursor
    >
      {console.log("BADGE RENDERS")}
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={
          isSelected ? (
            <span className="circle-container">
              {/* <Circle sx={{ width: "100%", color: "blue" }} />
            <Circle sx={{ width: "100%", color: "green" }} /> */}
              {
                // !renderedBadges[props.day.toString()]
                // ? (() => {
                // let newRenderedBadges = renderedBadges;
                // newRenderedBadges[props.day.toString()] = true;
                // setRenderedBadges(newRenderedBadges);
                // return
                events.map((event) => (
                  <Circle
                    sx={{
                      width: "100%",
                      // color: "green",
                      color: (() => {
                        if (event.type == "vacation") {
                          return "red";
                        } else if (event.type == "attendance") {
                          return "green";
                        }
                      })(),
                    }}
                  />
                ))
                // ;
                // })()
                // : null
              }
            </span>
          ) : undefined
        }
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        // sx={{ left: "50%" }}
        sx={{ "& .MuiBadge-badge": { left: "50%" } }}
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
          // sx={{ "& .MuiBadge-badge": { left: "50%" } }}
        />
      </Badge>
    </Tooltip>
  );
}

function Calendar() {
  function defaultHighlightedDays() {
    let obj = {};
    for (let index = 1; index <= 31; index++) {
      obj[index] = [];
    }
    return obj;
    // [
    //   ...Array(
    //     31
    //   ).keys(),
    // ]
    //   .slice(1)
    //   .map((day) => (
    //     <TableCell className="attendance-view-cell">
    //       <Typography variant="subtitle1">{day}</Typography>
    //     </TableCell>
    //   ))
  }

  const requestAbortController = React.useRef(null);
  // const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = useState(
    defaultHighlightedDays()
  );
  const [hdDone, setHdDone] = useState(false);

  function fetchHighlightedDays(date) {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        // setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== "AbortError") {
          throw error;
        }
      });

    // requestAbortController.current = controller;
  }
  const [month, setMonth] = useState(
    (() => {
      let d = new Date();
      d.setDate(1);
      d.setHours(0, 0, 0, 0);
      return d;
    })()
  );
  const [actions, setActions] = useState(null);
  useAsync(
    getJsonWithErrorHandlerFunc,
    setActions,
    [
      (args) => API.actions(args),
      [{ from: formatDate(month), to: formatDate(addMonths(month, 1)) }],
    ],
    [month]
  );

  useEffect(() => {
    if (!actions) {
      return;
    }
    let newhd = defaultHighlightedDays();
    actions.actions.forEach((action) => {
      let start = new Date(Date.parse(action.start_date)).setHours(0, 0, 0);
      let end = new Date(Date.parse(action.end_date)).setHours(23, 59, 59);
      for (let index = 1; index <= 31; index++) {
        // const element = array[index];
        let day = new Date(month);
        day.setDate(index);
        if (date_leq(start, day) && date_leq(day, end)) {
          // newhd[index] = arrayIns(newhd[index], action.type);
          newhd[index].push(action);
        }
      }
    });
    setHighlightedDays(newhd);
    setHdDone(true);
  }, [actions]);

  // useEffect(() => {
  //   // fetchHighlightedDays(initialValue);
  //   // abort request on unmount
  //   // return () => requestAbortController.current?.abort();
  // }, []);

  function handleMonthChange(date) {
    // if (requestAbortController.current) {
    //   // make sure that you are aborting useless requests
    //   // because it is possible to switch between months pretty quickly
    //   requestAbortController.current.abort();
    // }

    // setIsLoading(true);
    console.log("HMC DATE");
    console.log(date);
    setHighlightedDays(defaultHighlightedDays());
    setMonth(new Date(date));
    // fetchHighlightedDays(date);
  }

  const my_id = getCachedLogin();
  const [myInfo, setMyInfo] = useState(null);
  useAsync(getJsonWithErrorHandlerFunc, setMyInfo, [
    (args) => API.infoEmployee(args),
    [my_id],
  ]);

  console.log("CALENDAR RENDERS");
  const [renderedBadges, setRenderedBadges] = useState({});

  return !hdDone || !myInfo ? null : (
    // <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div style={{ display: "flex" }}>
      {/* {console.log(optional(info.phones, info.phones[0]))} */}
      <LeftPanel highlight="calendar" />
      <div>
        <TopPanel
          title="Учет рабочего времени"
          profpic={myInfo.photo_link}
          showfunctions={false}
          username={myInfo.name}
        />
        <div>
          <DateCalendar
            // defaultValue={initialValue}
            defaultValue={dayjs(new Date())}
            // loading={isLoading}
            onMonthChange={handleMonthChange}
            renderLoading={() => <DayCalendarSkeleton />}
            slots={{
              day: CalendarDay,
            }}
            slotProps={{
              day: {
                highlightedDays,
                renderedBadges,
                setRenderedBadges,
              },
            }}
          />
        </div>
      </div>
    </div>
    // </LocalizationProvider>
  );
}

export default Calendar;
