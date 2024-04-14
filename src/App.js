import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UserTestPage from "./pages/UserTestPage";
import AutoLayoutExample from "./pages/TEST";
import UserEditTestPage from "./pages/UserEditTestPage";
import UserPage from "./pages/UserPage";
import UserEditPage from "./pages/UserEditPage";
import Notifications from "./pages/Notifications";
import MyPage from "./pages/MyPage";
import MyEditPage from "./pages/MyEditPage";
import SearchEmployee from "./pages/SearchEmployee";
import AttendanceTable from "./pages/AttendanceTable";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AttendanceView from "./pages/AttendanceView";
import SendDocument from "./pages/SendDocument";
import ViewDocuments from "./pages/ViewDocuments";
import Calendar from "./pages/Calendar";
import ReportDocuments from "./pages/ReportDocuments";
import { ThemeProvider, createTheme } from "@mui/material";
import { locale } from "dayjs";
import { setDefaultOptions } from "date-fns";
import { ru } from "date-fns/locale";
import { ruRU } from "@mui/x-date-pickers/locales";
import { useEffect } from "react";
import UserAdd from "./pages/UserAdd";

// const theme = createTheme(ruRU);

function App() {
  // setDefaultOptions({ weekStartsOn: 2 });
  useEffect(() => {
    document.title = "Рабочий День";
  }, []);

  return (
    // <ThemeProvider theme={theme}>
    <LocalizationProvider
      dateAdapter={AdapterDayjs}

      // adapterLocale={locale.ru}
      // localeText={"ru"}
      // adapterLocale="ru"
      // localeText={
      //   ruRU.components.MuiLocalizationProvider.defaultProps.localeText
      // }
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user/me" element={<MyPage />} />
          {/* <Route path="/user/test" element={<UserTestPage />} /> */}
          <Route path="/user/me/edit" element={<MyEditPage />} />
          {/* <Route path="/user/test/edit" element={<UserEditTestPage />} /> */}
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/user/:id/edit" element={<UserEditPage />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/search" element={<SearchEmployee />} />
          <Route path="/attendance" element={<AttendanceTable />} />
          <Route path="/attendance/view" element={<AttendanceView />} />
          <Route path="/documents/send" element={<SendDocument />} />
          <Route path="/documents" element={<ViewDocuments />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/documents/report" element={<ReportDocuments />} />
          <Route path="/user/add" element={<UserAdd />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
    // </ThemeProvider>
  );
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
