import { ButtonBase, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "../styles/reportdocuments.css";
import IconRender from "../components/IconRender/IconRender";
import useAsync from "../functions/hooks/useAsync";
import API from "../network/API";
import getJsonWithErrorHandlerFunc from "../functions/getJsonWithErrorHandlerFunc";
import sortSignTooltipData from "../functions/sortSignTooltipData";
import { Link } from "react-router-dom";
import LeftPanel from "../components/LeftPanel/LeftPanel";
import TopPanel from "../components/TopPanel/TopPanel";
import getCachedLogin from "../functions/getCachedLogin";

// function ReportDocument(doc) {
//   const [open, setOpen] = useState(false);

//   return (
//     <Row className="retort-doc-sent-doc">
//       <Col>
//         <Typography variant="body1">{doc.name}</Typography>
//         <Typography variant="body2">{doc.description}</Typography>
//       </Col>
//       <Col>
//         <Button>Прочитать</Button>
//         <Tooltip
//           // PopperProps={{
//           //   disablePortal: true,
//           // }}
//           onClose={() => setOpen(false)}
//           open={open}
//           // disableFocusListener
//           // disableHoverListener
//           // disableTouchListener
//           title={
//             <Container>
//               <Row className="report-doc-employee-signed">
//                 <Typography variant="body2">Иванов Иван</Typography>
//                 <IconRender
//                   path="/images/icons/tick.svg"
//                   width="16px"
//                   height="16px"
//                   iwidth="16px"
//                   iheight="16px"
//                   // addstyle={{ fill: "white", color: "white" }}
//                 />
//               </Row>

//               <Row className="report-doc-employee-unsigned">
//                 <Typography variant="body2">Иванов Иван</Typography>
//                 <IconRender
//                   path="/images/icons/cross.svg"
//                   width="16px"
//                   height="16px"
//                   iwidth="16px"
//                   iheight="16px"
//                   // addstyle={{ fill: "white", color: "white" }}
//                 />
//               </Row>
//             </Container>
//           }
//         >
//           <Button onClick={() => setOpen(true)}>Кто подписал?</Button>
//         </Tooltip>
//       </Col>
//     </Row>
//   );
// }

function SignTooltip(doc) {
  return;
}

async function download(doc) {
  let url = await getJsonWithErrorHandlerFunc(
    (args) => API.downloadDocuments(args),
    [doc.id]
  );
  // console.log("URL");
  // console.log(url.url);
  window.open(url.url, "_blank");
}

function ReportDocuments() {
  const [docData, setDocData] = useState(null);
  useAsync(getJsonWithErrorHandlerFunc, setDocData, [
    (args) => API.listAllDocuments(args),
    [],
  ]);

  const [signTooltipOpen, setSignTooltipOpen] = useState({});
  const [signTooltipData, setSignTooltipData] = useState({});
  const [ueran, setUeran] = useState(false);

  useEffect(() => {
    if (!docData) {
      return;
    }
    let nsto = {};
    let nstd = {};
    docData.documents.forEach((doc) => {
      nsto[doc.id] = false;
      nstd[doc.id] = null;
    });
    setSignTooltipOpen(nsto);
    setUeran(true);
  }, [docData]);

  // useEffect(() => {}, [signTooltipOpen]);

  const [info, setInfo] = useState(null);
  useAsync(getJsonWithErrorHandlerFunc, setInfo, [
    (args) => API.infoEmployee(args),
    [getCachedLogin()],
  ]);

  return !info || !docData || !ueran ? null : (
    <div style={{ display: "flex" }}>
      <LeftPanel highlight="docreport" />
      <div>
        <TopPanel
          title="Уведомления"
          profpic={info.photo_link}
          showfunctions={false}
          username={info.name}
        />
        <div className="main-content">
          <Container>
            <Row>
              <Col>
                <Typography variant="h2">Отправленные сотрудникам</Typography>
                <div className="report-doc-sent-area">
                  {/* <ReportDocument name="Название" description="Описание" /> */}
                  {/* {docData.documents.map((doc) => ReportDocument(doc))} */}
                  {docData.documents.map((doc) =>
                    doc.type == "admin_request" ? (
                      <Row className="report-doc-sent-doc">
                        <Col className="report-doc-info-col">
                          <Typography
                            variant="body1"
                            className="report-doc-name"
                          >
                            {doc.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            className="report-doc-preformat"
                          >
                            {doc.description}
                          </Typography>
                        </Col>
                        <Col className="report-doc-button-col">
                          <Button
                            className="report-doc-button"
                            onClick={() => download(doc)}
                          >
                            Прочитать
                          </Button>
                          {doc.sign_required ? (
                            <Tooltip
                              interactive
                              PopperProps={
                                {
                                  // disablePortal: true,
                                  // onMouseDown: () => {},
                                  // onPointerDown: () => {},
                                  // onClick: (e) => {
                                  //   e.preventDefault();
                                  //   e.stopPropagation();
                                  // },
                                  // onBlur: () => {},
                                  // onBlurCapture: () => {},
                                  // onClickCapture: () => {},
                                  // onClick: (e) => e.stopPropagation(),
                                }
                              }
                              // onBlur={() => {}}
                              // onBlurCapture={() => {}}
                              // onClickCapture={() => {}}
                              // onClick={(e) => e.stopPropagation()}
                              // onMouseDown={() => {}}
                              onClose={() => {
                                let nsto = { ...signTooltipOpen };
                                nsto[doc.id] = false;
                                setSignTooltipOpen(nsto);
                              }}
                              open={signTooltipOpen[doc.id]}
                              disableFocusListener
                              disableHoverListener
                              disableTouchListener
                              // onPointerDown={() => {}}
                              title={
                                <Container
                                //  onClick={(e) => e.stopPropagation()}
                                >
                                  <Row>
                                    <Button
                                      // className="report-doc-button"
                                      onClick={() => {
                                        let nsto = { ...signTooltipOpen };
                                        nsto[doc.id] = false;
                                        setSignTooltipOpen(nsto);
                                      }}
                                    >
                                      Закрыть
                                    </Button>
                                  </Row>
                                  {signTooltipData[doc.id]
                                    ? sortSignTooltipData(
                                        signTooltipData[doc.id]
                                      ).map((sign) => (
                                        <Link
                                          to={"/user/" + sign.employee.id}
                                          className="report-doc-user-link"
                                          // onClick={(e) => e.stopPropagation()}
                                          // onMouseDown={(e) => e.stopPropagation()}
                                          // onPointerDown={(e) => e.stopPropagation()}
                                        >
                                          <Row
                                            className={
                                              sign.signed
                                                ? "report-doc-employee-signed"
                                                : "report-doc-employee-unsigned"
                                            }
                                          >
                                            <Typography variant="body2">
                                              {sign.employee.surname +
                                                " " +
                                                sign.employee.name}
                                            </Typography>
                                            <IconRender
                                              path={
                                                sign.signed
                                                  ? "/images/icons/tick.svg"
                                                  : "/images/icons/cross.svg"
                                              }
                                              width="16px"
                                              height="16px"
                                              iwidth="16px"
                                              iheight="16px"
                                              // addstyle={{ fill: "white", color: "white" }}
                                            />
                                          </Row>
                                        </Link>
                                      ))
                                    : null}
                                  {/* <Row className="report-doc-employee-signed">
                            <Typography variant="body2">Иванов Иван</Typography>
                            <IconRender
                              path="/images/icons/tick.svg"
                              width="16px"
                              height="16px"
                              iwidth="16px"
                              iheight="16px"
                              // addstyle={{ fill: "white", color: "white" }}
                            />
                          </Row>

                          <Row className="report-doc-employee-unsigned">
                            <Typography variant="body2">Иванов Иван</Typography>
                            <IconRender
                              path="/images/icons/cross.svg"
                              width="16px"
                              height="16px"
                              iwidth="16px"
                              iheight="16px"
                              // addstyle={{ fill: "white", color: "white" }}
                            />
                          </Row> */}
                                </Container>
                              }
                            >
                              {/* <div> */}
                              <Button
                                className="report-doc-button"
                                onClick={async () => {
                                  if (!signTooltipData[doc.id]) {
                                    let nstd = { ...signTooltipData };
                                    nstd[doc.id] = (
                                      await getJsonWithErrorHandlerFunc(
                                        (args) => API.getSignsDocuments(args),
                                        [doc.id]
                                      )
                                    ).signs;
                                    setSignTooltipData(nstd);
                                  }
                                  let nsto = { ...signTooltipOpen };
                                  nsto[doc.id] = true;
                                  setSignTooltipOpen(nsto);
                                }}
                              >
                                Кто подписал?
                              </Button>
                              {/* </div> */}
                            </Tooltip>
                          ) : null}
                        </Col>
                      </Row>
                    ) : null
                  )}
                </div>
              </Col>
              <Col>
                <Typography variant="h2">Запросы от сотрудников</Typography>
                <div className="report-doc-sent-area">
                  {/* <ReportDocument name="Название" description="Описание" /> */}
                  {/* {docData.documents.map((doc) => ReportDocument(doc))} */}
                  {docData.documents.map((doc) =>
                    doc.type == "employee_request" ? (
                      <Row className="report-doc-sent-doc">
                        <Col className="report-doc-info-col">
                          <Typography
                            variant="body1"
                            className="report-doc-name"
                          >
                            {doc.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            className="report-doc-preformat"
                          >
                            {doc.description}
                          </Typography>
                        </Col>
                        <Col className="report-doc-button-col">
                          <Button
                            className="report-doc-button"
                            onClick={() => download(doc)}
                          >
                            Прочитать
                          </Button>
                          {doc.sign_required ? (
                            <Tooltip
                              interactive
                              PopperProps={
                                {
                                  // disablePortal: true,
                                  // onMouseDown: () => {},
                                  // onPointerDown: () => {},
                                  // onClick: (e) => {
                                  //   e.preventDefault();
                                  //   e.stopPropagation();
                                  // },
                                  // onBlur: () => {},
                                  // onBlurCapture: () => {},
                                  // onClickCapture: () => {},
                                  // onClick: (e) => e.stopPropagation(),
                                }
                              }
                              // onBlur={() => {}}
                              // onBlurCapture={() => {}}
                              // onClickCapture={() => {}}
                              // onClick={(e) => e.stopPropagation()}
                              // onMouseDown={() => {}}
                              onClose={() => {
                                let nsto = { ...signTooltipOpen };
                                nsto[doc.id] = false;
                                setSignTooltipOpen(nsto);
                              }}
                              open={signTooltipOpen[doc.id]}
                              disableFocusListener
                              disableHoverListener
                              disableTouchListener
                              // onPointerDown={() => {}}
                              title={
                                <Container
                                //  onClick={(e) => e.stopPropagation()}
                                >
                                  <Row>
                                    <Button
                                      // className="report-doc-button"
                                      onClick={() => {
                                        let nsto = { ...signTooltipOpen };
                                        nsto[doc.id] = false;
                                        setSignTooltipOpen(nsto);
                                      }}
                                    >
                                      Закрыть
                                    </Button>
                                  </Row>
                                  {signTooltipData[doc.id]
                                    ? sortSignTooltipData(
                                        signTooltipData[doc.id]
                                      ).map((sign) => (
                                        <Link
                                          to={"/user/" + sign.employee.id}
                                          // onClick={(e) => e.stopPropagation()}
                                          // onMouseDown={(e) => e.stopPropagation()}
                                          // onPointerDown={(e) => e.stopPropagation()}
                                        >
                                          <Row
                                            className={
                                              sign.signed
                                                ? "report-doc-employee-signed"
                                                : "report-doc-employee-unsigned"
                                            }
                                          >
                                            <Typography variant="body2">
                                              {sign.employee.surname +
                                                " " +
                                                sign.employee.name}
                                            </Typography>
                                            <IconRender
                                              path={
                                                sign.signed
                                                  ? "/images/icons/tick.svg"
                                                  : "/images/icons/cross.svg"
                                              }
                                              width="16px"
                                              height="16px"
                                              iwidth="16px"
                                              iheight="16px"
                                              // addstyle={{ fill: "white", color: "white" }}
                                            />
                                          </Row>
                                        </Link>
                                      ))
                                    : null}
                                  {/* <Row className="report-doc-employee-signed">
                            <Typography variant="body2">Иванов Иван</Typography>
                            <IconRender
                              path="/images/icons/tick.svg"
                              width="16px"
                              height="16px"
                              iwidth="16px"
                              iheight="16px"
                              // addstyle={{ fill: "white", color: "white" }}
                            />
                          </Row>

                          <Row className="report-doc-employee-unsigned">
                            <Typography variant="body2">Иванов Иван</Typography>
                            <IconRender
                              path="/images/icons/cross.svg"
                              width="16px"
                              height="16px"
                              iwidth="16px"
                              iheight="16px"
                              // addstyle={{ fill: "white", color: "white" }}
                            />
                          </Row> */}
                                </Container>
                              }
                            >
                              {/* <div> */}
                              <Button
                                className="report-doc-button"
                                onClick={async () => {
                                  if (!signTooltipData[doc.id]) {
                                    let nstd = { ...signTooltipData };
                                    nstd[doc.id] = (
                                      await getJsonWithErrorHandlerFunc(
                                        (args) => API.getSignsDocuments(args),
                                        [doc.id]
                                      )
                                    ).signs;
                                    setSignTooltipData(nstd);
                                  }
                                  let nsto = { ...signTooltipOpen };
                                  nsto[doc.id] = true;
                                  setSignTooltipOpen(nsto);
                                }}
                              >
                                Кто подписал?
                              </Button>
                              {/* </div> */}
                            </Tooltip>
                          ) : null}
                        </Col>
                      </Row>
                    ) : null
                  )}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default ReportDocuments;
