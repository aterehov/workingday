import { Drawer } from "@mui/material";
import Config from "../../config/UserPageConfig";
import IconRender from "../IconRender/IconRender";
import UserLargeSlashIcon from "./UserLargeSlashIcon";
import DiagramIcon from "./DiagramIcon";
import TeamIcon from "./TeamIcon";
import CalendarIcon from "./CalendarIcon";
import "../../styles/leftpanel.css";
import { Link } from "react-router-dom";
import optional from "../../functions/optional";
import getCachedRole from "../../functions/getCachedRole";
// import { ReactComponent as SVGUserLargeSlash } from "../public/images/icons/user-large-slash.svg";

function LeftPanel({ highlight }) {
  let highlight_style = {
    backgroundColor: "rgb(71, 146, 167)",
    borderRadius: "2px",
  };
  return (
    <Drawer
      className="left-panel"
      sx={{
        width: Config.leftPanelWidth,
        // flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: Config.leftPanelWidth,
          // boxSizing: "border-box",
          zIndex: 2,
          backgroundColor: "inherit",
          paddingTop: "inherit",
          alignItems: "inherit",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/* <UserLargeSlashIcon /> */}
      <Link className="left-panel-link" to="/user/me">
        <IconRender
          className="left-panel-icon"
          path="/images/icons/user.svg"
          // width="42px"
          // height="42px"
          iwidth="20px"
          iheight="20px"
          addstyle={highlight == "user" ? highlight_style : {}}
        />
        <p className="left-panel-label">Профиль</p>
      </Link>
      <Link className="left-panel-link" to="/search">
        <IconRender
          className="left-panel-icon"
          path="/images/icons/search.svg"
          width="16px"
          height="16px"
          iwidth="16px"
          iheight="16px"
          addstyle={highlight == "search" ? highlight_style : {}}
          // addstyle={{ display: "flex" }}
        />

        <p className="left-panel-label">Поиск сотрудников</p>
      </Link>
      <Link className="left-panel-link" to="/notifications">
        <IconRender
          className="left-panel-icon"
          path="/images/icons/bell.svg"
          width="18px"
          height="24px"
          iwidth="18px"
          iheight="18px"
          addstyle={highlight == "notifications" ? highlight_style : {}}
          // addstyle={{ display: "flex", alignItems: "center" }}
        />
        <p className="left-panel-label">Уведомления</p>
      </Link>

      <Link className="left-panel-link" to="/documents">
        <IconRender
          className="left-panel-icon"
          path="/images/icons/document.svg"
          width="18px"
          height="24px"
          iwidth="18px"
          iheight="18px"
          addstyle={highlight == "viewdoc" ? highlight_style : {}}
          // addstyle={{ display: "flex", alignItems: "center" }}
        />
        <p className="left-panel-label">Мои документы</p>
      </Link>
      {optional(
        getCachedRole() == "manager",
        <Link className="left-panel-link" to="/attendance">
          <IconRender
            className="left-panel-icon"
            path="/images/icons/clock.svg"
            width="28px"
            height="28px"
            iwidth="28px"
            iheight="28px"
            addstyle={highlight == "attendance" ? highlight_style : {}}
          />
          <p className="left-panel-label">Табель</p>
        </Link>
      )}

      {optional(
        getCachedRole() == "admin",
        <Link className="left-panel-link" to="/attendance/view">
          <IconRender
            className="left-panel-icon"
            path="/images/icons/table.svg"
            addstyle={highlight == "viewattendance" ? highlight_style : {}}
          />
          <p className="left-panel-label">Рабочее время</p>
        </Link>
      )}

      {optional(
        getCachedRole() == "admin",
        <Link className="left-panel-link" to="/documents/send">
          <IconRender
            className="left-panel-icon"
            path="/images/icons/send.svg"
            addstyle={highlight == "senddoc" ? highlight_style : {}}
          />
          <p className="left-panel-label">Отправить документ</p>
        </Link>
      )}

      <Link className="left-panel-link" to="/calendar">
        <IconRender
          className="left-panel-icon"
          path="/images/icons/calendar-day.svg"
          addstyle={highlight == "calendar" ? highlight_style : {}}
        />
        <p className="left-panel-label">Календарь</p>
      </Link>

      {optional(
        getCachedRole() == "admin",
        <Link className="left-panel-link" to="/documents/report">
          <IconRender
            className="left-panel-icon"
            path="/images/icons/resume.svg"
            addstyle={highlight == "docreport" ? highlight_style : {}}
          />
          <p className="left-panel-label">Отчет по документам</p>
        </Link>
      )}

      {/* <DiagramIcon /> */}
      {/* <TeamIcon /> */}
      {/* <CalendarIcon /> */}
    </Drawer>
  );
}

export default LeftPanel;
